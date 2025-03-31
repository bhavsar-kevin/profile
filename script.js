document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a nav link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Typed Text Effect
  const typedTextElement = document.querySelector(".typed-text")
  if (typedTextElement) {
    const words = ["Web Developer", "AI Engineer", "Freelancer", "Technical Lead "]
    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100

    function type() {
      const currentWord = words[wordIndex]

      if (isDeleting) {
        typedTextElement.textContent = currentWord.substring(0, charIndex - 1)
        charIndex--
        typingSpeed = 50
      } else {
        typedTextElement.textContent = currentWord.substring(0, charIndex + 1)
        charIndex++
        typingSpeed = 100
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true
        typingSpeed = 1000 // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        wordIndex = (wordIndex + 1) % words.length
        typingSpeed = 500 // Pause before typing next word
      }

      setTimeout(type, typingSpeed)
    }

    setTimeout(type, 1000)
  }

  // Project Filtering
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Testimonial Slider
  const testimonialItems = document.querySelectorAll(".testimonial-item")
  const dots = document.querySelectorAll(".dot")
  let currentSlide = 0

  function showSlide(index) {
    testimonialItems.forEach((item) => (item.style.display = "none"))
    dots.forEach((dot) => dot.classList.remove("active"))

    testimonialItems[index].style.display = "block"
    dots[index].classList.add("active")
  }

  if (dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index
        showSlide(currentSlide)
      })
    })

    // Auto slide
    setInterval(() => {
      currentSlide = (currentSlide + 1) % testimonialItems.length
      showSlide(currentSlide)
    }, 5000)
  }

  // Back to Top Button
  const backToTopBtn = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("active")
    } else {
      backToTopBtn.classList.remove("active")
    }
  })

  // Form Submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()
      // Here you would typically send the form data to a server
      alert("Thank you for your message! I will get back to you soon.")
      this.reset()
    })
  }

  const newsletterForm = document.getElementById("newsletterForm")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      // Here you would typically send the form data to a server
      alert("Thank you for subscribing to my newsletter!")
      this.reset()
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Animate elements on scroll
  const animateElements = document.querySelectorAll(
    ".section-header, .about-content, .project-card, .skill-item, .blog-card, .testimon  .about-content, .project-card, .skill-item, .blog-card, .testimonial-item, .timeline-item, .contact-content",
  )

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  animateElements.forEach((element) => {
    observer.observe(element)
  })
})

// Add CSS for animations
document.head.insertAdjacentHTML(
  "beforeend",
  `
<style>
    .section-header, .about-content, .project-card, .skill-item, .blog-card, 
    .testimonial-item, .timeline-item, .contact-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .section-header.animate, .about-content.animate, .project-card.animate, 
    .skill-item.animate, .blog-card.animate, .testimonial-item.animate, 
    .timeline-item.animate, .contact-content.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .project-card:nth-child(2), .skill-item:nth-child(2), .blog-card:nth-child(2), 
    .timeline-item:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .project-card:nth-child(3), .skill-item:nth-child(3), .blog-card:nth-child(3), 
    .timeline-item:nth-child(3) {
        transition-delay: 0.4s;
    }
    
    .project-card:nth-child(4), .skill-item:nth-child(4), .blog-card:nth-child(4), 
    .timeline-item:nth-child(4) {
        transition-delay: 0.6s;
    }
</style>
`,
)

