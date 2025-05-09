// 作品データ
const worksData = [
  {
    title: "コンクリートとガラスの対話 / Concrete & Glass",
    description: "素材の対比を活かした現代的な空間デザイン"
  },
  {
    title: "中庭のある住まい / Courtyard House",
    description: "自然光を取り込んだ開放的な住空間"
  },
  {
    title: "都市のオアシス / Urban Oasis",
    description: "都会の中の癒しの空間"
  },
  {
    title: "光と影の調和 / Light & Shadow",
    description: "自然光を活かした空間演出"
  }
];

// 作品カテゴリーのデータと画像
const worksCategories = {
  residential: {
    title: '住宅インナー',
    folder: '住宅',
    description: '住宅設計の実績',
    images: [
      'images/works/住宅/0028.jpg'
    ]
  },
  commercial: {
    title: '商業施設インナー',
    folder: '商業施設',
    description: '商業施設の設計実績',
    images: [
      'images/works/商業施設/0026.jpg'
    ]
  },
  office: {
    title: 'オフィスインナー',
    folder: 'オフィス',
    description: 'オフィス設計の実績',
    images: [
      'images/works/0027.jpg',
      'images/works/0028.jpg',
      'images/works/0029.jpg'
    ]
  },
  public: {
    title: '公共施設インナー',
    folder: '公共施設',
    description: '公共施設の設計実績',
    images: [
      'images/works/0030.jpg',
      'images/works/0031.jpg',
      'images/works/0032.jpg'
    ]
  },
  renovation: {
    title: 'リノベーションインナー',
    folder: 'リノベーション',
    description: 'リノベーションの実績',
    images: [
      'images/works/0027.jpg',
      'images/works/0028.jpg',
      'images/works/0029.jpg'
    ]
  },
  interior: {
    title: 'インテリアインナー',
    folder: 'インテリア',
    description: 'インテリア設計の実績',
    images: [
      'images/works/0030.jpg',
      'images/works/0031.jpg',
      'images/works/0032.jpg'
    ]
  }
};

// 作品アイテムを作成する関数
function createWorkItem(imagePath, title, description) {
  const workItem = document.createElement('div');
  workItem.className = 'work-item';
  
  const img = document.createElement('img');
  img.src = imagePath;
  img.alt = title;
  img.onerror = function() {
    console.error(`Error loading image: ${this.src}`);
    this.style.display = 'none';
  };
  
  const overlay = document.createElement('div');
  overlay.className = 'work-overlay';
  
  const titleElement = document.createElement('h3');
  titleElement.className = 'work-title';
  titleElement.textContent = title;
  
  const descriptionElement = document.createElement('p');
  descriptionElement.className = 'work-description';
  descriptionElement.textContent = description;
  
  overlay.appendChild(titleElement);
  overlay.appendChild(descriptionElement);
  workItem.appendChild(img);
  workItem.appendChild(overlay);
  
  return workItem;
}

// 作品セクションを初期化する関数
function initializeWorks() {
  for (const [category, data] of Object.entries(worksCategories)) {
    const container = document.getElementById(`${category}-works`);
    if (!container) continue;
    
    container.innerHTML = '';
    
    data.images.forEach((imagePath, index) => {
      const workItem = createWorkItem(
        imagePath,
        `${data.title}`,
        data.description
      );
      container.appendChild(workItem);
    });
  }
}

// グローバル関数として定義
window.initializeWorks = initializeWorks; 