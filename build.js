/* global Scrollbar, $ */
/* jshint strict: true */
/* exported init */

// 动态设计思路及核心参数
//
// @minValue: 指定输入最小值
// @maxValue: 指定输入最大值
// @metaValue: 指定输入精度，用于计算最低单元格
// @majorStep: 主间隔单位，显示长线及数值
// @minorStep: 次间隔单位，显示短线及数值
// @scaleMode：flex, fixed 伸缩和固定
//
// 视觉要求（伸缩）：左右靠齐窗口两侧，随窗口伸缩实时更新尺寸，内部刻度、文字间隔对应变化；
// 视觉效果（固定）：尺寸按照最小、最大以及精度值进行计算，窗口伸缩不影响输入框的尺寸；
//
// 实现途径：基于之前的参数由 jQ 生成包含数值的 div / li 区块，然后再通过 jQ 设置各自的样式；

$(function () {

    // var scroller = $("#scrollbar");
    // var content = $("#content");
    // var config = {
    //     "minValue"  : minValue ? minValue : 0,
    //     "maxValue"  : maxValue ? maxValue : 100,
    //     "initValue" : initValue ? initValue : 0,
    //     "metaValue" : metaValue ? metaValue : 0.1,
    //     "majorStep" : majorStep ? majorStep : 1,
    //     "minorStep" : minorStep ? minorStep : 0.2,
    //     "scaleMode" : scaleMode ? scaleMode : "fixed"
    // };

    $("#content").svg({
        "onLoad" : drawIntro
    });

    function drawIntro(svg) {
        var g = svg.group({
            "stroke"      : "gray",
            "strokeWidth" : 1
        });

        for (var i = 0; i < 1300; i = i + 5) {
            if (i % 25 === 0) {
                svg.line(g, i, 40, i, 65);
            }

            if (i % 50 === 0) {
                svg.line(g, i, 35, i, 65);
                svg.text(g, i - 5, 80, ((i - 150) / 10).toString(), {
                    "size"   : 6,
                    "fill"   : "#DDD",
                    "family" : "ArialMT",
                    "stroke" : "transparent"
                });
            }

            svg.line(g, i, 45, i, 65);
        }
    }

    // 始化化滚动条
    var options = {
        "speed"                 : 0.5,
        "overscrollEffect"      : "glow",
        "overscrollEffectColor" : "#FFF"
    };

    var scrollbar = Scrollbar.init(document.getElementById("scrollbar"), options);

    scrollbar.limit.y = 0;
    scrollbar.addListener(function (status) {
        $(".scrollbar-track, .overscroll-glow").remove();
        $("#size").html(status.offset.x / 10);

        if (status.offset.x % 5 === 0) {
            $("#mark").show();
        }
    });

    scrollbar.setPosition(100, 0);
});