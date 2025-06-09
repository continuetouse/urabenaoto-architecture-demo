// ページ読み込み完了時の処理
document.addEventListener('DOMContentLoaded', () => {
  // スライダーの初期化
  import('./image-slider.js').then(() => {
    initializeSliders();
    initializeWorksSlider();
  });
  
  // 作品セクションの初期化
  import('./works-loader.js').then(() => {
    initializeWorks();
  });
  
  // ナビゲーションバーのスクロール効果
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // セクションのスクロールアニメーション
  const animateOnScroll = () => {
    const elements = [
      document.querySelector('.philosophy-content'),
      document.querySelector('.profile-content'),
      document.querySelector('.contact-form'),
      ...document.querySelectorAll('.work-item')
    ];
    
    elements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementBottom = el.getBoundingClientRect().bottom;
      const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
      
      if (isVisible) {
        el.classList.add('animate');
      }
    });
  };
  
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
  
  // ナビゲーションリンクのスムーズスクロール
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: 'smooth'
      });
    });
  });
  
  // フォームのバリデーション
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          const errorMsg = field.nextElementSibling;
          if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.style.display = 'block';
          }
        } else {
          field.classList.remove('error');
          
          const errorMsg = field.nextElementSibling;
          if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.style.display = 'none';
          }
        }
      });
      
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          isValid = false;
          emailField.classList.add('error');
          
          const errorMsg = emailField.nextElementSibling;
          if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.style.display = 'block';
          }
        }
      }
      
      if (isValid) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = document.documentElement.lang === 'ja' ? 
          'お問い合わせありがとうございます。近日中にご連絡いたします。' : 
          'Thank you for your inquiry. We will contact you soon.';
        
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
      }
    });
  }
});