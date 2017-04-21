/* global Scrollbar, $ */
/* jshint strict: true */
/* exported init */

/*
 动态设计思路及核心参数

 @minValue: 指定输入最小值
 @maxValue: 指定输入最大值
 @metaValue: 指定输入精度，用于计算最低单元格
 @majorStep: 主间隔单位，显示长线及数值
 @minorStep: 次间隔单位，显示短线及数值
 @scaleMode：flex, fixed 伸缩和固定

 视觉要求（伸缩）：左右靠齐窗口两侧，随窗口伸缩实时更新尺寸，内部刻度、文字间隔对应变化；
 视觉效果（固定）：尺寸按照最小、最大以及精度值进行计算，窗口伸缩不影响输入框的尺寸；

 实现途径：基于之前的参数由 jQ 生成包含数值的 div / li 区块，然后再通过 jQ 设置各自的样式；
*/

$(function () {

    // 设置初始位置及最大值
    var initValue = 250;
    var maxValue = 500;

    // 初始化内容标尺
    $("#content").width(300 + maxValue * 10);
    $("#content").svg({
        "onLoad" : drawIntro
    });

    // 绘制标尺内容
    function drawIntro(svg) {
        var g = svg.group({
            "stroke"      : "gray",
            "strokeWidth" : 1
        });

        for (var i = 0; i < 300 + maxValue * 10; i = i + 5) {
            if (i % 25 === 0) {
                svg.line(g, i, 40, i, 65);
            }

            if (i % 50 === 0) {
                svg.line(g, i, 35, i, 65);
                svg.text(g, i, 80, ((i - 150) / 10).toString(), {
                    "size"   : 6,
                    "fill"   : "#DDD",
                    "family" : "Arial",
                    "stroke" : "transparent"
                });
            }

            svg.line(g, i, 45, i, 65);
        }
    }

    // 初始化滚动条
    var options = {
        "speed"                 : 0.5,
        "overscrollEffect"      : "glow",
        "overscrollEffectColor" : "#FFF"
    };

    var scrollbar = Scrollbar.init(document.getElementById("scrollbar"), options);

    // 输出最新数值
    scrollbar.addListener(function (status) {
        $(".scrollbar-track, .overscroll-glow").remove();
        $("#size").html(status.offset.x / 10);
    });

    // 设置起始位置
    scrollbar.setPosition(initValue * 10, 0);
});