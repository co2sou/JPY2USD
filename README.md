# 實時匯率轉換器 - Multi-Currency Converter

一個功能強大的實時匯率轉換工具，支持美元、日元、台幣、人民幣四種貨幣的互相轉換。

## 🌟 功能特點

- 🔄 **實時匯率數據** - 使用 exchangerate-api.com 獲取最新匯率
- 💱 **四幣種互轉** - 支持美元、日元、台幣、人民幣之間的任意轉換
- 🎯 **智能切換** - 點擊貨幣按鈕輕鬆切換輸入貨幣類型
- 🌍 **多語言支持** - 支持中文/English/日本語三種語言
- 📱 **響應式設計** - 完美支持桌面端和移動端
- ⚡ **實時計算** - 輸入金額即時顯示轉換結果
- 🔄 **自動更新** - 每5分鐘自動更新匯率數據
- 🛡️ **備用機制** - API失敗時使用備用匯率確保系統可用

## 🚀 在線體驗

訪問：[https://xiaonaofua.github.io/exchangeRates/](https://xiaonaofua.github.io/exchangeRates/)

## 📦 本地運行

1. 克隆倉庫：
```bash
git clone https://github.com/xiaonaofua/exchangeRates.git
cd exchangeRates
```

2. 直接用瀏覽器打開 `index.html` 文件即可使用

## 🛠️ 技術棧

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **API**: exchangerate-api.com 免費匯率API
- **設計**: 響應式設計，支持多設備

## 📱 使用方法

1. 選擇您偏好的語言（中文/English/日本語）
2. 點擊貨幣按鈕選擇要輸入的貨幣類型（美元/日元/台幣/人民幣）
3. 在輸入框中輸入金額
4. 系統會自動顯示其他三種貨幣的對應金額
5. 匯率信息會自動更新，顯示最新的匯率和更新時間

## 🔧 文件結構

```
exchangeRates/
├── index.html              # 主頁面
├── style.css               # 樣式文件
├── script.js               # 核心邏輯
├── deploy.bat              # 部署腳本
└── README.md               # 說明文檔
```

## 🌐 API 說明

本項目使用 [exchangerate-api.com](https://exchangerate-api.com/) 提供的免費匯率API：
- 每月1500次免費請求
- 實時匯率數據
- 支持美元(USD)、日元(JPY)、台幣(TWD)、人民幣(CNY)等多種貨幣

## 📄 許可證

MIT License - 詳見 [LICENSE](LICENSE) 文件

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📞 聯繫

如有問題或建議，請通過 GitHub Issues 聯繫。
