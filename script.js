setupRevealAnimation();
setupDetailsBehavior();
setupMobileNavigation();

function setupRevealAnimation() {
  const nodes = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
    }
  );

  nodes.forEach((node) => observer.observe(node));
}

function setupDetailsBehavior() {
  const hashLinks = document.querySelectorAll('a[href^="#"]');

  hashLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupMobileNavigation() {
  const topbar = document.querySelector(".topbar");
  const toggle = document.querySelector(".topbar-toggle");
  const nav = document.querySelector(".topbar-nav");

  if (!topbar || !toggle || !nav) {
    return;
  }

  const navLinks = nav.querySelectorAll('a[href^="#"]');
  const desktopMedia = window.matchMedia("(min-width: 820px)");

  const closeNav = () => {
    topbar.classList.remove("is-open");
    nav.hidden = !desktopMedia.matches;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir navegacion principal");
  };

  const openNav = () => {
    topbar.classList.add("is-open");
    nav.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Cerrar navegacion principal");
  };

  toggle.addEventListener("click", () => {
    if (topbar.classList.contains("is-open")) {
      closeNav();
      return;
    }

    openNav();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (!desktopMedia.matches) {
        closeNav();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  document.addEventListener("click", (event) => {
    if (!desktopMedia.matches && topbar.classList.contains("is-open") && !topbar.contains(event.target)) {
      closeNav();
    }
  });

  const handleViewportChange = (event) => {
    if (event.matches) {
      closeNav();
      nav.hidden = false;
      return;
    }

    nav.hidden = true;
  };

  if (typeof desktopMedia.addEventListener === "function") {
    desktopMedia.addEventListener("change", handleViewportChange);
  } else {
    desktopMedia.addListener(handleViewportChange);
  }

  nav.hidden = !desktopMedia.matches;
}