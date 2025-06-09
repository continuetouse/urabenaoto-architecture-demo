// 画像データのシミュレーション
const imageData = {
  hero: [
    '/urabenaoto-architecture-demo/images/hero/0001.jpg',
    '/urabenaoto-architecture-demo/images/hero/0002.jpg',
    '/urabenaoto-architecture-demo/images/hero/0003.jpg',
    '/urabenaoto-architecture-demo/images/hero/0026.jpg'
  ],
  philosophy: [
    '/urabenaoto-architecture-demo/images/philosophy/0005.jpg',
    '/urabenaoto-architecture-demo/images/philosophy/0006.jpg',
    '/urabenaoto-architecture-demo/images/philosophy/0008.jpg',
    '/urabenaoto-architecture-demo/images/philosophy/0012.jpg'
  ],
  profile: [
    '/urabenaoto-architecture-demo/images/profile/0017.jpg',
    '/urabenaoto-architecture-demo/images/profile/0018.jpg',
    '/urabenaoto-architecture-demo/images/profile/0019.jpg'
  ],
  works: [
    '/urabenaoto-architecture-demo/images/works/0020.jpg',
    '/urabenaoto-architecture-demo/images/works/0021.jpg',
    '/urabenaoto-architecture-demo/images/works/0022.jpg',
    '/urabenaoto-architecture-demo/images/works/0023.jpg',
    '/urabenaoto-architecture-demo/images/works/0024.jpg'
  ],
  contact: [
    '/urabenaoto-architecture-demo/images/contact/0025.jpg',
    '/urabenaoto-architecture-demo/images/contact/0027.jpg',
    '/urabenaoto-architecture-demo/images/contact/0028.jpg',
    '/urabenaoto-architecture-demo/images/contact/0029.jpg'
  ]
};

// ページ読み込み完了時の処理
document.addEventListener('DOMContentLoaded', () => {
  // スライダーの初期化
  import('./image-slider.js').then(module => {
    module.initializeSliders();
    module.initializeWorksSlider();
  });
  
  // 作品セクションの初期化
  import('./works-loader.js').then(module => {
    module.initializeWorks();
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