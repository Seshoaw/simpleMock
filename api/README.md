# mockjs 数据模板规范

### 数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：

```
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

## 生成规则：

1.属性值是字符串 String

> 'name|min-max': string
> 通过重复 string 生成一个字符串，重复次数大于等于 min，小于等于 max。
>
> 'name|count': string
> 通过重复 string 生成一个字符串，重复次数等于 count。

2.属性值是数字 Number

> 'name|+1': number
> 属性值自动加 1，初始值为 number。
>
> 'name|min-max': number
> 生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型。
>
> 'name|min-max.dmin-dmax': number
> 生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位。

3.属性值是布尔型 Boolean

> 'name|1': boolean
> 随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。
>
> 'name|min-max': value
> 随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)。

## 数据占位符

占位符 只是在属性值字符串中占个位置，并不出现在最终的属性值中。

```
占位符 的格式为：

@占位符
@占位符(参数 [, 参数])
```

> 用 @ 来标识其后的字符串是 占位符。
>
> 占位符 引用的是 Mock.Random 中的方法。

示例：

```
Mock.mock({
    name: {
        first: '@FIRST',
        middle: '@FIRST',
        last: '@LAST',
        full: '@first @middle @last'
    }
})
// =>
{
    "name": {
        "first": "Charles",
        "middle": "Brenda",
        "last": "Lopez",
        "full": "Charles Brenda Lopez"
    }
}
```

### Mock.Random 提供的完整方法（占位符）如下：

| Type          | Method                                                                                |
| ------------- | ------------------------------------------------------------------------------------- |
| Basic         | boolean, natural, integer, float, character, string, range, date, time, datetime, now |
| Image         | image, dataImage                                                                      |
| Color         | color                                                                                 |
| Text          | paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle                |
| Name          | first, last, name, cfirst, clast, cname                                               |
| Web           | url, domain, email, ip, tld                                                           |
| Address       | area, region                                                                          |
| Helper        | capitalize, upper, lower, pick, shuffle                                               |
| Miscellaneous | guid, id                                                                              |

### 详细文档见 https://github.com/nuysoft/Mock/wiki
