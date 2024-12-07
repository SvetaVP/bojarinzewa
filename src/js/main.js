window.addEventListener("load", function () {
  function openMenu() {
    let burger = document.getElementsByClassName("burger");
    let nav = document.getElementsByClassName("nav");

    burger.addEventListener("click", function () {
      nav.classList.toggle("menu-opened");
    });
  }

  openMenu();
});
