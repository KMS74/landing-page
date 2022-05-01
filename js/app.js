/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("section");
const navBar = document.getElementById("navbar__list");
const scrollUp = document.querySelector(".scroll-up");

/**
 * End Global Variables
 *
 * Start Helper Functions
 *
 */

function createNavLinks() {
  // TODO: your code
  navBar.innerHTML = "";
  sections.forEach((section) => {
    const listItemEl = `
    <li>
        <a class="menu__link" href="#${section.id}" data-nav="${section.id}">${section.dataset.nav} </a>
    </li>
  `;
    navBar.insertAdjacentHTML("beforeend", listItemEl);
  });
}

function showScrollUp() {
  window.onscroll = function () {
    //   console.log(this.scrollY);
    this.scrollY > 2000
      ? scrollUp.classList.add("show")
      : scrollUp.classList.remove("show");
  };
}

function scrollingUp() {
  scrollUp.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/**
 * End Helper Functions
 *
 * Begin Main Functions
 *
 */

// build the nav l
createNavLinks();

// Scrolling using scrollIntoView() method
navBar.addEventListener("click", (event) => {
  console.log("scrolling ");
  event.preventDefault();
  if (event.target.dataset.nav) {
    const sectionEl = document.getElementById(`${event.target.dataset.nav}`);
    sectionEl.scrollIntoView({ behavior: "smooth" });
  }
});

// Scroll to section on link click
window.addEventListener("scroll", function () {
  // Get current scroll position
  let scrollY = window.pageYOffset;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 300;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute("id");
    console.log(sectionId);
    /*
      - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
      - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
      */
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(`#navbar__list li a[href*=${sectionId}]`)
        .classList.add("active");
    } else {
      document
        .querySelector(`#navbar__list li a[href*=${sectionId}]`)
        .classList.remove("active");
    }
  });
});

showScrollUp();

scrollingUp();

/**
 * End Main Functions
 *
 */
