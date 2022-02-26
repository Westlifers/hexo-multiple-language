// 本模块提供翻译服务，接收一段文本与目标语种，返回其对应翻译
// 开发时不要忘记跳过代码块等
var fetch = require("node-fetch")
var md5 = require("./md5.js")

// 生成翻译请求url
function span_url(q, from, to){
    const appid = '20220225001096734'
    const key = 'rKBeodeRSBEmbf_vk3ZN'
    var salt = (new Date).getTime()
    let string = appid + q + salt + key
    let sign = md5(string)
    let url = `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${q}&from=${from}&to=${to}&appid=${appid}&salt=${salt}&sign=${sign}`
    return url
}

// 阻塞函数
function sleep(time){
    return new Promise((resolve) => {
        setTimeout(() => {resolve()}, time)
    })
}

async function translate(source, from, to){
    let sleepTime = hexo.locals.get('sleepTime')
    if (!sleepTime){sleepTime = 0}
    else{sleepTime += 1000}
    hexo.locals.set('sleepTime', sleepTime)
    await sleep(sleepTime)
    
    let response = await fetch(span_url(source, from, to))
    let result = await response.json()
    result = await result.trans_result
    console.log(result[0])
    return result
}

module.exports = translate