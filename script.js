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
