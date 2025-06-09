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

// 作品カテゴリーのデータ
const worksCategories = {
  residential: {
    title: '住宅インナー',
    folder: 'residential',
    description: '住宅設計の実績'
  },
  commercial: {
    title: '商業施設インナー',
    folder: 'commercial',
    description: '商業施設の設計実績'
  },
  office: {
    title: 'オフィスインナー',
    folder: 'office',
    description: 'オフィス設計の実績'
  },
  public: {
    title: '公共施設インナー',
    folder: 'public',
    description: '公共施設の設計実績'
  },
  renovation: {
    title: 'リノベーションインナー',
    folder: 'renovation',
    description: 'リノベーションの実績'
  },
  interior: {
    title: 'インテリアインナー',
    folder: 'interior',
    description: 'テストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテスト'
  }
};

// 画像ファイルを取得する関数
async function getImageFiles(folder) {
  try {
    // フォルダ内の画像ファイルを直接指定
    const images = {
      residential: ['0028.jpg'],
      commercial: ['0027.jpg', '0029.jpg'],
      office: ['0030.jpg'],
      public: ['0031.jpg'],
      renovation: ['0032.jpg'],
      interior: []
    };
    
    return images[folder] || [];
  } catch (error) {
    console.error('Error loading images:', error);
    return [];
  }
}

// 作品アイテムを作成する関数
function createWorkItem(imagePath, title, description) {
  const workItem = document.createElement('div');
  workItem.className = 'work-item';
  
  const img = document.createElement('img');
  img.src = window.location.hostname === 'github.io'
    ? `/urabenaoto-architecture-demo/images/works/${imagePath}`
    : `./images/works/${imagePath}`;
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
async function initializeWorks() {
  for (const [category, data] of Object.entries(worksCategories)) {
    const container = document.getElementById(`${category}-works`);
    if (!container) continue;
    
    const images = await getImageFiles(data.folder);
    container.innerHTML = '';
    
    images.forEach((image, index) => {
      const workItem = createWorkItem(
        `${image}`,
        `${data.title}`,
        data.description
      );
      container.appendChild(workItem);
    });
  }
}

// モジュールとしてエクスポート
export { initializeWorks }; 