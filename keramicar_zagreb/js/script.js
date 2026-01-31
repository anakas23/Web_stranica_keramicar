// Za buduće male interakcije (trenutno nije nužno)
console.log("Stranica učitana");


const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


//active link

const links = document.querySelectorAll(".nav-links a");

// dohvati samo ime datoteke (npr. usluge.html)
const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
  const linkPage = link.getAttribute("href");

  // normalne stranice
  if (linkPage === currentPage) {
    link.classList.add("active");
  }

  // početna stranica (kad je URL samo / ili folder)
  if (
    (currentPage === "" || currentPage === "keramicar-zagreb") &&
    linkPage === "index.html"
  ) {
    link.classList.add("active");
  }
});


