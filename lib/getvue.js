// 本模块返回以vue操作dom的js代码，接收所有语言信息
var nunjucks = require('nunjucks')
var path = require('path')

function create_shiftpara(languages){
    var languages = JSON.stringify(languages).replace('"text":"', '"text":\'').replace('"}', '\'}')
    let shiftpara = nunjucks.render(path.resolve(__dirname, '../templates/' + 'vue.njk'), {languages: languages})
    return shiftpara
}

module.exports = create_shiftpara