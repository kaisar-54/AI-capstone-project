
// Enhanced interactivity for show/hide buttons and accessibility
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('button.displayButton');
  buttons.forEach((btn, idx) => {
    // Find the content div to show/hide
    const section = btn.closest('section');
    let contentId = btn.getAttribute('aria-controls');
    let contentDiv = null;
    if (contentId) {
      contentDiv = document.getElementById(contentId);
    } else {
      // Fallback: find the next sibling div (legacy structure)
      contentDiv = btn.nextElementSibling;
      if (contentDiv && contentDiv.id) {
        btn.setAttribute('aria-controls', contentDiv.id);
      } else if (contentDiv) {
        // Assign a unique id if missing
        contentDiv.id = `section-content-${idx}`;
        btn.setAttribute('aria-controls', contentDiv.id);
      }
    }
    if (contentDiv) {
      btn.addEventListener('click', function () {
        const isVisible = contentDiv.style.display !== 'none';
        if (isVisible) {
          contentDiv.style.display = 'none';
          btn.textContent = 'Show';
          btn.setAttribute('aria-expanded', 'false');
        } else {
          contentDiv.style.display = '';
          btn.textContent = 'Hide';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
      // Keyboard accessibility: toggle on Enter/Space
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    }
  });

  // Enhanced image hover effect (accessibility: focusable)
  document.querySelectorAll('.Our-images img').forEach(img => {
    img.setAttribute('tabindex', '0');
    img.addEventListener('mouseenter', () => {
      img.style.boxShadow = '0 0 15px rgba(0, 180, 216, 0.8)';
      img.style.transform = 'scale(1.07) rotate(-2deg)';
    });
    img.addEventListener('mouseleave', () => {
      img.style.boxShadow = '0 4px 18px rgba(0, 180, 216, 0.13)';
      img.style.transform = '';
    });
    img.addEventListener('focus', () => {
      img.style.boxShadow = '0 0 15px #00b4d8';
      img.style.transform = 'scale(1.07) rotate(-2deg)';
    });
    img.addEventListener('blur', () => {
      img.style.boxShadow = '0 4px 18px rgba(0, 180, 216, 0.13)';
      img.style.transform = '';
    });
  });

  // Improved nav highlighting (color contrast, accessibility)
  const navLinks = document.querySelectorAll('nav a');
  window.addEventListener('scroll', () => {
    let fromTop = window.scrollY + 100;
    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
        link.style.color = '#00b4d8'; // active color
        link.setAttribute('aria-current', 'true');
      } else {
        link.style.color = '#1a1a1a';
        link.removeAttribute('aria-current');
      }
    });
  });

  // Scroll-to-top button
  const scrollBtn = document.createElement('button');
  scrollBtn.innerText = '↑ Top';
  scrollBtn.style.position = 'fixed';
  scrollBtn.style.bottom = '20px';
  scrollBtn.style.right = '20px';
  scrollBtn.style.padding = '10px';
  scrollBtn.style.fontSize = '16px';
  scrollBtn.style.border = 'none';
  scrollBtn.style.borderRadius = '6px';
  scrollBtn.style.background = '#6ed2cc';
  scrollBtn.style.color = 'white';
  scrollBtn.style.cursor = 'pointer';
  scrollBtn.style.display = 'none';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollBtn);
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
});




document.body.appendChild(scrollBtn);


