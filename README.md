# Салон оптики «Оптика Юг» — Модернизированный сайт

Премиальный лендинг с интерактивным каталогом оптики и Serverless backend для Vercel.

---

## 🚀 Деплой на Vercel (Быстрый старт)

### 1. Установка Vercel CLI (выполняется один раз на вашем компьютере):
```bash
npm install -g vercel
```

### 2. Авторизация и Деплой:
В терминале перейдите в директорию проекта и запустите:
```bash
vercel
```
* Нажмите `Y` для подтверждения.
* Выберите ваш Scope (аккаунт).
* На вопрос `Link to existing project?` ответьте `N`.
* Название проекта: `optikayug` (или оставьте по умолчанию).
* Директория: `./` (текущая).
* Vercel автоматически развернет статику и Serverless Function `/api/send`.

Для последующего продакшн-деплоя запускайте:
```bash
vercel --prod
```

---

## ⚙️ Настройка получения заявок (Environment Variables в Vercel)

Заявки автоматически логируются в **Vercel Runtime Logs**. Чтобы получать их на почту или в Telegram, укажите переменные окружения в панели Vercel (**Project Settings -> Environment Variables**):

### Вариант 1: Telegram (Рекомендуется — моментальные уведомления):
* `TELEGRAM_BOT_TOKEN` — токен вашего бота из @BotFather
* `TELEGRAM_CHAT_ID` — ID вашего чата или группы (можно узнать через @userinfobot)

### Вариант 2: Resend API (Современный email-сервис):
* `RESEND_API_KEY` — ключ с сайта resend.com

### Вариант 3: SMTP (Яндекс Почта):
* `SMTP_HOST` = `smtp.yandex.ru`
* `SMTP_PORT` = `465`
* `SMTP_USER` = ваш ящик (например, `Opticasouth@yandex.ru`)
* `SMTP_PASS` = пароль приложения Яндекс Почты

---

## 📁 Структура проекта
* `index.html` — главная страница сайта с новым каталогом и Awwwards UI/UX.
* `api/send.js` — Serverless API Route для обработки заявок на Vercel.
* `vercel.json` — конфигурация заголовков, кэширования и маршрутов Vercel.
* `send.php` и `.htaccess` — сохранены для совместимости со стандартными PHP-хостингами.
* `images/` — оптимизированные изображения и фоны карточек каталога.
* `fonts/` — локальные веб-шрифты (Roboto и FontAwesome).
* `css/` — таблицы стилей.
