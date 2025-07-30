# JPY2USD - 日元實時匯率轉換器

一個簡潔易用的日元實時匯率轉換工具，支持轉換為美元和人民幣。

## 🌟 功能特點

- 🔄 **實時匯率數據** - 使用 exchangerate-api.com 獲取最新匯率
- 💱 **雙幣種轉換** - 日元轉美元和人民幣
- 🌍 **多語言支持** - 支持中文/English/日本語三種語言
- 📱 **響應式設計** - 完美支持桌面端和移動端
- ⚡ **實時計算** - 輸入金額即時顯示轉換結果
- 🔄 **自動更新** - 每5分鐘自動更新匯率數據
- 🛡️ **備用機制** - API失敗時使用備用匯率確保系統可用

## 🚀 在線體驗

訪問：[https://co2sou.github.io/JPY2USD/](https://co2sou.github.io/JPY2USD/)

## 📦 本地運行

1. 克隆倉庫：
```bash
git clone https://github.com/co2sou/JPY2USD.git
cd JPY2USD
```

2. 直接用瀏覽器打開 `currency_converter.html` 文件即可使用

## 🛠️ 技術棧

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **API**: exchangerate-api.com 免費匯率API
- **設計**: 響應式設計，支持多設備

## 📱 使用方法

1. 選擇您偏好的語言（中文/English/日本語）
2. 在輸入框中輸入日元金額
3. 系統會自動顯示對應的美元和人民幣金額
4. 匯率信息會自動更新，顯示最新的匯率和更新時間

## 🔧 文件結構

```
JPY2USD/
├── currency_converter.html  # 主頁面
├── style.css               # 樣式文件
├── script.js               # 核心邏輯
└── README.md               # 說明文檔
```

## 🌐 API 說明

本項目使用 [exchangerate-api.com](https://exchangerate-api.com/) 提供的免費匯率API：
- 每月1500次免費請求
- 實時匯率數據
- 支持多種貨幣

## 📄 許可證

MIT License - 詳見 [LICENSE](LICENSE) 文件

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📞 聯繫

如有問題或建議，請通過 GitHub Issues 聯繫。
