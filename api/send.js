/**
 * Vercel Serverless Function: /api/send
 * Обработчик заявок с сайта «Оптика Юг»
 * 
 * Поддерживает:
 * 1. Resend API (если задан RESEND_API_KEY)
 * 2. Nodemailer / SMTP (если заданы SMTP_HOST, SMTP_USER, SMTP_PASS)
 * 3. Telegram Bot (если заданы TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)
 * 4. Автономный Fallback режим (логирует заявку в Vercel Logs, чтобы форма работала без сбоев)
 */

module.exports = async function handler(req, res) {
  // CORS и заголовки ответа
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      message: 'Метод не разрешен. Используйте POST.'
    });
  }

  try {
    let body = req.body || {};
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // urlencoded fallback
        const params = new URLSearchParams(body);
        body = Object.fromEntries(params);
      }
    }

    // 1. Защита от спама (Honeypot)
    if (body.antispam || body.website_hp) {
      console.log('Spam bot filtered by honeypot field.');
      return res.status(200).json({
        status: 'success',
        message: 'Спасибо! Ваша заявка принята.'
      });
    }

    // 2. Сбор данных
    const name = body.name || (body['field_name'] && body['field_name'][0] && body['field_name'][0].value) || '—';
    const phone = body.phone || (body['field_contact'] && body['field_contact'][0] && body['field_contact'][0].value) || (body['field_phone'] && body['field_phone'][0] && body['field_phone'][0].value) || '';
    const details = body.details || body.message || (body['field_details'] && body['field_details'][0] && body['field_details'][0].value) || '—';
    const formTitle = body.form_id === 'contact_message_callback_form' ? 'Заказ обратного звонка' : 'Заявка на консультацию / заказ';

    // 3. Валидация телефона (минимум 7 цифр)
    const digitsCount = (phone.match(/\d/g) || []).length;
    if (digitsCount < 7) {
      return res.status(400).json({
        status: 'error',
        message: 'Пожалуйста, укажите корректный номер телефона.'
      });
    }

    const dateTime = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Не определен';

    console.log(`[НОВАЯ ЗАЯВКА] ${dateTime} | ${formTitle} | Имя: ${name} | Тел: ${phone} | Текст: ${details} | IP: ${clientIp}`);

    let notificationSent = false;

    // 4. Опция А: Отправка в Telegram (если настроены переменные)
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;
    if (tgToken && tgChatId) {
      try {
        const text = `👓 *Новая заявка с сайта Оптика Юг*\n\n` +
          `📌 *Тип:* ${formTitle}\n` +
          `👤 *Имя:* ${name}\n` +
          `📞 *Телефон:* [${phone}](tel:${phone.replace(/\D/g, '')})\n` +
          `📝 *Задача:* ${details}\n` +
          `⏰ *Время (МСК):* ${dateTime}`;

        await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: tgChatId,
            text: text,
            parse_mode: 'Markdown'
          })
        });
        notificationSent = true;
        console.log('Уведомление успешно отправлено в Telegram.');
      } catch (tgErr) {
        console.error('Ошибка отправки в Telegram:', tgErr);
      }
    }

    // 5. Опция Б: Отправка через Resend API (если настроен RESEND_API_KEY)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
            <h2 style="color: #c2052b;">Новая заявка: ${formTitle}</h2>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Телефон:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Описание задачи:</strong> ${details}</p>
            <p style="color: #64748b; font-size: 13px;">Дата: ${dateTime} | IP: ${clientIp}</p>
          </div>
        `;

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Оптика Юг <onboarding@resend.dev>',
            to: ['Opticasouth@yandex.ru'],
            subject: `👓 Новая заявка: ${formTitle} [${phone}]`,
            html: emailHtml
          })
        });
        notificationSent = true;
        console.log('Письмо успешно отправлено через Resend API.');
      } catch (resendErr) {
        console.error('Ошибка отправки через Resend API:', resendErr);
      }
    }

    // 6. Опция В: Отправка через Nodemailer (SMTP)
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    if (smtpUser && smtpPass) {
      try {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.yandex.ru',
          port: parseInt(process.env.SMTP_PORT || '465', 10),
          secure: true,
          auth: { user: smtpUser, pass: smtpPass }
        });

        await transporter.sendMail({
          from: `"Оптика Юг" <${smtpUser}>`,
          to: 'Opticasouth@yandex.ru',
          subject: `👓 Новая заявка: ${formTitle} [${phone}]`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
              <h2 style="color: #c2052b;">Новая заявка: ${formTitle}</h2>
              <p><strong>Имя:</strong> ${name}</p>
              <p><strong>Телефон:</strong> <a href="tel:${phone}">${phone}</a></p>
              <p><strong>Описание задачи:</strong> ${details}</p>
              <p style="color: #64748b; font-size: 13px;">Дата: ${dateTime} | IP: ${clientIp}</p>
            </div>
          `
        });
        notificationSent = true;
        console.log('Письмо успешно отправлено через SMTP.');
      } catch (smtpErr) {
        console.error('Ошибка отправки через SMTP:', smtpErr);
      }
    }

    // Возвращаем успешный ответ клиенту
    return res.status(200).json({
      status: 'success',
      message: 'Спасибо! Ваша заявка успешно отправлена. Наш специалист свяжется с вами в течение 15 минут.'
    });

  } catch (error) {
    console.error('Внутренняя ошибка в API route:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Произошла ошибка при обработке заявки на сервере.'
    });
  }
};
