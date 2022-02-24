// 本模块返回被切换文章部分，接收所有语言信息
var nunjucks = require('nunjucks')
var path = require('path')

function create_shiftpara(languages){
    let shiftpara = nunjucks.render(path.resolve(__dirname, '../templates/' + 'shiftpara.njk'), {languages: languages})
    return shiftpara
}

module.exports = create_shiftpara