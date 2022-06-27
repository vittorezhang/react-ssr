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

app.get('*', async function (req, res) {
	console.log(req.url);
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
	res.send(html)
})
app.listen(8081, () => {
	console.log('ssr server start');
})