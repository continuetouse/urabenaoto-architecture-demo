// 画像フォルダのパス
const imageFolders = {
  hero: window.location.hostname === 'github.io' 
    ? 'https://raw.githubusercontent.com/continuetouse/urabenaoto-architecture-demo/main/images/hero' 
    : './images/hero',
  philosophy: window.location.hostname === 'github.io' 
    ? 'https://raw.githubusercontent.com/continuetouse/urabenaoto-architecture-demo/main/images/philosophy' 
    : './images/philosophy',
  profile: window.location.hostname === 'github.io' 
    ? 'https://raw.githubusercontent.com/continuetouse/urabenaoto-architecture-demo/main/images/profile' 
    : './images/profile',
  works: window.location.hostname === 'github.io' 
    ? 'https://raw.githubusercontent.com/continuetouse/urabenaoto-architecture-demo/main/images/works' 
    : './images/works',
  contact: window.location.hostname === 'github.io' 
    ? 'https://raw.githubusercontent.com/continuetouse/urabenaoto-architecture-demo/main/images/contact' 
    : './images/contact'
};

// 画像ファイルを取得する関数
async function getImageFiles(folder) {
  try {
    // GitHub Pagesの場合は、GitHubのrawファイルURLを使用
    const isGitHubPages = window.location.hostname === 'github.io';
    const path = isGitHubPages
      ? `https://github.com/continuetouse/urabenaoto-architecture-demo/blob/main/${folder}`
      : folder;
    
    const response = await fetch(path);
    if (!response.ok) {
      console.error(`Error: Could not access ${folder} directory`);
      return [];
    }
    
    const text = await response.text();
    const parser = new DOMParser();
    const html = parser.parseFromString(text, 'text/html');
    const links = Array.from(html.querySelectorAll('a'))
      .map(a => a.href)
      .filter(href => href.match(/\.(jpg|jpeg|png|gif)$/i))
      .map(href => href.split('/').pop());
    
    return links;
  } catch (error) {
    console.error('Error loading images:', error);
    return [];
  }
}

// 画像データを動的に取得
async function loadImageData() {
  const imageData = {};
  for (const [section, folder] of Object.entries(imageFolders)) {
    const files = await getImageFiles(folder);
    imageData[section] = files.map(file => {
      const isGitHubPages = window.location.hostname === 'github.io';
      const path = isGitHubPages 
        ? `/urabenaoto-architecture-demo/${folder}/${file}`
        : `./${folder}/${file}`;
      return path;
    });
  }
  return imageData;
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
    const isGitHubPages = window.location.hostname === 'github.io';
    const imagePath = isGitHubPages
      ? `https://raw.githubusercontent.com/continuetouse/urabenaoto-architecture-demo/main/images/works/${image}`
      : `./images/works/${image}`;
    slide.style.backgroundImage = `url(${imagePath})`;
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

// モジュールとしてエクスポート
export { initializeSliders, initializeWorksSlider };