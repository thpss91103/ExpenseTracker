# 記帳本
### 介紹
可以紀錄自己得花費
![Expense](https://github.com/thpss91103/ExpenseTracker/blob/main/public/image/indexImg.png)
### 功能
1. 需註冊帳號才能使用
2. 新增支出
3. 搜尋類別支出
4. 點擊Edit可以編輯支出
5. 點擊Delete可以刪除費用
### 如何使用
1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：
```
npm install
```
4. 安裝所需套件：
```
npm i express@4.18.2 express-handlebars@3.0.0
npm i body-parser
npm i dotenv
```
5. 設定環境變數，項目請參考.env.example，使用你的 MongoDB ，設定 MONGODB_URL 環境變數
```
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.pk4dwnp.mongodb.net/?retryWrites=true&w=majority
```
6. 製作預設的支出資料
```
npm run seed
```
7. 啟動伺服器
```
npm run dev 
```
8. 當 terminal 出現以下字樣，表示伺服器已啟動並成功連結
```
Express is listening on http://localhost:3000
```
9. 打開瀏覽器輸入 http://localhost:3000 進入網頁
10. 使用預設帳號密碼登入
```
帳號：dad
密碼：123
``` 
11. 使用 Ctrl + c 結束
### 開發工具
- Node.js 10.15.0
- Express 4.18.2
- Express-Handlebars 3.0.0
- Express-session 1.17.1
- Bootstrap 4.0.0
- Font-awesome 5.8.1
- MongoDB
- Mongoose 5.9.7
- Dotenv 16.0.3
- Method-override 3.0.0
- Bcryptjs 2.4.3
- Body-parser 1.20.2
- Connect-flash 0.1.1
- Passport 0.4.1
- Passport-facebook 3.0.0
- Passport-local 1.0.0