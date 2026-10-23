const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const submenuParents = document.querySelectorAll(".has-submenu");
const navLinks = document.querySelectorAll(".main-nav a");

function closeSubmenus(except = null) {
  submenuParents.forEach((parent) => {
    if (parent !== except) {
      parent.classList.remove("submenu-open");
      const button = parent.querySelector(".submenu-toggle");
      if (button) button.setAttribute("aria-expanded", "false");
    }
  });
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    if (!isOpen) closeSubmenus();
  });
}

submenuParents.forEach((parent) => {
  const button = parent.querySelector(".submenu-toggle");
  if (!button) return;

  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const willOpen = !parent.classList.contains("submenu-open");
    closeSubmenus(parent);
    parent.classList.toggle("submenu-open", willOpen);
    button.setAttribute("aria-expanded", String(willOpen));
  });
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 1050 && navigation && menuButton) {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Ouvrir le menu");
      closeSubmenus();
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".has-submenu")) closeSubmenus();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1050 && navigation && menuButton) {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

const homeSections = [...document.querySelectorAll("main section[id]")];
if (homeSections.length > 0 && location.pathname.endsWith("index.html")) {
  const updateActiveLink = () => {
    const scrollPosition = window.scrollY + 160;
    let currentId = "top";

    homeSections.forEach((section) => {
      if (section.offsetTop <= scrollPosition) currentId = section.id;
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        link.classList.toggle("active", href === `#${currentId}`);
      }
    });
  };

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();
}
