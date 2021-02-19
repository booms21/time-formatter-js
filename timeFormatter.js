/**
 * timeFormatter.js
 * copyright szl 2021.2
 * GitHub： https://github.com/booms21/time-formatter-js
 * js时间类型格式化工具库：指定时间格式， 时间排序、间隔天数、跳动时间...
 */
(function() {
  ("use strict");
  var _timeFormatterInstance = null; //内部活动的实例
  function TimeFormatter(options) {
    var initModel = {
      // 默认值模版
      isAddPrefixZero: true,
      defaultFormat: "yyyy-mm-dd hh:MM:ss",
    };

    options = options || initModel;
    this.initModel = initModel;
    this._isAddPrefixZero =
      typeof options.isAddPrefixZero === "undefined"
        ? initModel.isAddPrefixZero
        : !!options.isAddPrefixZero; // 如没有配置项，则使用默认
    _timeFormatterInstance = this;
  }

  /**
   * _addPrefixZero 数字加前缀0
   * @param {String} num
   */
  function _addPrefixZero(num) {
    if (!_timeFormatterInstance._isAddPrefixZero) {
      return num;
    }

    return num.length === 1 ? "0" + num : num;
  }
  /**
   * _validDate 日期类型校验
   * @param {Date} date
   */
  function _validDate(date) {
    var date = new Date(date);
    if (
      date.toString() === "Invalid Date" ||
      Object.prototype.toString.call(date) !== "[object Date]"
    ) {
      //如强转后的日期类型不正确 则默认为现在的时间
      date = new Date();
    }
    return date;
  }
  /**
   * TimeFormatter.prototype.getMonthFirstDate 获取对应日期月份的第一天
   * @param {Date} date
   */
  TimeFormatter.prototype.getMonthFirstDate = function(date) {
    return this.getDateStr(
      this.initModel.defaultFormat,
      _validDate(date).setDate(1)
    );
  };
  /**
   * TimeFormatter.prototype.getMonthLastDate 获取对应日期月份的最后一天
   * @param {Date} date
   */
  TimeFormatter.prototype.getMonthLastDate = function(date) {
    var date = _validDate(date);
    return this.getDateStr(
      this.initModel.defaultFormat,
      new Date(date.getFullYear(), date.getMonth() + 1, 0)
    );
  };
  /**
   * TimeFormatter.prototype.getDaysBetween 获取2个日期的间隔天数
   * @param {Date} startTime
   * @param {Date} endTime
   */
  TimeFormatter.prototype.getDaysBetween = function(startTime, endTime) {
    return parseInt(
      Math.abs(
        _validDate(startTime).getTime() - _validDate(endTime).getTime()
      ) /
        (1000 * 60 * 60 * 24)
    );
  };
  /**
   * TimeFormatter.prototype.getDay 获取对应日期的星期
   * @param {Date} date
   *
   */
  TimeFormatter.prototype.getDay = function(date) {
    var day = _validDate(date).getDay();
    var dayMap = [
      "星期天",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    return dayMap[day] && dayMap[day];
  };
  /**
   * TimeFormatter.prototype.getDateStrByNumber 获取某天后或某天前的日期
   * @param {Date} date
   * @param {Number} num 可传入负数
   */
  TimeFormatter.prototype.getDateStrByNumber = function(num, date) {
    var date = _validDate(date);
    return this.getDateStr(
      this.initModel.defaultFormat,
      date,
      date.setDate(date.getDate() + num)
    ); //使用默认的日期格式
  };
  /**
   * TimeFormatter.prototype.getQuarter 获取对应日期的季节
   * @param {Date} date
   *
   */
  TimeFormatter.prototype.getQuarter = function(date) {
    var quarterMap = ["春季", "夏季", "秋季", "冬季"];
    return quarterMap[Math.floor((_validDate(date).getMonth() + 3) / 3) - 1];
  };
  /**
   * TimeFormatter.prototype.renderDynamicTime 渲染一个跳动的时间dom
   * @param {String} selector  选择器
   *
   */
  TimeFormatter.prototype.renderDynamicTime = function(selector, time) {
    var dom = document.querySelector(selector);
    var timer = setInterval(function() {
      dom.innerHTML = _timeFormatterInstance.getDateStr("hh:MM:ss");
    }, 1000);
    window.onbeforeunload = function() {
      clearInterval(timer);
    };
  };
  /**
   * TimeFormatter.prototype.getAMPM 获取对应时间的上午下午
   * @param {Date} date
   *
   */
  TimeFormatter.prototype.getAMPM = function(date) {
    return _validDate(date).getHours() < 12 ? "上午" : "下午";
  };
  /**
   * TimeFormatter.prototype.dateArraySort 对对应日期数组进行排序
   * @param {Date} dateArr
   * @param {Boolean} isAsc
   */
  TimeFormatter.prototype.dateArraySort = function(dateArr, isAsc) {
    return dateArr.sort(function(a, b) {
      if (isAsc) {
        return Date.parse(a) - Date.parse(b);
      }
      return Date.parse(b) - Date.parse(a);
    });
  };
  /**
   * TimeFormatter.prototype.getTimestamp 获取时间戳
   * @param {Date} date
   *
   */
  TimeFormatter.prototype.getTimestamp = function(date) {
    return _validDate(date).getTime();
  };

  /**
   * TimeFormatter.prototype.getDateStr 根据时间格式对对应的时间进行转换
   * @param {Date} date
   * @param {String} _format 需要转换后的时间格式
   */
  TimeFormatter.prototype.getDateStr = function(_format, date) {
    var date = _validDate(date);
    _format = _format || this.initModel.defaultFormat;

    var formatMap = {
      yyyy: date.getFullYear(), // 年
      mm: date.getMonth() + 1, // 月
      dd: date.getDate(), // 日
      hh: date.getHours(), // 时
      MM: date.getMinutes(), // 分
      ss: date.getSeconds(), // 秒
      S: date.getMilliseconds(), // 毫秒
      D: this.getDay(date), // 星期
      ap: this.getAMPM(date), //上午下午
      q: this.getQuarter(date), //季节
    };
    //根据key进行替换
    for (var item in formatMap) {
      _format = _format.replace(
        item,
        _addPrefixZero(formatMap[item].toString())
      );
    }
    return _format;
  };

  //判断环境 暴露构造函数
  if (typeof module !== "undefined") {
    exports = module.exports = TimeFormatter;
    exports.TimeFormatter = TimeFormatter;
  }

  if (typeof window !== "undefined") {
    window.TimeFormatter = TimeFormatter;
  }
  console.info(
    "timeFormatter.js detected.  - copyright szl github:https://github.com/booms21/time-formatter-js"
  );
})();
