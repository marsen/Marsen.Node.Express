# Marsen.Node.Express
Learning Expressjs 學習筆記

## 環境

- OS:WINDOWS 10
- Editor: Atom
	- 排版外掛 [atom-beautigy](https://atom.io/packages/atom-beautify) (ctrl+shift+B)
-
---
## 目的
1. 建立一個以javascript開發的網站(暫時用Express)
2. MVC 架構
3. Restful 架構
4. 使用 Typescript
5. 架構分層
	1. MVC
	2. Controller > Service
	3. Service > DAL
	4. DAL > ORM > DB  
6. DI相依注入
7. TDD/BDD

### 名詞解釋
- DAL : DataAccessLayer

---
## 練習

### 官方手冊
1. [安裝](http://expressjs.com/zh-tw/starter/installing.html)
2. [Hello World](http://expressjs.com/zh-tw/starter/hello-world.html)
3. [Express 產生器](http://expressjs.com/zh-tw/starter/generator.html)
4. [基本路由](http://expressjs.com/zh-tw/starter/basic-routing.html)
5. [靜態檔案](http://expressjs.com/zh-tw/starter/installing.html)
6.

#### Express 產生器
- view engine support
  - [jade](http://jade-lang.com/)
  - [ejs](http://www.embeddedjs.com/)
  - [handlebarsjs](http://handlebarsjs.com/)
  -
- stylesheet engine support
  - plain css
  - sass
  - less
  - stylus
  - compass

#### 練習一 - 建立一個about頁
1. 建立測試專案
	- 身為一個**TDD/BDD**的擁簇，試著從測試開始開發吧
	- 建立測試專案 `mkdir web.test`
	- `cd web.test` >　`npm install`
	- **Q1. 我真的需要建立測試專案嗎？ npm的過程中，就有test scripts 要填寫(雖然我沒寫)**
	- 安裝必要的packages，重新執行 `npm install`
			"devDependencies": {
				"chromedriver": "^2.21.2",
				"cucumber": "~1.0.0",
				"http-server": "^0.9.0",
				"nightwatch": "^0.9.4",
				"nightwatch-cucumber": "^3.0.0",
				"npm-run-all": "^2.2.2",
				"phantomjs-prebuilt": "^2.1.7",
				"selenium-server": "^2.53.0"
			}
	- 寫第一個BDD
			#language: zh-TW
			功能: 網站初始化

			場景: 瀏覽about頁
				當: 瀏覽about頁時
				那麼: 畫面出現about頁
	- 執行測試，
	- Cucumber.js 與 Nightwatch.js  
	[參考](https://github.com/mucsi96/nightwatch-cucumber),
		1. 安裝nightwatch `npm nightwatch --save-dev nightwatch cucumber`
		2. 安裝nightwatch-cucumber `npm install --save-dev nightwatch-cucumber`
		3. 設定**nightwatch.conf.js**
		4. `node_modules\.bin\nightwatch`
2. 建立Web 專案
	1. 執行語法 `express --ejs --css sass`  
	用來建立專案，在這裡我要用`ejs`作我的view engine  
	`sass`作為我的sytlesheet engine
	2. 執行`npm install`安裝相關套件
	3. 執行`SET DEBUG=web:* & npm start`，開啟 `http://localhost:3000/`
4. 	


---
## 參考資料
