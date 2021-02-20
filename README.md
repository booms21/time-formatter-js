# time-formatter-js
时间格式化库

##例子：
```
//创建一个timeFormatter实例，传入的对象可省略
 var timeFormatter = new TimeFormatter({
 isAddPrefixZero: true,//是否给时间增加前缀0，默认为true
 });

 timeFormatter.getDateStr()//获取当前时间的字符串.  默认格式yyyy-mm-dd hh:MM:ss
```

##方法（API）：
####getDateStr 
根据时间格式对对应的时间进行转换
 ```
getDateStr（_format, date）//_format
 ```
 _format：
 对应转换后的时间格式 ，可自定义里面的格式和占位符
      yyyy: // 年
      mm:  // 月
      dd: // 日
      hh:// 时
      MM:  // 分
      ss:  // 秒
      S:  // 毫秒
      D:  // 星期
      ap:  //上午下午
      q: //季节
  
 date（可省略）：
 需要转换的时间，可以是字符串或者date对象，不传则默认是现在的时间
