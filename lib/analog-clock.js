"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalogClock = void 0;
var digitalClockInterval;
var dateInterval;
var styleCSSElement;
var configDefaults = {
    htmlElement: '',
    showDate: false,
    showDigitalClock: false,
    showIndicators: false,
    clockIndicators: [],
    styleOptions: {
        fontSize: '30px',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        clockBackgroundColor: '#091921',
        clockBackgroundImage: '',
        clockBorderColor: '#132833',
        clockCenterBorderColor: '#fa9f22',
        clockCenterBackgroundColor: '#091921',
        clockSecondHandColor: '#fa9f22',
        clockMinuteHandColor: '#ffffff',
        clockHourHandColor: '#ffffff',
        clockIndicatorColor: '#607d8b',
        clockIndicatorIconColor: '#03a9f4',
        clockIndicatorMainColor: '#03a9f4',
        dateColor: '#c9c9c9',
        dateBackgroundColor: '#13222a',
        digitalClockColor: '#c9c9c9',
        digitalClockBackgroundColor: '#13222a'
    }
};
var AnalogClock = /** @class */ (function () {
    /**
    * htmlElement: '#myDiv',
    *
    * showDate: true, Optional
    *
    * showDigitalClock: true, Optional
    *
    * showIndicators: true, Optional
    *
    * clockIndicators: Array, Optional
    *
    * Emoji ['😄', '🙂', '🥪' , '🦜', '🐊', '👨🏽‍💻', '🐅', '🐼', '🐘', '🚴‍♂️', '🏂', '🧑' ]
    *
    * OR
    *
    * Numbers ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    *
    * styleOptions : {
    *
    *   fontSize?: string, Optional
    *
    *   fontFamily?: string, Optional
    *
    *   clockBackgroundColor?: string, Optional
    *
    *   clockBackgroundImage?: string, Optional
    *
    *   clockBorderColor?: string, Optional
    *
    *   clockCenterBorderColor?: string, Optional
    *
    *   clockCenterBackgroundColor?: string, Optional
    *
    *   clockSecondHandColor?: string, Optional
    *
    *   clockMinuteHandColor?: string, Optional
    *
    *   clockHourHandColor?: string, Optional
    *
    *   clockIndicatorColor?: string, Optional
    *
    *   clockIndicatorIconColor?: string, Optional
    *
    *   clockIndicatorMainColor?: string, Optional
    *
    *   dateColor?: string, Optional
    *
    *   dateBackground?: string, Optional
    *
    *   digitalClockColor?: string, Optional
    *
    *   digitalClockBackgroundColor?: string, Optional
    *
    * }
    */
    function AnalogClock(config) {
        var _this = this;
        this.config = config;
        this.initializeClock = function () {
            var now = new Date();
            var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            var diff = now - today;
            var time = Math.round(diff / 1000);
            var seconds = (time / 60) % 1;
            _this.setHandsTime(60 * seconds, "second");
            var minutes = (time / 3600) % 1;
            _this.setHandsTime(3600 * minutes, "minute");
            var hours = (time / 43200) % 1;
            _this.setHandsTime(43200 * hours, "hour");
        };
        this.setHandsTime = function (left, hand) {
            var clockHand = document.getElementsByClassName("clock-" + hand)[0];
            clockHand.style.animationDelay = left * -1 + "s";
        };
        this.setClockIcons = function () {
            for (var index = 0; index < 60; index++) {
                var axisIndicator = document.getElementsByClassName('clock-axis-indicators')[0];
                axisIndicator.insertAdjacentHTML('afterbegin', '<section class="clock-indicator"></section>');
            }
            if (!_this.config.showIndicators) {
                var clockIndicator = document.getElementsByClassName('clock-indicator');
                for (var i = 0; i < clockIndicator.length; i++) {
                    clockIndicator[i].style.border = '0px';
                }
            }
            if (_this.config.clockIndicators && _this.config.clockIndicators.length > 0) {
                _this.config.clockIndicators.forEach(function (number, index) {
                    var elementIndex = (5 + (5 * index)) - 1;
                    var clockIndicatorIcon = document.getElementsByClassName('clock-indicator')[elementIndex];
                    clockIndicatorIcon.insertAdjacentHTML('afterbegin', "<span>" + number + "</span>");
                });
            }
        };
        this.setDateAndDigitalTime = function () {
            var clockDivElement = document.getElementById('clock');
            clearInterval(digitalClockInterval);
            clearInterval(dateInterval);
            if (_this.config.showDigitalClock) {
                clockDivElement.insertAdjacentHTML('beforeend', '<div class="clock-digital"></div>');
                digitalClockInterval = setInterval(function () {
                    var date = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
                    var digitalClockElement = document.getElementsByClassName('clock-digital')[0];
                    digitalClockElement.innerHTML = date;
                }, 1000);
            }
            if (_this.config.showDate) {
                clockDivElement.insertAdjacentHTML('beforeend', '<div class="clock-date"></div>');
                dateInterval = setInterval(function () {
                    var digitalDateElement = document.getElementsByClassName('clock-date')[0];
                    digitalDateElement.innerHTML = new Date().getDate().toString();
                }, 1000);
            }
        };
        this.appendStyleSheet = function () {
            var clockStyleSheet = _this.getStyles();
            if (styleCSSElement) {
                styleCSSElement.remove();
            }
            var styleElement = document.createElement("style");
            if (document.getElementsByTagName("head")[0].appendChild(styleElement), styleElement.styleSheet) {
                styleElement.styleSheet.disabled || (styleElement.styleSheet.cssText = clockStyleSheet);
            }
            else
                try {
                    styleElement.innerHTML = clockStyleSheet;
                }
                catch (e) {
                    styleElement.innerText = clockStyleSheet;
                }
            styleCSSElement = styleElement;
        };
        this.getStyles = function () {
            var styles = _this.config.styleOptions;
            return "\n        :root {\n            --watch-font-size: " + (styles === null || styles === void 0 ? void 0 : styles.fontSize) + ";\n            --watch-font-family: " + (styles === null || styles === void 0 ? void 0 : styles.fontFamily) + ";\n            --watch-background: " + (styles === null || styles === void 0 ? void 0 : styles.clockBackgroundColor) + ";\n            --watch-background-image: url(" + (styles === null || styles === void 0 ? void 0 : styles.clockBackgroundImage) + ");\n            --watch-border: " + (styles === null || styles === void 0 ? void 0 : styles.clockBorderColor) + ";\n            --watch-date-color: " + (styles === null || styles === void 0 ? void 0 : styles.dateColor) + ";\n            --watch-date-background: " + (styles === null || styles === void 0 ? void 0 : styles.dateBackgroundColor) + ";\n            --watch-digital-color: " + (styles === null || styles === void 0 ? void 0 : styles.digitalClockColor) + ";\n            --watch-digital-background: " + (styles === null || styles === void 0 ? void 0 : styles.digitalClockBackgroundColor) + ";\n            --watch-center-border: " + (styles === null || styles === void 0 ? void 0 : styles.clockCenterBorderColor) + ";\n            --watch-center-background: " + (styles === null || styles === void 0 ? void 0 : styles.clockCenterBackgroundColor) + ";\n            --watch-second-hand-color: " + (styles === null || styles === void 0 ? void 0 : styles.clockSecondHandColor) + ";\n            --watch-minute-hand-color: " + (styles === null || styles === void 0 ? void 0 : styles.clockMinuteHandColor) + ";\n            --watch-hour-hand-color: " + (styles === null || styles === void 0 ? void 0 : styles.clockHourHandColor) + ";\n            --watch-indicator-color: " + (styles === null || styles === void 0 ? void 0 : styles.clockIndicatorColor) + ";\n            --watch-indicator-icon-color : " + (styles === null || styles === void 0 ? void 0 : styles.clockIndicatorIconColor) + ";\n            --watch-main-indicator-color: " + (styles === null || styles === void 0 ? void 0 : styles.clockIndicatorMainColor) + ";\n        }\n        #clock{width:100%;height:100%;font-family:var(--watch-font-family);font-size:var(--watch-font-size);-webkit-font-smoothing:antialiased;border:4px solid var(--watch-border);border-radius:50%;box-shadow:0 -15px 15px rgba(255,255,255,.05),inset 0 -15px 15px rgba(255,255,255,.05),0 15px 15px rgba(0,0,0,.3),inset 0 15px 15px rgba(0,0,0,.3);display:flex;justify-content:center;position:relative;background:var(--watch-background);background-image:var(--watch-background-image);background-size:cover}.clock-axis{position:absolute;z-index:10;width:calc(2% + 7px);height:calc(2% + 7px);top:50%;left:50%;border-radius:50%;background:var(--watch-center-background);border:4px solid var(--watch-center-border);transform:translateX(-50%) translateY(-50%)}.clock-hour,.clock-indicator,.clock-minute,.clock-second{position:absolute;width:4px;transform-origin:bottom center;border-radius:4px;z-index:1}.clock-hour:before,.clock-minute:before,.clock-second:before{background:inherit;width:inherit;position:absolute;color:transparent;border-radius:inherit;bottom:-1em;content:'.'}.clock-second{height:40%;top:calc(50% - 40%);background:var(--watch-second-hand-color);animation:time 60s infinite steps(60);z-index:5}.clock-minute{height:35%;top:calc(50% - 35%);animation:time 3600s linear infinite;background-color:var(--watch-minute-hand-color)}.clock-hour{height:25%;top:calc(50% - 25%);animation:time 43200s linear infinite;background:var(--watch-hour-hand-color)}.clock-date{position:absolute;top:50%;right:15%;color:var(--watch-date-color);background:var(--watch-date-background);border-radius:4px;padding:5px 10px;transform:translateY(-50%)}.clock-digital{position:absolute;top:70%;color:var(--watch-digital-color);background:var(--watch-digital-background);padding:3px 10px;border-radius:6px;text-transform:uppercase;transform:translateY(-50%)}.clock-indicator{left:calc(50% - 2px);height:calc(50% - 5px);border-top:4px solid var(--watch-indicator-color);margin:5px 0}.clock-indicator:nth-of-type(5n){border-top:8px solid var(--watch-main-indicator-color)}.clock-indicator:nth-of-type(5n) span{display:flex;justify-content:center;margin:5px 0;color:var(--watch-indicator-icon-color)}section:nth-of-type(1){transform:rotateZ(calc(6deg * 1))}section:nth-of-type(2){transform:rotateZ(calc(6deg * 2))}section:nth-of-type(3){transform:rotateZ(calc(6deg * 3))}section:nth-of-type(4){transform:rotateZ(calc(6deg * 4))}section:nth-of-type(5){transform:rotateZ(calc(6deg * 5))}section:nth-of-type(5) span{transform:rotateZ(calc(-6deg * 5))}section:nth-of-type(6){transform:rotateZ(calc(6deg * 6))}section:nth-of-type(7){transform:rotateZ(calc(6deg * 7))}section:nth-of-type(8){transform:rotateZ(calc(6deg * 8))}section:nth-of-type(9){transform:rotateZ(calc(6deg * 9))}section:nth-of-type(10){transform:rotateZ(calc(6deg * 10))}section:nth-of-type(10) span{transform:rotateZ(calc(-6deg * 10))}section:nth-of-type(11){transform:rotateZ(calc(6deg * 11))}section:nth-of-type(12){transform:rotateZ(calc(6deg * 12))}section:nth-of-type(13){transform:rotateZ(calc(6deg * 13))}section:nth-of-type(14){transform:rotateZ(calc(6deg * 14))}section:nth-of-type(15){transform:rotateZ(calc(6deg * 15))}section:nth-of-type(15) span{transform:rotateZ(calc(-6deg * 15))}section:nth-of-type(16){transform:rotateZ(calc(6deg * 16))}section:nth-of-type(17){transform:rotateZ(calc(6deg * 17))}section:nth-of-type(18){transform:rotateZ(calc(6deg * 18))}section:nth-of-type(19){transform:rotateZ(calc(6deg * 19))}section:nth-of-type(20){transform:rotateZ(calc(6deg * 20))}section:nth-of-type(20) span{transform:rotateZ(calc(-6deg * 20))}section:nth-of-type(21){transform:rotateZ(calc(6deg * 21))}section:nth-of-type(22){transform:rotateZ(calc(6deg * 22))}section:nth-of-type(23){transform:rotateZ(calc(6deg * 23))}section:nth-of-type(24){transform:rotateZ(calc(6deg * 24))}section:nth-of-type(25){transform:rotateZ(calc(6deg * 25))}section:nth-of-type(25) span{transform:rotateZ(calc(-6deg * 25))}section:nth-of-type(26){transform:rotateZ(calc(6deg * 26))}section:nth-of-type(27){transform:rotateZ(calc(6deg * 27))}section:nth-of-type(28){transform:rotateZ(calc(6deg * 28))}section:nth-of-type(29){transform:rotateZ(calc(6deg * 29))}section:nth-of-type(30){transform:rotateZ(calc(6deg * 30))}section:nth-of-type(30) span{transform:rotateZ(calc(-6deg * 30))}section:nth-of-type(31){transform:rotateZ(calc(6deg * 31))}section:nth-of-type(32){transform:rotateZ(calc(6deg * 32))}section:nth-of-type(33){transform:rotateZ(calc(6deg * 33))}section:nth-of-type(34){transform:rotateZ(calc(6deg * 34))}section:nth-of-type(35){transform:rotateZ(calc(6deg * 35))}section:nth-of-type(35) span{transform:rotateZ(calc(-6deg * 35))}section:nth-of-type(36){transform:rotateZ(calc(6deg * 36))}section:nth-of-type(37){transform:rotateZ(calc(6deg * 37))}section:nth-of-type(38){transform:rotateZ(calc(6deg * 38))}section:nth-of-type(39){transform:rotateZ(calc(6deg * 39))}section:nth-of-type(40){transform:rotateZ(calc(6deg * 40))}section:nth-of-type(40) span{transform:rotateZ(calc(-6deg * 40))}section:nth-of-type(41){transform:rotateZ(calc(6deg * 41))}section:nth-of-type(42){transform:rotateZ(calc(6deg * 42))}section:nth-of-type(43){transform:rotateZ(calc(6deg * 43))}section:nth-of-type(44){transform:rotateZ(calc(6deg * 44))}section:nth-of-type(45){transform:rotateZ(calc(6deg * 45))}section:nth-of-type(45) span{transform:rotateZ(calc(-6deg * 45))}section:nth-of-type(46){transform:rotateZ(calc(6deg * 46))}section:nth-of-type(47){transform:rotateZ(calc(6deg * 47))}section:nth-of-type(48){transform:rotateZ(calc(6deg * 48))}section:nth-of-type(49){transform:rotateZ(calc(6deg * 49))}section:nth-of-type(50){transform:rotateZ(calc(6deg * 50))}section:nth-of-type(50) span{transform:rotateZ(calc(-6deg * 50))}section:nth-of-type(51){transform:rotateZ(calc(6deg * 51))}section:nth-of-type(52){transform:rotateZ(calc(6deg * 52))}section:nth-of-type(53){transform:rotateZ(calc(6deg * 53))}section:nth-of-type(54){transform:rotateZ(calc(6deg * 54))}section:nth-of-type(55){transform:rotateZ(calc(6deg * 55))}section:nth-of-type(55) span{transform:rotateZ(calc(-6deg * 55))}section:nth-of-type(56){transform:rotateZ(calc(6deg * 56))}section:nth-of-type(57){transform:rotateZ(calc(6deg * 57))}section:nth-of-type(58){transform:rotateZ(calc(6deg * 58))}section:nth-of-type(59){transform:rotateZ(calc(6deg * 59))}section:nth-of-type(60){transform:rotateZ(calc(6deg * 60))}section:nth-of-type(60) span{transform:rotateZ(calc(-6deg * 60))}@-webkit-keyframes time{to{transform:rotateZ(360deg)}}@keyframes time{to{transform:rotateZ(360deg)}}";
        };
        config.styleOptions = __assign(__assign({}, configDefaults.styleOptions), config.styleOptions);
        this.config = __assign(__assign({}, configDefaults), config);
        var template = "<div id=\"clock\"><div class=\"clock-axis\"></div><div class=\"clock-second\"></div><div class=\"clock-minute\"></div><div class=\"clock-hour\"></div><div class=\"clock-axis-indicators\"></div></div>";
        var clockElement = document.getElementById(config.htmlElement);
        if (clockElement) {
            clockElement.innerHTML = '';
            clockElement.insertAdjacentHTML('afterbegin', template);
            this.initializeClock();
            this.appendStyleSheet();
            this.setClockIcons();
            this.setDateAndDigitalTime();
        }
    }
    return AnalogClock;
}());
exports.AnalogClock = AnalogClock;
