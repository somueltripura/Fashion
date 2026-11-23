// Fashion Store - Central Product Catalog Data
// Detailed data for all 8 products inspiring modern React/Next.js/Tailwind e-commerce PDPs

const PRODUCTS_DATA = {
  'casual-jacket': {
    id: 'casual-jacket',
    name: 'Casual Washed Denim Jacket',
    category: 'Men',
    badge: 'Best Seller',
    tagline: 'Classic American trucker silhouette tailored from 12oz ring-spun denim.',
    price: 2499,
    originalPrice: 3499,
    discount: '28% OFF',
    rating: 4.6,
    reviewCount: 320,
    sku: 'FS-MN-0142',
    inStock: true,
    stockCount: 14,
    mainImage: 'assets/product-casual-jacket.jpg',
    gallery: [
      'assets/product-casual-jacket.jpg',
      'assets/category-men.jpg',
      'assets/hero-fashion.jpg',
      'assets/hero-slide-3.jpg'
    ],
    colors: [
      { name: 'Indigo Blue', hex: '#2b4162', bgClass: 'bg-[#2b4162]' },
      { name: 'Washed Black', hex: '#1f2937', bgClass: 'bg-[#1f2937]' },
      { name: 'Desert Tan', hex: '#d2b48c', bgClass: 'bg-[#d2b48c]' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    defaultSize: 'M',
    shortDesc: 'Engineered from premium 12oz ring-spun cotton denim with a relaxed trucker silhouette. Features reinforced contrast stitching, vintage brass hardware, and dual button-flap chest pockets.',
    features: [
      '100% Ring-Spun Cotton Denim (12 oz weight)',
      'Classic point collar & heavy-duty metal button placket',
      'Dual button-flap chest pockets & dual side welt pockets',
      'Pre-washed and enzyme-treated for broken-in softness',
      'Adjustable waist tabs for customizable fit'
    ],
    fabricCare: [
      'Material: 100% Cotton Denim',
      'Machine wash cold inside out with similar colors',
      'Do not bleach or dry clean',
      'Tumble dry low or hang dry in shade',
      'Warm iron on reverse if necessary'
    ],
    shippingReturn: [
      'Free standard delivery on orders above ₹999 (2-3 business days)',
      'Cash on Delivery (COD) & instant bKash / Nagad / Card payment available',
      '7-day hassle-free exchange & return policy',
      'Dispatched in eco-friendly reusable packaging'
    ],
    reviews: [
      { name: 'Rahim Ahmed', rating: 5, date: '12 Nov 2026', title: 'Exceptional denim quality!', comment: 'The fit is absolutely spot on. The denim feels heavy and authentic yet soft from day one. High quality stitching.' },
      { name: 'Tanvir Hossain', rating: 5, date: '28 Oct 2026', title: 'Perfect for layering', comment: 'Matches great with hoodies or casual tees. Loved the deep indigo shade. Delivery was fast within 2 days.' },
      { name: 'Sabbir Khan', rating: 4, date: '15 Oct 2026', title: 'Great value for money', comment: 'Very stylish jacket, sturdy brass buttons. Would definitely recommend sizing up if you like oversized fits.' }
    ],
    relatedIds: ['polo-tshirt', 'classic-sneakers', 'polarized-sunglasses', 'kids-hoodie']
  },

  'floral-dress': {
    id: 'floral-dress',
    name: 'Botanical Bloom Puff-Sleeve Midi Dress',
    category: 'Women',
    badge: 'Trending',
    tagline: 'Flowing romantic silhouette with delicate floral print and sweetheart neck.',
    price: 1999,
    originalPrice: 2799,
    discount: '29% OFF',
    rating: 4.8,
    reviewCount: 210,
    sku: 'FS-WM-0288',
    inStock: true,
    stockCount: 9,
    mainImage: 'assets/product-floral-dress.jpg',
    gallery: [
      'assets/product-floral-dress.jpg',
      'assets/category-women.jpg',
      'assets/hero-slide-2.jpg',
      'assets/banner-sale.jpg'
    ],
    colors: [
      { name: 'Blush Coral', hex: '#f4a6b8', bgClass: 'bg-[#f4a6b8]' },
      { name: 'Lavender Mist', hex: '#c8b6e2', bgClass: 'bg-[#c8b6e2]' },
      { name: 'Ivory Cream', hex: '#fdfbf7', bgClass: 'bg-[#fdfbf7]' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    defaultSize: 'S',
    shortDesc: 'An ethereal floral midi dress crafted with breathable airy chiffon and elasticated puff sleeves. Features a flattering sweetheart neckline, smocked back bodice for contouring, and tiered flowing hemline.',
    features: [
      'Lightweight floral chiffon with soft skin-friendly inner lining',
      'Sweetheart neckline with elasticated puff shoulders',
      'Stretchy smocked back panel adapts effortlessly to curves',
      'Tiered A-line skirt with subtle movement and side slit',
      'Concealed invisible side zipper closure'
    ],
    fabricCare: [
      'Material: 100% Polyester Chiffon, Rayon inner lining',
      'Hand wash cold or machine wash in laundry bag',
      'Do not wring or twist',
      'Line dry in shade',
      'Low steam iron if needed'
    ],
    shippingReturn: [
      'Free standard delivery on orders above ₹999 (2-3 business days)',
      'Cash on Delivery (COD) & instant bKash / Nagad / Card payment available',
      '7-day hassle-free exchange & return policy',
      'Dispatched in premium protective apparel box'
    ],
    reviews: [
      { name: 'Anika Tabassum', rating: 5, date: '18 Nov 2026', title: 'Looks exactly like the photos!', comment: 'Super flattering and feminine. The smocked back gives a great fit. Got endless compliments at my friend’s garden party.' },
      { name: 'Farzana Yesmin', rating: 5, date: '04 Nov 2026', title: 'Comfortable and elegant', comment: 'The fabric feels so light and breathable. Perfect for warm sunny afternoons and festive evenings.' }
    ],
    relatedIds: ['knit-sweater', 'classic-handbag', 'polarized-sunglasses', 'classic-sneakers']
  },

  'polo-tshirt': {
    id: 'polo-tshirt',
    name: 'Mercerized Cotton Pique Polo Shirt',
    category: 'Men',
    badge: 'Popular',
    tagline: 'Signature combed cotton polo crafted for breathable everyday elegance.',
    price: 899,
    originalPrice: 1299,
    discount: '30% OFF',
    rating: 4.5,
    reviewCount: 180,
    sku: 'FS-MN-0355',
    inStock: true,
    stockCount: 22,
    mainImage: 'assets/product-polo-tshirt.jpg',
    gallery: [
      'assets/product-polo-tshirt.jpg',
      'assets/category-men.jpg',
      'assets/hero-fashion.jpg',
      'assets/hero-slide-3.jpg'
    ],
    colors: [
      { name: 'Forest Green', hex: '#2e5a44', bgClass: 'bg-[#2e5a44]' },
      { name: 'Navy Blue', hex: '#1e3a5f', bgClass: 'bg-[#1e3a5f]' },
      { name: 'Charcoal Gray', hex: '#4b5563', bgClass: 'bg-[#4b5563]' },
      { name: 'Crisp White', hex: '#ffffff', bgClass: 'bg-[#ffffff]' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    defaultSize: 'M',
    shortDesc: 'A timeless wardrobe staple tailored from double-mercerized combed cotton for a refined luster and silky handfeel. Features anti-curl ribbed collar, two-button placket, and split side seams.',
    features: [
      '100% Combed Pique Cotton (220 GSM heavyweight knit)',
      'Two-button placket with authentic mother-of-pearl buttons',
      'Engineered rib-knit collar & cuffs resist curling after wash',
      'Side seam vents for enhanced flexibility and easy tucking',
      'Colorfast dye ensures vibrant tone wash after wash'
    ],
    fabricCare: [
      'Material: 100% Mercerized Combed Cotton',
      'Machine wash warm with like colors',
      'Tumble dry low or dry flat',
      'Iron on medium heat'
    ],
    shippingReturn: [
      'Free standard delivery on orders above ₹999 (2-3 business days)',
      'Cash on Delivery (COD) & instant bKash / Nagad / Card payment available',
      '7-day hassle-free exchange & return policy',
      'Dispatched in sealed waterproof packaging'
    ],
    reviews: [
      { name: 'Mahmudul Hasan', rating: 5, date: '09 Nov 2026', title: 'Top tier cotton quality', comment: 'The fabric feels very premium and soft. The collar stays crisp and does not curl up like cheaper polos.' },
      { name: 'Zubair Alom', rating: 4, date: '22 Oct 2026', title: 'Great fit for office & casual', comment: 'Fits really well around the shoulders and arms. Very comfortable in humid weather.' }
    ],
    relatedIds: ['casual-jacket', 'classic-sneakers', 'polarized-sunglasses', 'classic-handbag']
  },

  'knit-sweater': {
    id: 'knit-sweater',
    name: 'Chunky Ribbed Crewneck Knit Sweater',
    category: 'Women',
    badge: 'Winter Essential',
    tagline: 'Warm, ultra-soft knit crafted from wool-cotton yarn with drop shoulders.',
    price: 1299,
    originalPrice: 1899,
    discount: '31% OFF',
    rating: 4.7,
    reviewCount: 450,
    sku: 'FS-WM-0491',
    inStock: true,
    stockCount: 11,
    mainImage: 'assets/product-knit-sweater.jpg',
    gallery: [
      'assets/product-knit-sweater.jpg',
      'assets/category-women.jpg',
      'assets/hero-fashion.jpg',
      'assets/hero-slide-2.jpg'
    ],
    colors: [
      { name: 'Oatmeal Beige', hex: '#e5ded4', bgClass: 'bg-[#e5ded4]' },
      { name: 'Muted Lavender', hex: '#b4a3cb', bgClass: 'bg-[#b4a3cb]' },
      { name: 'Warm Camel', hex: '#c19a6b', bgClass: 'bg-[#c19a6b]' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    defaultSize: 'M',
    shortDesc: 'Cozy up in our chunky crewneck sweater, spun from an ultra-soft wool and cotton blend yarn. Features relaxed drop shoulders, wide rib-knit trims, and a boxy silhouette ideal for cold-weather layering.',
    features: [
      'Premium Wool & Combed Cotton blend yarn',
      'Textured 7-gauge fisherman rib knit for rich depth',
      'Relaxed drop shoulders with wide ribbed neck and cuffs',
      'Non-itch, hypoallergenic, and anti-pilling finish',
      'Thermal insulation while maintaining breathability'
    ],
    fabricCare: [
      'Material: 60% Cotton, 30% Wool, 10% Cashmere-Touch Acrylic',
      'Hand wash gently in cool water with mild wool detergent',
      'Do not wring; press out excess water with a towel',
      'Lay flat to dry; do not hang',
      'Steam iron on low setting if necessary'
    ],
    shippingReturn: [
      'Free standard delivery on orders above ₹999 (2-3 business days)',
      'Cash on Delivery (COD) & instant bKash / Nagad / Card payment available',
      '7-day hassle-free exchange & return policy',
      'Dispatched with moisture-proof protective wrap'
    ],
    reviews: [
      { name: 'Nusrat Jahan', rating: 5, date: '19 Nov 2026', title: 'Warm, soft, and no itchiness!', comment: 'I was worried it might itch, but it is super soft against bare skin. The oatmeal color goes with everything.' },
      { name: 'Sadia Chowdhury', rating: 5, date: '01 Nov 2026', title: 'My favorite sweater this season', comment: 'Quality is on par with luxury brands. Looks incredible paired with denim or pleated skirts.' }
    ],
    relatedIds: ['floral-dress', 'classic-handbag', 'classic-sneakers', 'casual-jacket']
  },

  'mens-lightweight-bomber-jacket': {
    id: 'mens-lightweight-bomber-jacket',
    name: 'Men’s Lightweight Bomber Jacket',
    category: 'Men',
    badge: 'New Arrival',
    tagline: 'A modern, easy-layer bomber with a clean streetwear silhouette.',
    price: 1299,
    originalPrice: 1799,
    discount: '28% OFF',
    rating: 4.8,
    reviewCount: 142,
    sku: 'FS-MN-0576',
    inStock: true,
    stockCount: 18,
    mainImage: 'assets/boomber-jacker.jpg',
    gallery: [
      'assets/boomber-jacker.jpg',
      'assets/boomber-jacker-1.jpg',
      'assets/boomber-jacker-2.jpg',
      'assets/boomber-jacker-3.jpg'
    ],
    colors: [
      { name: 'Midnight Navy', hex: '#1f2937', bgClass: 'bg-[#1f2937]' },
      { name: 'Olive Green', hex: '#4d5c32', bgClass: 'bg-[#4d5c32]' },
      { name: 'Classic Black', hex: '#111827', bgClass: 'bg-[#111827]' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    defaultSize: 'M',
    shortDesc: 'A lightweight men’s bomber jacket with a contemporary regular fit, smooth lining, and practical zip pockets. Designed for comfortable all-season layering without unnecessary bulk.',
    features: [
      'Lightweight woven outer shell for breathable everyday wear',
      'Full-zip front with a smooth, snag-resistant finish',
      'Stand collar and ribbed cuffs for a secure, clean fit',
      'Two secure side pockets for daily essentials',
      'Soft inner lining for easy layering over tees or shirts'
    ],
    fabricCare: [
      'Material: Polyester woven shell with soft lining',
      'Machine wash cold on a gentle cycle',
      'Wash with similar colors and close the zip',
      'Do not bleach or tumble dry',
      'Cool iron on the reverse side if required'
    ],
    shippingReturn: [
      'Free standard delivery on orders above ₹999 (2-3 business days)',
      'Cash on Delivery (COD) & instant bKash / Nagad / Card payment available',
      '7-day hassle-free exchange & return policy',
      'Dispatched in protective recyclable packaging'
    ],
    reviews: [
      { name: 'Saim Rahman', rating: 5, date: '16 Nov 2026', title: 'Lightweight and stylish', comment: 'The fit is clean and the jacket feels comfortable for casual daily wear. It works well over shirts and tees.' },
      { name: 'Nayeem Islam', rating: 5, date: '02 Nov 2026', title: 'Great value', comment: 'Looks premium for the price and the zip and pockets feel sturdy. The M size fits true to size.' }
    ],
    relatedIds: ['polo-tshirt', 'casual-jacket', 'classic-sneakers', 'polarized-sunglasses']
  },

  'kids-hoodie': {
    id: 'kids-hoodie',
    name: 'Kids Cozy Fleece Pullover Hoodie',
    category: 'Kids',
    badge: 'Kids Choice',
    tagline: 'Super-soft brushed organic fleece hoodie with kangaroo pocket.',
    price: 749,
    originalPrice: 1099,
    discount: '32% OFF',
    rating: 4.8,
    reviewCount: 142,
    sku: 'FS-KD-0518',
    inStock: true,
    stockCount: 19,
    mainImage: 'assets/category-kids.jpg',
    gallery: [
      'assets/category-kids.jpg',
      'assets/hoodie-main.jpg',
      'assets/hoodie-thumb-1.jpg',
      'assets/hoodie-fabric.jpg'
    ],
    colors: [
      { name: 'Sunshine Yellow', hex: '#facc15', bgClass: 'bg-[#facc15]' },
      { name: 'Sky Blue', hex: '#38bdf8', bgClass: 'bg-[#38bdf8]' },
      { name: 'Heather Gray', hex: '#9ca3af', bgClass: 'bg-[#9ca3af]' }
    ],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
    defaultSize: '6-7Y',
    shortDesc: 'Extra-soft, brushed fleece pullover hoodie designed for active everyday play. Double-lined hood, durable kangaroo front pocket, and stretch-rib cuffs lock in warmth while resisting repeated playground wear.',
    features: [
      '80% Organic Cotton, 20% Recycled Polyester Fleece',
      'Plush brushed fleece interior for sensitive kid skin',
      'Double-stitched kangaroo pocket with reinforced bartacks',
      'Tagless neck print eliminates scratchiness and irritation',
      'Elastic ribbed cuffs and hem retain snug shape'
    ],
    fabricCare: [
      'Material: 80% Organic Cotton, 20% Recycled Poly',
      'Machine wash warm on gentle cycle',
      'Tumble dry medium',
      'Iron on medium heat; avoid printed areas'
    ],
    shippingReturn: [
      'Free standard delivery on orders above ₹999 (2-3 business days)',
      'Cash on Delivery (COD) & instant bKash / Nagad / Card payment available',
      '7-day hassle-free exchange & return policy',
      'Dispatched in kid-friendly colorful packaging'
    ],
    reviews: [
      { name: 'Rina Begum', rating: 5, date: '14 Nov 2026', title: 'My son loves this hoodie!', comment: 'The yellow color is vibrant and fun. Fleece inside is so cozy, and it survived 5 washes without shrinking or fading.' },
      { name: 'Ashrafuzzaman', rating: 5, date: '29 Oct 2026', title: 'Great durability and stitching', comment: 'Very soft and safe for kids. Perfect for school and outdoor playtime in winter.' }
    ],
    relatedIds: ['classic-sneakers', 'casual-jacket', 'polo-tshirt', 'classic-handbag']
  },

  'classic-sneakers': {
    id: 'classic-sneakers',
    name: 'Minimalist Leather Court Sneakers',
    category: 'Footwear',
    badge: 'Iconic',
    tagline: 'Handcrafted low-top court sneakers in supple full-grain leather.',
    price: 1899,
    originalPrice: 2699,
    discount: '30% OFF',
    rating: 4.9,
    reviewCount: 512,
    sku: 'FS-FW-0624',
    inStock: true,
    stockCount: 16,
    mainImage: 'assets/category-footwear-1.jpg',
    gallery: [
      'assets/category-footwear-1.jpg',
      'assets/sneaker-4.jpg',
      'assets/sneaker-2.jpg',
      'assets/sneaker-1.jpg'
    ],
    colors: [
      { name: 'Pure White', hex: '#ffffff', bgClass: 'bg-[#ffffff]' },
      { name: 'White / Forest', hex: '#2e5a44', bgClass: 'bg-[#2e5a44]' },
      { name: 'White / Navy', hex: '#1e3a5f', bgClass: 'bg-[#1e3a5f]' }
    ],
    sizes: ['EU 39 (UK 6)', 'EU 40 (UK 7)', 'EU 41 (UK 8)', 'EU 42 (UK 9)', 'EU 43 (UK 10)', 'EU 44 (UK 11)'],
    defaultSize: 'EU 41 (UK 8)',
    shortDesc: 'Sleek low-top court sneakers handcrafted from supple full-grain leather. Engineered with cushioned memory foam OrthoLite insoles and durable vulcanized rubber cupsoles for all-day urban comfort.',
    features: [
      'Full-grain calfskin leather upper with water-repellent finish',
      'Cushioned memory foam OrthoLite insole with arch support',
      'Non-marking vulcanized rubber cupsole with herringbone grip',
      'Waxed organic cotton laces with reinforced aluminum eyelets',
      'Padded collar and tongue prevents heel chafing'
    ],
    fabricCare: [
      'Material: Full-grain leather, rubber sole',
      'Wipe clean with a damp microfiber cloth',
      'Apply neutral leather conditioner every few months',
      'Store with cedar shoe trees to preserve leather shape'
    ],
    shippingReturn: [
      'Free standard delivery on orders above ₹999 (2-3 business days)',
      'Cash on Delivery (COD) & instant bKash / Nagad / Card payment available',
      '7-day hassle-free exchange & return policy with size swap guarantee',
      'Dispatched in reinforced luxury magnetic shoebox'
    ],
    reviews: [
      { name: 'Imtiaz Shovon', rating: 5, date: '20 Nov 2026', title: 'Cleanest white sneakers on the market', comment: 'Unbelievably comfortable right out of the box. Wore them walking all day with zero blisters. Looks super clean with jeans or chinos.' },
      { name: 'Arif Billah', rating: 5, date: '05 Nov 2026', title: 'High quality leather', comment: 'Leather feels thick and expensive. The sole has great traction. Well worth the price!' }
    ],
    relatedIds: ['casual-jacket', 'polo-tshirt', 'polarized-sunglasses', 'classic-handbag']
  },

  'polarized-sunglasses': {
    id: 'polarized-sunglasses',
    name: 'Urban Classic Polarized Sunglasses',
    category: 'Accessories',
    badge: 'UV400',
    tagline: 'Retro-modern square sunglasses with TAC polarized glare-blocking lenses.',
    price: 649,
    originalPrice: 999,
    discount: '35% OFF',
    rating: 4.5,
    reviewCount: 95,
    sku: 'FS-AC-0782',
    inStock: true,
    stockCount: 28,
    mainImage: 'assets/polarized-sunglasses.jpg',
    gallery: [
      'assets/polarized-sunglasses.jpg',
      'assets/polarized-sunglasses-1.jpg',
      'assets/polarized-sunglasses-2.jpg',
      'assets/polarized-sunglasses-3.jpg'
    ],
    colors: [
      { name: 'Glossy Black', hex: '#111827', bgClass: 'bg-[#111827]' },
      { name: 'Tortoiseshell Brown', hex: '#78350f', bgClass: 'bg-[#78350f]' },
      { name: 'Matte Slate', hex: '#374151', bgClass: 'bg-[#374151]' }
    ],
    sizes: ['Standard Fit (52-19-145)'],
    defaultSize: 'Standard Fit (52-19-145)',
    shortDesc: 'Retro-modern square sunglasses engineered with 9-layer TAC polarized lenses offering 100% UV400 protection and crystal-clear glare reduction. Lightweight acetate frame with reinforced five-barrel metal hinges.',
    features: [
      'Tri-Acetate Cellulose (TAC) 1.1mm Polarized HD lenses',
      '100% UV400 protection against harmful UVA and UVB radiation',
      'Hand-polished cellulose acetate frame with hypoallergenic coating',
      'Reinforced stainless steel 5-barrel hinges for durable open/close',
      'Includes magnetic protective hard case and lens microfiber cloth'
    ],
    fabricCare: [
      'Material: Handcrafted Acetate, Polarized TAC lenses',
      'Rinse with lukewarm water and clean using microfiber cloth',
      'Avoid placing lenses facedown on rough surfaces',
      'Always store inside the protective hard case when not in use'
    ],
    shippingReturn: [
      'Free standard delivery on orders above ₹999 (2-3 business days)',
      'Cash on Delivery (COD) & instant bKash / Nagad / Card payment available',
      '7-day hassle-free exchange & return policy',
      'Dispatched with drop-tested protective bubble casing'
    ],
    reviews: [
      { name: 'Shahidul Islam', rating: 5, date: '16 Nov 2026', title: 'Amazing clarity while driving!', comment: 'Cuts glare completely on bright sunny afternoons. Frame feels sturdy and lightweight on the nose.' },
      { name: 'Mehedi Hasan', rating: 4, date: '02 Nov 2026', title: 'Stylish design and good case', comment: 'Fits really well. The included magnetic case is very nice and premium.' }
    ],
    relatedIds: ['polo-tshirt', 'casual-jacket', 'classic-sneakers', 'classic-handbag']
  },

  'classic-handbag': {
    id: 'classic-handbag',
    name: 'Structured Leather Top-Handle Satchel',
    category: 'Bags',
    badge: 'Luxury',
    tagline: 'Architectural silhouette crafted from pebble-grain leather with gold hardware.',
    price: 2199,
    originalPrice: 3199,
    discount: '31% OFF',
    rating: 4.7,
    reviewCount: 340,
    sku: 'FS-BG-0899',
    inStock: true,
    stockCount: 8,
    mainImage: 'assets/category-bags.jpg',
    gallery: [
      'assets/category-bags.jpg',
      'assets/banner-sale.jpg',
      'assets/category-women.jpg',
      'assets/hero-slide-2.jpg'
    ],
    colors: [
      { name: 'Cognac Tan', hex: '#9a4d26', bgClass: 'bg-[#9a4d26]' },
      { name: 'Midnight Black', hex: '#18181b', bgClass: 'bg-[#18181b]' },
      { name: 'Burgundy Wine', hex: '#581c87', bgClass: 'bg-[#581c87]' }
    ],
    sizes: ['Medium (28cm × 20cm × 12cm)'],
    defaultSize: 'Medium (28cm × 20cm × 12cm)',
    shortDesc: 'An architecturally structured satchel bag crafted from scratch-resistant pebble-grain leather with brushed 24k gold-finish hardware. Features a top carry handle, detachable crossbody strap, and a triple-compartment interior.',
    features: [
      'Premium scratch-resistant pebble-grain leather with reinforced base',
      'Brushed gold-tone hardware with turnlock closure & metal protective feet',
      'Triple-compartment design with central zip divider & organizer slots',
      'Detachable and adjustable leather shoulder strap (50-56cm drop)',
      'Accommodates 11-inch iPad, wallet, cosmetic pouch, and sunglasses'
    ],
    fabricCare: [
      'Material: Textured pebble-grain leather, twill jacquard lining',
      'Wipe clean with a soft dry cloth',
      'Avoid contact with alcohol, oils, and direct sunlight',
      'Store in the provided breathable cotton dust bag'
    ],
    shippingReturn: [
      'Free standard delivery on orders above ₹999 (2-3 business days)',
      'Cash on Delivery (COD) & instant bKash / Nagad / Card payment available',
      '7-day hassle-free exchange & return policy',
      'Dispatched with silk dust bag & luxury rigid gift box'
    ],
    reviews: [
      { name: 'Farzana Sharmin', rating: 5, date: '11 Nov 2026', title: 'Absolute perfection!', comment: 'The cognac tan color is gorgeous. It holds all my daily essentials without bulging. The leather texture is scratch resistant.' },
      { name: 'Nabila Rahman', rating: 5, date: '25 Oct 2026', title: 'High quality bag', comment: 'Hardware feels heavy and expensive. The turnlock is smooth. Arrived in a lovely dust bag.' }
    ],
    relatedIds: ['floral-dress', 'knit-sweater', 'polarized-sunglasses', 'classic-sneakers']
  }
};

// Helper function to get product by ID or fallback
function getProductById(id) {
  return PRODUCTS_DATA[id] || PRODUCTS_DATA['casual-jacket'];
}

// Global export for vanilla JS / browser window
if (typeof window !== 'undefined') {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.getProductById = getProductById;
}
