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
    folder: '住宅',
    description: '住宅設計の実績'
  },
  commercial: {
    title: '商業施設インナー',
    folder: '商業施設',
    description: '商業施設の設計実績'
  },
  office: {
    title: 'オフィスインナー',
    folder: 'オフィス',
    description: 'オフィス設計の実績'
  },
  public: {
    title: '公共施設インナー',
    folder: '公共施設',
    description: '公共施設の設計実績'
  },
  renovation: {
    title: 'リノベーションインナー',
    folder: 'リノベーション',
    description: 'リノベーションの実績'
  },
  interior: {
    title: 'インテリアインナー',
    folder: 'インテリア',
    description: 'テストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテスト'
  }
};

// 画像ファイルを取得する関数
async function getImageFiles(folder) {
  try {
    const response = await fetch(`images/works/${folder}/`);
    if (!response.ok) {
      console.error(`Error: Could not access images/works/${folder}/ directory`);
      return [];
    }
    const text = await response.text();
    const parser = new DOMParser();
    const html = parser.parseFromString(text, 'text/html');
    const links = Array.from(html.querySelectorAll('a'))
      .map(a => a.href)
      .filter(href => {
        const ext = href.split('.').pop().toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
      })
      .map(href => href.split('/').pop());
    console.log(`Found ${links.length} images in ${folder} folder`);
    return links;
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
  img.src = `./images/works/${imagePath}`;
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
        `${getBasePath()}${data.folder}/${image}`,
        `${data.title}`,
        data.description
      );
      container.appendChild(workItem);
    });
  }
}

// モジュールとしてエクスポート
<<<<<<< HEAD
// 初期化関数をグローバルに公開
window.initializeWorks = initializeWorks; 
=======

