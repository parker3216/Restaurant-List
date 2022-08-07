# 我的餐廳清單
使用express和node.js建立的餐廳清單，並新增CURD功能及重構清單

## 專案功能
- 使用者可以新增一家餐廳
- 使用者可以瀏覽一家餐廳的詳細資訊
- 使用者可以瀏覽全部所有餐廳
- 使用者可以修改一家餐廳的資訊
- 使用者可以刪除一家餐廳

## 環境建置要求
- Node.js - v16.15.1
- Express - v4.16.4
- Express-Handlebars - v3.0.0
- mongoose - v6.4.6
- MongoDB
- body-parser - v1.20.0
- method-override 3.0.0

## 安裝及執行程序
1.將專案clone到本機
   ```bash
$ git clone https://github.com/parker3216/Restaurant-List.git
   ```
2.進入專案資料夾
   ```
$ cd restaurant_list
   ```
3.設定MONGO_URI
將下列連結中的alpha改為自己的使用者名稱,camp改為自己的使用者密碼
```
export MONGODB_URI="mongodb+srv://alpha:camp@cluster0.h1zdvoc.mongodb.net/restaurant_list?retryWrites=true&w=majority"
```

4.確認已安裝node.js,npm套件,MongoDb雲端版,圖形化介面Robo3T



5.啟用伺服器執行app.js檔案
   ```bash
   npm run dev
   ```
   
6.當終端機出現下列字樣代表伺服器起動成功
```bash
Listening on http://localhost:3000
mongodb connected!
 ```

7.開啟瀏覽器網址列輸入 http://localhost:3000/ 即可看到本專案的網頁呈現



