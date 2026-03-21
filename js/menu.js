// ── VEG MODE ─────────────────────────────────────────────
let vegMode = false;

function toggleVegMode(on) {
  vegMode = on;
  const wrap = document.querySelector('.menu-search-wrap');
  wrap.classList.toggle('veg-mode-on', on);
  const activeFilter = document.querySelector('.cat-btn.active')?.dataset.filter || 'all';
  filterMenu(activeFilter, document.getElementById('menuSearch').value);
}

// ── CATEGORY FILTER ──────────────────────────────────────
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterMenu(btn.dataset.filter, document.getElementById('menuSearch').value);
  });
});

// ── SECTION VISIBILITY ───────────────────────────────────
function updateSectionVisibility() {
  document.querySelectorAll('.menu-section').forEach(sec => {
    const hasVisible = [...sec.querySelectorAll('.ms-item')].some(i => !i.classList.contains('hidden'));
    sec.classList.toggle('hidden', !hasVisible);
  });
}

// ── SEARCH ────────────────────────────────────────────────
function searchMenu(val) {
  const clear = document.getElementById('searchClear');
  clear.style.display = val ? 'block' : 'none';
  const activeFilter = document.querySelector('.cat-btn.active')?.dataset.filter || 'all';
  filterMenu(activeFilter, val);
}

function clearSearch() {
  document.getElementById('menuSearch').value = '';
  document.getElementById('searchClear').style.display = 'none';
  const activeFilter = document.querySelector('.cat-btn.active')?.dataset.filter || 'all';
  filterMenu(activeFilter, '');
}

function filterMenu(category, search) {
  const items = document.querySelectorAll('.ms-item');
  const q = (search || '').toLowerCase().trim();
  let visible = 0;
  items.forEach(item => {
    const matchCat  = category === 'all' || item.dataset.category === category;
    const matchName = !q || item.dataset.name.includes(q);
    const veg       = item.dataset.veg;
    const matchVeg  = veg === 'both' || (vegMode ? veg === 'yes' : true);
    const show = matchCat && matchName && matchVeg;
    item.classList.toggle('hidden', !show);
    if (show) visible++;
  });
  updateSectionVisibility();
  document.getElementById('menuNoResults').style.display = visible === 0 ? 'block' : 'none';
}

// ── SYNC BOTTOM NAV CART COUNT ────────────────────────────
const _origUpdateCartUI = updateCartUI;
updateCartUI = function() {
  _origUpdateCartUI();
  const count = getCartCount();
  const el = document.getElementById('bnavCartCount');
  if (el) {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  }
};

// init hide badge if 0
(function() {
  const el = document.getElementById('bnavCartCount');
  if (el) el.style.display = getCartCount() > 0 ? 'flex' : 'none';
})();

// ── MENU LANGUAGE ─────────────────────────────────────────
const menuLang = {
  en: {
    searchPlaceholder: 'Search dishes...',
    vegLabel: '🌿 Veg',
    catAll: 'All', catChinese: 'Chinese', catStarters: 'Starters', catSoups: 'Soups', catRice: 'Rice',
    noResults: 'No dishes found',
    cartHeader: 'Your Order', cartEmpty: 'Your cart is empty', cartEmptySub: 'Add items from the menu',
    cartTotal: 'Total', placeOrder: 'Place Order',
    orderModalTitle: 'Complete Your Order',
    labelName: 'Your Name', labelPhone: 'Phone Number', labelAddress: 'Delivery Address',
    placeName: 'Enter your full name', placePhone: '10-digit mobile number', placeAddress: 'Enter your full delivery address',
    useLocation: 'Use Location', confirmOrder: 'Confirm Order',
    successTitle: 'Order Placed!', continueBrowsing: 'Continue', waConfirmBtn: 'WhatsApp',
    myOrdersTitle: 'My Orders Today', myOrdersLabel: 'Enter your phone number',
    langBtn: '🌐 हिंदी',
    bnHome: 'Home', bnMenu: 'Menu', bnSearch: 'Search', bnCart: 'Cart', bnProfile: 'Profile',
    secChinese: 'Chinese', secStarters: 'Starters', secSoups: 'Soups', secRice: 'Rice',
    dishes: {
      'chicken noodles':        'Chicken Noodles',
      'veg noodles':            'Veg Noodles',
      'double egg noodles':     'Double Egg Noodles',
      'veg fried rice':         'Veg Fried Rice',
      'egg fried rice':         'Egg Fried Rice',
      'double egg fried rice':  'Double Egg Fried Rice',
      'chicken fried rice':     'Chicken Fried Rice',
      'double egg chicken rice':'Double Egg Chicken Rice',
      'veg manchurian':         'Veg Manchurian',
      'veg 65':                 'Veg 65',
      'chicken manchurian':     'Chicken Manchurian',
      'chilli chicken':         'Chilli Chicken',
      'lollipop':               'Lollipop',
      'chicken 65':             'Chicken 65',
      'omelette':               'Omelette',
      'anda bhurji':            'Anda Bhurji',
      'veg soup':               'Veg Soup',
      'chicken soup':           'Chicken Soup',
      'manchow soup':           'Manchow Soup',
      'veg triple rice':        'Veg Triple Rice',
      'chicken triple rice':    'Chicken Triple Rice'
    }
  },
  hi: {
    searchPlaceholder: 'व्यंजन खोजें...',
    vegLabel: '🌿 वेज',
    catAll: 'सभी', catChinese: 'चाइनीज़', catStarters: 'स्टार्टर', catSoups: 'सूप', catRice: 'राइस',
    noResults: 'कोई व्यंजन नहीं मिला',
    cartHeader: 'आपका ऑर्डर', cartEmpty: 'कार्ट खाली है', cartEmptySub: 'मेनू से आइटम जोड़ें',
    cartTotal: 'कुल', placeOrder: 'ऑर्डर करें',
    orderModalTitle: 'ऑर्डर पूरा करें',
    labelName: 'आपका नाम', labelPhone: 'फोन नंबर', labelAddress: 'डिलीवरी पता',
    placeName: 'अपना पूरा नाम दर्ज करें', placePhone: '10 अंकों का मोबाइल नंबर', placeAddress: 'अपना पूरा डिलीवरी पता दर्ज करें',
    useLocation: 'लोकेशन', confirmOrder: 'ऑर्डर कन्फर्म करें',
    successTitle: 'ऑर्डर हो गया!', continueBrowsing: 'जारी रखें', waConfirmBtn: 'व्हाट्सएप',
    myOrdersTitle: 'आज के मेरे ऑर्डर', myOrdersLabel: 'अपना फोन नंबर दर्ज करें',
    langBtn: '🌐 मराठी',
    bnHome: 'होम', bnMenu: 'मेनू', bnSearch: 'खोजें', bnCart: 'कार्ट', bnProfile: 'प्रोफाइल',
    secChinese: 'चाइनीज़', secStarters: 'स्टार्टर', secSoups: 'सूप', secRice: 'राइस',
    dishes: {
      'chicken noodles':        'चिकन नूडल्स',
      'veg noodles':            'वेज नूडल्स',
      'double egg noodles':     'डबल एग नूडल्स',
      'veg fried rice':         'वेज फ्राइड राइस',
      'egg fried rice':         'एग फ्राइड राइस',
      'double egg fried rice':  'डबल एग फ्राइड राइस',
      'chicken fried rice':     'चिकन फ्राइड राइस',
      'double egg chicken rice':'डबल एग चिकन राइस',
      'veg manchurian':         'वेज मंचूरियन',
      'veg 65':                 'वेज 65',
      'chicken manchurian':     'चिकन मंचूरियन',
      'chilli chicken':         'चिली चिकन',
      'lollipop':               'लॉलीपॉप',
      'chicken 65':             'चिकन 65',
      'omelette':               'ऑमलेट',
      'anda bhurji':            'अंडा भुर्जी',
      'veg soup':               'वेज सूप',
      'chicken soup':           'चिकन सूप',
      'manchow soup':           'मंचो सूप',
      'veg triple rice':        'वेज ट्रिपल राइस',
      'chicken triple rice':    'चिकन ट्रिपल राइस'
    }
  },
  mr: {
    searchPlaceholder: 'पदार्थ शोधा...',
    vegLabel: '🌿 शाकाहारी',
    catAll: 'सर्व', catChinese: 'चायनीज', catStarters: 'स्टार्टर', catSoups: 'सूप', catRice: 'भात',
    noResults: 'कोणताही पदार्थ सापडला नाही',
    cartHeader: 'तुमची ऑर्डर', cartEmpty: 'कार्ट रिकामी आहे', cartEmptySub: 'मेनूमधून आयटम जोडा',
    cartTotal: 'एकूण', placeOrder: 'ऑर्डर करा',
    orderModalTitle: 'ऑर्डर पूर्ण करा',
    labelName: 'तुमचे नाव', labelPhone: 'फोन नंबर', labelAddress: 'डिलिव्हरी पत्ता',
    placeName: 'तुमचे पूर्ण नाव टाका', placePhone: '10 अंकी मोबाइल नंबर', placeAddress: 'तुमचा पूर्ण डिलिव्हरी पत्ता टाका',
    useLocation: 'लोकेशन', confirmOrder: 'ऑर्डर कन्फर्म करा',
    successTitle: 'ऑर्डर झाली!', continueBrowsing: 'पुढे जा', waConfirmBtn: 'व्हॉट्सअ‍ॅप',
    myOrdersTitle: 'आजच्या माझ्या ऑर्डर', myOrdersLabel: 'तुमचा फोन नंबर टाका',
    langBtn: '🌐 English',
    bnHome: 'होम', bnMenu: 'मेनू', bnSearch: 'शोधा', bnCart: 'कार्ट', bnProfile: 'प्रोफाइल',
    secChinese: 'चायनीज', secStarters: 'स्टार्टर', secSoups: 'सूप', secRice: 'भात',
    dishes: {
      'chicken noodles':        'चिकन नूडल्स',
      'veg noodles':            'व्हेज नूडल्स',
      'double egg noodles':     'डबल एग नूडल्स',
      'veg fried rice':         'व्हेज फ्राइड राइस',
      'egg fried rice':         'एग फ्राइड राइस',
      'double egg fried rice':  'डबल एग फ्राइड राइस',
      'chicken fried rice':     'चिकन फ्राइड राइस',
      'double egg chicken rice':'डबल एग चिकन राइस',
      'veg manchurian':         'व्हेज मंचुरियन',
      'veg 65':                 'व्हेज 65',
      'chicken manchurian':     'चिकन मंचुरियन',
      'chilli chicken':         'चिली चिकन',
      'lollipop':               'लॉलीपॉप',
      'chicken 65':             'चिकन 65',
      'omelette':               'ऑम्लेट',
      'anda bhurji':            'अंडा भुर्जी',
      'veg soup':               'व्हेज सूप',
      'chicken soup':           'चिकन सूप',
      'manchow soup':           'मंचो सूप',
      'veg triple rice':        'व्हेज ट्रिपल राइस',
      'chicken triple rice':    'चिकन ट्रिपल राइस'
    }
  }
};

function applyMenuLanguage(lang) {
  const t = menuLang[lang] || menuLang['en'];
  const q = sel => document.querySelector(sel);
  const qa = sel => document.querySelectorAll(sel);

  const searchInput = document.getElementById('menuSearch');
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;

  const vegLabel = q('.veg-toggle-label');
  if (vegLabel) vegLabel.textContent = t.vegLabel;

  const catBtns = qa('.cat-btn span:last-child');
  ['catAll','catChinese','catStarters','catSoups','catRice'].forEach((k, i) => {
    if (catBtns[i]) catBtns[i].textContent = t[k];
  });

  // Translate section headings
  document.querySelectorAll('.menu-section').forEach(sec => {
    const key = 'sec' + sec.dataset.section.charAt(0).toUpperCase() + sec.dataset.section.slice(1);
    const span = sec.querySelector('.ms-heading span:last-child');
    if (span && t[key]) span.textContent = t[key];
  });

  // Translate dish names
  document.querySelectorAll('.ms-item').forEach(item => {
    const key = item.dataset.name;
    const nameEl = item.querySelector('.ms-name');
    if (nameEl && t.dishes[key]) nameEl.textContent = t.dishes[key];
  });

  const noRes = q('.menu-no-results p');
  if (noRes) noRes.textContent = t.noResults;

  const cartH = q('.cart-header h3');
  if (cartH) cartH.innerHTML = `<i class="fas fa-shopping-bag"></i> ${t.cartHeader}`;
  const cartEmptyP = q('.cart-empty p');
  if (cartEmptyP) cartEmptyP.textContent = t.cartEmpty;
  const cartEmptySpan = q('.cart-empty span');
  if (cartEmptySpan) cartEmptySpan.textContent = t.cartEmptySub;
  const cartTotalLabel = q('.cart-total span:first-child');
  if (cartTotalLabel) cartTotalLabel.textContent = t.cartTotal;
  const placeOrderBtn = q('.cart-footer .btn-primary');
  if (placeOrderBtn) placeOrderBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${t.placeOrder}`;

  const orderModalTitle = q('#orderModal .modal-header h3');
  if (orderModalTitle) orderModalTitle.innerHTML = `<i class="fas fa-receipt"></i> ${t.orderModalTitle}`;
  const formGroups = qa('#orderForm .form-group');
  if (formGroups[0]) formGroups[0].querySelector('label').innerHTML = `<i class="fas fa-user"></i> ${t.labelName}`;
  if (formGroups[1]) formGroups[1].querySelector('label').innerHTML = `<i class="fas fa-phone"></i> ${t.labelPhone}`;
  if (formGroups[2]) {
    const addrLabel = formGroups[2].querySelector('label');
    const locBtn = addrLabel.querySelector('.loc-btn');
    if (locBtn) locBtn.innerHTML = `<i class="fas fa-crosshairs"></i> ${t.useLocation}`;
    addrLabel.querySelector('span').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${t.labelAddress}`;
  }
  const custName = document.getElementById('custName');
  if (custName) custName.placeholder = t.placeName;
  const custPhone = document.getElementById('custPhone');
  if (custPhone) custPhone.placeholder = t.placePhone;
  const custAddress = document.getElementById('custAddress');
  if (custAddress) custAddress.placeholder = t.placeAddress;
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) submitBtn.innerHTML = `<i class="fas fa-check-circle"></i> ${t.confirmOrder}`;

  const successH3 = q('.success-modal h3');
  if (successH3) successH3.textContent = t.successTitle;
  const contBtn = q('.success-btns .btn-primary');
  if (contBtn) contBtn.textContent = t.continueBrowsing;
  const waBtn = document.getElementById('waConfirm');
  if (waBtn) waBtn.innerHTML = `<i class="fab fa-whatsapp"></i> ${t.waConfirmBtn}`;

  const myOrdersH3 = q('#myOrdersModal .modal-header h3');
  if (myOrdersH3) myOrdersH3.innerHTML = `<i class="fas fa-receipt"></i> ${t.myOrdersTitle}`;
  const myOrdersLbl = q('#myOrdersOverlay .form-group label');
  if (myOrdersLbl) myOrdersLbl.innerHTML = `<i class="fas fa-phone"></i> ${t.myOrdersLabel}`;

  const langBtn = document.getElementById('menuLangBtn');
  if (langBtn) langBtn.textContent = t.langBtn;

  const bnLabels = qa('.bnav-item span:not(.bnav-cart-count)');
  ['bnHome','bnMenu','bnSearch','bnCart','bnProfile'].forEach((k, i) => {
    if (bnLabels[i]) bnLabels[i].textContent = t[k];
  });
}

function toggleMenuLanguage() {
  const cycle = { en: 'hi', hi: 'mr', mr: 'en' };
  const next = cycle[localStorage.getItem('lff_lang') || 'en'] || 'hi';
  localStorage.setItem('lff_lang', next);
  applyMenuLanguage(next);
}

// Apply saved language on load
(function() {
  const saved = localStorage.getItem('lff_lang') || 'en';
  if (saved !== 'en') applyMenuLanguage(saved);
})();
