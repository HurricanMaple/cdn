const types = {
    isInvisibleWidget: true,
    type: "TIME_WIDGET",
    icon: "https://waddle.coco-central.cn/static/img/logo/logo-white.svg",
    title: "时间管理器",
    version: "2.0.0",
    isGlobalWidget: true,
    properties: [],
    methods: [],
    events: [],
};

class Widget extends InvisibleWidget {
    constructor(props) {
        super(props);
    }

}

types['methods'].push({
    key: 'transformation',
    label: '转换为自然语言',
    params: [
        {
            key: 'time_stamp',
            label: '时间戳',
            valueType: 'number',
            defaultValue: 0
        }
    ],
    valueType: 'string'
})

var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var month = day * 30;
var year = month * 12;

Widget.prototype.transformation = function (time_stamp) {
    let now = new Date().getTime();
    let diffValue = now - time_stamp;
    let yearC = diffValue / year;
    let monthC = diffValue / month;
    let weekC = diffValue / week;
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;
    if (diffValue <= 0) {
        result = "我在时间之外等你";
    } else if (yearC > 12) {
        result = parseInt(yearC) + "年前";
    } else if (monthC >= 1) {
        result = parseInt(monthC) + "个月前";
    } else if (weekC >= 1) {
        result = parseInt(weekC) + "周前";
        if (result == "1周前") {
            result = "上周";
        }
    } else if (dayC >= 1) {
        result = parseInt(dayC) + "天前";
        if (result == "1天前") {
            result = "昨天";
        } else if (result == "2天前") {
            result = "前天";
        }
    } else if (hourC >= 1) {
        result = parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        result = parseInt(minC) + "分钟前";
    } else {
        result = "刚刚";
    }
    return result;
}


types['methods'].push({
    key: 'time',
    label: '返回当前时间戳',
    params: [],
    valueType: 'number',

})
Widget.prototype.time = function () {
    return (new Date().getTime());
}


exports.types = types;
exports.widget = Widget;