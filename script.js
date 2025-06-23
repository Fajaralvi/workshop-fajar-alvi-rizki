// ===== INITIALIZE AOS ANIMATION =====
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  easing: "ease-out-cubic",
})

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar-custom")
  const backToTop = document.getElementById("backToTop")

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Show/hide back to top button
  if (window.scrollY > 300) {
    backToTop.classList.add("show")
  } else {
    backToTop.classList.remove("show")
  }
})

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// ===== ACTIVE NAVIGATION LINK HIGHLIGHTING =====
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active")
    }
  })
})

// ===== FORM VALIDATION AND SUBMISSION =====
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (event) => {
  event.preventDefault()
  event.stopPropagation()

  // Get form data
  const formData = new FormData(contactForm)
  const nama = document.getElementById("nama").value
  const email = document.getElementById("email").value
  const subjek = document.getElementById("subjek").value
  const pesan = document.getElementById("pesan").value

  if (contactForm.checkValidity()) {
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Mengirim...'
    submitBtn.disabled = true

    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
      // Show success message
      showNotification("Terima kasih! Pesan Anda telah terkirim.", "success")

      // Reset form
      contactForm.reset()
      contactForm.classList.remove("was-validated")

      // Reset button
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  } else {
    contactForm.classList.add("was-validated")
    showNotification("Mohon lengkapi semua field yang diperlukan.", "error")
  }
})

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="bi bi-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"} me-2"></i>
            ${message}
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="bi bi-x"></i>
        </button>
    `

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#28a745" : type === "error" ? "#dc3545" : "#17a2b8"};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `

  // Add animation keyframes
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style")
    style.id = "notification-styles"
    style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                margin-left: 15px;
            }
            .notification-content {
                display: flex;
                align-items: center;
            }
        `
    document.head.appendChild(style)
  }

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// ===== BACK TO TOP BUTTON =====
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// ===== SKILL PROGRESS ANIMATION =====
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".progress-bar")
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target
          const width = progressBar.style.width
          progressBar.style.width = "0%"
          setTimeout(() => {
            progressBar.style.width = width
          }, 100)
        }
      })
    },
    { threshold: 0.5 },
  )

  skillBars.forEach((bar) => observer.observe(bar))
}

// ===== TYPING EFFECT FOR HERO SUBTITLE =====
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// ===== PARALLAX EFFECT FOR HERO SECTION =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroParticles = document.querySelector(".hero-particles")

  if (heroParticles) {
    heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// ===== PROJECT CARD TILT EFFECT =====
function addTiltEffect() {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)"
    })
  })
}

// ===== INITIALIZE FUNCTIONS WHEN DOM IS LOADED =====
document.addEventListener("DOMContentLoaded", () => {
  // Initialize skill bar animation
  animateSkillBars()

  // Initialize tilt effect
  addTiltEffect()

  // Add typing effect to hero subtitle
  const heroSubtitle = document.querySelector(".hero-section .fs-4")
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent
    setTimeout(() => {
      typeWriter(heroSubtitle, originalText, 150)
    }, 1000)
  }

  // Add fade-in animation to elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".project-card, .contact-item, .skill-item").forEach((el) => {
    observer.observe(el)
  })
})

// ===== NAVBAR MOBILE MENU CLOSE ON LINK CLICK =====
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse")
    if (navbarCollapse.classList.contains("show")) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse)
      bsCollapse.hide()
    }
  })
})

// ===== PRELOADER (OPTIONAL) =====
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader")
  if (preloader) {
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  }
})

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
🚀 Portfolio Website Loaded Successfully!
👨‍💻 Developed with ❤️ using HTML, CSS, JavaScript & Bootstrap
🌟 Dark Theme Portfolio Template
`)
