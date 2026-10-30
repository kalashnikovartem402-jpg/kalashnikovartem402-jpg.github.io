/**
 * ПО ШАУРМЕ • Крафтовый стритфуд в Сочи (ул. Чайковского, 5)
 * Меню и контакты
 */
window.RESTAURANT_DATA = {
  restaurant: {
    name: "По Шаурме",
    shortName: "ПоШаурме",
    tagline: "Крафтовая шаурма на открытом огне в Сочи",
    subtagline: "Фирменные рецепты шефа • Порции до 550 г • Хрустящий лаваш без размокания",
    city: "Сочи",
    district: "Центральный район, мкр. Гагарина",
    address: "г. Сочи, ул. Чайковского, 5",
    addressFull: "Краснодарский край, г. Сочи, микрорайон Гагарина, улица Чайковского, 5 (рядом со Школой №7 и набережной реки Сочи)",
    postalCode: "354065",
    phone: "+7 (938) 877-12-77",
    phoneRaw: "+79388771277",
    whatsappUrl: "https://wa.me/79388771277",
    telegramUrl: "https://t.me/+79388771277",
    workingHours: "Ежедневно с 10:00 до 22:00",
    workingStatus: "Открыто до 22:00",
    rating: "5.0",
    ratingCount: "172 оценки",
    reviewsCount: "151 отзыв",
    award: "Хорошее место 2026",
    yandexMapsUrl: "https://yandex.ru/maps/org/po_shaurme/132211386063",
    yandexEdaUrl: "https://eda.yandex.ru/r/posaurme",
    routeUrl: "https://yandex.ru/maps?rtext=~43.596092,39.722688&ruri=~ymapsbm1://org?oid=132211386063",
    coordinates: [39.722688, 43.596092],
    heroImage: "img/dishes/shaurma_classic.jpg",
    facadeImage: "https://avatars.mds.yandex.net/get-altay/16435010/2a0000019cab1e556ceb9b36c092bb509895/XXL",
    kitchenImage: "https://avatars.mds.yandex.net/get-altay/16021390/2a0000019a96653537df6282efd574235ef4/XXL"
  },

  categories: [
    { id: "all", label: "Все меню", icon: "flame" },
    { id: "popular", label: "Хиты продаж ⭐", icon: "star" },
    { id: "shaurma", label: "Шаурма & Пита", icon: "sparkles" },
    { id: "combos", label: "Сытные комбо 🥤", icon: "zap" },
    { id: "snacks", label: "Снеки & Боксы", icon: "utensils" },
    { id: "sauces", label: "Фирменные соусы", icon: "coffee" }
  ],

  products: [
    // 1. Популярные хиты
    {
      id: "shaurma-classic",
      category: "popular",
      name: "Шаурма классическая",
      price: 560,
      oldPrice: null,
      weight: "370 г",
      badge: "Главный хит ⭐",
      badgeColor: "gold",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/shaurma_classic.jpg",
      description: "Легендарный хит: отборное сочное мясо птицы с открытого огня, свежие томаты, огурчики, капуста, фирменный чесночный соус и поджаристый хрустящий лаваш."
    },
    {
      id: "shaurma-cheese",
      category: "popular",
      name: "Шаурма сырная",
      price: 600,
      oldPrice: null,
      weight: "380 г",
      badge: "Тягучий сыр 🧀",
      badgeColor: "amber",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/shaurma_cheese.jpg",
      description: "Аппетитный золотистый сырный лаваш, расплавленный фермерский сыр, сочное куриное филе, спелые томаты и нежный сливочно-сырный соус."
    },
    {
      id: "shaurma-suluguni",
      category: "popular",
      name: "Шаурма Сулугуни",
      price: 800,
      oldPrice: 890,
      weight: "450 г",
      badge: "Спешл шефа 🔥",
      badgeColor: "gold",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/shaurma_suluguni.jpg",
      description: "Премиум рецепт: двойная порция кавказского сыра сулугуни, нежнейшее мясо с вертела, свежая зелень, красный лучок и томаты."
    },
    {
      id: "shaurma-shrimp",
      category: "popular",
      name: "Шаурма с креветками",
      price: 730,
      oldPrice: null,
      weight: "350 г",
      badge: "С морепродуктами 🍤",
      badgeColor: "red",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/shaurma_shrimp.jpg",
      description: "Королевские креветки в хрустящей золотистой темпуре, свежий салат айсберг, огурчики, томаты и деликатный розовый соус в тонком лаваше."
    },
    {
      id: "shaurma-royal",
      category: "popular",
      name: "Шаурма Королевская (с грибами)",
      price: 700,
      oldPrice: null,
      weight: "520 г",
      badge: "С грибами 👑",
      badgeColor: "gold",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/shaurma_royal.jpg",
      description: "Полукилограммовый шедевр: сочная курочка, обжаренные на гриле шампиньоны с дымком, сыр, свежие овощи и авторский соус."
    },

    // 2. Шаурма & Пита
    {
      id: "shaurma-big-xl",
      category: "shaurma",
      name: "Шаурма большая (XL)",
      price: 650,
      oldPrice: 720,
      weight: "450 г",
      badge: "Полкило 💥",
      badgeColor: "orange",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/shaurma_big_xl.jpg",
      description: "Щедрая порция мяса на углях, двойные овощи, авторский чесночный и томатный соус в лаваше, который держит сок до последней капли."
    },
    {
      id: "shaurma-mini",
      category: "shaurma",
      name: "Шаурма Мини",
      price: 450,
      oldPrice: null,
      weight: "270 г",
      badge: "Быстрый перекус",
      badgeColor: "amber",
      isPopular: false,
      isSpicy: false,
      image: "img/dishes/shaurma_mini.jpg",
      description: "Компактный размер для легкого перекуса на прогулке: сочное мясо на гриле, свежие сочинские овощи и белый соус."
    },
    {
      id: "shaurma-cheese-xl",
      category: "shaurma",
      name: "Шаурма сырная XL",
      price: 700,
      oldPrice: null,
      weight: "450 г",
      badge: "Максимум сыра 🧀",
      badgeColor: "amber",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/shaurma_cheese_xl.jpg",
      description: "Огромная сырная шаурма в фирменном сырном лаваше с удвоенной мясной и сырной выкладкой."
    },
    {
      id: "shaurma-bbq",
      category: "shaurma",
      name: "Шаурма барбекю",
      price: 600,
      oldPrice: null,
      weight: "370 г",
      badge: "Дымок BBQ 🔥",
      badgeColor: "orange",
      isPopular: false,
      isSpicy: false,
      image: "img/dishes/shaurma_bbq.jpg",
      description: "Копченый дымный вкус барбекю: сочное мясо с вертела, томаты, хрустящий огурчик и пряный соус BBQ."
    },
    {
      id: "shaurma-bbq-xl",
      category: "shaurma",
      name: "Шаурма барбекю XL",
      price: 700,
      oldPrice: null,
      weight: "500 г",
      badge: "BBQ 500 г 🔥",
      badgeColor: "orange",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/shaurma_bbq_xl.jpg",
      description: "Полноценные 500 грамм мощи: двойное мясо, насыщенный соус BBQ, картошечка фри и сочные овощи."
    },
    {
      id: "shaurma-spicy",
      category: "shaurma",
      name: "Шаурма острая",
      price: 600,
      oldPrice: null,
      weight: "390 г",
      badge: "Острое 🌶️",
      badgeColor: "red",
      isPopular: false,
      isSpicy: true,
      image: "img/dishes/shaurma_spicy.jpg",
      description: "Огненный мексиканский драйв: пикантный перчик халапеньо, острый красный соус, сочное мясо птицы и свежие томаты."
    },
    {
      id: "shaurma-spicy-xl",
      category: "shaurma",
      name: "Шаурма острая XL",
      price: 700,
      oldPrice: null,
      weight: "430 г",
      badge: "Халапеньо XL 🌶️",
      badgeColor: "red",
      isPopular: true,
      isSpicy: true,
      image: "img/dishes/shaurma_spicy_xl.jpg",
      description: "Двойная порция перчиков халапеньо и двойное мясо в хрустящем лаваше для настоящих ценителей остроты."
    },
    {
      id: "shaurma-veggie",
      category: "shaurma",
      name: "Шаурма вегетарианская",
      price: 500,
      oldPrice: null,
      weight: "350 г",
      badge: "100% Veggie 🥗",
      badgeColor: "emerald",
      isPopular: false,
      isSpicy: false,
      image: "img/dishes/shaurma_veggie.jpg",
      description: "Настоящая вегетарианская шаурма в хрустящем лаваше: обжаренные шампиньоны, картошечка, свежие огурцы, томаты, капуста и нежный соус."
    },
    {
      id: "souvlaki",
      category: "shaurma",
      name: "Сувлак в греческой пите",
      price: 700,
      oldPrice: null,
      weight: "470 г",
      badge: "В пите 🇬🇷",
      badgeColor: "emerald",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/souvlaki.jpg",
      description: "Пышная поджаристая греческая пита, сочное жареное мясо, хрустящий картофель фри, красный лучок, томаты и соус дзадзыки."
    },
    {
      id: "hot-dog-danish",
      category: "shaurma",
      name: "Хот-Дог Датский",
      price: 540,
      oldPrice: null,
      weight: "380 г",
      badge: "Хрустящий лук 🌭",
      badgeColor: "amber",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/hot_dog_danish.jpg",
      description: "Длинная сочная сосиска гриль, хрустящий сушеный лук, маринованные огурчики, сладкая горчица и кетчуп в пышной булочке."
    },

    // 3. Сытные комбо
    {
      id: "combo-shaurma-fries-cola",
      category: "combos",
      name: "Комбо: Шаурма + Фри + Кола",
      price: 820,
      oldPrice: 950,
      weight: "350 г + напиток",
      badge: "Выгодно 🔥",
      badgeColor: "gold",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/combo_shaurma_fries_cola.jpg",
      description: "Полный сытный сет: классическая шаурма на углях, горячий картофель фри с хрустящей корочкой, два фирменных соуса и баночка Добрый Cola."
    },
    {
      id: "combo-shaurma-cola",
      category: "combos",
      name: "Комбо: Шаурма классическая + Кола",
      price: 620,
      oldPrice: 700,
      weight: "350 г + 0.33 л",
      badge: "Хит ланча 🥤",
      badgeColor: "amber",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/combo_shaurma_cola.jpg",
      description: "Идеальная пара: горячая сочная шаурма прямо с контактного гриля и прохладная ледяная кола."
    },
    {
      id: "combo-fries-cola",
      category: "combos",
      name: "Комбо: Картофель фри большой + Кола",
      price: 520,
      oldPrice: 600,
      weight: "200 г + 0.33 л",
      badge: "Перекус 🍟",
      badgeColor: "amber",
      isPopular: false,
      isSpicy: false,
      image: "img/dishes/combo_fries_cola.jpg",
      description: "Большая порция золотистого картофеля фри с солью и баночка освежающей газировки."
    },

    // 4. Снеки & Боксы
    {
      id: "shaurma-box",
      category: "snacks",
      name: "Шаурма бокс (на тарелке)",
      price: 590,
      oldPrice: null,
      weight: "550 г",
      badge: "Вес 550 г 🍽️",
      badgeColor: "gold",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/shaurma_box.jpg",
      description: "Порция на тарелке: сочное мясо птицы, картофель фри, свежие салаты, маринованная морковь, фирменный соус и поджаристый лаваш треугольниками."
    },
    {
      id: "french-fries-100",
      category: "snacks",
      name: "Картофель фри (100 г)",
      price: 390,
      oldPrice: null,
      weight: "100 г",
      badge: "Хруст 🍟",
      badgeColor: "amber",
      isPopular: false,
      isSpicy: false,
      image: "img/dishes/french_fries_100.jpg",
      description: "Золотистые брусочки отборного картофеля из фритюра с морской солью. Подаются с пылу с жару."
    },
    {
      id: "french-fries-200",
      category: "snacks",
      name: "Картофель фри большой (200 г)",
      price: 470,
      oldPrice: null,
      weight: "200 г",
      badge: "Двойная порция",
      badgeColor: "amber",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/french_fries_200.jpg",
      description: "Большая упаковка 200 грамм хрустящей картошечки фри для отличной компании."
    },
    {
      id: "nuggets-6",
      category: "snacks",
      name: "Куриные наггетсы (6 шт)",
      price: 420,
      oldPrice: null,
      weight: "125 г",
      badge: "Филе 100% 🍗",
      badgeColor: "orange",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/nuggets.jpg",
      description: "Кусочки натурального нежного куриного филе в хрустящей золотистой панировке."
    },
    {
      id: "nuggets-9",
      category: "snacks",
      name: "Куриные наггетсы (9 шт)",
      price: 600,
      oldPrice: null,
      weight: "180 г",
      badge: "Большая порция",
      badgeColor: "orange",
      isPopular: false,
      isSpicy: false,
      image: "img/dishes/nuggets_9.jpg",
      description: "9 аппетитных хрустящих наггетсов из белого куриного мяса."
    },

    // 5. Фирменные соусы
    {
      id: "sauce-cheese",
      category: "sauces",
      name: "Соус сырный",
      price: 60,
      oldPrice: null,
      weight: "50 г",
      badge: "Чеддер 🧀",
      badgeColor: "gold",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/sauce_cheese.jpg",
      description: "Нежный кремовый соус из благородного сыра чеддер в керамической креманке."
    },
    {
      id: "sauce-garlic",
      category: "sauces",
      name: "Соус чесночный",
      price: 60,
      oldPrice: null,
      weight: "50 г",
      badge: "Авторский 🧄",
      badgeColor: "amber",
      isPopular: true,
      isSpicy: false,
      image: "img/dishes/sauce_garlic.jpg",
      description: "Шелковистый белый соус с душистым чесноком, зеленью и специями по фирменному рецепту шефа."
    },
    {
      id: "sauce-shashlik",
      category: "sauces",
      name: "Соус Шашлычный",
      price: 60,
      oldPrice: null,
      weight: "50 г",
      badge: "Кавказский 🍅",
      badgeColor: "red",
      isPopular: false,
      isSpicy: false,
      image: "img/dishes/sauce_shashlik.jpg",
      description: "Густой соус из спелых томатов с кавказскими травами, кинзой и базиликом к мясу на углях."
    }
  ],

  features: [
    {
      id: "weight",
      title: "Честный вес до 550 г",
      desc: "Каждая порция взвешивается на электронных весах прямо перед отдачей. Плотная мясная и овощная выкладка от первого до последнего укуса.",
      icon: "scale",
      tag: "Реальный вес"
    },
    {
      id: "lavash",
      title: "Лаваш, который не размокает",
      desc: "Специальная техника двухсторонней контактной обжарки на гриле. Лаваш мягкий, хрустящий, не царапает нёбо и удерживает весь сок внутри.",
      icon: "sparkles",
      tag: "Секрет хруста"
    },
    {
      id: "meat",
      title: "Мясо на углях & Халяль",
      desc: "Отборное куриное филе суточного маринования в кавказских травах без кожи и жилок. Обжаривается на открытом огне до идеальной сочности.",
      icon: "flame",
      tag: "100% свежесть"
    },
    {
      id: "hygiene",
      title: "Открытая кухня и чистота",
      desc: "Готовим прямо на ваших глазах строго в одноразовых перчатках. Идеальная чистота рабочих поверхностей и ресторанный санитарный контроль.",
      icon: "shield-check",
      tag: "Стандарт чистоты"
    }
  ],

  reviews: [
    {
      id: "rev-1",
      author: "Софья С.",
      avatar: "https://avatars.mds.yandex.net/get-yapic/64336/0f-8/islands-150",
      rating: 5,
      date: "14 января 2026",
      text: "Самая вкусная шаурма в моей жизни! Лаваш хрустящий, не царапает нёбо и не размокает, начинки много, соусы потрясающие. Очень чисто, вежливый персонал. Теперь только сюда!",
      badge: "Знаток города 8 уровня"
    },
    {
      id: "rev-2",
      author: "Дмитрий В.",
      avatar: "https://avatars.mds.yandex.net/get-yapic/0/0-0/islands-150",
      rating: 5,
      date: "28 декабря 2025",
      text: "Отличная шаурма по-сырному! Сыр реально тянется, мяса очень щедро, а картошечка фри внутри хрустит. Порция XXL гигантская, наелся на весь день.",
      badge: "Знаток города 5 уровня"
    },
    {
      id: "rev-3",
      author: "Анна К.",
      avatar: "https://avatars.mds.yandex.net/get-yapic/31248/0b-4/islands-150",
      rating: 5,
      date: "3 февраля 2026",
      text: "Уютный павильон возле набережной. Брали сувлак и острую мексиканскую — просто восторг! Перчик халапеньо огонь, мясо мягкое, сочное. Рекомендую однозначно!",
      badge: "Знаток города 6 уровня"
    },
    {
      id: "rev-4",
      author: "Максим Г.",
      avatar: "https://avatars.mds.yandex.net/get-yapic/59821/0a-2/islands-150",
      rating: 5,
      date: "19 ноября 2025",
      text: "Чистота кухни сразу бросается в глаза. Повар работает в перчатках, все блестит. Честный вес — взвешивают при тебе. 5 из 5!",
      badge: "Знаток города 9 уровня"
    },
    {
      id: "rev-5",
      author: "Елена Р.",
      avatar: "https://avatars.mds.yandex.net/get-yapic/12940/0c-1/islands-150",
      rating: 5,
      date: "2 декабря 2025",
      text: "Ребята держат планку! Живем на Чайковского, постоянно берем здесь после прогулки. Всегда горячая, ароматная и никогда не подводила.",
      badge: "Местный житель"
    },
    {
      id: "rev-6",
      author: "Артем М.",
      avatar: "https://avatars.mds.yandex.net/get-yapic/45821/0d-9/islands-150",
      rating: 5,
      date: "10 февраля 2026",
      text: "Лучшая шаурма в Центральном Сочи. Соусы не майонезные, а натуральные авторские. Фирменный чесночный соус и шаурма с грибами — ван лав!",
      badge: "Знаток города 7 уровня"
    }
  ]
};
