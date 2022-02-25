# hexo-multiple-language
A hexo plugin allowing you to write multiple language versions for your post and offering translation service when required.

一个Hexo插件，让你可以为文章编写多个语言的版本（或者多页面），并在必要时提供翻译服务。

# Install 安装
```npm install hexo-multiple-language```

# Usage 使用

## Basic Usage 基本使用
```
{% language language_name%}
Content for this piece
{% endlanguage %}

...

{% mullan %}
```
`language_name`是本段内容的语言名，覆盖本语言的文本
`{% language %}`标签可以有多个
>注意！`{% mullan %}`必须放在所有的`{% language %}`标签之后


## Translation Service 翻译功能 （待开发）
```
{% language language_name source %}
Content
{% endlanguage %}

...

{% language language_name translate %}
{% endlanguage %}

...

{% mullan %}
```
在`{% language %}`标签填写参数`source`，将标记此语言为翻译源语言
`if_translate`设置为`true`时将启动翻译功能，启用前提是在另一个语言片段设置为true

