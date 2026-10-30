(function () {
  'use strict';

  let currentCategory = 'all';
  let cart = [];

  let dishesGrid;
  let categoryTabsContainer;
  let cartDrawer;
  let cartDrawerItems;
  let cartDrawerSubtotal;
  let cartBadges;
  let checkoutModal;
  let successModal;
  let mobileMenuDrawer;

  document.addEventListener('DOMContentLoaded', () => {

    dishesGrid = document.getElementById('dishesGrid');
    categoryTabsContainer = document.getElementById('categoryTabs');
    cartDrawer = document.getElementById('cartDrawer');
    cartDrawerItems = document.getElementById('cartDrawerItems');
    cartDrawerSubtotal = document.getElementById('cartDrawerSubtotal');
    cartBadges = document.querySelectorAll('.cart-count-badge');
    checkoutModal = document.getElementById('checkoutModal');
    successModal = document.getElementById('successModal');
    mobileMenuDrawer = document.getElementById('mobileMenuDrawer');

    loadCart();

    renderCategories();
    renderDishes();
    renderReviews();
    updateCartUI();

    if (window.lucide) {
      lucide.createIcons();
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCartDrawer();
        closeCheckoutModal();
        closeSuccessModal();
        closeMobileMenu();
      }
    });
  });

  function renderCategories() {
    if (!categoryTabsContainer || !window.RESTAURANT_DATA?.categories) return;

    const categories = window.RESTAURANT_DATA.categories;
    categoryTabsContainer.innerHTML = categories.map(cat => {
      const isActive = cat.id === currentCategory;
      const activeClass = isActive
        ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 text-white font-bold shadow-[0_10px_25px_rgba(249,115,22,0.35)] border-transparent scale-102'
        : 'bg-white/[0.04] text-zinc-300 hover:text-white border-white/10 hover:border-orange-500/40 hover:bg-white/[0.08]';

      return `
        <button
          onclick="window.poShaurmeApp.switchCategory('${cat.id}')"
          class="category-tab-btn px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all duration-300 border backdrop-blur-xl flex items-center gap-1.5 sm:gap-2 cursor-pointer flex-shrink-0 ${activeClass}"
          data-category="${cat.id}"
        >
          <i data-lucide="${cat.icon || 'flame'}" class="w-4 h-4 ${isActive ? 'text-white' : 'text-orange-400'}"></i>
          <span>${cat.label}</span>
        </button>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  }

  function switchCategory(catId) {
    currentCategory = catId;
    renderCategories();
    renderDishes();
  }

  function renderDishes() {
    if (!dishesGrid || !window.RESTAURANT_DATA?.products) return;

    const products = window.RESTAURANT_DATA.products;
    const filtered = currentCategory === 'all'
      ? products
      : products.filter(p => p.category === currentCategory);

    dishesGrid.innerHTML = filtered.map(dish => {
      const inCart = cart.find(item => item.id === dish.id);
      const qty = inCart ? inCart.quantity : 0;

      let badgeHtml = '';
      if (dish.badge) {
        let badgeColorClass = 'bg-orange-500/20 text-orange-400 border-orange-500/30';
        if (dish.badgeColor === 'gold') badgeColorClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
        if (dish.badgeColor === 'red' || dish.isSpicy) badgeColorClass = 'bg-red-500/20 text-red-400 border-red-500/40';
        if (dish.badgeColor === 'emerald') badgeColorClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

        badgeHtml = `
          <span class="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${badgeColorClass}">
            ${dish.badge}
          </span>
        `;
      }

      let actionMarkup = '';
      if (qty === 0) {
        actionMarkup = `
          <button
            onclick="window.poShaurmeApp.addToCart('${dish.id}')"
            class="w-full py-2 sm:py-3 px-2 sm:px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-extrabold text-[11px] sm:text-sm tracking-wide shadow-[0_4px_15px_rgba(249,115,22,0.3)] hover:shadow-[0_8px_25px_rgba(249,115,22,0.5)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <i data-lucide="plus" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i>
            <span>В корзину</span>
          </button>
        `;
      } else {
        actionMarkup = `
          <div class="w-full py-1 px-1.5 sm:py-1.5 sm:px-2 rounded-xl sm:rounded-2xl bg-[#0B0C10] border border-orange-500/50 flex items-center justify-between shadow-inner">
            <button
              onclick="window.poShaurmeApp.updateCartQuantity('${dish.id}', -1)"
              class="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/[0.08] hover:bg-orange-500 hover:text-white text-zinc-300 font-bold flex items-center justify-center transition-all active:scale-90 cursor-pointer"
              aria-label="Уменьшить"
            >
              <i data-lucide="minus" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i>
            </button>
            <div class="flex flex-col items-center">
              <span class="text-xs sm:text-sm font-black text-amber-400 font-display">${qty} шт</span>
              <span class="text-[9px] sm:text-[10px] text-zinc-400">${(dish.price * qty).toLocaleString('ru-RU')} ₽</span>
            </div>
            <button
              onclick="window.poShaurmeApp.updateCartQuantity('${dish.id}', 1)"
              class="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold flex items-center justify-center hover:opacity-90 transition-all active:scale-90 cursor-pointer shadow-md"
              aria-label="Увеличить"
            >
              <i data-lucide="plus" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i>
            </button>
          </div>
        `;
      }

      return `
        <article class="group relative rounded-2xl sm:rounded-3xl bg-[#14161D] border border-white/10 hover:border-orange-500/40 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(249,115,22,0.15)] flex flex-col justify-between">
          <div>
            
            <div class="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-black/60">
              <img
                src="${dish.image}"
                alt="${dish.name}"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out filter brightness-95 group-hover:brightness-105"
                onerror="this.src='img/dishes/shaurma_classic.jpg'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#14161D] via-transparent to-black/40"></div>

              
              <div class="absolute top-2 inset-x-2 sm:top-3 sm:inset-x-3 flex items-start justify-between gap-1 pointer-events-none">
                <div>${badgeHtml}</div>
                <div class="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full text-[9px] sm:text-[11px] font-bold bg-black/80 text-zinc-300 border border-white/15 backdrop-blur-md flex-shrink-0">
                  ${dish.weight}
                </div>
              </div>
            </div>

            
            <div class="p-2.5 sm:p-5">
              <h3 class="font-display font-black text-xs sm:text-base lg:text-lg text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight leading-tight line-clamp-2 min-h-[2rem] sm:min-h-0 mb-1 sm:mb-2">
                ${dish.name}
              </h3>
              <p class="text-zinc-400 text-[10px] sm:text-xs font-normal leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-3">
                ${dish.description}
              </p>
            </div>
          </div>

          
          <div class="px-2.5 pb-2.5 sm:px-5 sm:pb-5 pt-1.5 border-t border-white/5 flex flex-col gap-2">
            <div class="flex items-baseline justify-between gap-1">
              <div class="flex items-baseline gap-1.5">
                <span class="font-display font-black text-sm sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  ${dish.price.toLocaleString('ru-RU')} ₽
                </span>
                ${dish.oldPrice ? `<span class="text-[10px] sm:text-xs text-zinc-500 line-through">${dish.oldPrice} ₽</span>` : ''}
              </div>
              <span class="text-[9px] sm:text-[11px] font-semibold text-zinc-500 uppercase tracking-wider hidden xs:inline">
                ${dish.weight}
              </span>
            </div>
            ${actionMarkup}
          </div>
        </article>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  }

  function renderReviews() {
    const reviewsGrid = document.getElementById('reviewsGrid');
    if (!reviewsGrid || !window.RESTAURANT_DATA?.reviews) return;

    const reviews = window.RESTAURANT_DATA.reviews;
    reviewsGrid.innerHTML = reviews.map(rev => `
      <div class="rounded-3xl bg-[#14161D] border border-white/10 hover:border-orange-500/30 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div>
          
          <div class="flex items-center justify-between gap-3 mb-4">
            <div class="flex items-center gap-3">
              <img
                src="${rev.avatar}"
                alt="${rev.author}"
                class="w-11 h-11 rounded-full object-cover border border-orange-500/30 bg-black/50"
                onerror="this.src='https://avatars.mds.yandex.net/get-yapic/64336/0f-8/islands-150'"
              />
              <div>
                <h4 class="font-bold text-white text-sm sm:text-base leading-tight">${rev.author}</h4>
                <div class="flex items-center gap-1.5 text-xs text-zinc-400">
                  <span>${rev.date}</span>
                  ${rev.verified ? '<span class="text-emerald-400 text-[11px] font-medium">• Проверенный отзыв</span>' : ''}
                </div>
              </div>
            </div>
            
            <div class="flex items-center text-amber-400">
              ${Array(rev.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-amber-400 text-amber-400"></i>').join('')}
            </div>
          </div>

          
          <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed italic font-light">
            "${rev.text}"
          </p>
        </div>

        <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500 font-medium">
          <span class="flex items-center gap-1"><i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-amber-400"></i> Яндекс Карты</span>
          <span>Оценка 5 из 5</span>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  function addToCart(productId) {
    const product = window.RESTAURANT_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        weight: product.weight,
        quantity: 1,
        image: product.image
      });
    }

    saveCart();
    updateCartUI();
    renderDishes();
    showToast(`«${product.name}» добавлена в корзину!`);
  }

  function updateCartQuantity(productId, delta) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;

    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }

    saveCart();
    updateCartUI();
    renderDishes();
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    renderDishes();
  }

  function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
    renderDishes();
  }

  function saveCart() {
    try {
      localStorage.setItem('poshaurme_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  function loadCart() {
    try {
      const data = localStorage.getItem('poshaurme_cart');
      if (data) {
        cart = JSON.parse(data);
      }
    } catch (e) {
      cart = [];
    }
  }

  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartBadges) {
      cartBadges.forEach(badge => {
        badge.textContent = totalCount;
        if (totalCount > 0) {
          badge.classList.remove('hidden');
        } else {
          badge.classList.add('hidden');
        }
      });
    }

    const bottomBarTotal = document.getElementById('bottomBarTotal');
    if (bottomBarTotal) {
      bottomBarTotal.textContent = `${subtotal.toLocaleString('ru-RU')} ₽`;
    }

    if (cartDrawerSubtotal) {
      cartDrawerSubtotal.textContent = `${subtotal.toLocaleString('ru-RU')} ₽`;
    }

    if (cartDrawerItems) {
      if (cart.length === 0) {
        cartDrawerItems.innerHTML = `
          <div class="h-full flex flex-col items-center justify-center text-center p-8 text-zinc-400">
            <div class="w-20 h-20 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-orange-400 mb-4 shadow-inner">
              <i data-lucide="shopping-bag" class="w-10 h-10"></i>
            </div>
            <h4 class="font-display font-bold text-white text-lg mb-1">Корзина пуста</h4>
            <p class="text-xs text-zinc-400 max-w-xs mb-6">Добавьте сочную крафтовую шаурму на огне из нашего меню</p>
            <button
              onclick="window.poShaurmeApp.closeCartDrawer(); window.location.href='#menu';"
              class="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-orange-500/30 transition active:scale-95 cursor-pointer"
            >
              Перейти к меню
            </button>
          </div>
        `;
      } else {
        cartDrawerItems.innerHTML = cart.map(item => `
          <div class="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3 hover:border-orange-500/30 transition">
            <img
              src="${item.image}"
              alt="${item.name}"
              class="w-16 h-16 rounded-xl object-cover bg-black/50 border border-white/10 flex-shrink-0"
              onerror="this.src='img/dishes/shaurma_classic.jpg'"
            />
            <div class="flex-1 min-w-0">
              <h5 class="font-display font-bold text-white text-xs sm:text-sm truncate">${item.name}</h5>
              <div class="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                <span>${item.weight}</span>
                <span>•</span>
                <span class="text-amber-400 font-bold">${item.price} ₽</span>
              </div>
              
              <div class="flex items-center gap-2">
                <button
                  onclick="window.poShaurmeApp.updateCartQuantity('${item.id}', -1)"
                  class="w-7 h-7 rounded-lg bg-white/[0.08] hover:bg-orange-500 hover:text-white text-zinc-300 flex items-center justify-center transition active:scale-90 cursor-pointer"
                >
                  <i data-lucide="minus" class="w-3.5 h-3.5"></i>
                </button>
                <span class="text-xs font-black text-white px-2">${item.quantity}</span>
                <button
                  onclick="window.poShaurmeApp.updateCartQuantity('${item.id}', 1)"
                  class="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center transition active:scale-90 cursor-pointer"
                >
                  <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </div>
            
            <div class="flex flex-col items-end justify-between self-stretch">
              <button
                onclick="window.poShaurmeApp.removeFromCart('${item.id}')"
                class="text-zinc-500 hover:text-red-400 p-1 transition cursor-pointer"
                title="Удалить"
              >
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
              <span class="font-display font-black text-sm text-amber-400">
                ${(item.price * item.quantity).toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>
        `).join('');
      }
    }

    if (window.lucide) lucide.createIcons();
  }

  function openCartDrawer() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    updateCartUI();
  }

  function closeCartDrawer() {
    if (!cartDrawer) return;
    cartDrawer.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function openCheckoutModal() {
    if (cart.length === 0) {
      showToast('Ваша корзина пуста!', 'alert-circle');
      return;
    }
    closeCartDrawer();
    if (!checkoutModal) return;
    checkoutModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    const checkoutSummary = document.getElementById('checkoutSummary');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (checkoutSummary) {
      checkoutSummary.innerHTML = `
        <div class="p-3.5 rounded-2xl bg-white/[0.04] border border-white/5 space-y-1.5 text-xs text-zinc-300">
          <div class="flex items-center justify-between text-zinc-400 font-semibold mb-1">
            <span>Позиций в заказе: ${cart.reduce((sum, i) => sum + i.quantity, 0)} шт.</span>
            <span class="text-white font-display font-black text-sm text-amber-400">${subtotal.toLocaleString('ru-RU')} ₽</span>
          </div>
          ${cart.map(i => `
            <div class="flex justify-between text-[11px] text-zinc-400 truncate">
              <span class="truncate">• ${i.name} × ${i.quantity}</span>
              <span class="flex-shrink-0 ml-2 font-mono">${(i.price * i.quantity)} ₽</span>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  function closeCheckoutModal() {
    if (!checkoutModal) return;
    checkoutModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function openSuccessModal(orderData) {
    if (!successModal) return;
    const details = document.getElementById('successModalDetails');
    if (details && orderData) {
      details.innerHTML = `
        <div class="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-zinc-300 space-y-2 text-left">
          <div class="flex justify-between">
            <span class="text-zinc-400">Имя:</span>
            <span class="font-bold text-white">${orderData.name}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-zinc-400">Телефон:</span>
            <span class="font-bold text-white">${orderData.phone}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-zinc-400">Формат:</span>
            <span class="font-bold text-amber-400">${orderData.type}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-zinc-400">Время готовности:</span>
            <span class="font-bold text-white">${orderData.time}</span>
          </div>
          <div class="pt-2 border-t border-white/10 flex justify-between font-display font-black text-sm">
            <span class="text-white">Итого:</span>
            <span class="text-amber-400">${orderData.total} ₽</span>
          </div>
        </div>
      `;
    }
    successModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeSuccessModal() {
    if (!successModal) return;
    successModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function openMobileMenu() {
    if (!mobileMenuDrawer) return;
    mobileMenuDrawer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenuDrawer) return;
    mobileMenuDrawer.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function handleOrderSubmit(e, platform = 'whatsapp') {
    if (e && e.preventDefault) e.preventDefault();

    if (cart.length === 0) {
      showToast('Корзина пуста!', 'alert-circle');
      return;
    }

    const nameInput = document.getElementById('orderName');
    const phoneInput = document.getElementById('orderPhone');
    const typeInput = document.querySelector('input[name="orderType"]:checked');
    const timeInput = document.getElementById('orderTime');
    const commentInput = document.getElementById('orderComment');

    const name = nameInput?.value.trim() || 'Гость';
    const phone = phoneInput?.value.trim() || '';
    const type = typeInput?.value === 'takeaway' ? 'На вынос (самовывоз)' : 'Перекусить на месте';
    const time = timeInput?.value || 'Как можно скорее (15–20 мин)';
    const comment = commentInput?.value.trim() || '';

    if (!phone) {
      showToast('Пожалуйста, укажите номер телефона!', 'alert-circle');
      phoneInput?.focus();
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let msg = `🔥 *ПРЕДЗАКАЗ — «ПО ШАУРМЕ» (Сочи, Чайковского, 5)*\n\n`;
    msg += `📋 *СОСТАВ ЗАКАЗА:*\n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name} (${item.weight}) × ${item.quantity} шт. = ${item.price * item.quantity} ₽\n`;
    });
    msg += `\n💰 *ИТОГО К ОПЛАТЕ: ${subtotal.toLocaleString('ru-RU')} ₽*\n\n`;
    msg += `👤 *Имя:* ${name}\n`;
    msg += `📞 *Телефон:* ${phone}\n`;
    msg += `🛍️ *Формат:* ${type}\n`;
    msg += `⏰ *Время готовности:* ${time}\n`;
    if (comment) {
      msg += `💬 *Пожелания:* ${comment}\n`;
    }
    msg += `\n📍 *Адрес заведения:* г. Сочи, ул. Чайковского, 5`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(msg);
      }
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }

    const rawPhone = '79388771277';
    let url = '';
    if (platform === 'whatsapp') {
      url = `https://wa.me/${rawPhone}?text=${encodeURIComponent(msg)}`;
    } else {
      url = `https://t.me/+${rawPhone}?text=${encodeURIComponent(msg)}`;
    }

    window.open(url, '_blank');

    closeCheckoutModal();
    openSuccessModal({
      name,
      phone,
      type,
      time,
      total: subtotal.toLocaleString('ru-RU')
    });

    showToast('📋 Заказ сформирован и передан!', 'check');

    clearCart();
  }

  function showToast(text, icon = 'check') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#14161D]/95 border border-orange-500/40 text-white text-xs sm:text-sm font-semibold shadow-[0_10px_30px_rgba(249,115,22,0.35)] backdrop-blur-xl transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto';
    toast.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
        <i data-lucide="${icon}" class="w-3.5 h-3.5"></i>
      </div>
      <span>${text}</span>
    `;

    toastContainer.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-4', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  window.poShaurmeApp = {
    switchCategory,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    openCartDrawer,
    closeCartDrawer,
    openCheckoutModal,
    closeCheckoutModal,
    openSuccessModal,
    closeSuccessModal,
    openMobileMenu,
    closeMobileMenu,
    handleOrderSubmit,
    showToast
  };

})();