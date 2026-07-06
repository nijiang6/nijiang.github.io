const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
let openLightbox = null;

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (siteNav) {
      siteNav.classList.remove("is-open");
    }

    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

document.querySelectorAll(".media-carousel").forEach((carousel) => {
  const image = carousel.querySelector("img");
  const previous = carousel.querySelector(".carousel-prev");
  const next = carousel.querySelector(".carousel-next");
  const count = carousel.querySelector(".carousel-count");
  const sources = (carousel.dataset.images || "")
    .split(",")
    .map((source) => source.trim())
    .filter(Boolean);

  if (!image || !previous || !next || !count || sources.length === 0) {
    return;
  }

  let index = Math.max(0, sources.indexOf(image.getAttribute("src") || ""));

  const update = () => {
    count.textContent = `${index + 1} / ${sources.length}`;

    if (image.getAttribute("src") === sources[index]) {
      return;
    }

    image.classList.add("is-switching");
    image.addEventListener(
      "load",
      () => {
        image.classList.remove("is-switching");
      },
      { once: true },
    );
    window.setTimeout(() => {
      image.src = sources[index];
    }, 90);
  };

  previous.addEventListener("click", () => {
    index = (index - 1 + sources.length) % sources.length;
    update();
  });

  next.addEventListener("click", () => {
    index = (index + 1) % sources.length;
    update();
  });

  image.addEventListener("click", () => {
    if (openLightbox) {
      openLightbox(sources, index, image.alt || "项目图片预览");
    }
  });

  update();
});

const createLightbox = () => {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "图片预览");
  lightbox.innerHTML = `
    <div class="lightbox-top">
      <span class="lightbox-title"></span>
      <button class="lightbox-close" type="button" aria-label="关闭预览">×</button>
    </div>
    <div class="lightbox-stage">
      <img class="lightbox-image" alt="" />
    </div>
    <div class="lightbox-controls" aria-label="预览图片切换">
      <button class="lightbox-nav lightbox-prev" type="button" aria-label="上一张">‹</button>
      <span class="lightbox-count"></span>
      <button class="lightbox-nav lightbox-next" type="button" aria-label="下一张">›</button>
    </div>
  `;
  document.body.appendChild(lightbox);

  const title = lightbox.querySelector(".lightbox-title");
  const image = lightbox.querySelector(".lightbox-image");
  const count = lightbox.querySelector(".lightbox-count");
  const close = lightbox.querySelector(".lightbox-close");
  const previous = lightbox.querySelector(".lightbox-prev");
  const next = lightbox.querySelector(".lightbox-next");
  let sources = [];
  let index = 0;

  const update = () => {
    image.src = sources[index];
    count.textContent = `${index + 1} / ${sources.length}`;
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove("is-lightbox-open");
  };

  const step = (direction) => {
    index = (index + direction + sources.length) % sources.length;
    update();
  };

  lightbox.addEventListener("click", (event) => {
    const target = event.target;

    if (target === lightbox || target instanceof Element && target.classList.contains("lightbox-stage")) {
      closeLightbox();
    }
  });

  close.addEventListener("click", closeLightbox);
  previous.addEventListener("click", () => step(-1));
  next.addEventListener("click", () => step(1));

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      step(-1);
    }

    if (event.key === "ArrowRight") {
      step(1);
    }
  });

  return (nextSources, startIndex, altText) => {
    sources = nextSources;
    index = startIndex;
    title.textContent = altText;
    image.alt = altText;
    lightbox.hidden = false;
    document.body.classList.add("is-lightbox-open");
    update();
    close.focus();
  };
};

openLightbox = createLightbox();

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const year = document.querySelector("#year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}
