/**
 * Lumina Library - 3D Circular Orbit & Interactive Library System
 * Features:
 * - 3D Circular Ring Arrangement of Books
 * - Mouse-driven Rotation (smooth parallax & inertial drag)
 * - 360-Degree Book Spin on touch / click
 * - Interactive 3D Book Inspector (Free 360° Orbit & Cover Flip)
 * - Full Catalog Grid, Borrowing System & Wishlist
 */

const DEFAULT_BOOKS = [
  {
    id: 'b1',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: 'Sci-Fi',
    year: 2021,
    pages: 496,
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
    spineColor: '#1e3a8a',
    synopsis: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself are doomed. Except right now, he doesn\'t know that.',
    excerpt: 'I\'m awake, and I don\'t know where I am. Or who I am. The room is white and sterile, smelling faintly of disinfectant. Above me, robotic arms hum with quiet mechanical precision.'
  },
  {
    id: 'b2',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fiction',
    year: 2020,
    pages: 304,
    rating: 4.7,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop',
    spineColor: '#065f46',
    synopsis: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    excerpt: 'Nineteen years before she decided to die, Nora Seed sat in the warmth of the small library at Hazeldene School in the town of Bedford. The clock on the wall ticked with steady patience.'
  },
  {
    id: 'b3',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    year: 2018,
    pages: 320,
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop',
    spineColor: '#9a3412',
    synopsis: 'No matter your goals, Atomic Habits offers a proven framework for improving every day. Practical strategies to master tiny behaviors that lead to remarkable results.',
    excerpt: 'Changes that seem small and unimportant at first will compound into remarkable results if you\'re willing to stick with them for years.'
  },
  {
    id: 'b4',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Technology',
    year: 2008,
    pages: 464,
    rating: 4.6,
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop',
    spineColor: '#334155',
    synopsis: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees. A handbook of agile software craftsmanship.',
    excerpt: 'You are reading this book for two reasons. First, you are a programmer. Second, you want to be a better programmer. Good. We need better programmers.'
  },
  {
    id: 'b5',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Sci-Fi',
    year: 1965,
    pages: 688,
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop',
    spineColor: '#7c2d12',
    synopsis: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the spice melange.',
    excerpt: 'A beginning is the time for taking the most delicate care that the balances are correct. This every sister of the Bene Gesserit knows.'
  },
  {
    id: 'b6',
    title: 'Sapiens: A Brief History',
    author: 'Yuval Noah Harari',
    genre: 'History',
    year: 2014,
    pages: 498,
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=400&auto=format&fit=crop',
    spineColor: '#4c1d95',
    synopsis: '100,000 years ago, at least six human species inhabited the earth. Today there is just one: Homo sapiens. How did our species succeed in the battle for dominance?',
    excerpt: 'About 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang.'
  },
  {
    id: 'b7',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'Mystery',
    year: 2019,
    pages: 336,
    rating: 4.5,
    cover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&auto=format&fit=crop',
    spineColor: '#831843',
    synopsis: 'Alicia Berenson shoots her husband five times in the face, and then never speaks another word. Theo Faber is a criminal psychotherapist determined to unravel her motive.',
    excerpt: 'Alicia Berenson was thirty-three years old when she killed her husband. They had been married for seven years. They were both artists.'
  },
  {
    id: 'b8',
    title: 'Deep Work',
    author: 'Cal Newport',
    genre: 'Self-Help',
    year: 2016,
    pages: 304,
    rating: 4.7,
    cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=400&auto=format&fit=crop',
    spineColor: '#1e293b',
    synopsis: 'The ability to focus without distraction on a cognitively demanding task. Deep work will make you better at what you do and provide true fulfillment.',
    excerpt: 'In the Swiss canton of St. Gallen, near the northern banks of Lake Zurich, sits a small village named Bollingen where Carl Jung chose to build a retreat.'
  }
];

class LibraryApp {
  constructor() {
    this.books = this.loadBooks();
    this.borrowed = this.loadBorrowed();
    this.wishlist = this.loadWishlist();
    this.currentView = '3d'; // '3d' | 'grid'
    this.activeBookIndex = 0;

    // 3D Orbit State
    this.currentAngle = 0;
    this.targetAngle = 0;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartAngle = 0;
    this.autoSpin = true;
    this.autoSpinSpeed = 0.25;

    // 3D Inspector State
    this.inspectorRotX = -10;
    this.inspectorRotY = 25;
    this.inspectorIsDragging = false;
    this.inspectorStartX = 0;
    this.inspectorStartY = 0;
    this.inspectorCoverOpen = false;

    // Grid filter states
    this.currentGenre = 'all';
    this.searchQuery = '';
    this.availableOnly = false;
    this.sortBy = 'popular';

    this.initTheme();
    this.cacheDOM();
    this.bindEvents();
    this.setup3DOrbit();
    this.startOrbitLoop();
    this.render();
  }

  loadBooks() {
    const saved = localStorage.getItem('lumina_books');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_BOOKS;
  }

  saveBooks() {
    localStorage.setItem('lumina_books', JSON.stringify(this.books));
  }

  loadBorrowed() {
    const saved = localStorage.getItem('lumina_borrowed');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  }

  saveBorrowed() {
    localStorage.setItem('lumina_borrowed', JSON.stringify(this.borrowed));
  }

  loadWishlist() {
    const saved = localStorage.getItem('lumina_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  }

  saveWishlist() {
    localStorage.setItem('lumina_wishlist', JSON.stringify(this.wishlist));
  }

  initTheme() {
    const savedTheme = localStorage.getItem('lumina_theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('lumina_theme', isDark ? 'dark' : 'light');
    lucide.createIcons();
  }

  cacheDOM() {
    // Mode switcher buttons & sections
    this.viewMode3DBtn = document.getElementById('viewMode3DBtn');
    this.viewModeGridBtn = document.getElementById('viewModeGridBtn');
    this.orbitSection = document.getElementById('orbitSection');
    this.gridSection = document.getElementById('gridSection');

    // 3D Orbit DOM
    this.orbitStage = document.getElementById('orbitStage');
    this.orbitRing = document.getElementById('orbitRing');
    this.spotlightCard = document.getElementById('spotlightCard');
    this.orbitPrevBtn = document.getElementById('orbitPrevBtn');
    this.orbitNextBtn = document.getElementById('orbitNextBtn');
    this.toggleAutoSpinBtn = document.getElementById('toggleAutoSpinBtn');
    this.autoSpinIcon = document.getElementById('autoSpinIcon');
    this.autoSpinLabel = document.getElementById('autoSpinLabel');
    this.spinCurrent360Btn = document.getElementById('spinCurrent360Btn');

    // Inspector Modal DOM
    this.inspectorModal = document.getElementById('inspectorModal');
    this.inspectorStage = document.getElementById('inspectorStage');
    this.inspectorBookBox = document.getElementById('inspectorBookBox');
    this.inspectorBookTitle = document.getElementById('inspectorBookTitle');
    this.inspectorSpin360Btn = document.getElementById('inspectorSpin360Btn');
    this.inspectorFlipCoverBtn = document.getElementById('inspectorFlipCoverBtn');
    this.flipCoverLabel = document.getElementById('flipCoverLabel');
    this.inspectorResetAngleBtn = document.getElementById('inspectorResetAngleBtn');
    this.closeInspectorBtn = document.getElementById('closeInspectorBtn');
    this.inspectorBorrowBtn = document.getElementById('inspectorBorrowBtn');

    // Search and Grid DOM
    this.navSearch = document.getElementById('navSearchInput');
    this.mobileSearch = document.getElementById('mobileSearchInput');
    this.clearSearchBtn = document.getElementById('clearSearchBtn');
    this.booksGrid = document.getElementById('booksGrid');
    this.emptyState = document.getElementById('emptyState');
    this.genrePills = document.querySelectorAll('.genre-pill');
    this.availableToggle = document.getElementById('availableOnlyToggle');
    this.sortSelect = document.getElementById('sortSelect');
    this.resultsCount = document.getElementById('resultsCount');
    this.resetFiltersBtn = document.getElementById('resetFiltersBtn');

    // Badges & Counters
    this.borrowedBadge = document.getElementById('borrowedCountBadge');
    this.wishlistBadge = document.getElementById('wishlistCountBadge');

    // Modals & Drawers
    this.bookModal = document.getElementById('bookModal');
    this.modalContent = document.getElementById('modalContent');
    this.shelfDrawer = document.getElementById('shelfDrawer');
    this.shelfPanel = document.getElementById('shelfPanel');
    this.shelfBackdrop = document.getElementById('shelfBackdrop');
    this.shelfList = document.getElementById('shelfList');
    this.shelfLimitStatus = document.getElementById('shelfLimitStatus');

    this.wishlistDrawer = document.getElementById('wishlistDrawer');
    this.wishlistPanel = document.getElementById('wishlistPanel');
    this.wishlistBackdrop = document.getElementById('wishlistBackdrop');
    this.wishlistContainer = document.getElementById('wishlistContainer');

    this.addBookModal = document.getElementById('addBookModal');
    this.addBookForm = document.getElementById('addBookForm');
  }

  bindEvents() {
    // View Switcher
    this.viewMode3DBtn.addEventListener('click', () => this.switchView('3d'));
    this.viewModeGridBtn.addEventListener('click', () => this.switchView('grid'));

    // Theme toggle
    document.getElementById('themeToggleBtn').addEventListener('click', () => this.toggleTheme());

    // Search inputs
    const handleSearch = (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      if (this.navSearch.value !== e.target.value) this.navSearch.value = e.target.value;
      if (this.mobileSearch.value !== e.target.value) this.mobileSearch.value = e.target.value;
      this.clearSearchBtn.classList.toggle('hidden', !this.searchQuery);
      
      // If user starts searching, switch to grid view automatically to display matching titles
      if (this.searchQuery && this.currentView !== 'grid') {
        this.switchView('grid');
      }
      this.render();
    };

    this.navSearch.addEventListener('input', handleSearch);
    this.mobileSearch.addEventListener('input', handleSearch);
    this.clearSearchBtn.addEventListener('click', () => {
      this.navSearch.value = '';
      this.mobileSearch.value = '';
      this.searchQuery = '';
      this.clearSearchBtn.classList.add('hidden');
      this.render();
    });

    // 3D Orbit Mouse Movement & Drag Interaction
    this.bindOrbitInteractions();

    // Orbit Controls
    this.orbitPrevBtn.addEventListener('click', () => this.rotateOrbitStep(-1));
    this.orbitNextBtn.addEventListener('click', () => this.rotateOrbitStep(1));
    this.toggleAutoSpinBtn.addEventListener('click', () => this.toggleAutoSpin());
    this.spinCurrent360Btn.addEventListener('click', () => this.spinActiveBook360());

    // Inspector interactions
    this.bindInspectorInteractions();

    // Filter Pills
    this.genrePills.forEach(pill => {
      pill.addEventListener('click', () => {
        this.genrePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentGenre = pill.dataset.genre;
        this.render();
      });
    });

    // Available Toggle & Sort
    this.availableToggle.addEventListener('change', (e) => {
      this.availableOnly = e.target.checked;
      this.render();
    });

    this.sortSelect.addEventListener('change', (e) => {
      this.sortBy = e.target.value;
      this.render();
    });

    this.resetFiltersBtn.addEventListener('click', () => this.resetFilters());

    // Drawers
    document.getElementById('openShelfBtn').addEventListener('click', () => this.openShelf());
    document.getElementById('closeShelfBtn').addEventListener('click', () => this.closeShelf());
    this.shelfBackdrop.addEventListener('click', () => this.closeShelf());

    document.getElementById('openWishlistBtn').addEventListener('click', () => this.openWishlist());
    document.getElementById('closeWishlistBtn').addEventListener('click', () => this.closeWishlist());
    this.wishlistBackdrop.addEventListener('click', () => this.closeWishlist());

    document.getElementById('openAddBookBtn').addEventListener('click', () => this.openAddModal());
    document.getElementById('closeAddBookBtn').addEventListener('click', () => this.closeAddModal());
    document.getElementById('cancelAddBookBtn').addEventListener('click', () => this.closeAddModal());

    this.addBookForm.addEventListener('submit', (e) => this.handleAddBook(e));

    this.bookModal.addEventListener('click', (e) => {
      if (e.target === this.bookModal) this.closeBookModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeBookModal();
        this.closeShelf();
        this.closeWishlist();
        this.closeAddModal();
        this.closeInspector();
      }
    });

    window.addEventListener('resize', () => {
      this.setup3DOrbit();
    });
  }

  switchView(mode) {
    this.currentView = mode;
    if (mode === '3d') {
      this.orbitSection.classList.remove('hidden');
      this.gridSection.classList.add('hidden');
      this.viewMode3DBtn.className = 'flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-md shadow-blue-500/25';
      this.viewModeGridBtn.className = 'flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold rounded-lg transition-all text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white';
    } else {
      this.orbitSection.classList.add('hidden');
      this.gridSection.classList.remove('hidden');
      this.viewModeGridBtn.className = 'flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-md shadow-blue-500/25';
      this.viewMode3DBtn.className = 'flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold rounded-lg transition-all text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white';
    }
    lucide.createIcons();
  }

  // ==========================================================================
  // 3D CIRCULAR ORBIT SETUP & INTERACTIONS
  // ==========================================================================
  setup3DOrbit() {
    const total = this.books.length;
    const isMobile = window.innerWidth < 640;
    const radius = isMobile ? 260 : 420; // 3D cylinder radial distance
    this.orbitRadius = radius;

    const angleStep = 360 / total;
    this.angleStep = angleStep;

    this.orbitRing.innerHTML = this.books.map((book, index) => {
      const angle = index * angleStep;
      const isBorrowed = this.isBookBorrowed(book.id);

      return `
        <div 
          class="orbit-slot" 
          id="slot-${book.id}"
          data-index="${index}"
          data-id="${book.id}"
          style="transform: rotateY(${angle}deg) translateZ(${radius}px);"
        >
          <!-- 3D Book Slab -->
          <div class="book-3d-model" id="model-${book.id}">
            <!-- Front Face with Cover & Availability -->
            <div class="book-face book-face-front bg-slate-900">
              <img src="${book.cover}" alt="${book.title}" class="w-full h-full object-cover">
              <div class="absolute top-2.5 left-2.5 z-10">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md ${isBorrowed ? 'bg-amber-950/80 text-amber-300 border border-amber-600/40' : 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/40'}">
                  ${isBorrowed ? 'Borrowed' : 'Available'}
                </span>
              </div>
              <div class="absolute bottom-2.5 right-2.5 z-10">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-amber-300 backdrop-blur-md">
                  ★ ${book.rating}
                </span>
              </div>
            </div>

            <!-- Back Face with Book Blurb & Barcode -->
            <div class="book-face book-face-back">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-widest text-blue-400">${book.genre}</span>
                <h4 class="font-bold text-xs mt-1 text-white line-clamp-2">${book.title}</h4>
                <p class="text-[11px] text-slate-300 mt-2 line-clamp-5 leading-relaxed">${book.synopsis}</p>
              </div>
              <div class="pt-2 border-t border-slate-700/80 flex items-center justify-between text-[10px] text-slate-400">
                <span>${book.pages} Pages</span>
                <span class="font-mono tracking-widest opacity-70">||||| | ||||</span>
              </div>
            </div>

            <!-- Spine Face with Embossed Vertical Title -->
            <div class="book-face book-face-spine" style="background: ${book.spineColor || '#1e293b'};">
              <span class="text-[9px] font-bold opacity-80">${book.genre.slice(0, 3)}</span>
              <span class="spine-title">${book.title}</span>
              <span class="text-[9px] opacity-80">★</span>
            </div>

            <!-- Pages Block Edges -->
            <div class="book-face book-face-right"></div>
            <div class="book-face book-face-top"></div>
            <div class="book-face book-face-bottom"></div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click and hover events to each 3D book in orbit
    this.books.forEach((book, index) => {
      const slot = document.getElementById(`slot-${book.id}`);
      if (!slot) return;

      // Click: Bring book to front and trigger 360° spin!
      slot.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectBookIndex(index, true);
      });

      // Hover: slight tilt or preview
      slot.addEventListener('mouseenter', () => {
        if (!this.isDragging) {
          this.autoSpin = false;
        }
      });
      slot.addEventListener('mouseleave', () => {
        if (!this.isDragging && !this.inspectorModal.classList.contains('opacity-100')) {
          this.autoSpin = true;
        }
      });
    });

    this.updateSpotlightCard();
    lucide.createIcons();
  }

  bindOrbitInteractions() {
    let lastMouseX = 0;

    // Mouse movement over stage rotates the books one by one
    this.orbitStage.addEventListener('mousemove', (e) => {
      const rect = this.orbitStage.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const normalizedX = (mouseX / rect.width) - 0.5; // -0.5 to +0.5

      if (this.isDragging) {
        const deltaX = e.clientX - this.dragStartX;
        this.targetAngle = this.dragStartAngle + (deltaX * 0.4);
        return;
      }

      // Parallax rotation driven by mouse cursor position across stage
      if (!this.autoSpin) {
        const angleOffset = normalizedX * 45; // gentle cursor steering
        // slowly shift target
        this.targetAngle += (normalizedX * 0.4);
      }
    });

    // Drag / Touch to Spin Orbit
    this.orbitStage.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      this.dragStartX = e.clientX;
      this.dragStartAngle = this.targetAngle;
      this.autoSpin = false;
      this.orbitStage.style.cursor = 'grabbing';
    });

    window.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.dragStartX;
      this.targetAngle = this.dragStartAngle + (deltaX * 0.4);
    });

    window.addEventListener('pointerup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.orbitStage.style.cursor = 'ew-resize';
        // snap to nearest book
        this.snapToNearestBook();
      }
    });

    // Pause auto-spin on hover, resume on leave
    this.orbitStage.addEventListener('mouseenter', () => {
      this.autoSpin = false;
    });

    this.orbitStage.addEventListener('mouseleave', () => {
      if (!this.isDragging) {
        this.autoSpin = true;
      }
    });
  }

  // Smooth Animation Loop using requestAnimationFrame
  startOrbitLoop() {
    const loop = () => {
      if (this.autoSpin && !this.isDragging) {
        this.targetAngle -= this.autoSpinSpeed;
      }

      // Lerp (Linear Interpolation) for silky smooth movement
      const diff = this.targetAngle - this.currentAngle;
      this.currentAngle += diff * 0.08;

      if (this.orbitRing) {
        this.orbitRing.style.transform = `rotateY(${this.currentAngle}deg)`;
      }

      // Calculate which book is currently closest to the front (angle % 360 = 0)
      this.calculateActiveBook();

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  calculateActiveBook() {
    const total = this.books.length;
    if (total === 0) return;
    
    // Normalize current angle
    let normalized = (-this.currentAngle) % 360;
    if (normalized < 0) normalized += 360;

    const activeIdx = Math.round(normalized / this.angleStep) % total;
    if (activeIdx !== this.activeBookIndex) {
      this.activeBookIndex = activeIdx;
      this.updateSpotlightCard();
    }
  }

  snapToNearestBook() {
    const total = this.books.length;
    let normalized = (-this.targetAngle) % 360;
    if (normalized < 0) normalized += 360;

    const nearestIdx = Math.round(normalized / this.angleStep) % total;
    this.selectBookIndex(nearestIdx, false);
  }

  selectBookIndex(index, trigger360 = false) {
    this.activeBookIndex = index;
    const target = -index * this.angleStep;
    
    // Adjust targetAngle to take the shortest rotation path
    const currentRotations = Math.round((this.targetAngle - target) / 360);
    this.targetAngle = target + (currentRotations * 360);

    this.updateSpotlightCard();

    if (trigger360) {
      const book = this.books[index];
      this.spinBook360(book.id);
    }
  }

  rotateOrbitStep(direction) {
    const total = this.books.length;
    let nextIdx = (this.activeBookIndex + direction) % total;
    if (nextIdx < 0) nextIdx += total;
    this.selectBookIndex(nextIdx, false);
  }

  toggleAutoSpin() {
    this.autoSpin = !this.autoSpin;
    this.autoSpinLabel.textContent = this.autoSpin ? 'Pause Spin' : 'Auto Spin';
    this.autoSpinIcon.setAttribute('data-lucide', this.autoSpin ? 'pause' : 'play');
    lucide.createIcons();
  }

  // 360-Degree Book Spin trigger
  spinBook360(bookId) {
    const model = document.getElementById(`model-${bookId}`);
    if (!model) return;

    // Reset previous animation if any
    model.classList.remove('spin-active');
    void model.offsetWidth; // trigger reflow
    model.classList.add('spin-active');

    setTimeout(() => {
      model.classList.remove('spin-active');
    }, 1300);

    this.showToast(`Rotating "${this.books.find(b => b.id === bookId)?.title}" 360°!`, 'info');
  }

  spinActiveBook360() {
    const activeBook = this.books[this.activeBookIndex];
    if (activeBook) {
      this.spinBook360(activeBook.id);
    }
  }

  updateSpotlightCard() {
    const book = this.books[this.activeBookIndex];
    if (!book || !this.spotlightCard) return;

    const isBorrowed = this.isBookBorrowed(book.id);
    const inWishlist = this.isBookInWishlist(book.id);

    this.spotlightCard.innerHTML = `
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <!-- 3D Mini Thumbnail Preview -->
        <div class="w-24 h-36 flex-shrink-0 rounded-xl overflow-hidden shadow-lg book-card-3d cursor-pointer" onclick="app.openInspector('${book.id}')">
          <img src="${book.cover}" alt="${book.title}" class="w-full h-full object-cover">
        </div>

        <!-- Book Information -->
        <div class="flex-1 min-w-0 text-center sm:text-left">
          <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
              ${book.genre}
            </span>
            <span class="text-xs font-semibold text-amber-500 flex items-center gap-1">
              <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i> ${book.rating}
            </span>
            <span class="text-xs text-slate-400">(${book.year})</span>
            <span class="text-xs font-semibold ${isBorrowed ? 'text-amber-500' : 'text-emerald-500'}">
              • ${isBorrowed ? 'Currently Borrowed' : 'Available to Borrow'}
            </span>
          </div>

          <h3 class="font-display font-bold text-xl text-slate-900 dark:text-white leading-tight">${book.title}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">By ${book.author} — ${book.pages} pages</p>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
            ${book.synopsis}
          </p>

          <!-- Interactive Action Buttons -->
          <div class="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <button onclick="app.spinBook360('${book.id}')" class="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition flex items-center gap-1.5">
              <i data-lucide="rotate-cw" class="w-3.5 h-3.5"></i>
              <span>Spin 360°</span>
            </button>

            <button onclick="app.openInspector('${book.id}')" class="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition flex items-center gap-1.5">
              <i data-lucide="rotate-3d" class="w-3.5 h-3.5"></i>
              <span>3D Inspector</span>
            </button>

            <button onclick="app.toggleBorrow('${book.id}')" class="px-4 py-2 rounded-xl text-xs font-semibold text-white transition shadow-md ${
              isBorrowed ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
            }">
              ${isBorrowed ? 'Return Book' : 'Borrow Book'}
            </button>

            <button onclick="app.toggleWishlist('${book.id}')" class="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition ${
              inWishlist ? 'text-rose-500' : 'text-slate-400'
            }" title="Save to wishlist">
              <i data-lucide="bookmark" class="w-4 h-4 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    lucide.createIcons();
  }

  // ==========================================================================
  // FULL 3D INTERACTIVE BOOK INSPECTOR (FREE 360° ORBIT + COVER FLIP)
  // ==========================================================================
  openInspector(bookId) {
    const book = this.books.find(b => b.id === bookId);
    if (!book) return;

    this.inspectorCurrentBook = book;
    this.inspectorRotX = -10;
    this.inspectorRotY = 25;
    this.inspectorCoverOpen = false;
    this.inspectorBookTitle.textContent = `${book.title} (3D Model)`;

    const isBorrowed = this.isBookBorrowed(book.id);
    this.inspectorBorrowBtn.textContent = isBorrowed ? 'Return Book' : 'Borrow Book';
    this.inspectorBorrowBtn.className = `px-5 py-2.5 rounded-xl text-xs font-semibold text-white shadow-md transition ${
      isBorrowed ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
    }`;
    this.inspectorBorrowBtn.onclick = () => {
      this.toggleBorrow(book.id);
      this.openInspector(book.id);
    };

    // Construct 3D book inside inspector
    this.inspectorBookBox.className = 'inspector-book-box';
    this.inspectorBookBox.innerHTML = `
      <!-- Front Cover -->
      <div class="book-face book-face-front bg-slate-900">
        <img src="${book.cover}" alt="${book.title}" class="w-full h-full object-cover">
      </div>

      <!-- Inside Page (Shown when cover flips open) -->
      <div class="inspector-inside-page">
        <div class="border-b border-amber-900/20 pb-2 mb-2">
          <h4 class="font-bold text-sm text-amber-950 font-serif">${book.title}</h4>
          <p class="text-[10px] text-amber-800">By ${book.author} — First Edition (${book.year})</p>
        </div>
        <p class="italic text-[11px] leading-relaxed text-slate-800">
          "${book.excerpt}"
        </p>
        <p class="mt-3 text-[10px] text-slate-500 leading-normal">
          ${book.synopsis.slice(0, 140)}...
        </p>
      </div>

      <!-- Back Cover -->
      <div class="book-face book-face-back">
        <div>
          <span class="text-[10px] font-bold uppercase text-blue-400">${book.genre}</span>
          <h4 class="font-bold text-xs text-white mt-1">${book.title}</h4>
          <p class="text-[11px] text-slate-300 mt-2 leading-relaxed">${book.synopsis}</p>
        </div>
        <div class="pt-2 border-t border-slate-700 flex items-center justify-between text-[10px] text-slate-400">
          <span>${book.pages} Pages</span>
          <span class="font-mono">ISBN: 978-${Math.floor(100000000 + Math.random() * 900000000)}</span>
        </div>
      </div>

      <!-- Spine -->
      <div class="book-face book-face-spine" style="background: ${book.spineColor || '#1e293b'};">
        <span class="text-[9px] font-bold opacity-80">${book.genre.slice(0, 3)}</span>
        <span class="spine-title">${book.title}</span>
        <span class="text-[9px] opacity-80">★ ${book.rating}</span>
      </div>

      <!-- Edges -->
      <div class="book-face book-face-right"></div>
      <div class="book-face book-face-top"></div>
      <div class="book-face book-face-bottom"></div>
    `;

    this.updateInspectorTransform();

    this.inspectorModal.classList.remove('opacity-0', 'pointer-events-none');
    this.inspectorModal.classList.add('opacity-100', 'pointer-events-auto');
    this.inspectorModal.querySelector('div').classList.remove('scale-95');
    this.inspectorModal.querySelector('div').classList.add('scale-100');
    lucide.createIcons();
  }

  closeInspector() {
    this.inspectorModal.classList.add('opacity-0', 'pointer-events-none');
    this.inspectorModal.classList.remove('opacity-100', 'pointer-events-auto');
    this.inspectorModal.querySelector('div').classList.add('scale-95');
    this.inspectorModal.querySelector('div').classList.remove('scale-100');
  }

  bindInspectorInteractions() {
    this.closeInspectorBtn.addEventListener('click', () => this.closeInspector());
    this.inspectorModal.addEventListener('click', (e) => {
      if (e.target === this.inspectorModal) this.closeInspector();
    });

    // Drag to freely rotate 3D book in inspector
    this.inspectorStage.addEventListener('pointerdown', (e) => {
      this.inspectorIsDragging = true;
      this.inspectorStartX = e.clientX;
      this.inspectorStartY = e.clientY;
    });

    window.addEventListener('pointermove', (e) => {
      if (!this.inspectorIsDragging) return;
      const deltaX = e.clientX - this.inspectorStartX;
      const deltaY = e.clientY - this.inspectorStartY;

      this.inspectorRotY += deltaX * 0.6;
      this.inspectorRotX = Math.max(-60, Math.min(60, this.inspectorRotX - (deltaY * 0.5)));

      this.inspectorStartX = e.clientX;
      this.inspectorStartY = e.clientY;
      this.updateInspectorTransform();
    });

    window.addEventListener('pointerup', () => {
      this.inspectorIsDragging = false;
    });

    // 360-degree smooth spin in Inspector
    this.inspectorSpin360Btn.addEventListener('click', () => {
      const startRotY = this.inspectorRotY;
      const targetRotY = startRotY + 360;
      let startTime = null;
      const duration = 1200;

      const animateSpin = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // easeInOutQuad
        const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        this.inspectorRotY = startRotY + (360 * ease);
        this.updateInspectorTransform();

        if (progress < 1) {
          requestAnimationFrame(animateSpin);
        }
      };
      requestAnimationFrame(animateSpin);
    });

    // Open/Close Cover in Inspector
    this.inspectorFlipCoverBtn.addEventListener('click', () => {
      this.inspectorCoverOpen = !this.inspectorCoverOpen;
      this.inspectorBookBox.classList.toggle('cover-open', this.inspectorCoverOpen);
      this.flipCoverLabel.textContent = this.inspectorCoverOpen ? 'Close Cover' : 'Open Cover';
    });

    // Reset Angle
    this.inspectorResetAngleBtn.addEventListener('click', () => {
      this.inspectorRotX = -10;
      this.inspectorRotY = 25;
      this.inspectorCoverOpen = false;
      this.inspectorBookBox.classList.remove('cover-open');
      this.flipCoverLabel.textContent = 'Open Cover';
      this.updateInspectorTransform();
    });
  }

  updateInspectorTransform() {
    if (this.inspectorBookBox) {
      this.inspectorBookBox.style.transform = `rotateX(${this.inspectorRotX}deg) rotateY(${this.inspectorRotY}deg)`;
    }
  }

  // ==========================================================================
  // BORROW & WISHLIST LOGIC
  // ==========================================================================
  isBookBorrowed(bookId) {
    return this.borrowed.some(item => item.id === bookId);
  }

  isBookInWishlist(bookId) {
    return this.wishlist.includes(bookId);
  }

  toggleBorrow(bookId) {
    const existingIndex = this.borrowed.findIndex(item => item.id === bookId);
    const book = this.books.find(b => b.id === bookId);
    if (!book) return;

    if (existingIndex >= 0) {
      this.borrowed.splice(existingIndex, 1);
      this.saveBorrowed();
      this.showToast(`Returned "${book.title}" to library.`, 'info');
    } else {
      if (this.borrowed.length >= 5) {
        this.showToast('Borrowing limit reached (maximum 5 books)!', 'error');
        return;
      }
      const now = new Date();
      const dueDate = new Date();
      dueDate.setDate(now.getDate() + 14);

      this.borrowed.push({
        id: bookId,
        borrowDate: now.toISOString(),
        dueDate: dueDate.toISOString()
      });
      this.saveBorrowed();
      this.showToast(`Borrowed "${book.title}". Due in 14 days.`, 'success');
    }

    this.setup3DOrbit();
    this.render();
  }

  toggleWishlist(bookId) {
    const index = this.wishlist.indexOf(bookId);
    const book = this.books.find(b => b.id === bookId);

    if (index >= 0) {
      this.wishlist.splice(index, 1);
      this.showToast(`Removed from wishlist.`, 'info');
    } else {
      this.wishlist.push(bookId);
      this.showToast(`Saved "${book ? book.title : 'Book'}" to wishlist!`, 'success');
    }

    this.saveWishlist();
    this.render();
    this.updateSpotlightCard();
  }

  // ==========================================================================
  // MODALS, SHELF, AND WISHLIST DRAWERS
  // ==========================================================================
  openBookModal(bookId) {
    const book = this.books.find(b => b.id === bookId);
    if (!book) return;

    const isBorrowed = this.isBookBorrowed(bookId);
    const inWishlist = this.isBookInWishlist(bookId);

    this.modalContent.innerHTML = `
      <button onclick="app.closeBookModal()" class="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <div class="flex flex-col sm:flex-row gap-6">
        <div class="w-36 h-52 flex-shrink-0 mx-auto sm:mx-0 rounded-xl overflow-hidden shadow-xl book-card-3d cursor-pointer" onclick="app.openInspector('${book.id}')" title="Click to view in 3D">
          <img src="${book.cover}" alt="${book.title}" class="w-full h-full object-cover">
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
              ${book.genre}
            </span>
            <span class="text-xs font-medium text-amber-500 flex items-center gap-1">
              <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i> ${book.rating}
            </span>
            <span class="text-xs text-slate-400">(${book.year})</span>
          </div>

          <h2 class="font-display font-bold text-2xl text-slate-900 dark:text-white leading-snug">${book.title}</h2>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">By ${book.author}</p>

          <div class="grid grid-cols-2 gap-3 py-3 my-4 border-y border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <span class="text-slate-400">Pages:</span>
              <span class="font-semibold text-slate-800 dark:text-slate-200 ml-1">${book.pages}</span>
            </div>
            <div>
              <span class="text-slate-400">Status:</span>
              <span class="font-semibold ${isBorrowed ? 'text-amber-500' : 'text-emerald-500'} ml-1">
                ${isBorrowed ? 'Borrowed' : 'Available'}
              </span>
            </div>
          </div>

          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Synopsis</h4>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-h-36 overflow-y-auto pr-1">
              ${book.synopsis}
            </p>
          </div>

          <div class="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs italic text-slate-600 dark:text-slate-300">
            <p class="font-serif">"${book.excerpt}"</p>
          </div>

          <div class="mt-6 flex items-center gap-3">
            <button onclick="app.toggleBorrow('${book.id}')" class="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow-md transition ${
              isBorrowed ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
            }">
              ${isBorrowed ? 'Return Book' : 'Borrow Book'}
            </button>

            <button onclick="app.closeBookModal(); app.openInspector('${book.id}');" class="px-4 py-2.5 rounded-xl text-sm font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition flex items-center gap-1.5">
              <i data-lucide="rotate-3d" class="w-4 h-4"></i>
              <span>3D View</span>
            </button>

            <button onclick="app.toggleWishlist('${book.id}')" class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition ${
              inWishlist ? 'text-rose-500 fill-rose-500' : 'text-slate-500'
            }">
              <i data-lucide="bookmark" class="w-5 h-5 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    this.bookModal.classList.remove('opacity-0', 'pointer-events-none');
    this.bookModal.classList.add('opacity-100', 'pointer-events-auto');
    this.bookModal.querySelector('div').classList.remove('scale-95');
    this.bookModal.querySelector('div').classList.add('scale-100');
    lucide.createIcons();
  }

  closeBookModal() {
    this.bookModal.classList.add('opacity-0', 'pointer-events-none');
    this.bookModal.classList.remove('opacity-100', 'pointer-events-auto');
    this.bookModal.querySelector('div').classList.add('scale-95');
    this.bookModal.querySelector('div').classList.remove('scale-100');
  }

  openShelf() {
    this.renderShelfList();
    this.shelfDrawer.classList.remove('pointer-events-none');
    this.shelfBackdrop.classList.remove('opacity-0');
    this.shelfBackdrop.classList.add('opacity-100');
    this.shelfPanel.classList.remove('translate-x-full');
    lucide.createIcons();
  }

  closeShelf() {
    this.shelfBackdrop.classList.add('opacity-0');
    this.shelfBackdrop.classList.remove('opacity-100');
    this.shelfPanel.classList.add('translate-x-full');
    setTimeout(() => {
      this.shelfDrawer.classList.add('pointer-events-none');
    }, 300);
  }

  openWishlist() {
    this.renderWishlistList();
    this.wishlistDrawer.classList.remove('pointer-events-none');
    this.wishlistBackdrop.classList.remove('opacity-0');
    this.wishlistBackdrop.classList.add('opacity-100');
    this.wishlistPanel.classList.remove('translate-x-full');
    lucide.createIcons();
  }

  closeWishlist() {
    this.wishlistBackdrop.classList.add('opacity-0');
    this.wishlistBackdrop.classList.remove('opacity-100');
    this.wishlistPanel.classList.add('translate-x-full');
    setTimeout(() => {
      this.wishlistDrawer.classList.add('pointer-events-none');
    }, 300);
  }

  openAddModal() {
    this.addBookModal.classList.remove('opacity-0', 'pointer-events-none');
    this.addBookModal.classList.add('opacity-100', 'pointer-events-auto');
    this.addBookModal.querySelector('div').classList.remove('scale-95');
    this.addBookModal.querySelector('div').classList.add('scale-100');
    lucide.createIcons();
  }

  closeAddModal() {
    this.addBookModal.classList.add('opacity-0', 'pointer-events-none');
    this.addBookModal.classList.remove('opacity-100', 'pointer-events-auto');
    this.addBookModal.querySelector('div').classList.add('scale-95');
    this.addBookModal.querySelector('div').classList.remove('scale-100');
  }

  handleAddBook(e) {
    e.preventDefault();
    const title = document.getElementById('newBookTitle').value.trim();
    const author = document.getElementById('newBookAuthor').value.trim();
    const genre = document.getElementById('newBookGenre').value;
    const year = parseInt(document.getElementById('newBookYear').value, 10) || new Date().getFullYear();
    const pages = parseInt(document.getElementById('newBookPages').value, 10) || 300;
    const rating = parseFloat(document.getElementById('newBookRating').value) || 4.8;
    const cover = document.getElementById('newBookCover').value.trim() || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop';
    const synopsis = document.getElementById('newBookDesc').value.trim();

    const colors = ['#1e3a8a', '#4c1d95', '#065f46', '#7c2d12', '#831843', '#1e293b'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newBook = {
      id: 'custom_' + Date.now(),
      title,
      author,
      genre,
      year,
      pages,
      rating,
      cover,
      spineColor: randomColor,
      synopsis,
      excerpt: synopsis.slice(0, 160) + '...'
    };

    this.books.unshift(newBook);
    this.saveBooks();
    this.closeAddModal();
    this.addBookForm.reset();
    this.showToast(`Book "${title}" added to 3D Library!`, 'success');
    this.setup3DOrbit();
    this.render();
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast-animate flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-sm font-medium pointer-events-auto ${
      type === 'success' 
        ? 'bg-emerald-600 text-white' 
        : type === 'error'
        ? 'bg-rose-600 text-white'
        : 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
    }`;

    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle-2';
    if (type === 'error') iconName = 'alert-triangle';

    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-4 h-4 flex-shrink-0"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  renderShelfList() {
    this.shelfLimitStatus.textContent = `${this.borrowed.length} / 5 Books`;

    if (this.borrowed.length === 0) {
      this.shelfList.innerHTML = `
        <div class="text-center py-16">
          <div class="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-500 flex items-center justify-center mx-auto mb-3">
            <i data-lucide="book-open" class="w-7 h-7"></i>
          </div>
          <p class="font-display font-semibold text-slate-800 dark:text-slate-200">Your shelf is empty</p>
          <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">Borrow books from the 3D Orbit or Grid to track them here.</p>
        </div>
      `;
      return;
    }

    this.shelfList.innerHTML = this.borrowed.map(item => {
      const book = this.books.find(b => b.id === item.id);
      if (!book) return '';

      const dueDateObj = new Date(item.dueDate);
      const daysLeft = Math.ceil((dueDateObj - new Date()) / (1000 * 60 * 60 * 24));

      return `
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex gap-4 items-center">
          <img src="${book.cover}" alt="${book.title}" class="w-14 h-20 object-cover rounded-lg shadow-sm flex-shrink-0 cursor-pointer" onclick="app.openInspector('${book.id}')">
          <div class="flex-1 min-w-0">
            <h4 class="font-display font-bold text-sm text-slate-900 dark:text-white truncate">${book.title}</h4>
            <p class="text-xs text-slate-500 truncate">By ${book.author}</p>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-[11px] px-2 py-0.5 rounded-full ${daysLeft <= 3 ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'} font-medium">
                ${daysLeft > 0 ? `${daysLeft} days left` : 'Due today'}
              </span>
            </div>
          </div>
          <button onclick="app.toggleBorrow('${book.id}')" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 hover:bg-rose-100 transition flex-shrink-0">
            Return
          </button>
        </div>
      `;
    }).join('');
  }

  renderWishlistList() {
    if (this.wishlist.length === 0) {
      this.wishlistContainer.innerHTML = `
        <div class="text-center py-16">
          <div class="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-slate-800 text-rose-500 flex items-center justify-center mx-auto mb-3">
            <i data-lucide="bookmark" class="w-7 h-7"></i>
          </div>
          <p class="font-display font-semibold text-slate-800 dark:text-slate-200">No saved books</p>
          <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">Bookmark your favorite books to read them later.</p>
        </div>
      `;
      return;
    }

    this.wishlistContainer.innerHTML = this.wishlist.map(id => {
      const book = this.books.find(b => b.id === id);
      if (!book) return '';
      const isBorrowed = this.isBookBorrowed(book.id);

      return `
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex gap-4 items-center">
          <img src="${book.cover}" alt="${book.title}" class="w-14 h-20 object-cover rounded-lg shadow-sm flex-shrink-0 cursor-pointer" onclick="app.openInspector('${book.id}')">
          <div class="flex-1 min-w-0">
            <h4 class="font-display font-bold text-sm text-slate-900 dark:text-white truncate">${book.title}</h4>
            <p class="text-xs text-slate-500 truncate">By ${book.author}</p>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-[11px] font-semibold text-amber-500">★ ${book.rating}</span>
              <span class="text-[11px] text-slate-400">(${book.genre})</span>
            </div>
          </div>
          <div class="flex flex-col gap-1 flex-shrink-0">
            <button onclick="app.toggleBorrow('${book.id}')" class="px-3 py-1 text-xs font-semibold rounded-lg ${isBorrowed ? 'bg-amber-100 text-amber-700' : 'bg-blue-600 text-white hover:bg-blue-700'} transition">
              ${isBorrowed ? 'Return' : 'Borrow'}
            </button>
            <button onclick="app.toggleWishlist('${book.id}')" class="text-[11px] text-slate-400 hover:text-rose-500 transition text-center py-0.5">
              Remove
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================================================
  // GRID CATALOG RENDERING
  // ==========================================================================
  getFilteredBooks() {
    return this.books.filter(book => {
      const matchesGenre = this.currentGenre === 'all' || book.genre.toLowerCase() === this.currentGenre.toLowerCase();
      const matchesSearch = !this.searchQuery || 
        book.title.toLowerCase().includes(this.searchQuery) ||
        book.author.toLowerCase().includes(this.searchQuery) ||
        book.genre.toLowerCase().includes(this.searchQuery);
      const isBorrowed = this.isBookBorrowed(book.id);
      const matchesAvailability = !this.availableOnly || !isBorrowed;

      return matchesGenre && matchesSearch && matchesAvailability;
    }).sort((a, b) => {
      if (this.sortBy === 'popular') return (b.rating * 100 + b.year) - (a.rating * 100 + a.year);
      if (this.sortBy === 'rating') return b.rating - a.rating;
      if (this.sortBy === 'title') return a.title.localeCompare(b.title);
      if (this.sortBy === 'year') return b.year - a.year;
      return 0;
    });
  }

  resetFilters() {
    this.searchQuery = '';
    this.navSearch.value = '';
    this.mobileSearch.value = '';
    this.clearSearchBtn.classList.add('hidden');
    this.currentGenre = 'all';
    this.availableOnly = false;
    this.availableToggle.checked = false;
    this.sortBy = 'popular';
    this.sortSelect.value = 'popular';

    this.genrePills.forEach(p => {
      p.classList.toggle('active', p.dataset.genre === 'all');
    });

    this.render();
  }

  render() {
    const filtered = this.getFilteredBooks();

    this.borrowedBadge.textContent = this.borrowed.length;
    this.wishlistBadge.textContent = this.wishlist.length;
    this.wishlistBadge.classList.toggle('scale-0', this.wishlist.length === 0);
    this.wishlistBadge.classList.toggle('scale-100', this.wishlist.length > 0);

    const hasActiveFilters = this.currentGenre !== 'all' || this.searchQuery || this.availableOnly || this.sortBy !== 'popular';
    this.resetFiltersBtn.classList.toggle('hidden', !hasActiveFilters);
    this.resultsCount.textContent = `Showing ${filtered.length} of ${this.books.length} books`;

    if (filtered.length === 0) {
      this.booksGrid.innerHTML = '';
      this.emptyState.classList.remove('hidden');
    } else {
      this.emptyState.classList.add('hidden');
      this.booksGrid.innerHTML = filtered.map(book => {
        const isBorrowed = this.isBookBorrowed(book.id);
        const inWishlist = this.isBookInWishlist(book.id);

        return `
          <div class="book-card group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
            <div>
              <div class="relative w-full aspect-[3/4] mb-4 rounded-2xl overflow-hidden book-cover-wrap cursor-pointer" onclick="app.openInspector('${book.id}')">
                <img 
                  src="${book.cover}" 
                  alt="${book.title}" 
                  loading="lazy"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute top-3 left-3 z-20">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-sm ${
                    isBorrowed 
                      ? 'bg-amber-900/80 text-amber-200 border border-amber-700/50' 
                      : 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50'
                  }">
                    <span class="w-1.5 h-1.5 rounded-full ${isBorrowed ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}"></span>
                    ${isBorrowed ? 'Borrowed' : 'Available'}
                  </span>
                </div>

                <button 
                  onclick="event.stopPropagation(); app.toggleWishlist('${book.id}')"
                  class="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:scale-110 active:scale-95 transition shadow-sm"
                  title="Save to wishlist"
                >
                  <i data-lucide="bookmark" class="w-4 h-4 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}"></i>
                </button>
              </div>

              <div class="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span class="font-medium text-blue-600 dark:text-blue-400">${book.genre}</span>
                <span class="flex items-center gap-1 font-semibold text-amber-500">
                  <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
                  ${book.rating}
                </span>
              </div>

              <h3 
                class="font-display font-bold text-base text-slate-900 dark:text-white leading-tight line-clamp-1 cursor-pointer hover:text-blue-600 transition" 
                onclick="app.openBookModal('${book.id}')"
              >
                ${book.title}
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">By ${book.author}</p>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
              <button 
                onclick="app.openInspector('${book.id}')"
                class="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 transition flex items-center justify-center gap-1"
                title="View in 3D"
              >
                <i data-lucide="rotate-3d" class="w-3.5 h-3.5"></i>
                <span>3D View</span>
              </button>
              <button 
                onclick="app.toggleBorrow('${book.id}')"
                class="flex-1 py-2 px-3 text-xs font-semibold rounded-xl text-white transition shadow-sm ${
                  isBorrowed 
                    ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
                }"
              >
                ${isBorrowed ? 'Return' : 'Borrow'}
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    lucide.createIcons();
  }
}

// Global initialization
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new LibraryApp();
});
