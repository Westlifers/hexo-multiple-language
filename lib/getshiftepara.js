// 本模块返回被切换文章部分的默认展示页面，啥参数也不接收，其实甚至可以不用njk模板，纯粹是为了对称
var nunjucks = require('nunjucks')
var path = require('path')

function create_shiftpara(languages){
    let shiftpara = nunjucks.render(path.resolve(__dirname, '../templates/' + 'shiftpara.njk'))
    return shiftpara
}

module.exports = create_shiftpara