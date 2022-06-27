const express = require('express');
const puppeteer = require('puppeteer')
// /api开头的请求
const axios = require('axios')
const app = express();

async function test() {
	console.log('截图');
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto('https://case.vittoreblog.com/')
	await page.screenshot({path:'vittoreblog.png'})
	await browser.close()
}

// test()
const urlCache = {}
app.get('*', async function (req, res) {
	console.log(req.url);
	// 遍历所有的路由，都写成html文件，或者都缓存上
	//响应较慢
	// 解决方案1. 加缓存
	// if(urlCache[url]){
	// 	return res.send(urlCache[url])
	// }
  // 解决方案2. lru缓存算法 TODO 

	if (req.url == '/favicon.ico') {
		// 对seo 无影响
		return res.send({ code: 0 })
	}
	const url = 'http://localhost:8090' + req.url
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(url,{
		waitUntil:['networkidle0']
	})
	const html = await page.content()
	console.log(html);
	// urlCache[url] = html
	res.send(html)
})
app.listen(8081, () => {
	console.log('ssr server start');
})