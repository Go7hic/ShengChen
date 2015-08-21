
    $(function () {
        var poem =  ["对酒当歌，人生几何",
            "「譬如朝露  去日苦多」",
            "「慨当以慷  忧思难忘」",
            "「何以解忧  唯有杜康」",
            "「青青子衿  悠悠我心」",
            "「但为君故  沉吟至今」",
            "「呦呦鹿鸣  食野之苹」",
            "「我有嘉宾  鼓瑟吹笙」",
            "「明明如月  何时可掇」",
            "「忧从中来  不可断绝」",
            "「越陌度阡  枉用相存」",
            "「契阔谈宴  心念旧恩」",
            "「月明星稀  乌鹊南飞」",
            "「绕树三匝  何枝可依」",
            "「山不厌高  海不厌深」",
            "「周公吐哺  天下归心」",
            "「青青园中葵  朝露待日晞」",
            "「阳春布德泽  万物生光辉」",
            "「常恐秋节至  焜黄华叶衰」",
            "「百川东到海  何时复西归」",
            "「少壮不努力  老大徒伤悲」"];
        var random = parseInt(Math.random()*21);
        $('#poetry').html(poem[random]);

        var $btn = $('#btn'),
            $live = $('.live-result'),
            $die = $('.die-result');
        $btn.on('click',function() {
            var $time = $('#iptVal').val();

            if (!$time) {
                $time = '1998-04-01';
            } else if ($time.match(/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)) {
                $live.removeClass('hide');
                // $die.show();
                var myTime = new Date($time),
                    times = myTime.getTime(),
                    now = Date.now(),
                    timelong = now-times,
                    year = timelong/(365*86400000),
                    day = timelong/(24*3600000),
                    lifeLeft = 75 - year;
                $('.year').html('<span id=yearNum></span>'+'年');
                var yearMove = new CountUp("yearNum",0,year,1,2);
                yearMove.start();

                $('.month').html('<span id=monNum></span>'+'月');
                var monMove = new CountUp("monNum",0,year*12,0,3);
                monMove.start();

                $('.day').html('<span id=dayNum></span>'+'日');
                var dayMove = new CountUp("dayNum",0,Math.floor(timelong/86400000),0,4);
                dayMove.start();

                $('.hour').html('<span id=hourNum></span>'+'时');
                var hourMove = new CountUp("hourNum",0,Math.floor(timelong/3600000),0,5);
                hourMove.start();

                $('.eat').html('吃'+'<span id=mealNum></span>'+'顿饭');
                var mealMove = new CountUp("mealNum",0,lifeLeft*365*3,0,5);
                mealMove.start();

                $('.holiday').html('享受'+'<span id=vocNum></span>'+'个长假');
                var vocMove = new CountUp("vocNum",0,lifeLeft*3,0,2);
                vocMove.start();

                $('.ml').html('做'+'<span id=mlNum></span>'+'次爱');
                var mlMove = new CountUp("mlNum",0,lifeLeft*56,0,3);
                mlMove.start();

                $('.weekend').html('过'+'<span id=weekNum></span>'+'次周末');
                var weekMove = new CountUp("weekNum",0,lifeLeft*53,0,3);
                weekMove.start();
            } else {
                alert('出生日期不能乱写哦，你妈妈知道会生气的');
            }

        });
        $('.die .btn').on('click',function () {

            $live.addClass('hide');
            $die.removeClass('hide');
        });
        $('.live .btn').on('click',function () {
            $die.addClass('hide');
            $live.removeClass('hide');
        });

    });


(function(){

    //generate clock animations
    var now       = new Date(),
        hourDeg   = now.getHours() / 12 * 360 + now.getMinutes() / 60 * 30,
        minuteDeg = now.getMinutes() / 60 * 360 + now.getSeconds() / 60 * 6,
        secondDeg = now.getSeconds() / 60 * 360,
        stylesDeg = [
            "@-webkit-keyframes rotate-hour{from{transform:rotate(" + hourDeg + "deg);}to{transform:rotate(" + (hourDeg + 360) + "deg);}}",
            "@-webkit-keyframes rotate-minute{from{transform:rotate(" + minuteDeg + "deg);}to{transform:rotate(" + (minuteDeg + 360) + "deg);}}",
            "@-webkit-keyframes rotate-second{from{transform:rotate(" + secondDeg + "deg);}to{transform:rotate(" + (secondDeg + 360) + "deg);}}"
        ].join("");

    document.getElementById("clock-animations").innerHTML = stylesDeg;

})();



(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
} else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
} else {
    root.CountUp = factory();
}
}(this, function(require, exports, module) {

/*

countUp.js
by @inorganik

*/

// target = id of html element or var of previously selected html element where counting occurs
// startVal = the value you want to begin at
// endVal = the value you want to arrive at
// decimals = number of decimal places, default 0
// duration = duration of animation in seconds, default 2
// options = optional object of options (see below)

var CountUp = function(target, startVal, endVal, decimals, duration, options) {

// make sure requestAnimationFrame and cancelAnimationFrame are defined
// polyfill for browsers without native support
// by Opera engineer Erik Möller
var lastTime = 0;
var vendors = ['webkit', 'moz', 'ms', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame =
    window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
}
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}

 // default options
 this.options = {
    useEasing : false, // toggle easing
    useGrouping : true, // 1,000,000 vs 1000000
    separator : ',', // character to use as a separator
    decimal : '.' // character to use as a decimal
};
// extend default options with passed options object
for (var key in options) {
    if (options.hasOwnProperty(key)) {
        this.options[key] = options[key];
    }
}
if (this.options.separator === '') this.options.useGrouping = false;
if (!this.options.prefix) this.options.prefix = '';
if (!this.options.suffix) this.options.suffix = '';

this.d = (typeof target === 'string') ? document.getElementById(target) : target;
this.startVal = Number(startVal);
if (isNaN(startVal)) this.startVal = Number(startVal.match(/[\d]+/g).join('')); // strip non-numerical characters
this.endVal = Number(endVal);
if (isNaN(endVal)) this.endVal = Number(endVal.match(/[\d]+/g).join('')); // strip non-numerical characters
this.countDown = (this.startVal > this.endVal);
this.frameVal = this.startVal;
this.decimals = Math.max(0, decimals || 0);
this.dec = Math.pow(10, this.decimals);
this.duration = Number(duration) * 1000 || 2000;
var self = this;

this.version = function () { return '1.5.3'; };

// Print value to target
this.printValue = function(value) {
    var result = (!isNaN(value)) ? self.formatNumber(value) : '--';
    if (self.d.tagName == 'INPUT') {
        this.d.value = result;
    }
    else if (self.d.tagName == 'text') {
        this.d.textContent = result;
    }
    else {
        this.d.innerHTML = result;
    }
};

// Robert Penner's easeOutExpo
this.easeOutExpo = function(t, b, c, d) {
    return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
};
this.count = function(timestamp) {

    if (!self.startTime) self.startTime = timestamp;

    self.timestamp = timestamp;

    var progress = timestamp - self.startTime;
    self.remaining = self.duration - progress;

    // to ease or not to ease
    if (self.options.useEasing) {
        if (self.countDown) {
            self.frameVal = self.startVal - self.easeOutExpo(progress, 0, self.startVal - self.endVal, self.duration);
        } else {
            self.frameVal = self.easeOutExpo(progress, self.startVal, self.endVal - self.startVal, self.duration);
        }
    } else {
        if (self.countDown) {
            self.frameVal = self.startVal - ((self.startVal - self.endVal) * (progress / self.duration));
        } else {
            self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
        }
    }

    // don't go past endVal since progress can exceed duration in the last frame
    if (self.countDown) {
        self.frameVal = (self.frameVal < self.endVal) ? self.endVal : self.frameVal;
    } else {
        self.frameVal = (self.frameVal > self.endVal) ? self.endVal : self.frameVal;
    }

    // decimal
    self.frameVal = Math.round(self.frameVal*self.dec)/self.dec;

    // format and print value
    self.printValue(self.frameVal);

    // whether to continue
    if (progress < self.duration) {
        self.rAF = requestAnimationFrame(self.count);
    } else {
        if (self.callback) self.callback();
    }
};
// start your animation
this.start = function(callback) {
    self.callback = callback;
    // make sure values are valid
    if (!isNaN(self.endVal) && !isNaN(self.startVal) && self.startVal !== self.endVal) {
        self.rAF = requestAnimationFrame(self.count);
    } else {
        console.log('countUp error: startVal or endVal is not a number');
        self.printValue(endVal);
    }
    return false;
};
// toggles pause/resume animation
this.pauseResume = function() {
    if (!self.paused) {
        self.paused = true;
        cancelAnimationFrame(self.rAF);
    } else {
        self.paused = false;
        delete self.startTime;
        self.duration = self.remaining;
        self.startVal = self.frameVal;
        requestAnimationFrame(self.count);
    }
};
// reset to startVal so animation can be run again
this.reset = function() {
    self.paused = false;
    delete self.startTime;
    self.startVal = startVal;
    cancelAnimationFrame(self.rAF);
    self.printValue(self.startVal);
};
// pass a new endVal and start animation
this.update = function (newEndVal) {
    cancelAnimationFrame(self.rAF);
    self.paused = false;
    delete self.startTime;
    self.startVal = self.frameVal;
    self.endVal = Number(newEndVal);
    self.countDown = (self.startVal > self.endVal);
    self.rAF = requestAnimationFrame(self.count);
};
this.formatNumber = function(nStr) {
    nStr = nStr.toFixed(self.decimals);
    nStr += '';
    var x, x1, x2, rgx;
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? self.options.decimal + x[1] : '';
    rgx = /(\d+)(\d{3})/;
    if (self.options.useGrouping) {
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + self.options.separator + '$2');
        }
    }
    return self.options.prefix + x1 + x2 + self.options.suffix;
};

// format startVal on initialization
self.printValue(self.startVal);
};

// Example:
// var numAnim = new countUp("SomeElementYouWantToAnimate", 0, 99.99, 2, 2.5);
// numAnim.start();
// numAnim.update(135);
// with optional callback:
// numAnim.start(someMethodToCallOnComplete);

return CountUp;

}));
