// ===================================
// HAMBURGER MENI
// ===================================
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    hamburger.classList.toggle("active");
  });
}

// ===================================
// ACTIVE LINK
// ===================================
const links = document.querySelectorAll(".nav-links a");
const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }

  if (
    (currentPage === "" || currentPage === "keramicar-zagreb") &&
    linkPage === "index.html"
  ) {
    link.classList.add("active");
  }
});

// ===================================
// SCROLL ANIMACIJE
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      
      // Ako je element s brojevima, pokreni animaciju brojanja
      if (entry.target.classList.contains("stat-item")) {
        animateNumber(entry.target.querySelector(".stat-number"));
      }
    }
  });
}, observerOptions);

// Promatraj sve elemente s animacijom
document.querySelectorAll(".fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .stat-item").forEach(el => {
  observer.observe(el);
});

// ===================================
// ANIMACIJA BROJEVA (STATISTIKA)
// ===================================
function animateNumber(element) {
  if (!element || element.dataset.animated) return;
  element.dataset.animated = "true";
  
  const target = parseInt(element.dataset.count) || 0;
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing funkcija za glatku animaciju
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (target - start) * easeOutQuart);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }
  
  requestAnimationFrame(update);
}

// ===================================
// NAVBAR SCROLL EFEKT
// ===================================
const navbar = document.querySelector(".navbar");

if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// ===================================
// SMOOTH SCROLL ZA SCROLL INDICATOR
// ===================================
const scrollIndicator = document.querySelector(".scroll-indicator");

if (scrollIndicator) {
  scrollIndicator.addEventListener("click", () => {
    const nextSection = document.querySelector(".stats-section") || 
                        document.querySelector(".section-split") ||
                        document.querySelector(".section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// ===================================
// PARALLAX EFEKT ZA HERO (subtilni)
// ===================================
const heroParallax = document.querySelector(".hero-parallax");

if (heroParallax) {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroParallax.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
  });
}

// ===================================
// GALERIJA - LIGHTBOX EFEKT (jednostavan)
// ===================================
const galleryImages = document.querySelectorAll(".gallery-item img");

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    // Kreiraj lightbox
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <div class="lightbox-overlay"></div>
      <div class="lightbox-content">
        <img src="${img.src}" alt="${img.alt}">
        <button class="lightbox-close">&times;</button>
      </div>
    `;
    
    // Dodaj stilove
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease;
    `;
    
    lightbox.querySelector(".lightbox-overlay").style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
    `;
    
    lightbox.querySelector(".lightbox-content").style.cssText = `
      position: relative;
      max-width: 90%;
      max-height: 90vh;
    `;
    
    lightbox.querySelector(".lightbox-content img").style.cssText = `
      max-width: 100%;
      max-height: 85vh;
      border-radius: 10px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;
    
    lightbox.querySelector(".lightbox-close").style.cssText = `
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 40px;
      cursor: pointer;
      transition: transform 0.3s;
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = "hidden";
    
    // Zatvori na klik
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox.querySelector(".lightbox-overlay") || 
          e.target === lightbox.querySelector(".lightbox-close")) {
        lightbox.style.animation = "fadeOut 0.3s ease";
        setTimeout(() => {
          lightbox.remove();
          document.body.style.overflow = "";
        }, 300);
      }
    });
    
    // Zatvori na Escape
    document.addEventListener("keydown", function closeOnEscape(e) {
      if (e.key === "Escape") {
        lightbox.remove();
        document.body.style.overflow = "";
        document.removeEventListener("keydown", closeOnEscape);
      }
    });
  });
});

// Dodaj CSS animacije za lightbox
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(style);

console.log("Keramičar Zagreb - stranica učitana ✓");


