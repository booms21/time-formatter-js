# time-formatter-js
一个简单易用的js时间类型格式化工具库（兼容IE）
大小：4KB
## 例子：
```
//引入timeFormatter.js
//使用方式非常简单，创建一个timeFormatter实例，传入的对象可省略
 var timeFormatter = new TimeFormatter({
 isAddPrefixZero: true,//是否给时间增加前缀0，默认为true
 });
 timeFormatter.getDateStr('yyyy-mm-dd hh:MM:ss:S D ap q')// "2021-02-20 23:17:44:726 星期六 下午 春季".  默认格式yyyy-mm-dd hh:MM:ss
```


## 方法（API）：
#### getDateStr 
根据时间格式对时间进行转换，返回一个时间字符串
 ```
getDateStr（format, date）

 format：
 对应转换后的时间格式 ，字符串类型，可自定义里面的格式和占位符
      yyyy:   // 年
      mm:     // 月
      dd:    // 日
      hh:   // 时
      MM:    // 分
      ss:    // 秒
      S:    // 毫秒
      D:     // 星期
      ap:     //上午下午
      q:     //季节
  
 date（可省略）：
 需要转换的时间，可以是字符串或者date对象，不传则默认是现在的时间
 ```

#### dateArraySort:
对时间数组进行排序，返回排序后的数组
```
dateArraySort(dateArr, isAsc)
dateArr 时间数组
isAsc 是否升序，false则降序
```
#### getDaysBetween:
 获取两个日期的间隔天数
 ```
 getDaysBetween(startTime, endTime)
 startTime 开始时间
 endTime 结束时间
 ```
#### getDateStrByNumber:
获取某天后或某天前的日期
```
getDateStrByNumber(num, date)
num 正负整数，负数为日期之前，正数为之后
date 时间，不传递则默认今天
```
#### getMonthFirstDate:
获取对应日期月份的第一天
```
getMonthFirstDate(date)
date 时间，不传递则默认今天
```
#### getMonthLastDate:
获取对应日期月份的最后一天
```
getMonthLastDate(date)
date 时间，不传递则默认今天
```
#### getAMPM:
获取对应时间的上午下午
```
getAMPM(date)
date 时间，不传递则默认今天
```
#### getDay: 
获取对应日期的星期
```
getDay(date)
date 时间，不传递则默认今天
```
#### getQuarter:
获取对应日期的季节
```
getQuarter(date)
date 时间，不传递则默认今天
```
#### renderDynamicTime:
渲染一个跳动的时间 格式：hh：MM：ss
```
renderDynamicTime(selector)
selector 渲染的目标dom节点选择器
```
#### getTimestamp: 
获取时间戳





欢迎各位参与贡献 -szl
