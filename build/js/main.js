window.addEventListener("load", function () {
  function openMenu() {
    // Select the first element with the class "burger"
    let burger = document.querySelector(".burger");
    let nav = document.querySelector(".nav"); // Select the nav element with the class "nav"

    // Check if the elements exist before adding the event listener
    if (burger && nav) {
      burger.addEventListener("click", function () {
        nav.classList.toggle("menu-opened");
      });
    } else {
      console.error("Burger or Nav element not found.");
    }
  }

  openMenu();
});
