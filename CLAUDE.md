# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a real-time multi-currency exchange rate converter supporting USD, JPY, TWD, and CNY. It's a pure client-side web application with multi-language support (Chinese, English, Japanese) that uses the exchangerate-api.com API for live exchange rates.

## Development Commands

This is a static web application that requires no build process or package management:

- **Run locally**: Open `index.html` directly in a web browser
- **Deploy**: Use `deploy.bat` to deploy to GitHub Pages (Windows batch script)
- **No testing framework**: Currently no automated tests are configured

## Architecture

### File Structure
- `index.html` - Main HTML structure with responsive UI
- `script.js` - Core application logic with modular functions
- `style.css` - Complete CSS styling with responsive design
- `deploy.bat` - Deployment script for GitHub Pages

### Key Components

#### Currency System (`script.js:36-41`)
- USD as base currency (rate = 1)
- Fallback exchange rates hardcoded for offline operation
- Dynamic currency switching between all 4 supported currencies

#### Multi-language Support (`script.js:1-33`)
- Translation object with zh/en/ja language support
- Dynamic text updates without page reload
- Language state persisted during session

#### Exchange Rate Management (`script.js:192-224`)
- Fetches live rates from exchangerate-api.com every 5 minutes
- Graceful fallback to hardcoded rates on API failure
- Error handling for network connectivity issues

#### Conversion Logic (`script.js:243-276`)
- Real-time calculation on input change
- Handles any-to-any currency conversion via USD base
- Dynamic decimal precision (JPY shows 0 decimals, others show 2)

### UI Architecture
- Responsive design supporting desktop and mobile
- Currency selector buttons that update input context
- Three result display sections showing converted amounts
- Loading states and rate update timestamps

## Important Notes

- No external dependencies or build tools required
- API key not required for exchangerate-api.com free tier (1500 requests/month)
- All state management handled in vanilla JavaScript
- Styling uses CSS Grid and Flexbox for responsive layout
- Network status detection for offline/online state handling