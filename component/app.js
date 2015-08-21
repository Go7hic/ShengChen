
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
