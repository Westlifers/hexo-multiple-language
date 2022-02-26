// 本模块返回以vue操作dom的js代码，接收所有语言信息
var nunjucks = require('nunjucks')
var path = require('path')
var translate = require("./gettranslation.js")

function create_shiftpara(languages){
    var languages = JSON.stringify(languages).replace('"text":"', '"text":\'').replace('"}', '\'}')
    let shiftpara = nunjucks.render(path.resolve(__dirname, '../templates/' + 'vue.njk'), {languages: languages})
    translate('我在给这个系统写插件', 'zh', 'en')
    return shiftpara
}

module.exports = create_shiftpara