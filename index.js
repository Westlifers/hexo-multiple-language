var fs = require("hexo-fs")
var path = require("path")
// lib中的三个模块渲染html
var get_box = require("./lib/getbox.js")
var get_shitfpara = require("./lib/getshiftepara.js")
var get_vue = require("./lib/getvue.js")
// 翻译模块
var translate = require("./lib/gettranslation.js")



// mullan标签，单独使用，显示切换语言部件
hexo.extend.tag.register('mullan', (_args) => {
  let languages = hexo.locals.get('languages')

  // 获取切换页面代码
  let shiftparaHtml = get_shitfpara(languages)
  // 获取语言选择部件代码
  var language_list = []
  for (let language of languages){
    language_list.push(language.language)
  }
  let boxHtml = get_box(language_list)
  // 获取vue代码
  let vueHtml = get_vue(languages)

  // 合并这些html代码，注意在语言切换框前截断摘要，防止出现在首页
  let Html = '<div id="shiftpara">' + shiftparaHtml + '<!--more-->' + boxHtml + '</div>' + vueHtml

  // 注意返回前清空本地变量，防止变量跨文章！
  hexo.locals.set('languages', [])
  return Html

}, {ends: false})

// language标签，覆盖一段文本，读取语言项
hexo.extend.tag.register('language', (args, content) => {
  // 从本地变量读取languages
  let languages = hexo.locals.get('languages')
  // 从文章本标签处读取本语言文本
  let language = args[0]
  let text = content
  let one_mullan = {language: language, text: text}
  // 将本语言加入到本地变量languages中
  if (!languages){languages = [one_mullan]}
  else{languages.push(one_mullan)}
  hexo.locals.set('languages', languages)
}, {ends: true})



// 在生成器中注册box_asset事件，将box.css与box.js读取到source文件夹当中
hexo.extend.generator.register('box_asset', () => [
  {
    path: 'css/box.css',
    data: () => {
      return fs.createReadStream(
        path.resolve(path.resolve(__dirname, "./source"), "box.css"))
    }
  },
])


// 注入css
hexo.extend.injector.register('head_end', () => {
  return '<link rel="stylesheet" href="/css/box.css" type="text/css">'
})

// 注入Vue
hexo.extend.injector.register('head_end', () => {
  return '<script src="https://unpkg.com/vue@next"></script>'
})