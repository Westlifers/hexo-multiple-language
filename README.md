# hexo-multiple-language
A hexo plugin allowing you to write multiple language versions for your post and offering translation service when required.

一个Hexo插件，让你可以为文章编写多个语言的版本（或者多页面），并在必要时提供翻译服务（此功能待开发）。

# Install 安装
```npm install hexo-multiple-language```

# Usage 使用
在你的markdown文件中插入以下片段

```
{% language language_name %}
Content for this piece
{% endlanguage %}

...

{% mullan %}
```
`language_name`是本段内容的语言名，覆盖本语言的文本
`{% language %}`标签可以有多个
>注意！`{% mullan %}`必须放在所有的`{% language %}`标签之后



