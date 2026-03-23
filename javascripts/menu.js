// Main inner dropdown
function MenuToggles() {
  var menuToggles = document.querySelectorAll('.menu-toggle');
  if (menuToggles.length > 0) {
    menuToggles.forEach(function (toggleButton) {
      toggleButton.addEventListener('click', function (e) {
      if(window.innerWidth < 768){
        e.preventDefault();
}
        var currentSubMenu = toggleButton.nextElementSibling;
        currentSubMenu.classList.toggle('active');
        toggleButton.classList.toggle('rotate');
        menuToggles.forEach(function (button) {
          if (button !== toggleButton) {
            var otherSubMenu = button.nextElementSibling;
            if (otherSubMenu.classList.contains('active')) {
              otherSubMenu.classList.remove('active');
            }
            button.classList.remove('rotate');
          }
        });
      });
    });
  }
}
// MMenu js
function initiateMmenu() {
    let mmenuInstance;
    function initMmenu() {
    	if (window.innerWidth <= 1199) { 
        if (!document.body.classList.contains("mmenu-initialized")) {
            import("./mmenu.js").then((module) => {
                const menuposition = document.querySelector('[data-menu-open]');
                const menuOpenValue = menuposition.getAttribute('data-menu-open');
				const offCanvasPosition = (menuOpenValue === 'left' || menuOpenValue === 'right') ? menuOpenValue + '-front' : 'left-front';
                const menuExpand = document.querySelector('[data-menu-expand]');
                const menuExpandValue = menuExpand.getAttribute('data-menu-expand');
				const submenusExpand = (menuExpandValue === 'true') ? false : true;
                 mmenuInstance = new Mmenu("#menu", {
                        slidingSubmenus: submenusExpand,
                        theme: "white",
                        offCanvas: {
                            position: offCanvasPosition,
                        },
                    });
                document.body.classList.add("mmenu-initialized");
            }).catch((error) => {
                console.error("Failed to load mmenu.js:", error);
            });
        }
    }
    }
    function closeMmenu() {
        if (window.innerWidth > 1199 && document.body.classList.contains("mmenu-initialized")) {
            if (mmenuInstance && mmenuInstance.close) {
                mmenuInstance.close();
            }
            document.body.classList.remove("mmenu-initialized");
        }
    }
     initMmenu();
      window.addEventListener('resize', () => {
        initMmenu();
        closeMmenu();
    });
}
// Add class on body if Utility is enable
function checkUtility() {
  var header = document.querySelector(".header__top");
  var body = document.body;
  if (header && header.classList.contains("withOutUtility")) {
    body.classList.add("withOutUtility");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('.navigation');
  function handleClick(event) {
    const currentNav = event.currentTarget;
    const parentLi = currentNav.parentElement;
    /*if (parentLi.classList.contains('haschildren')) {
      event.preventDefault();
    }*/ 
    const openElements = document.querySelectorAll('.dropdown.open, .meganav.open');
    openElements.forEach(openElement => {
      if (openElement.previousElementSibling !== currentNav) {
        openElement.classList.remove('open');
        openElement.previousElementSibling.classList.remove('active');
      }
    });
    const nextElement = currentNav.nextElementSibling;
    if (nextElement && (nextElement.classList.contains('dropdown') || nextElement.classList.contains('meganav'))) {
      currentNav.classList.toggle('active');
      nextElement.classList.toggle('open');
    }
  }
  navLinks.forEach(link => {
    link.addEventListener('click', handleClick);
  });
  function closeDropdown(event, selector, wrapperSelector) {
    const openElement = document.querySelector(selector);
    if (openElement && !event.target.closest(wrapperSelector)) {
      openElement.classList.remove('open');
      openElement.previousElementSibling.classList.remove('active');
    }
  }
  document.addEventListener('click', function (event) {
    closeDropdown(event, '.dropdown.open', '.navigation-wrapper');
    closeDropdown(event, '.meganav.open', '.navigation-mega-menu');
  });
  const menuCloseElements = document.querySelectorAll('.menu-close');
  function handleMenuCloseClick(event) {
    const openElements = document.querySelectorAll('.dropdown.open, .meganav.open');
    openElements.forEach(openElement => {
      openElement.classList.remove('open');
      openElement.previousElementSibling.classList.remove('active');
    });
  }
  menuCloseElements.forEach(closeElement => {
    closeElement.addEventListener('click', handleMenuCloseClick);
  });
  // Sticky Header
    const header = document.querySelector(".header");
  if (header) {
    let lastScrollTop = 0;
    window.addEventListener("scroll", function () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 200) { // Only apply styles after scrolling 200 pixels
        if (scrollTop > lastScrollTop) {
          header.classList.remove("header--scroll-up");
          header.style.transform = "translateY(-100%)";
        } else {
          header.classList.add("header--scroll-up");
          header.style.transform = "translateY(0)";
        }
        if (scrollTop === 0) {
          header.classList.remove("header--scroll-up");
          header.style.transform = "translateY(0)";
        }
      } else {
        header.classList.remove("header--scroll-up");
        header.style.transform = "translateY(0)";
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }
  // Focus class on tab  
  document.addEventListener('click', function (event) {
    document.body.classList.remove('userTabbing');
  });
  document.addEventListener('keyup', function (event) {
    if (event.which === 9) {
      document.body.classList.add('userTabbing');
    }
  });
});
function initSignpostImage() {
    const signpost = document.querySelector(".nav_signpost_content_wrap");
    const menuItems = document.querySelectorAll(".megamenuwrap > li");
    if (signpost && menuItems.length > 0) {
        signpost.style.transition = "opacity 0.3s ease";
        menuItems.forEach(item => {
            const hasSubmenu = item.querySelector("ul") || item.querySelector(".submenu");
            if (hasSubmenu) {
                item.addEventListener("mouseenter", () => {
                    signpost.style.opacity = "0";
                });
                item.addEventListener("mouseleave", () => {
                    signpost.style.opacity = "1";
                });
                item.addEventListener("focusin", () => {
                  signpost.style.opacity = "0";
                });
                  item.addEventListener("focusout", () => {
                  signpost.style.opacity = "1";
                });
            }
        });
    }
}
document.addEventListener("DOMContentLoaded", initiateMmenu);
document.addEventListener('DOMContentLoaded', MenuToggles);
document.addEventListener('DOMContentLoaded', checkUtility);
document.addEventListener('DOMContentLoaded', initSignpostImage);
window.addEventListener("resize", initiateMmenu);
