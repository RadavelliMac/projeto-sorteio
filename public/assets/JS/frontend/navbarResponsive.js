const navbarIconRedirectHome = () => {
  const churchImage = document
    .querySelector(".churchImage")
    .addEventListener("click", (e) => {
      window.location.href = "/";
    });
};

const openNavBar = () => {
  const closeNavbarOnClick = window.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("menuButton") ||
      e.target.classList.contains("line")
    ) {
      const getMenu = (document.querySelector(".sidenav").style.width =
        "250px");
    }
  });
};

const closeNavBar = () => {
  const closebtn = document
    .querySelector(".closebutton")
    .addEventListener("click", (e) => {
      const getMenu = (document.querySelector(".sidenav").style.width = "0px");
    });
};

const closeNavBarOnResize = () => {
  const checkResizeNavbarOpen = window.addEventListener("resize", (e) => {
    const getMenu = document.querySelector(".sidenav");
    const getStyle = window.getComputedStyle(getMenu);

    if (getStyle.width > "0") {
      getMenu.style.width = "0px";
    }
  });
};

const closeNavbarOnClickOutside = () => {
  const closeNavbarOnClick = window.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains("sidenav") &&
      !e.target.classList.contains("menuButton") &&
      !e.target.classList.contains("line")
    ) {
      const getMenu = document.querySelector(".sidenav");
      const getStyle = window.getComputedStyle(getMenu);

      if (getStyle.width > "0") {
        getMenu.style.width = "0px";
      }
    }
  });
};

navbarIconRedirectHome();
openNavBar();
closeNavBar();
closeNavBarOnResize();
closeNavbarOnClickOutside();
