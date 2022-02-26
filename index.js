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

  // 注意返回前清空相关本地变量，防止变量跨文章！
  hexo.locals.set('languages', [])
  hexo.locals.set('source', '')
  return Html

}, {ends: false})



// language标签，覆盖一段文本，读取语言项
hexo.extend.tag.register('language', async (args, content) => {
  // 从本地变量读取languages
  let languages = hexo.locals.get('languages')
  // 从文章本标签处读取本语言文本
  let language = args[0]
  let text = content
  // 检查是否是源语言
  if (args[1] == 'source'){
    //若是，设置为本地变量
    hexo.locals.set('source', language)
  }
  // 检查是否需要翻译
  else if(args[1] == 'translate'){
    // 若是，获取源语言并翻译文本
    var source = hexo.locals.get('source')
    for (let lan of hexo.locals.get('languages')){
      if (lan.language == source){
        var source_text = lan.text
      }
    }
    // 开始翻译，但是要考虑等待时间
    // 因为百度翻译的请求限制，一秒只能请求一次，实际测试发现间隔一秒仍然有可能超频
    // 需要设置一个链条，每个translate函数都要在这个链条上sleep，一个比一个长
    // 从本地变量获取本次休眠时间
    var sleepTime = hexo.locals.get('sleepTime')
    if (!sleepTime && typeof(sleepTime) != 'number'){sleepTime = 0}         // js变量类型太日怪了我去
    else{sleepTime += 2000}                                                 // 这个等待时长需要好好琢磨一下
    // 获取到后更新睡觉时间
    hexo.locals.set('sleepTime', sleepTime)
    text = await translate(source_text, 'auto', language, sleepTime)       // 注意！这里还不太对，language并不是百度翻译能识别的语言，需要用表转换！注意改！或者说在readme中给出这张表！
  }
  let one_mullan = {language: language, text: text}
  // 将本语言加入到本地变量languages中
  if (!languages){languages = [one_mullan]}
  else{languages.push(one_mullan)}
  hexo.locals.set('languages', languages)
}, {ends: true, async: true})



// 在生成器中注册box_asset事件，将box.css取到source文件夹当中
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