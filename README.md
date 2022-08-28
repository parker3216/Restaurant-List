# 我的餐廳清單
使用express和node.js建立的餐廳清單，可統整自己喜愛的餐廳及瀏覽餐廳的詳細資料

## 專案功能
- 使用者可以直接註冊帳號或使用Facebook Login登入
- 使用者登入後可以新增及管理自己的餐廳清單
- 使用者可以瀏覽全部的餐廳列表
- 使用者可以用關鍵字去搜尋特定餐廳
- 使用者可以取得餐廳的詳細資訊
- 使用者可以新增餐廳資訊
- 使用者可以修改餐廳資訊
- 使用者可以刪除不喜歡的餐廳

## 環境建置要求
- Node.js - v16.15.1
- Express - v4.16.4
- Express-Handlebars - v3.0.0
- mongoose - v6.4.6
- body-parser - v1.20.0
- method-override v3.0.0
- Express-Session v1.17.1
- Passport v0.4.1
- Passport-local v1.0.0
- Passport-Facebook v3.0.0
- Connect-Flash v0.1.1
- bcryptjs v2.4.3
- dotenv v8.2.0

## 安裝及執行程序
1.打開終端機並將專案clone到本機
   ```bash
$ git clone https://github.com/parker3216/Restaurant-List.git
   ```
2.進入專案資料夾
   ```
$ cd restaurant_list
   ```
3.確認已安裝node.js,npm套件,MongoDb雲端版,圖形化介面Robo3T

4.依據.env.example建立環境變數及建立.env檔

5.建立種子資料到資料庫內
  ```bash
   npm run seed
   ```
6.啟用伺服器執行app.js檔案
   ```bash
   npm run dev
   ```
7.當終端機出現下列字樣代表伺服器起動成功
```bash
Listening on http://localhost:3000
mongodb connected!
 ```
8.開啟瀏覽器網址列輸入 http://localhost:3000/ 即可看到本專案的網頁呈現
