const books = [
  { image: "images/rich-dad-poor-dad.jpg", title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki", genre: "finance", pages: 336, featured: true, year: 1997, url: "books/rich-dad-poor-dad.pdf", blurb: "Mindset shifts to build assets, escape the rat race, and grow wealth." },
  { image: "images/atomic-habits.jpg", title: "Atomic Habits", author: "James Clear", genre: "productivity", pages: 320, featured: true, year: 2018, url: "books/atomic-habits.pdf", blurb: "Practical systems to compound tiny improvements into big results." },
  { image: "images/the-alchemist.jpg", title: "The Alchemist", author: "Paulo Coelho", genre: "fiction", pages: 208, featured: true, year: 1988, url: "books/the-alchemist.pdf", blurb: "A shepherd’s search for treasure becomes a journey of self-discovery." },
  { image: "images/deep-work.jpg", title: "Deep Work", author: "Cal Newport", genre: "productivity", pages: 304, featured: false, year: 2016, url: "books/deep-work.pdf", blurb: "Focus rituals to do meaningful work and avoid digital noise." },
  { image: "images/think-and-grow-rich.jpg", title: "Think and Grow Rich", author: "Napoleon Hill", genre: "finance", pages: 320, featured: false, year: 1937, url: "books/think-and-grow-rich.pdf", blurb: "Classic principles for goal-setting, belief, and disciplined action." },
  { image: "images/ikigai.jpg", title: "Ikigai", author: "Héctor García & Francesc Miralles", genre: "self-help", pages: 208, featured: false, year: 2016, url: "books/ikigai.pdf", blurb: "Finding purpose and longevity lessons from Okinawa’s centenarians." },
  { image: "images/the-7-habits-of-highly-effective-people.jpg", title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", genre: "self-help", pages: 381, featured: true, year: 1989, url: "books/7-habits.pdf", blurb: "Timeless principles to align actions with values and effectiveness." },
  { image: "images/can-t-hurt-me.jpg", title: "Can't Hurt Me", author: "David Goggins", genre: "biography", pages: 364, featured: false, year: 2018, url: "books/cant-hurt-me.pdf", blurb: "Navy SEAL mindset lessons on grit, resilience, and pushing limits." },
  { image: "images/make-your-bed.jpg", title: "Make Your Bed", author: "Admiral William H. McRaven", genre: "self-help", pages: 144, featured: false, year: 2017, url: "books/make-your-bed.pdf", blurb: "Small daily wins that stack into life-changing momentum." },
  { image: "images/sapiens.jpg", title: "Sapiens", author: "Yuval Noah Harari", genre: "history", pages: 498, featured: false, year: 2011, url: "books/sapiens.pdf", blurb: "A brief history of humankind and the stories that shaped us." },
  { image: "images/educated.jpg", title: "Educated", author: "Tara Westover", genre: "biography", pages: 352, featured: false, year: 2018, url: "books/educated.pdf", blurb: "A memoir about self-invention through learning and courage." },
  { image: "images/zero-to-one.jpg", title: "Zero to One", author: "Peter Thiel", genre: "finance", pages: 224, featured: false, year: 2014, url: "books/zero-to-one.pdf", blurb: "Building transformative startups and thinking from first principles." },
  { image: "images/dune.jpg", title: "Dune", author: "Frank Herbert", genre: "sci-fi", pages: 412, featured: true, year: 1965, url: "books/dune.pdf", blurb: "Epic sci-fi saga of politics, ecology, and prophecy on Arrakis." },
  { image: "images/project-hail-mary.jpg", title: "Project Hail Mary", author: "Andy Weir", genre: "sci-fi", pages: 496, featured: false, year: 2021, url: "books/project-hail-mary.pdf", blurb: "A lone astronaut races to save Earth with science and grit." },
  { image: "images/the-psychology-of-money.jpg", title: "The Psychology of Money", author: "Morgan Housel", genre: "finance", pages: 256, featured: false, year: 2020, url: "books/psychology-of-money.pdf", blurb: "Timeless lessons on behavior and decision-making with money." },
  { image: "images/1984.jpg", title: "1984", author: "George Orwell", genre: "fiction", pages: 328, featured: false, year: 1949, url: "books/1984.pdf", blurb: "A dystopian warning about surveillance, truth, and freedom." },
  { image: "images/the-subtle-art-of-not-giving-a-f-ck.jpg", title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", genre: "self-help", pages: 224, featured: false, year: 2016, url: "books/subtle-art.pdf", blurb: "A contrarian look at values, meaning, and choosing what matters." },
  { image: "images/the-lean-startup.jpg", title: "The Lean Startup", author: "Eric Ries", genre: "productivity", pages: 320, featured: false, year: 2011, url: "books/lean-startup.pdf", blurb: "Validate ideas, build-measure-learn, and iterate to success." }
];

const featuredGrid = document.getElementById("featuredGrid");
const libraryContainer = document.getElementById("libraryContainer");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const resetFilters = document.getElementById("resetFilters");
const statCount = document.getElementById("statCount");
const authModal = document.getElementById("authModal");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const closeAuth = document.getElementById("closeAuth");
const authTabs = document.querySelectorAll(".auth__tab");
const authTitle = document.getElementById("authTitle");
const authHint = document.getElementById("authHint");
const authForm = document.getElementById("authForm");
const downloadPage = document.getElementById("downloadPage");

const AUTH_KEY = "novareads_authed";
let isAuthed = localStorage.getItem(AUTH_KEY) === "true";

if (statCount) statCount.textContent = books.length.toString();

const svgArrowLeft = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
const svgArrowRight = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

function createCard(book) {
  const card = document.createElement("article");
  card.className = "card";
  
  if (book.featured) {
    const tag = document.createElement("span");
    tag.className = "card__tag";
    tag.textContent = "Featured";
    card.appendChild(tag);
  }

  const title = document.createElement("h3");
  title.className = "card__title";
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "card__author";
  author.textContent = book.author;

  const blurb = document.createElement("p");
  blurb.className = "card__blurb";
  blurb.textContent = book.blurb;

  const meta = document.createElement("div");
  meta.className = "card__meta";
  meta.innerHTML = `<span class="pill">${book.genre}</span><span class="pill">${book.pages} p</span><span class="pill">${book.year}</span>`;

  const actions = document.createElement("div");
  actions.className = "card__actions";
  
  const download = document.createElement("a");
  download.className = "btn btn--primary requires-auth";
  download.href = book.url;
  download.download = "";
  download.textContent = "Download";

  const preview = document.createElement("a");
  preview.className = "btn btn--ghost requires-auth";
  preview.href = book.url;
  preview.target = "_blank";
  preview.rel = "noopener";
  preview.textContent = "Preview";

  actions.append(download, preview);
  card.append(title, author, blurb, meta, actions);
  return card;
}

function renderFeatured(list) {
  if (!featuredGrid) return;
  featuredGrid.innerHTML = "";
  list.filter(b => b.featured).forEach(book => {
    featuredGrid.appendChild(createCard(book));
  });
}

function renderLibrary(list) {
  if (!libraryContainer) return;
  libraryContainer.innerHTML = "";

  if (list.length === 0) {
    libraryContainer.innerHTML = "<p style='color: var(--text-muted); text-align: center; margin-top: 2rem;'>No books found matching your criteria.</p>";
    return;
  }

  // Group books by genre for horizontal scrolling
  const genres = [...new Set(list.map(b => b.genre))].sort();
  
  genres.forEach(genre => {
    const genreBooks = list.filter(b => b.genre === genre);
    
    const categoryRow = document.createElement("div");
    categoryRow.className = "category-row";
    
    const title = document.createElement("h3");
    title.className = "category-title";
    // Capitalize first letter of genre
    title.textContent = genre.charAt(0).toUpperCase() + genre.slice(1);
    categoryRow.appendChild(title);

    const rowContainer = document.createElement("div");
    rowContainer.className = "row-container";

    const btnLeft = document.createElement("button");
    btnLeft.className = "scroll-btn scroll-btn--left";
    btnLeft.innerHTML = svgArrowLeft;
    btnLeft.setAttribute("aria-label", "Scroll left");
    
    const btnRight = document.createElement("button");
    btnRight.className = "scroll-btn scroll-btn--right";
    btnRight.innerHTML = svgArrowRight;
    btnRight.setAttribute("aria-label", "Scroll right");

    const row = document.createElement("div");
    row.className = "row";
    
    genreBooks.forEach(book => {
      row.appendChild(createCard(book));
    });

    // Scroll logic
    btnLeft.addEventListener("click", () => {
      row.scrollBy({ left: -340, behavior: 'smooth' });
    });
    btnRight.addEventListener("click", () => {
      row.scrollBy({ left: 340, behavior: 'smooth' });
    });

    rowContainer.append(btnLeft, row, btnRight);
    categoryRow.appendChild(rowContainer);
    libraryContainer.appendChild(categoryRow);
  });
  
  wireAuthGuards();
}

function applyFilters() {
  const query = searchInput?.value.trim().toLowerCase() || "";
  const genre = genreFilter?.value || "all";
  const filtered = books.filter((book) => {
    const matchesGenre = genre === "all" || book.genre === genre;
    const matchesQuery =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query);
    return matchesGenre && matchesQuery;
  });
  renderFeatured(filtered);
  renderLibrary(filtered);
}

searchForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  applyFilters();
});

genreFilter?.addEventListener("change", applyFilters);
resetFilters?.addEventListener("click", () => {
  if (searchInput) searchInput.value = "";
  if (genreFilter) genreFilter.value = "all";
  applyFilters();
});

// Initial Render
applyFilters();

// Auth Logic
function toggleAuth(open, mode = "login") {
  if (open) {
    authModal.classList.add("auth--open");
    setMode(mode);
  } else {
    authModal.classList.remove("auth--open");
  }
}

function setMode(mode) {
  authTabs.forEach((tab) => {
    const active = tab.dataset.mode === mode;
    tab.classList.toggle("auth__tab--active", active);
  });
  if (mode === "signup") {
    authTitle.textContent = "Create your NovaReads account";
    authHint.textContent = "Already here? Switch to Log in.";
  } else {
    authTitle.textContent = "Log in to NovaReads";
    authHint.textContent = "No account yet? Sign up for free.";
  }
}

loginBtn?.addEventListener("click", () => toggleAuth(true, "login"));
signupBtn?.addEventListener("click", () => toggleAuth(true, "signup"));
closeAuth?.addEventListener("click", () => toggleAuth(false));
authTabs.forEach((tab) =>
  tab.addEventListener("click", () => setMode(tab.dataset.mode))
);
authModal?.addEventListener("click", (e) => {
  if (e.target === authModal) toggleAuth(false);
});
authForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  isAuthed = true;
  localStorage.setItem(AUTH_KEY, "true");
  toggleAuth(false);
  alert("Signed in! Downloads unlocked (demo mode).");
});

function wireAuthGuards() {
  const guarded = document.querySelectorAll(".requires-auth");
  guarded.forEach((btn) => {
    // Remove existing listeners to avoid duplicates on re-render
    const newBtn = btn.cloneNode(true);
    btn.replaceWith(newBtn);
    newBtn.addEventListener("click", (e) => {
      if (!isAuthed) {
        e.preventDefault();
        toggleAuth(true, "login");
      }
    });
  });
}

// On dedicated download page, ensure the auth gate remains in place.
if (downloadPage) {
  wireAuthGuards();
}
