// 多語言支持
const translations = {
    zh: {
        title: '實時匯率轉換器',
        inputLabel: '輸入金額：',
        usdName: '美元',
        jpyName: '日元',
        cnyName: '人民幣',
        rateText: '匯率更新時間：',
        loading: '正在獲取最新匯率...'
    },
    en: {
        title: 'Real-time Currency Converter',
        inputLabel: 'Enter Amount:',
        usdName: 'USD',
        jpyName: 'JPY',
        cnyName: 'CNY',
        rateText: 'Exchange Rate Updated:',
        loading: 'Fetching latest rates...'
    },
    ja: {
        title: 'リアルタイム為替コンバーター',
        inputLabel: '金額を入力：',
        usdName: 'ドル',
        jpyName: '円',
        cnyName: '人民元',
        rateText: '為替レート更新時間：',
        loading: '最新レートを取得中...'
    }
};

// 货币配置
const currencies = {
    USD: { symbol: '$', name: 'USD' },
    JPY: { symbol: '¥', name: 'JPY' },
    CNY: { symbol: '¥', name: 'CNY' }
};

// 全局變量
let currentLang = 'zh';
let currentCurrency = 'USD';  // 默认输入货币为美元
let exchangeRates = {
    USD: 1,       // 基准货币
    JPY: 149.50,  // 備用匯率 1 USD = 149.50 JPY
    CNY: 7.25     // 備用匯率 1 USD = 7.25 CNY
};
let lastUpdateTime = '';

// DOM 元素
const elements = {
    title: document.getElementById('title'),
    inputLabel: document.getElementById('inputLabel'),
    usdName: document.getElementById('usdName'),
    jpyName: document.getElementById('jpyName'),
    cnyName: document.getElementById('cnyName'),
    rateText: document.getElementById('rateText'),
    amountInput: document.getElementById('amountInput'),
    inputSymbol: document.getElementById('inputSymbol'),
    result1Label: document.getElementById('result1Label'),
    result1Symbol: document.getElementById('result1Symbol'),
    result1Amount: document.getElementById('result1Amount'),
    result2Label: document.getElementById('result2Label'),
    result2Symbol: document.getElementById('result2Symbol'),
    result2Amount: document.getElementById('result2Amount'),
    jpyToUsdRate: document.getElementById('jpyToUsdRate'),
    jpyToCnyRate: document.getElementById('jpyToCnyRate'),
    updateTime: document.getElementById('updateTime'),
    loading: document.getElementById('loading'),
    langBtns: document.querySelectorAll('.lang-btn'),
    currencyBtns: document.querySelectorAll('.currency-btn')
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

    // 設置貨幣切換事件
    elements.currencyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currency = btn.getAttribute('data-currency');
            switchCurrency(currency);
        });
    });

    // 設置輸入事件
    elements.amountInput.addEventListener('input', calculateConversion);

    // 初始化界面
    updateCurrencyDisplay();
    updateTexts();

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

// 货币切换
function switchCurrency(currency) {
    currentCurrency = currency;

    // 更新按钮状态
    elements.currencyBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-currency') === currency) {
            btn.classList.add('active');
        }
    });

    // 更新显示
    updateCurrencyDisplay();
    calculateConversion();
}

function updateCurrencyDisplay() {
    // 更新输入框符号
    elements.inputSymbol.textContent = currencies[currentCurrency].symbol;

    // 根据当前输入货币更新结果显示
    const otherCurrencies = Object.keys(currencies).filter(c => c !== currentCurrency);

    // 更新结果标签和符号
    const texts = translations[currentLang];
    elements.result1Label.textContent = `${texts[otherCurrencies[0].toLowerCase() + 'Name']}：`;
    elements.result1Symbol.textContent = currencies[otherCurrencies[0]].symbol;

    elements.result2Label.textContent = `${texts[otherCurrencies[1].toLowerCase() + 'Name']}：`;
    elements.result2Symbol.textContent = currencies[otherCurrencies[1]].symbol;
}

function updateTexts() {
    const texts = translations[currentLang];
    elements.title.textContent = texts.title;
    elements.inputLabel.textContent = texts.inputLabel;
    elements.usdName.textContent = texts.usdName;
    elements.jpyName.textContent = texts.jpyName;
    elements.cnyName.textContent = texts.cnyName;
    elements.rateText.textContent = texts.rateText;

    // 更新loading文本
    const loadingSpan = elements.loading.querySelector('span');
    if (loadingSpan) {
        loadingSpan.textContent = texts.loading;
    }

    // 更新货币显示
    updateCurrencyDisplay();
}

// 獲取匯率數據
async function fetchExchangeRates() {
    showLoading(true);

    try {
        // 使用免費的匯率API，以USD为基准
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();

        if (data.rates) {
            exchangeRates.USD = 1;  // USD作为基准
            exchangeRates.JPY = data.rates.JPY;
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
    elements.jpyToUsdRate.textContent = (1 / exchangeRates.JPY).toFixed(6);
    elements.jpyToCnyRate.textContent = (exchangeRates.CNY / exchangeRates.JPY).toFixed(6);
    elements.updateTime.textContent = lastUpdateTime;
}

// 計算轉換
function calculateConversion() {
    const inputValue = parseFloat(elements.amountInput.value) || 0;

    if (inputValue === 0) {
        elements.result1Amount.textContent = '0.00';
        elements.result2Amount.textContent = '0.00';
        return;
    }

    // 获取其他两种货币
    const otherCurrencies = Object.keys(currencies).filter(c => c !== currentCurrency);

    // 将输入金额转换为USD基准
    let usdValue;
    if (currentCurrency === 'USD') {
        usdValue = inputValue;
    } else {
        usdValue = inputValue / exchangeRates[currentCurrency];
    }

    // 转换为目标货币
    const result1Value = otherCurrencies[0] === 'USD' ? usdValue : usdValue * exchangeRates[otherCurrencies[0]];
    const result2Value = otherCurrencies[1] === 'USD' ? usdValue : usdValue * exchangeRates[otherCurrencies[1]];

    // 显示结果，根据货币类型决定小数位数
    const getDecimalPlaces = (currency) => currency === 'JPY' ? 0 : 2;

    elements.result1Amount.textContent = result1Value.toFixed(getDecimalPlaces(otherCurrencies[0]));
    elements.result2Amount.textContent = result2Value.toFixed(getDecimalPlaces(otherCurrencies[1]));
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
