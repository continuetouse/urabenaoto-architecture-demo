// 画像フォルダのパス
const imageFolders = {
  hero: 'images/hero',
  philosophy: 'images/philosophy',
  profile: 'images/profile',
  works: 'images/works',
  contact: 'images/contact'
};

// 画像ファイルを取得する関数
async function getImageFiles(folder) {
  try {
    const response = await fetch(folder);
    const text = await response.text();
    const parser = new DOMParser();
    const html = parser.parseFromString(text, 'text/html');
    const links = html.querySelectorAll('a');
    const imageFiles = Array.from(links)
      .map(link => link.href)
      .filter(href => href.match(/\.(jpg|jpeg|png|gif)$/i))
      .map(href => href.split('/').pop());
    return imageFiles;
  } catch (error) {
    console.error(`Error loading images from ${folder}:`, error);
    return [];
  }
}

// 環境に応じたベースパスを取得
const getBasePath = () => {
  // ローカル環境の場合
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return './';
  }
  // GitHub Pagesの場合
  return '/urabenaoto-architecture-demo/';
};

// 画像データを直接指定
function loadImageData() {
  return {
    hero: [
      './images/hero/0001.jpg',
      './images/hero/0002.jpg',
      './images/hero/0003.jpg',
      './images/hero/0026.jpg'
    ],
    philosophy: [
      './images/philosophy/0005.jpg',
      './images/philosophy/0006.jpg',
      './images/philosophy/0008.jpg',
      './images/philosophy/0012.jpg'
    ],
    profile: [
      './images/profile/0017.jpg',
      './images/profile/0018.jpg',
      './images/profile/0019.jpg'
    ],
    works: [
      './images/works/0020.jpg',
      './images/works/0021.jpg',
      './images/works/0022.jpg',
      './images/works/0023.jpg',
      './images/works/0024.jpg'
    ],
    contact: [
      './images/contact/0025.jpg',
      './images/contact/0027.jpg',
      './images/contact/0028.jpg',
      './images/contact/0029.jpg'
    ]
  };
}

// 配列をランダムに並び替える関数
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 各セクションの前回アクティブなスライドのインデックスを追跡
const prevActiveIndex = {
  hero: 0,
  philosophy: 0,
  profile: 0,
  works: 0,
  contact: 0
};

// スライダーの初期化
function initSlider(sectionId, imageArray) {
  const sliderContainer = document.querySelector(`.${sectionId}-slider`);
  sliderContainer.innerHTML = '';
  const shuffledImages = shuffleArray([...imageArray]);
  
  shuffledImages.forEach((imgSrc, index) => {
    const slide = document.createElement('div');
    slide.className = `${sectionId}-slide`;
    slide.style.backgroundImage = `url(${imgSrc})`;
    
    if (index === 0) {
      slide.classList.add('active');
    }
    
    sliderContainer.appendChild(slide);
  });
  
  startSlider(sectionId, shuffledImages.length);
}

// スライダー開始関数
function startSlider(sectionId, slideCount) {
  setInterval(() => {
    const slides = document.querySelectorAll(`.${sectionId}-slide`);
    slides[prevActiveIndex[sectionId]].classList.remove('active');
    
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * slideCount);
    } while (nextIndex === prevActiveIndex[sectionId]);
    
    prevActiveIndex[sectionId] = nextIndex;
    slides[nextIndex].classList.add('active');
  }, 5000);
}

// 初期化関数
async function initializeSliders() {
  const imageData = await loadImageData();
  for (const [section, images] of Object.entries(imageData)) {
    if (images.length > 0) {
      initSlider(section, images);
    }
  }
}

// 背景画像のスライドショー
const worksImages = [
  '0027.jpg',
  '0028.jpg',
  '0029.jpg',
  '0030.jpg',
  '0031.jpg',
  '0032.jpg'
];

function initializeWorksSlider() {
  const slider = document.querySelector('.works-slider');
  if (!slider) return;

  // スライド要素を作成
  worksImages.forEach(image => {
    const slide = document.createElement('div');
    slide.className = 'works-slide';
    slide.style.backgroundImage = `url(images/works/${image})`;
    slider.appendChild(slide);
  });

  // 最初のスライドを表示
  const slides = document.querySelectorAll('.works-slide');
  if (slides.length > 0) {
    slides[0].classList.add('active');
  }

  // スライド切り替え
  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
}

// ページ読み込み時にスライダーを初期化
document.addEventListener('DOMContentLoaded', async () => {
  window.initializeSliders = initializeSliders;
  window.initializeWorksSlider = initializeWorksSlider;
  initializeWorksSlider();
});
