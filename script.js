const year = document.querySelector("#year");
const header = document.querySelector(".site-header");
const progress = document.querySelector(".scroll-progress span");

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateScrollUI = () => {
  const scrollTop = window.scrollY;
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const scrollRatio = scrollRange > 0 ? Math.min(scrollTop / scrollRange, 1) : 0;

  header?.classList.toggle("scrolled", scrollTop > 24);

  if (progress) {
    progress.style.transform = `scaleX(${scrollRatio})`;
  }
};

updateScrollUI();
window.addEventListener("scroll", updateScrollUI, { passive: true });

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const spied = ["#top", ...navLinks.map((link) => link.getAttribute("href"))]
  .map((id) => document.querySelector(id))
  .filter(Boolean);

if ("IntersectionObserver" in window && spied.length) {
  const setActive = (id) => {
    navLinks.forEach((link) =>
      link.classList.toggle("is-active", link.getAttribute("href") === id),
    );
  };

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(`#${entry.target.id}`);
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" },
  );

  spied.forEach((section) => navObserver.observe(section));
}
