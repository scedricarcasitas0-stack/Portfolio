/* =========================================================
   ACADEMIC PORTFOLIO — SCRIPT
   Data-driven rendering for Quizzes, Activities, and Other
   Academic Works, plus a simple image lightbox and mobile nav.

   TO ADD A NEW ENTRY: add an object to the matching array
   below (quizzes / activities / others). No HTML editing
   needed — the card is generated automatically.
   ========================================================= */

/* ---------- 1. DATA ---------- */
/* files: { name: "shown filename", type: "PDF" | "DOCX" | "PPTX" | ..., url: "path/to/file" }
   images: { src: "path/to/image", alt: "description" }              */

const quizzes = [
  {
    title: "",
    subject: "",
    date: "",
    description: "",
    
    images: []
  },
  {
    title: "Quiz 2: Relational Algebra",
    subject: "CS 214 — Database Systems",
    date: "Aug 29, 2026",
    description: "Quiz on relational algebra operations and normalization rules.",
    files: [
      { name: "quiz2-relational-algebra.docx", type: "DOCX", url: "#" }
    ],
    images: [
      { src: "https://placehold.co/300x200/191919/9a9a95?text=Scanned+Page+1", alt: "Scanned answer sheet, page 1" }
    ]
  },
  {
    title: "",
    subject: "",
    date: "",
    description: "",
    files: [],
    images: []
  }
];

const activities = [
  {
    title: "Emerging Technology Comprehensive Report",
    subject: "",
    date: "September 11, 2026",
    description: "Module: Activity 1.",
    files: [
      { name: "Emerging Technology Comprehensive Report.pdf", type: "PDF", url: "./Emerging%20Technology%20Comprehensive%20Report.pdf" }
    ],
    images: []
  },
  {
    title: "Comprehensive Interview Guide for Emerging Technologies",
    subject: "",
    date: "September 11, 2026",
    description: "Module: Activity 2.",
    files: [
      { name: "Comprehensive_Interview_Guide _for_Emerging_Technologies.pdf", type: "PDF", url: "./Comprehensive_Interview_Guide%20_for_Emerging_Technologies.pdf" }
    ],
    images: []
  }
];

const others = [
  {
    title: "",
    subject: "",
    date: "",
    type: "",
    images: []
  },
  {
    title: "",
    subject: "",
    date: "",
    type: "",
    images: []
  }
];

/* ---------- 2. RENDERING ---------- */

/** Build a single entry card and return it as a DOM node. */
function createCard(entry) {
  const card = document.createElement("article");
  card.className = "card";

  const head = document.createElement("div");
  head.className = "card-head";

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = entry.title;

  const date = document.createElement("span");
  date.className = "card-date";
  date.textContent = entry.date;

  head.appendChild(title);
  head.appendChild(date);
  card.appendChild(head);

  if (entry.subject) {
    const subject = document.createElement("span");
    subject.className = "card-subject";
    subject.textContent = entry.type ? `${entry.type} · ${entry.subject}` : entry.subject;
    card.appendChild(subject);
  }

  if (entry.description) {
    const desc = document.createElement("p");
    desc.className = "card-desc";
    desc.textContent = entry.description;
    card.appendChild(desc);
  }

  if (entry.images && entry.images.length) {
    const thumbRow = document.createElement("div");
    thumbRow.className = "thumb-row";
    entry.images.forEach((img) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", `View larger image: ${img.alt}`);
      const thumb = document.createElement("img");
      thumb.src = img.src;
      thumb.alt = img.alt;
      btn.appendChild(thumb);
      btn.addEventListener("click", () => openLightbox(img.src, img.alt));
      thumbRow.appendChild(btn);
    });
    card.appendChild(thumbRow);
  }

  if (entry.files && entry.files.length) {
    const list = document.createElement("ul");
    list.className = "file-list";
    entry.files.forEach((file) => {
      const item = document.createElement("li");
      item.className = "file-item";

      const type = document.createElement("span");
      type.className = "file-type";
      type.textContent = file.type;

      const link = document.createElement("a");
      link.href = file.url;
      link.textContent = file.name;
      link.target = "_blank";
      link.rel = "noopener";

      item.appendChild(type);
      item.appendChild(link);
      list.appendChild(item);
    });
    card.appendChild(list);
  }

  return card;
}

/** Render an array of entries into a container by id. */
function renderSection(entries, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  entries.forEach((entry) => container.appendChild(createCard(entry)));
}

function appendAddEntryBox(containerId, label) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const addTile = document.createElement("button");
  addTile.type = "button";
  addTile.className = "add-entry-box";
  addTile.setAttribute("aria-label", `Add ${label}`);

  const addIcon = document.createElement("span");
  addIcon.className = "add-entry-icon";
  addIcon.textContent = "+";

  addTile.appendChild(addIcon);
  container.appendChild(addTile);
}

appendAddEntryBox("quizzesGrid", "quiz");
// Intentionally left empty: quiz entries removed, keep the add-entry box.

appendAddEntryBox("activitiesGrid", "activity");
renderSection(activities, "activitiesGrid");

appendAddEntryBox("othersGrid", "exam");
// Intentionally left empty: examination entries removed, keep the add-entry box.

/* ---------- 3. LIGHTBOX ---------- */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* ---------- 4. MOBILE NAVIGATION ---------- */

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------- 5. ACTIVE NAV LINK ON SCROLL ---------- */

const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  let currentId = sections[0] ? sections[0].id : "";
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120) currentId = section.id;
  });
  navAnchors.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();