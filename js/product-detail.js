// Fashion Store - Modern Product Detail Page Controller
// Clean white & gray aesthetic with rich interactive features for fashion e-commerce

document.addEventListener('DOMContentLoaded', () => {
  // 1. Identify active product ID from URL params or hash
  const urlParams = new URLSearchParams(window.location.search);
  let activeProductId = urlParams.get('id') || window.location.hash.replace('#', '') || 'casual-jacket';

  if (!window.PRODUCTS_DATA || !window.PRODUCTS_DATA[activeProductId]) {
    activeProductId = 'casual-jacket';
  }

  let currentProduct = window.getProductById(activeProductId);
  let currentImageIndex = 0;
  let selectedColor = currentProduct.colors[0]?.name || '';
  let selectedSize = currentProduct.defaultSize || currentProduct.sizes[0] || 'M';
  let quantity = 1;

  // DOM Elements
  const metaTitle = document.getElementById('pdp-meta-title');
  const catBreadcrumb = document.getElementById('pdp-category-breadcrumb');
  const titleBreadcrumb = document.getElementById('pdp-title-breadcrumb');
  const badgePill = document.getElementById('pdp-badge-pill');
  const discountPill = document.getElementById('pdp-discount-pill');
  const mainImage = document.getElementById('pdp-main-image');
  const mainImageContainer = document.getElementById('pdp-main-image-container');
  const thumbnailsStrip = document.getElementById('pdp-thumbnails-strip');
  const prevImgBtn = document.getElementById('pdp-prev-img-btn');
  const nextImgBtn = document.getElementById('pdp-next-img-btn');
  const imageCounter = document.getElementById('pdp-image-counter');
  const categoryPill = document.getElementById('pdp-category-pill');
  const skuEl = document.getElementById('pdp-sku');
  const titleEl = document.getElementById('pdp-title');
  const taglineEl = document.getElementById('pdp-tagline');
  const ratingNum = document.getElementById('pdp-rating-num');
  const reviewCountLink = document.getElementById('pdp-review-count');
  const currentPriceEl = document.getElementById('pdp-current-price');
  const originalPriceEl = document.getElementById('pdp-original-price');
  const discountBadge = document.getElementById('pdp-discount-badge');
  const selectedColorName = document.getElementById('pdp-selected-color-name');
  const colorSwatchesContainer = document.getElementById('pdp-color-swatches');
  const selectedSizeName = document.getElementById('pdp-selected-size-name');
  const sizePillsContainer = document.getElementById('pdp-size-pills');
  const qtyInput = document.getElementById('pdp-qty-input');
  const qtyMinusBtn = document.getElementById('pdp-qty-minus');
  const qtyPlusBtn = document.getElementById('pdp-qty-plus');
  const addToCartBtn = document.getElementById('pdp-add-to-cart-btn');
  const btnPriceEl = document.getElementById('pdp-btn-price');
  const buyNowBtn = document.getElementById('pdp-buy-now-btn');
  const wishlistBtn = document.getElementById('pdp-wishlist-btn');

  // Tabs Elements
  const tabButtons = document.querySelectorAll('.pdp-tab-nav-btn');
  const tabPanels = document.querySelectorAll('.pdp-tab-panel');
  const detailedDesc = document.getElementById('pdp-detailed-desc');
  const featuresList = document.getElementById('pdp-features-list');
  const careList = document.getElementById('pdp-care-list');
  const shippingList = document.getElementById('pdp-shipping-list');
  const reviewsScore = document.getElementById('pdp-reviews-score');
  const reviewsCountText = document.getElementById('pdp-reviews-count-text');
  const reviewsList = document.getElementById('pdp-reviews-list');
  const tabReviewsCount = document.getElementById('pdp-tab-reviews-count');

  // Related Products Grid
  const relatedGrid = document.getElementById('pdp-related-grid');

  // Modals
  const sizeGuideModal = document.getElementById('size-guide-modal');
  const sizeGuideBtn = document.getElementById('pdp-size-guide-btn');
  const closeSizeGuideBtn = document.getElementById('close-size-guide-btn');
  const lightboxModal = document.getElementById('image-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeLightboxBtn = document.getElementById('close-lightbox-btn');

  // Render Product Page
  function renderProduct(product) {
    currentProduct = product;
    currentImageIndex = 0;
    selectedColor = product.colors[0]?.name || '';
    selectedSize = product.defaultSize || product.sizes[0] || 'M';
    quantity = 1;

    // Title & Meta
    if (metaTitle) metaTitle.textContent = `${product.name} - Fashion Store`;
    if (catBreadcrumb) {
      catBreadcrumb.textContent = product.category;
      catBreadcrumb.onclick = () => {
        window.location.href = `index.html#featured-products-section`;
      };
    }
    if (titleBreadcrumb) titleBreadcrumb.textContent = product.name;
    if (categoryPill) categoryPill.textContent = `${product.category}'s Collection`;
    if (skuEl) skuEl.textContent = `SKU: ${product.sku}`;
    if (titleEl) titleEl.textContent = product.name;
    if (taglineEl) taglineEl.textContent = product.tagline;

    // Badges
    if (badgePill) badgePill.textContent = product.badge;
    if (discountPill) discountPill.textContent = product.discount;
    if (discountBadge) discountBadge.textContent = product.discount;

    // Pricing
    const formattedPrice = `₹${product.price.toLocaleString('en-IN')}`;
    const formattedOrigPrice = `₹${product.originalPrice.toLocaleString('en-IN')}`;
    if (currentPriceEl) currentPriceEl.textContent = formattedPrice;
    if (originalPriceEl) originalPriceEl.textContent = formattedOrigPrice;
    if (btnPriceEl) btnPriceEl.textContent = formattedPrice;

    // Ratings
    if (ratingNum) ratingNum.textContent = product.rating.toFixed(1);
    if (reviewCountLink) reviewCountLink.textContent = `${product.reviewCount} Verified Reviews`;
    if (tabReviewsCount) tabReviewsCount.textContent = product.reviewCount;
    if (reviewsScore) reviewsScore.textContent = product.rating.toFixed(1);
    if (reviewsCountText) reviewsCountText.textContent = product.reviewCount;

    // Gallery Render
    renderGallery();

    // Color Swatches
    renderColorSwatches();

    // Size Selection Pills
    renderSizePills();

    // Quantity Reset
    if (qtyInput) qtyInput.value = quantity;
    updateTotalPrice();

    // Description & Tab Features
    if (detailedDesc) detailedDesc.textContent = product.shortDesc;
    if (featuresList) {
      featuresList.innerHTML = product.features.map(f => `
        <li class="flex items-start gap-2.5">
          <svg class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
          <span>${f}</span>
        </li>
      `).join('');
    }

    if (careList) {
      careList.innerHTML = product.fabricCare.map(c => `
        <li class="flex items-start gap-2.5">
          <span class="w-1.5 h-1.5 rounded-full bg-brand-600 mt-1.5 flex-shrink-0"></span>
          <span>${c}</span>
        </li>
      `).join('');
    }

    if (shippingList) {
      shippingList.innerHTML = product.shippingReturn.map(s => `
        <li class="flex items-start gap-2.5">
          <svg class="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>${s}</span>
        </li>
      `).join('');
    }

    // Reviews List
    if (reviewsList) {
      reviewsList.innerHTML = product.reviews.map(r => `
        <div class="bg-gray-50/70 rounded-2xl p-4 sm:p-5 border border-gray-100 flex flex-col justify-between">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-full bg-purple-100 text-brand-700 font-bold text-xs flex items-center justify-center">
                  ${r.name.charAt(0)}
                </span>
                <span class="text-xs font-bold text-gray-900">${r.name}</span>
                <span class="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded-full font-semibold">Verified Buyer</span>
              </div>
              <span class="text-[11px] text-gray-400">${r.date}</span>
            </div>
            <div class="flex text-amber-400 text-xs">
              ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
            </div>
            <h5 class="text-xs sm:text-sm font-bold text-gray-900">${r.title}</h5>
            <p class="text-xs text-gray-600 leading-relaxed">${r.comment}</p>
          </div>
        </div>
      `).join('');
    }

    // Related Products Grid
    renderRelatedProducts();

    // Scroll smoothly to top on product change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Gallery Render & Navigation
  function renderGallery() {
    if (!thumbnailsStrip) return;

    thumbnailsStrip.innerHTML = currentProduct.gallery.map((imgSrc, idx) => `
      <button type="button" class="pdp-thumb-btn w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl border-2 overflow-hidden bg-[#f8fafc] flex-shrink-0 transition-all duration-200 p-1 ${idx === currentImageIndex ? 'border-brand-600 ring-2 ring-brand-500/20 shadow-sm' : 'border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100'}" data-index="${idx}">
        <img src="${imgSrc}" alt="${currentProduct.name} View ${idx + 1}" class="w-full h-full object-contain pointer-events-none" />
      </button>
    `).join('');

    // Bind click events on thumbnails
    thumbnailsStrip.querySelectorAll('.pdp-thumb-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.dataset.index, 10);
        switchImage(idx);
      });
    });

    updateMainImageView();
  }

  function switchImage(index) {
    if (index < 0) index = currentProduct.gallery.length - 1;
    if (index >= currentProduct.gallery.length) index = 0;
    currentImageIndex = index;

    updateMainImageView();

    // Update active thumb classes
    thumbnailsStrip.querySelectorAll('.pdp-thumb-btn').forEach((btn, idx) => {
      if (idx === currentImageIndex) {
        btn.classList.add('border-brand-600', 'ring-2', 'ring-brand-500/20', 'shadow-sm');
        btn.classList.remove('border-gray-200', 'opacity-70');
      } else {
        btn.classList.remove('border-brand-600', 'ring-2', 'ring-brand-500/20', 'shadow-sm');
        btn.classList.add('border-gray-200', 'opacity-70');
      }
    });
  }

  function updateMainImageView() {
    if (mainImage) {
      mainImage.style.opacity = '0.3';
      setTimeout(() => {
        mainImage.src = currentProduct.gallery[currentImageIndex];
        mainImage.style.opacity = '1';
      }, 100);
    }
    if (imageCounter) {
      imageCounter.textContent = `${currentImageIndex + 1} / ${currentProduct.gallery.length}`;
    }
  }

  // Prev / Next Image buttons
  if (prevImgBtn) {
    prevImgBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchImage(currentImageIndex - 1);
    });
  }
  if (nextImgBtn) {
    nextImgBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchImage(currentImageIndex + 1);
    });
  }

  // Color Swatches
  function renderColorSwatches() {
    if (!colorSwatchesContainer) return;
    colorSwatchesContainer.innerHTML = currentProduct.colors.map(c => `
      <button type="button" class="pdp-color-btn relative group p-0.5 rounded-full border-2 transition-all duration-200 ${c.name === selectedColor ? 'border-brand-600 ring-2 ring-brand-500/20 scale-110' : 'border-gray-200 hover:border-gray-400'}" data-color="${c.name}">
        <span class="block w-6 h-6 rounded-full shadow-inner" style="background-color: ${c.hex};"></span>
        <span class="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-semibold py-0.5 px-2 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none z-20">
          ${c.name}
        </span>
      </button>
    `).join('');

    colorSwatchesContainer.querySelectorAll('.pdp-color-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedColor = btn.dataset.color;
        if (selectedColorName) selectedColorName.textContent = selectedColor;

        colorSwatchesContainer.querySelectorAll('.pdp-color-btn').forEach(b => {
          if (b.dataset.color === selectedColor) {
            b.classList.add('border-brand-600', 'ring-2', 'ring-brand-500/20', 'scale-110');
            b.classList.remove('border-gray-200');
          } else {
            b.classList.remove('border-brand-600', 'ring-2', 'ring-brand-500/20', 'scale-110');
            b.classList.add('border-gray-200');
          }
        });
      });
    });

    if (selectedColorName) selectedColorName.textContent = selectedColor;
  }

  // Size Selection Pills
  function renderSizePills() {
    if (!sizePillsContainer) return;
    sizePillsContainer.innerHTML = currentProduct.sizes.map(s => `
      <button type="button" class="pdp-size-btn min-w-[50px] px-3.5 py-2 text-xs font-bold rounded-xl border transition-all duration-200 ${s === selectedSize ? 'bg-gray-900 text-white border-gray-900 shadow-sm scale-105' : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-200 hover:border-gray-400'}" data-size="${s}">
        ${s}
      </button>
    `).join('');

    sizePillsContainer.querySelectorAll('.pdp-size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedSize = btn.dataset.size;
        if (selectedSizeName) selectedSizeName.textContent = selectedSize;

        sizePillsContainer.querySelectorAll('.pdp-size-btn').forEach(b => {
          if (b.dataset.size === selectedSize) {
            b.classList.add('bg-gray-900', 'text-white', 'border-gray-900', 'shadow-sm', 'scale-105');
            b.classList.remove('bg-white', 'text-gray-800', 'border-gray-200');
          } else {
            b.classList.remove('bg-gray-900', 'text-white', 'border-gray-900', 'shadow-sm', 'scale-105');
            b.classList.add('bg-white', 'text-gray-800', 'border-gray-200');
          }
        });
      });
    });

    if (selectedSizeName) selectedSizeName.textContent = selectedSize;
  }

  // Quantity Stepper
  function updateTotalPrice() {
    const total = currentProduct.price * quantity;
    if (btnPriceEl) btnPriceEl.textContent = `₹${total.toLocaleString('en-IN')}`;
  }

  if (qtyMinusBtn) {
    qtyMinusBtn.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        if (qtyInput) qtyInput.value = quantity;
        updateTotalPrice();
      }
    });
  }

  if (qtyPlusBtn) {
    qtyPlusBtn.addEventListener('click', () => {
      if (quantity < 10) {
        quantity++;
        if (qtyInput) qtyInput.value = quantity;
        updateTotalPrice();
      }
    });
  }

  // Related Products
  function renderRelatedProducts() {
    if (!relatedGrid) return;
    const relatedList = (currentProduct.relatedIds || []).map(id => window.PRODUCTS_DATA[id]).filter(Boolean);

    relatedGrid.innerHTML = relatedList.map(item => `
      <div class="product-card bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg relative flex flex-col justify-between group cursor-pointer" data-id="${item.id}">
        <div>
          <div class="relative aspect-square w-full rounded-xl overflow-hidden bg-[#f8fafc] mb-3">
            <img src="${item.mainImage}" alt="${item.name}" class="product-img w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
            <span class="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[10px] font-bold text-gray-700 shadow-xs">
              ${item.category}
            </span>
          </div>
          <h4 class="text-xs sm:text-sm font-semibold text-gray-900 truncate group-hover:text-brand-600 transition">${item.name}</h4>
          <div class="flex items-center gap-1.5 mt-1 text-[11px] text-gray-500">
            <span class="text-amber-400 font-bold">★ ${item.rating.toFixed(1)}</span>
            <span>(${item.reviewCount})</span>
          </div>
        </div>
        <div class="flex items-center justify-between mt-3.5 pt-2 border-t border-gray-50">
          <span class="text-sm font-bold text-gray-900">₹${item.price.toLocaleString('en-IN')}</span>
          <span class="text-xs font-semibold text-brand-600 group-hover:translate-x-1 transition-transform">View →</span>
        </div>
      </div>
    `).join('');

    relatedGrid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        if (id && window.PRODUCTS_DATA[id]) {
          // Update URL without reload
          history.pushState(null, '', `product.html?id=${id}`);
          renderProduct(window.PRODUCTS_DATA[id]);
        }
      });
    });
  }

  // Tab switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      tabButtons.forEach(b => {
        b.classList.remove('active', 'border-brand-600', 'text-brand-600', 'font-bold');
        b.classList.add('border-transparent', 'text-gray-500', 'font-semibold');
      });

      btn.classList.add('active', 'border-brand-600', 'text-brand-600', 'font-bold');
      btn.classList.remove('border-transparent', 'text-gray-500', 'font-semibold');

      tabPanels.forEach(panel => {
        if (panel.id === `tab-panel-${targetTab}`) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });

  // Lightbox Modal
  if (mainImageContainer) {
    mainImageContainer.addEventListener('click', () => {
      if (lightboxModal && lightboxImg) {
        lightboxImg.src = currentProduct.gallery[currentImageIndex];
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', () => {
      if (lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Size Guide Modal
  if (sizeGuideBtn) {
    sizeGuideBtn.addEventListener('click', () => {
      if (sizeGuideModal) {
        sizeGuideModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (closeSizeGuideBtn) {
    closeSizeGuideBtn.addEventListener('click', () => {
      if (sizeGuideModal) {
        sizeGuideModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (sizeGuideModal) {
    sizeGuideModal.addEventListener('click', (e) => {
      if (e.target === sizeGuideModal) {
        sizeGuideModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Wishlist Button Toggle
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      wishlistBtn.classList.toggle('active');
      const isFav = wishlistBtn.classList.contains('active');
      if (typeof window.showToast === 'function') {
        window.showToast(isFav ? `Added ${currentProduct.name} to Wishlist! ❤️` : `Removed from Wishlist`);
      }
    });
  }

  // Add to Cart from PDP
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      // Add animation pulse
      addToCartBtn.classList.add('scale-105');
      setTimeout(() => addToCartBtn.classList.remove('scale-105'), 200);

      // Call global cart handler
      if (typeof window.addItemToCart === 'function') {
        window.addItemToCart({
          id: currentProduct.id,
          name: currentProduct.name,
          price: currentProduct.price,
          image: currentProduct.mainImage,
          quantity: quantity,
          size: selectedSize,
          color: selectedColor
        });
      } else {
        // Fallback cart add
        if (typeof window.showToast === 'function') {
          window.showToast(`Added ${quantity}x ${currentProduct.name} (${selectedSize}) to cart!`);
        }
      }
    });
  }

  // Buy Now (Instant Checkout) from PDP
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      if (typeof window.addItemToCart === 'function') {
        window.addItemToCart({
          id: currentProduct.id,
          name: currentProduct.name,
          price: currentProduct.price,
          image: currentProduct.mainImage,
          quantity: quantity,
          size: selectedSize,
          color: selectedColor
        }, false); // don't open drawer
      }

      // Directly trigger payment modal
      const checkoutOverlay = document.getElementById('checkout-modal-overlay');
      if (checkoutOverlay) {
        checkoutOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // Search input in PDP header redirects to index search
  const pdpSearchInput = document.getElementById('pdp-search-input');
  if (pdpSearchInput) {
    pdpSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = encodeURIComponent(pdpSearchInput.value.trim());
        window.location.href = `index.html?search=${q}#featured-products-section`;
      }
    });
  }

  // Initial Render
  renderProduct(currentProduct);
});
