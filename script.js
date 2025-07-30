// 多語言支持
const translations = {
    zh: {
        title: '日元實時匯率轉換器',
        inputLabel: '輸入日元金額：',
        usdLabel: '美元：',
        cnyLabel: '人民幣：',
        rateText: '匯率更新時間：',
        loading: '正在獲取最新匯率...'
    },
    en: {
        title: 'JPY Real-time Currency Converter',
        inputLabel: 'Enter JPY Amount:',
        usdLabel: 'USD:',
        cnyLabel: 'CNY:',
        rateText: 'Exchange Rate Updated:',
        loading: 'Fetching latest rates...'
    },
    ja: {
        title: '円リアルタイム為替コンバーター',
        inputLabel: '円の金額を入力：',
        usdLabel: 'ドル：',
        cnyLabel: '人民元：',
        rateText: '為替レート更新時間：',
        loading: '最新レートを取得中...'
    }
};

// 全局變量
let currentLang = 'zh';
let exchangeRates = {
    USD: 0.0067,  // 備用匯率
    CNY: 0.048    // 備用匯率
};
let lastUpdateTime = '';

// DOM 元素
const elements = {
    title: document.getElementById('title'),
    inputLabel: document.getElementById('inputLabel'),
    usdLabel: document.getElementById('usdLabel'),
    cnyLabel: document.getElementById('cnyLabel'),
    rateText: document.getElementById('rateText'),
    jpyAmount: document.getElementById('jpyAmount'),
    usdAmount: document.getElementById('usdAmount'),
    cnyAmount: document.getElementById('cnyAmount'),
    jpyToUsdRate: document.getElementById('jpyToUsdRate'),
    jpyToCnyRate: document.getElementById('jpyToCnyRate'),
    updateTime: document.getElementById('updateTime'),
    loading: document.getElementById('loading'),
    langBtns: document.querySelectorAll('.lang-btn')
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // 設置語言切換事件
    elements.langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    // 設置輸入事件
    elements.jpyAmount.addEventListener('input', calculateConversion);

    // 獲取匯率
    fetchExchangeRates();
    
    // 每5分鐘更新一次匯率
    setInterval(fetchExchangeRates, 5 * 60 * 1000);
}

// 語言切換
function switchLanguage(lang) {
    currentLang = lang;
    
    // 更新按鈕狀態
    elements.langBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // 更新文本
    updateTexts();
}

function updateTexts() {
    const texts = translations[currentLang];
    elements.title.textContent = texts.title;
    elements.inputLabel.textContent = texts.inputLabel;
    elements.usdLabel.textContent = texts.usdLabel;
    elements.cnyLabel.textContent = texts.cnyLabel;
    elements.rateText.textContent = texts.rateText;
    
    // 更新loading文本
    const loadingSpan = elements.loading.querySelector('span');
    if (loadingSpan) {
        loadingSpan.textContent = texts.loading;
    }
}

// 獲取匯率數據
async function fetchExchangeRates() {
    showLoading(true);
    
    try {
        // 使用免費的匯率API
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/JPY');
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        
        if (data.rates) {
            exchangeRates.USD = data.rates.USD;
            exchangeRates.CNY = data.rates.CNY;
            lastUpdateTime = new Date().toLocaleString();
            
            updateRateDisplay();
            calculateConversion();
        }
        
    } catch (error) {
        console.error('獲取匯率失敗:', error);
        // 使用備用匯率
        lastUpdateTime = '使用備用匯率';
        updateRateDisplay();
    } finally {
        showLoading(false);
    }
}

// 顯示/隱藏加載動畫
function showLoading(show) {
    if (show) {
        elements.loading.classList.add('show');
    } else {
        elements.loading.classList.remove('show');
    }
}

// 更新匯率顯示
function updateRateDisplay() {
    elements.jpyToUsdRate.textContent = exchangeRates.USD.toFixed(6);
    elements.jpyToCnyRate.textContent = exchangeRates.CNY.toFixed(6);
    elements.updateTime.textContent = lastUpdateTime;
}

// 計算轉換
function calculateConversion() {
    const jpyValue = parseFloat(elements.jpyAmount.value) || 0;
    
    const usdValue = jpyValue * exchangeRates.USD;
    const cnyValue = jpyValue * exchangeRates.CNY;
    
    elements.usdAmount.textContent = usdValue.toFixed(2);
    elements.cnyAmount.textContent = cnyValue.toFixed(2);
}

// 錯誤處理
window.addEventListener('error', function(e) {
    console.error('應用程序錯誤:', e.error);
});

// 網絡狀態檢測
window.addEventListener('online', function() {
    fetchExchangeRates();
});

window.addEventListener('offline', function() {
    console.log('網絡連接中斷，使用緩存匯率');
});
