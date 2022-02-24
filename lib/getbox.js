// 本模块返回选择语言的小部件，只接收语言列表
var nunjucks = require('nunjucks')
var path = require('path')

function create_box(language_list){
    let box = nunjucks.render(path.resolve(__dirname, '../templates/' + 'choicebox.njk'), {language_list: language_list})
    return box
}

module.exports = create_box