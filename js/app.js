// Fashion Store - Vanilla JavaScript Application
document.addEventListener('DOMContentLoaded', () => {
  // LocalStorage cart persistence key
  const CART_STORAGE_KEY = 'fashion_store_cart_v3';

  function loadCartFromStorage() {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      {
        id: 'casual-jacket',
        name: 'Casual Washed Denim Jacket',
        price: 2499,
        image: 'assets/product-casual-jacket.jpg',
        quantity: 1,
        size: 'L',
        color: 'Indigo Blue'
      },
      {
        id: 'floral-dress',
        name: 'Botanical Bloom Midi Dress',
        price: 1999,
        image: 'assets/product-floral-dress.jpg',
        quantity: 1,
        size: 'M',
        color: 'Blush Coral'
      },
      {
        id: 'polo-tshirt',
        name: 'Mercerized Cotton Polo Shirt',
        price: 899,
        image: 'assets/product-polo-tshirt.jpg',
        quantity: 1,
        size: 'M',
        color: 'Forest Green'
      }
    ];
  }

  let cart = loadCartFromStorage();

  function saveCartToStorage() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {}
  }

  let wishlist = new Set();

  // Elements
  const cartBadge = document.getElementById('cart-badge');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const openCartBtn = document.getElementById('open-cart-btn');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const emptyCartMsg = document.getElementById('empty-cart-message');
  const cartFooter = document.getElementById('cart-footer');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const searchInput = document.getElementById('search-input');
  const productCards = document.querySelectorAll('.product-card');

  // Hero carousel slides data
  const heroSlides = [
    {
      subtitle: 'NEW COLLECTION',
      title: 'Trendy Fashion',
      highlight: 'for Every Style',
      desc: 'Discover the latest outfits, accessories and more for men, women and kids.'
    },
    {
      subtitle: 'SUMMER VIBES',
      title: 'Vibrant Looks',
      highlight: 'for Every Season',
      desc: 'Stay cool and trendy with lightweight fabrics and bold statement pieces.'
    },
    {
      subtitle: 'EXCLUSIVE DEALS',
      title: 'Premium Styles',
      highlight: 'for Everyone',
      desc: 'Shop curated collections crafted for comfort, durability, and runway elegance.'
    }
  ];

  let currentHeroSlide = 0;
  const heroSubtitleEl = document.getElementById('hero-subtitle');
  const heroTitleEl = document.getElementById('hero-title');
  const heroHighlightEl = document.getElementById('hero-highlight');
  const heroDescEl = document.getElementById('hero-desc');
  const heroDots = document.querySelectorAll('.hero-dot');
  const heroCounterNum = document.getElementById('hero-counter-num');
  const heroPrevBtn = document.getElementById('hero-prev-btn');
  const heroNextBtn = document.getElementById('hero-next-btn');
  const heroCanvas = document.querySelector('.hero-canvas');

  function updateHeroSlide(index) {
    const prevSlide = currentHeroSlide;
    currentHeroSlide = index;
    const slide = heroSlides[index];

    // Smooth fade transition for text
    const heroTextContainer = document.getElementById('hero-text-container');
    if (heroTextContainer) {
      heroTextContainer.style.opacity = '0.35';
      setTimeout(() => {
        if (heroSubtitleEl) heroSubtitleEl.textContent = slide.subtitle;
        if (heroTitleEl) heroTitleEl.textContent = slide.title;
        if (heroHighlightEl) heroHighlightEl.textContent = slide.highlight;
        if (heroDescEl) heroDescEl.textContent = slide.desc;
        heroTextContainer.style.opacity = '1';
      }, 160);
    }

    // Smooth slideshow transition for collection images
    const heroImageSlides = document.querySelectorAll('.hero-image-slide');
    heroImageSlides.forEach((imgSlide, idx) => {
      if (idx === index) {
        imgSlide.classList.remove('exit-left');
        imgSlide.classList.add('active');
      } else {
        if (idx === prevSlide) {
          imgSlide.classList.add('exit-left');
        } else {
          imgSlide.classList.remove('exit-left');
        }
        imgSlide.classList.remove('active');
      }
    });

    // Update Counter badge
    if (heroCounterNum) {
      heroCounterNum.textContent = `0${index + 1}`;
    }

    // Update dots
    heroDots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('bg-purple-600', 'w-6');
        dot.classList.remove('bg-purple-200', 'w-2.5');
      } else {
        dot.classList.remove('bg-purple-600', 'w-6');
        dot.classList.add('bg-purple-200', 'w-2.5');
      }
    });
  }

  heroDots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.index, 10);
      updateHeroSlide(idx);
      resetHeroTimer();
    });
  });

  if (heroPrevBtn) {
    heroPrevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const prevIndex = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
      updateHeroSlide(prevIndex);
      resetHeroTimer();
    });
  }

  if (heroNextBtn) {
    heroNextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const nextIndex = (currentHeroSlide + 1) % heroSlides.length;
      updateHeroSlide(nextIndex);
      resetHeroTimer();
    });
  }

  // Auto advance hero slider every 5 seconds (only when heroCanvas is present)
  let heroTimer = null;
  if (heroCanvas) {
    heroTimer = setInterval(() => {
      const nextIndex = (currentHeroSlide + 1) % heroSlides.length;
      updateHeroSlide(nextIndex);
    }, 5000);
  }

  function resetHeroTimer() {
    if (!heroCanvas) return;
    if (heroTimer) clearInterval(heroTimer);
    heroTimer = setInterval(() => {
      const nextIndex = (currentHeroSlide + 1) % heroSlides.length;
      updateHeroSlide(nextIndex);
    }, 5000);
  }

  // Pause slideshow on mouse hover for comfortable browsing
  if (heroCanvas) {
    heroCanvas.addEventListener('mouseenter', () => clearInterval(heroTimer));
    heroCanvas.addEventListener('mouseleave', () => resetHeroTimer());
  }

  // Cart functions
  function updateCartUI() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (cartBadge) {
      cartBadge.textContent = totalItems;
      cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Render cart items
    if (cart.length === 0) {
      if (emptyCartMsg) emptyCartMsg.classList.remove('hidden');
      if (cartFooter) cartFooter.classList.add('hidden');
      if (cartItemsContainer) cartItemsContainer.innerHTML = '';
      return;
    }

    if (emptyCartMsg) emptyCartMsg.classList.add('hidden');
    if (cartFooter) cartFooter.classList.remove('hidden');

    let subtotal = 0;
    let itemsHTML = '';

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      const sizeColorStr = [item.size ? `Size: ${item.size}` : '', item.color || ''].filter(Boolean).join(' • ');
      itemsHTML += `
        <div class="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0" data-id="${item.id}" data-size="${item.size || 'M'}">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-contain p-1 rounded-xl border border-gray-100 bg-gray-50 flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-gray-900 truncate">${item.name}</h4>
            <div class="text-xs text-gray-500 mt-0.5">${sizeColorStr ? sizeColorStr + ' • ' : ''}₹${item.price.toLocaleString('en-IN')}</div>
            <div class="flex items-center gap-3 mt-2">
              <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                <button class="cart-qty-btn px-2 py-0.5 text-gray-500 hover:bg-gray-100 text-xs font-bold" data-action="decrease" data-id="${item.id}" data-size="${item.size || 'M'}">−</button>
                <span class="px-2.5 py-0.5 text-xs font-semibold text-gray-800">${item.quantity}</span>
                <button class="cart-qty-btn px-2 py-0.5 text-gray-500 hover:bg-gray-100 text-xs font-bold" data-action="increase" data-id="${item.id}" data-size="${item.size || 'M'}">+</button>
              </div>
              <button class="cart-remove-btn text-xs text-red-500 hover:text-red-700 font-medium" data-id="${item.id}" data-size="${item.size || 'M'}">Remove</button>
            </div>
          </div>
          <div class="text-sm font-bold text-gray-900 whitespace-nowrap">
            ₹${itemTotal.toLocaleString('en-IN')}
          </div>
        </div>
      `;
    });

    if (cartItemsContainer) cartItemsContainer.innerHTML = itemsHTML;
    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

    // Add event listeners to quantity and remove buttons
    document.querySelectorAll('.cart-qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const size = e.currentTarget.dataset.size || 'M';
        const action = e.currentTarget.dataset.action;
        const item = cart.find(i => i.id === id && (i.size || 'M') === size);
        if (item) {
          if (action === 'increase') {
            item.quantity += 1;
          } else if (action === 'decrease') {
            item.quantity -= 1;
            if (item.quantity <= 0) {
              cart = cart.filter(i => !(i.id === id && (i.size || 'M') === size));
            }
          }
          saveCartToStorage();
          updateCartUI();
        }
      });
    });

    document.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const size = e.currentTarget.dataset.size || 'M';
        const removed = cart.find(i => i.id === id && (i.size || 'M') === size);
        cart = cart.filter(i => !(i.id === id && (i.size || 'M') === size));
        saveCartToStorage();
        updateCartUI();
        if (removed) showToast(`Removed ${removed.name} from cart`);
      });
    });
  }

  function toggleCart(open = true) {
    if (open) {
      cartDrawer.classList.add('active');
      cartOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      cartDrawer.classList.remove('active');
      cartOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (openCartBtn) openCartBtn.addEventListener('click', () => toggleCart(true));
  if (closeCartBtn) closeCartBtn.addEventListener('click', () => toggleCart(false));
  if (cartOverlay) cartOverlay.addEventListener('click', () => toggleCart(false));

  // Expose global cart functions for PDP & Quick View
  function addItemToCart(item, openDrawer = true) {
    const size = item.size || 'M';
    const color = item.color || '';
    const existing = cart.find(i => i.id === item.id && (i.size || 'M') === size && (i.color || '') === color);
    if (existing) {
      existing.quantity += (item.quantity || 1);
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity || 1,
        size: size,
        color: color
      });
    }
    saveCartToStorage();
    updateCartUI();
    if (openDrawer) {
      toggleCart(true);
    }
    showToast(`Added ${item.name} (${size}) to cart!`);
  }

  window.addItemToCart = addItemToCart;
  window.toggleCart = toggleCart;

  // Add to cart buttons on product cards
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      const id = card.dataset.id;
      const name = card.dataset.name;
      const price = parseInt(card.dataset.price, 10);
      const image = card.dataset.image;

      // Pulse animation
      btn.classList.add('scale-125');
      setTimeout(() => btn.classList.remove('scale-125'), 200);

      addItemToCart({
        id,
        name,
        price,
        image,
        quantity: 1,
        size: 'M'
      });
    });
  });

  // Wishlist heart buttons
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      const id = card.dataset.id;
      const name = card.dataset.name;

      if (wishlist.has(id)) {
        wishlist.delete(id);
        btn.classList.remove('active');
        showToast(`Removed ${name} from Wishlist`);
      } else {
        wishlist.add(id);
        btn.classList.add('active');
        showToast(`Added ${name} to Wishlist! ❤️`);
      }
    });
  });

  // Category filtering state & elements
  let currentCategory = 'all';
  const categoryCards = document.querySelectorAll('.category-card');
  const categoryFilterBar = document.getElementById('category-filter-bar');
  const activeCategoryBadge = document.getElementById('active-category-badge');
  const activeCategoryText = document.getElementById('active-category-text');
  const activeCategoryCount = document.getElementById('active-category-count');
  const resetFilterBtn = document.getElementById('reset-filter-btn');
  const featuredViewAllBtn = document.getElementById('featured-view-all-btn');
  const categoryFilterClearPill = document.getElementById('category-filter-clear-pill');
  const categoryFilterPillText = document.getElementById('category-filter-pill-text');
  const productsCountBadge = document.getElementById('products-count-badge');
  const noResultsResetBtn = document.getElementById('no-results-reset-btn');
  const noResultsEl = document.getElementById('no-search-results');

  // All Categories Explorer Modal elements
  const allCategoriesModal = document.getElementById('all-categories-modal');
  const viewAllCategoriesBtn = document.getElementById('view-all-categories-btn');
  const closeCategoriesModalBtn = document.getElementById('close-categories-modal-btn');
  const modalCloseFooterBtn = document.getElementById('modal-close-footer-btn');
  const modalShowAllProductsBtn = document.getElementById('modal-show-all-products-btn');
  const categoryModalSearch = document.getElementById('category-modal-search');
  const modalCatCards = document.querySelectorAll('.modal-cat-card');

  // Core Category & Search Filtering Function
  function filterProducts(category = currentCategory, searchQuery = '', smoothScroll = false) {
    currentCategory = category;
    const cleanQuery = searchQuery.toLowerCase().trim();
    let visibleCount = 0;

    // 1. Update Category Card Active States
    categoryCards.forEach(card => {
      const cardCat = card.dataset.category;
      if (currentCategory !== 'all' && cardCat === currentCategory) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // 2. Update Category Pill in "Shop by Category" Header
    if (categoryFilterClearPill) {
      if (currentCategory !== 'all') {
        categoryFilterClearPill.classList.remove('hidden');
        categoryFilterClearPill.classList.add('inline-flex');
        if (categoryFilterPillText) categoryFilterPillText.textContent = currentCategory;
      } else {
        categoryFilterClearPill.classList.add('hidden');
        categoryFilterClearPill.classList.remove('inline-flex');
      }
    }

    // 3. Update Category Filter Banner in Featured Products
    if (categoryFilterBar) {
      if (currentCategory !== 'all') {
        categoryFilterBar.classList.remove('hidden');
        categoryFilterBar.classList.add('flex');
        if (activeCategoryText) activeCategoryText.textContent = currentCategory;
      } else {
        categoryFilterBar.classList.add('hidden');
        categoryFilterBar.classList.remove('flex');
      }
    }

    // 4. Filter Product Cards in the Grid
    const allCurrentCards = document.querySelectorAll('.product-card');
    allCurrentCards.forEach(card => {
      const cardCat = card.dataset.category || '';
      const name = (card.dataset.name || '').toLowerCase();
      const price = (card.dataset.price || '').toLowerCase();

      const matchesCat = (currentCategory === 'all' || cardCat.toLowerCase() === currentCategory.toLowerCase());
      const matchesSearch = (!cleanQuery || name.includes(cleanQuery) || price.includes(cleanQuery));

      if (matchesCat && matchesSearch) {
        card.classList.remove('hidden');
        card.classList.remove('filter-anim-enter');
        void card.offsetWidth; // Force DOM reflow to re-trigger smooth animation
        card.classList.add('filter-anim-enter');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    // 5. Update Count Badges
    if (productsCountBadge) {
      productsCountBadge.textContent = `${visibleCount} ${visibleCount === 1 ? 'Item' : 'Items'}`;
    }
    if (activeCategoryCount) {
      activeCategoryCount.textContent = `(${visibleCount} ${visibleCount === 1 ? 'product' : 'products'} found)`;
    }

    // 6. Handle Empty State
    if (noResultsEl) {
      if (visibleCount === 0) {
        noResultsEl.classList.remove('hidden');
      } else {
        noResultsEl.classList.add('hidden');
      }
    }

    // 7. Optional Smooth Scroll to Featured Products
    if (smoothScroll) {
      const section = document.getElementById('featured-products-section');
      if (section) {
        const topOffset = section.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }
    }
  }

  // Live product search listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterProducts(currentCategory, e.target.value, false);
    });
  }

  // Category cards click interaction (toggle or select)
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.category;
      if (currentCategory === cat) {
        // Deselect and show all
        filterProducts('all', searchInput ? searchInput.value : '', false);
        showToast('Filter cleared • Showing all products');
      } else {
        // Apply category filter and scroll smoothly
        filterProducts(cat, searchInput ? searchInput.value : '', true);
        showToast(`Filtered by ${cat}`);
      }
    });
  });

  // Clear / Reset buttons
  if (categoryFilterClearPill) {
    categoryFilterClearPill.addEventListener('click', () => {
      filterProducts('all', searchInput ? searchInput.value : '', false);
      showToast('Showing all categories');
    });
  }

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      filterProducts('all', searchInput ? searchInput.value : '', false);
      showToast('Filter cleared • Showing all products');
    });
  }

  if (featuredViewAllBtn) {
    featuredViewAllBtn.addEventListener('click', () => {
      filterProducts('all', '', true);
      if (searchInput) searchInput.value = '';
      showToast('Showing all 8 products');
    });
  }

  if (noResultsResetBtn) {
    noResultsResetBtn.addEventListener('click', () => {
      filterProducts('all', '', false);
      if (searchInput) searchInput.value = '';
      showToast('Reset to all products');
    });
  }

  // Navbar category quick filter links
  document.querySelectorAll('.nav-cat-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.dataset.category;
      if (cat) {
        filterProducts(cat, '', true);
        showToast(`Navigated to ${cat}`);
      }
    });
  });

  // ================= ALL CATEGORIES MODAL LOGIC =================
  function openCategoriesModal() {
    if (allCategoriesModal) {
      allCategoriesModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Reset search in modal
      if (categoryModalSearch) {
        categoryModalSearch.value = '';
        modalCatCards.forEach(card => card.classList.remove('hidden'));
        setTimeout(() => categoryModalSearch.focus(), 200);
      }
    }
  }

  function closeCategoriesModal() {
    if (allCategoriesModal) {
      allCategoriesModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (viewAllCategoriesBtn) {
    viewAllCategoriesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCategoriesModal();
    });
  }

  if (closeCategoriesModalBtn) {
    closeCategoriesModalBtn.addEventListener('click', closeCategoriesModal);
  }

  if (modalCloseFooterBtn) {
    modalCloseFooterBtn.addEventListener('click', closeCategoriesModal);
  }

  if (allCategoriesModal) {
    allCategoriesModal.addEventListener('click', (e) => {
      if (e.target === allCategoriesModal) {
        closeCategoriesModal();
      }
    });
  }

  // Keyboard Escape to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (allCategoriesModal && allCategoriesModal.classList.contains('active')) {
        closeCategoriesModal();
      }
    }
  });

  // Click any category card inside the modal
  modalCatCards.forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.category;
      closeCategoriesModal();
      if (cat) {
        filterProducts(cat, '', true);
        showToast(`Showing ${cat} Collection`);
      }
    });
  });

  // Modal "Show All 8 Products" button
  if (modalShowAllProductsBtn) {
    modalShowAllProductsBtn.addEventListener('click', () => {
      closeCategoriesModal();
      filterProducts('all', '', true);
      showToast('Showing all products');
    });
  }

  // Search filter inside the All Categories Modal
  if (categoryModalSearch) {
    categoryModalSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      modalCatCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  }

  // Mobile Menu Toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Toast notification helper
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg class="w-5 h-5 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="text-sm font-medium">${message}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 2800);
  }

  // ================= PAYMENT GATEWAY & CHECKOUT SYSTEM =================
  const proceedCheckoutBtns = [
    document.getElementById('proceed-checkout-btn'),
    document.getElementById('open-checkout-modal-btn')
  ].filter(Boolean);
  const checkoutModalOverlay = document.getElementById('checkout-modal-overlay');
  const closeCheckoutModalBtn = document.getElementById('close-checkout-modal-btn');
  const checkoutForm = document.getElementById('checkout-form');
  const checkoutSubtotalVal = document.getElementById('checkout-subtotal-val');
  const checkoutTotalVal = document.getElementById('checkout-total-val');
  const btnPayText = document.getElementById('btn-pay-text');
  const confirmPaymentBtn = document.getElementById('confirm-payment-btn');

  const successModalOverlay = document.getElementById('success-modal-overlay');
  const continueShoppingBtn = document.getElementById('continue-shopping-btn');
  const successOrderId = document.getElementById('success-order-id');
  const successPaymentMethod = document.getElementById('success-payment-method');
  const successAmount = document.getElementById('success-amount');
  const successPhone = document.getElementById('success-phone');

  const paymentOptionCards = document.querySelectorAll('.payment-option-card');
  const methodPanels = {
    bkash: document.getElementById('method-panel-bkash'),
    nagad: document.getElementById('method-panel-nagad'),
    card: document.getElementById('method-panel-card'),
    cod: document.getElementById('method-panel-cod')
  };

  let selectedPaymentMethod = 'bkash';

  function getCartSubtotal() {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  function updatePaymentButtonLabel() {
    const total = getCartSubtotal();
    const formatted = `₹${total.toLocaleString('en-IN')}`;
    
    if (checkoutSubtotalVal) checkoutSubtotalVal.textContent = formatted;
    if (checkoutTotalVal) checkoutTotalVal.textContent = formatted;

    if (!btnPayText) return;

    switch (selectedPaymentMethod) {
      case 'bkash':
        btnPayText.textContent = `Pay with bKash ${formatted}`;
        break;
      case 'nagad':
        btnPayText.textContent = `Pay with Nagad ${formatted}`;
        break;
      case 'card':
        btnPayText.textContent = `Pay with Debit Card ${formatted}`;
        break;
      case 'cod':
        btnPayText.textContent = `Confirm Cash on Delivery (${formatted})`;
        break;
      default:
        btnPayText.textContent = `Confirm & Pay ${formatted}`;
    }
  }

  function openCheckoutModal() {
    if (cart.length === 0) {
      showToast('Your cart is empty! Add products first.');
      return;
    }
    toggleCart(false); // Close cart drawer
    updatePaymentButtonLabel();
    if (checkoutModalOverlay) {
      checkoutModalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCheckoutModal() {
    if (checkoutModalOverlay) {
      checkoutModalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  window.openCheckoutModal = openCheckoutModal;
  window.closeCheckoutModal = closeCheckoutModal;
  window.showToast = showToast;

  proceedCheckoutBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', openCheckoutModal);
  });

  if (closeCheckoutModalBtn) {
    closeCheckoutModalBtn.addEventListener('click', closeCheckoutModal);
  }

  if (checkoutModalOverlay) {
    checkoutModalOverlay.addEventListener('click', (e) => {
      if (e.target === checkoutModalOverlay) closeCheckoutModal();
    });
  }

  // Payment method selection cards
  paymentOptionCards.forEach(card => {
    card.addEventListener('click', () => {
      const method = card.dataset.method;
      selectedPaymentMethod = method;

      // Update card active states
      paymentOptionCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      // Show matching subpanel
      Object.keys(methodPanels).forEach(key => {
        if (methodPanels[key]) {
          if (key === method) {
            methodPanels[key].classList.remove('hidden');
          } else {
            methodPanels[key].classList.add('hidden');
          }
        }
      });

      updatePaymentButtonLabel();
    });
  });

  // Card input mask formatters
  const cardNumberInput = document.getElementById('card-number');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      val = val.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = val;
    });
  }

  const cardExpiryInput = document.getElementById('card-expiry');
  if (cardExpiryInput) {
    cardExpiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 3) {
        val = val.substring(0, 2) + ' / ' + val.substring(2);
      }
      e.target.value = val;
    });
  }

  // Checkout form submit
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const custName = document.getElementById('cust-name').value.trim();
      const custPhone = document.getElementById('cust-phone').value.trim();
      const custAddress = document.getElementById('cust-address').value.trim();

      if (!custName || !custPhone || !custAddress) {
        showToast('Please fill in your name, phone number, and delivery address.');
        return;
      }

      // Method specific validations
      if (selectedPaymentMethod === 'bkash') {
        const bkashNum = document.getElementById('bkash-number')?.value.trim();
        if (!bkashNum) {
          showToast('Please enter your bKash mobile number.');
          return;
        }
      } else if (selectedPaymentMethod === 'nagad') {
        const nagadNum = document.getElementById('nagad-number')?.value.trim();
        if (!nagadNum) {
          showToast('Please enter your Nagad mobile number.');
          return;
        }
      } else if (selectedPaymentMethod === 'card') {
        const cardNum = document.getElementById('card-number')?.value.trim();
        const cardExpiry = document.getElementById('card-expiry')?.value.trim();
        const cardCvv = document.getElementById('card-cvv')?.value.trim();
        if (!cardNum || !cardExpiry || !cardCvv) {
          showToast('Please fill in your card details (Number, Expiry, CVV).');
          return;
        }
      }

      // Show processing spinner state
      if (confirmPaymentBtn) {
        confirmPaymentBtn.disabled = true;
        confirmPaymentBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Authorizing ${selectedPaymentMethod.toUpperCase()}...</span>
        `;
      }

      // Simulate payment gateway processing
      setTimeout(() => {
        closeCheckoutModal();

        // Populate success modal
        const randomOrderNum = Math.floor(100000 + Math.random() * 900000);
        const methodNames = {
          bkash: 'bKash (Paid)',
          nagad: 'Nagad (Paid)',
          card: 'Debit Card (Authorized)',
          cod: 'Cash on Delivery (Pending)'
        };

        if (successOrderId) successOrderId.textContent = `#FS-2026-${randomOrderNum}`;
        if (successPaymentMethod) successPaymentMethod.textContent = methodNames[selectedPaymentMethod] || selectedPaymentMethod;
        if (successAmount) successAmount.textContent = `₹${getCartSubtotal().toLocaleString('en-IN')}`;
        if (successPhone) successPhone.textContent = custPhone;

        if (successModalOverlay) {
          successModalOverlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }

        // Reset cart and UI
        cart = [];
        updateCartUI();

        // Reset submit button state
        if (confirmPaymentBtn) {
          confirmPaymentBtn.disabled = false;
          confirmPaymentBtn.innerHTML = `
            <span id="btn-pay-text">Confirm & Pay</span>
            <span class="text-base">→</span>
          `;
        }

        showToast('Payment successful! Order confirmed.');
      }, 1200);
    });
  }

  // Continue shopping button
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => {
      if (successModalOverlay) successModalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ================= MODERN QUICK VIEW MODAL LOGIC (index.html) =================
  const quickViewModal = document.getElementById('quick-view-modal');
  const closeQuickViewBtn = document.getElementById('close-quick-view-btn');
  const qvMainImage = document.getElementById('qv-main-image');
  const qvBadge = document.getElementById('qv-badge');
  const qvCategory = document.getElementById('qv-category');
  const qvSku = document.getElementById('qv-sku');
  const qvTitle = document.getElementById('quick-view-title');
  const qvTagline = document.getElementById('qv-tagline');
  const qvPrice = document.getElementById('qv-price');
  const qvOrigPrice = document.getElementById('qv-orig-price');
  const qvDiscount = document.getElementById('qv-discount');
  const qvRating = document.getElementById('qv-rating');
  const qvReviews = document.getElementById('qv-reviews');
  const qvColorName = document.getElementById('qv-color-name');
  const qvColorsContainer = document.getElementById('qv-colors');
  const qvSizeName = document.getElementById('qv-size-name');
  const qvSizesContainer = document.getElementById('qv-sizes');
  const qvThumbnailsContainer = document.getElementById('qv-thumbnails');
  const qvQtyMinus = document.getElementById('qv-qty-minus');
  const qvQtyPlus = document.getElementById('qv-qty-plus');
  const qvQtyInput = document.getElementById('qv-qty-input');
  const qvAddToCartBtn = document.getElementById('qv-add-to-cart-btn');
  const qvFullPageLink = document.getElementById('qv-full-page-link');

  let qvCurrentProduct = null;
  let qvSelectedSize = 'M';
  let qvSelectedColor = '';
  let qvQuantity = 1;

  function openQuickView(productId) {
    if (!window.PRODUCTS_DATA || !window.PRODUCTS_DATA[productId]) return;
    qvCurrentProduct = window.PRODUCTS_DATA[productId];
    qvSelectedSize = qvCurrentProduct.defaultSize || qvCurrentProduct.sizes[0] || 'M';
    qvSelectedColor = qvCurrentProduct.colors[0]?.name || '';
    qvQuantity = 1;

    if (qvMainImage) qvMainImage.src = qvCurrentProduct.mainImage;
    if (qvBadge) qvBadge.textContent = qvCurrentProduct.badge;
    if (qvCategory) qvCategory.textContent = qvCurrentProduct.category;
    if (qvSku) qvSku.textContent = `SKU: ${qvCurrentProduct.sku}`;
    if (qvTitle) qvTitle.textContent = qvCurrentProduct.name;
    if (qvTagline) qvTagline.textContent = qvCurrentProduct.tagline;
    if (qvPrice) qvPrice.textContent = `₹${qvCurrentProduct.price.toLocaleString('en-IN')}`;
    if (qvOrigPrice) qvOrigPrice.textContent = `₹${qvCurrentProduct.originalPrice.toLocaleString('en-IN')}`;
    if (qvDiscount) qvDiscount.textContent = qvCurrentProduct.discount;
    if (qvRating) qvRating.textContent = qvCurrentProduct.rating.toFixed(1);
    if (qvReviews) qvReviews.textContent = `(${qvCurrentProduct.reviewCount} reviews)`;

    if (qvQtyInput) qvQtyInput.value = qvQuantity;

    // Render Quick View Thumbnails
    if (qvThumbnailsContainer) {
      qvThumbnailsContainer.innerHTML = qvCurrentProduct.gallery.map((img, idx) => `
        <button type="button" class="qv-thumb w-14 h-14 rounded-xl border-2 overflow-hidden bg-gray-50 flex-shrink-0 transition p-0.5 ${idx === 0 ? 'border-brand-600 ring-2 ring-brand-500/20 shadow-xs' : 'border-gray-200 opacity-70 hover:opacity-100'}" data-img="${img}">
          <img src="${img}" class="w-full h-full object-contain pointer-events-none" />
        </button>
      `).join('');

      qvThumbnailsContainer.querySelectorAll('.qv-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
          if (qvMainImage) qvMainImage.src = thumb.dataset.img;
          qvThumbnailsContainer.querySelectorAll('.qv-thumb').forEach(t => {
            t.classList.remove('border-brand-600', 'ring-2', 'ring-brand-500/20', 'shadow-xs');
            t.classList.add('border-gray-200', 'opacity-70');
          });
          thumb.classList.add('border-brand-600', 'ring-2', 'ring-brand-500/20', 'shadow-xs');
          thumb.classList.remove('border-gray-200', 'opacity-70');
        });
      });
    }

    // Render Quick View Colors
    if (qvColorsContainer) {
      qvColorsContainer.innerHTML = qvCurrentProduct.colors.map((c, idx) => `
        <button type="button" class="qv-color-btn relative group p-0.5 rounded-full border-2 transition ${idx === 0 ? 'border-brand-600 ring-2 ring-brand-500/20 scale-110' : 'border-gray-200 hover:border-gray-400'}" data-color="${c.name}">
          <span class="block w-5 h-5 rounded-full shadow-inner" style="background-color: ${c.hex}"></span>
        </button>
      `).join('');

      qvColorsContainer.querySelectorAll('.qv-color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          qvSelectedColor = btn.dataset.color;
          if (qvColorName) qvColorName.textContent = qvSelectedColor;
          qvColorsContainer.querySelectorAll('.qv-color-btn').forEach(b => {
            b.classList.remove('border-brand-600', 'ring-2', 'ring-brand-500/20', 'scale-110');
            b.classList.add('border-gray-200');
          });
          btn.classList.add('border-brand-600', 'ring-2', 'ring-brand-500/20', 'scale-110');
          btn.classList.remove('border-gray-200');
        });
      });
      if (qvColorName) qvColorName.textContent = qvSelectedColor;
    }

    // Render Quick View Sizes
    if (qvSizesContainer) {
      qvSizesContainer.innerHTML = qvCurrentProduct.sizes.map(s => `
        <button type="button" class="qv-size-btn px-3 py-1.5 text-xs font-bold rounded-xl border transition ${s === qvSelectedSize ? 'bg-gray-900 text-white border-gray-900 shadow-xs' : 'bg-white text-gray-800 border-gray-200 hover:border-gray-400'}" data-size="${s}">
          ${s}
        </button>
      `).join('');

      qvSizesContainer.querySelectorAll('.qv-size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          qvSelectedSize = btn.dataset.size;
          if (qvSizeName) qvSizeName.textContent = qvSelectedSize;
          qvSizesContainer.querySelectorAll('.qv-size-btn').forEach(b => {
            b.classList.remove('bg-gray-900', 'text-white', 'border-gray-900', 'shadow-xs');
            b.classList.add('bg-white', 'text-gray-800', 'border-gray-200');
          });
          btn.classList.add('bg-gray-900', 'text-white', 'border-gray-900', 'shadow-xs');
          btn.classList.remove('bg-white', 'text-gray-800', 'border-gray-200');
        });
      });
      if (qvSizeName) qvSizeName.textContent = qvSelectedSize;
    }

    if (qvFullPageLink) {
      qvFullPageLink.href = `product.html?id=${qvCurrentProduct.id}`;
    }

    if (quickViewModal) {
      quickViewModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeQuickView() {
    if (quickViewModal) {
      quickViewModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Quick View triggers
  document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.id;
      if (id) openQuickView(id);
    });
  });

  if (closeQuickViewBtn) {
    closeQuickViewBtn.addEventListener('click', closeQuickView);
  }

  if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) closeQuickView();
    });
  }

  if (qvQtyMinus) {
    qvQtyMinus.addEventListener('click', () => {
      if (qvQuantity > 1) {
        qvQuantity--;
        if (qvQtyInput) qvQtyInput.value = qvQuantity;
      }
    });
  }

  if (qvQtyPlus) {
    qvQtyPlus.addEventListener('click', () => {
      if (qvQuantity < 10) {
        qvQuantity++;
        if (qvQtyInput) qvQtyInput.value = qvQuantity;
      }
    });
  }

  if (qvAddToCartBtn) {
    qvAddToCartBtn.addEventListener('click', () => {
      if (qvCurrentProduct) {
        addItemToCart({
          id: qvCurrentProduct.id,
          name: qvCurrentProduct.name,
          price: qvCurrentProduct.price,
          image: qvCurrentProduct.mainImage,
          quantity: qvQuantity,
          size: qvSelectedSize,
          color: qvSelectedColor
        });
        closeQuickView();
      }
    });
  }

  // Handle URL search parameter on index.html
  const searchParam = new URLSearchParams(window.location.search).get('search');
  if (searchParam && searchInput) {
    searchInput.value = searchParam;
    filterProducts('all', searchParam, true);
  }

  // Initial UI Render
  updateCartUI();
});
