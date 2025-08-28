# Ᾱccόuͷt

금액을 입력하고 수입/지출 내역을 볼 수 있는 사이트입니다. 
 ---> [📗](https://react-acc.vercel.app/)

## 소개

개인 프로젝트 (2025.07-2025.08)

### 개발 환경

프론트엔드: React, Context API, useReducer, axios  
백엔드: Express.js, MongoDB  
시각화: Nivo  
디자인: Figma

### 기능

- 수입/지출 내역 추가 및 삭제  
- 그래프 시각화 (막대, 라인그래프)  
- 연간 통계  
- 날짜별 필터링

---

### 📁 폴더 구조

```
src
 ┣ components
 ┃ ┣ AddButton.js
 ┃ ┣ Header.js
 ┃ ┣ LineChart.js
 ┃ ┣ List.js
 ┃ ┣ Modal.js
 ┃ ┣ MonthlyChart.js
 ┃ ┣ ScrollToTop.js
 ┃ ┣ Tab.js
 ┃ ┗ YearSelect.js
 ┣ context
 ┃ ┣ MyContext.js
 ┃ ┗ reducer.js
 ┣ css
 ┃ ┣ AddButton.css
 ┃ ┣ Header.css
 ┃ ┗ Modal.css
 ┣ hooks
 ┃ ┗ useChartData.js
 ┣ pages
 ┃ ┣ Home.js
 ┃ ┣ Income.js       // 내역 추가 페이지
 ┃ ┣ Transaction.js  // 내역 리스트 페이지
 ┃ ┗ Year.js         // 연간 내역 페이지
 ┣ utils
 ┃ ┣ comma.js
 ┃ ┗ newData.js
 ┣ App.css
 ┗ App.js
```
