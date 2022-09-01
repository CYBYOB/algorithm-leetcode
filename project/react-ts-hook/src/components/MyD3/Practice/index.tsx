import * as d3 from 'd3';
import { useCallback, useEffect } from "react"
import './index.less';

// P_4：append、insert、remove的入门
export function P_4() {
    const draw = useCallback(() => {
        const el = d3.select('#P_4');
        el.append('p').attr('id', 'p_1').text('我是新增的p标签');
        el.append('p').attr('id', 'p_2').text('我是新增、但即将删掉的p标签');
        el.insert('p', '#p_1').attr('id', 'p_0').text('将要插在id为p_1最前面的p标签');
        el.select('#p_2').remove();
    }, []);

    useEffect(() => {
        draw();
    }, [draw]);

    return (
        <div id="P_4">
        </div>
    )
}

// P_3：attr、classed、style、property、text、html 等函数的简单入门
export function P_3() {
    const draw = useCallback(() => {
        // const svg = d3.select("#P_3").append('svg').attr("width", 1000).attr("height", 1000);
        const el = d3.select("#P_3");
        // 批量添加样式 —— class属性
        el.attr('class', 'class_1 class_2');
        // 开关 class 属性
        el.classed('class_1', false)

        // 批量设置样式 —— style对象（TODO 较新版本暂不支持，为哈呢？）
        el.style('color', 'red')
            .style('text-align', 'center');

        // 不能用 attr 获取的属性值，可考虑使用 property (如输入框的 value 值)
       setTimeout(() => {
            const inputEl = d3.select('#input'),
                valueAttr = inputEl.attr('value'),
                valueProperty = inputEl.property('value');
            // 注： valueAttr 为 null，valueProperty 能取到值。

            const elClassAttr = el.attr('class'),
                elClassProperty = el.property('class');
            // 注： valueAttr 能取到值，valueProperty 为 null。
       }, 3* 1000);

        // .text()：获取或设置选择集的文本，文本内容相当于 DOM的 innerText ，不包含元素内部的标签
        const text = el.text();

        // .html()：获取或设置选择集的文本，文本内容相当于 DOM的 innerHTML ，包含元素内部的标签
        const html = el.html();
        el.html('<p>我是通过 html 函数插入的 p 标签（注：会把之前父元素里面的所有标签给清空、覆盖）</p>');
    }, []);

    useEffect(() => {
        draw();
    }, [draw]);

    return (
        <div id="P_3">
            我是P_3
            <input id='input' type="text" />
        </div>
    )
}

// P_2：画圆
export function P_2() {
    const draw = useCallback(() => {
        const svg = d3.selectAll("#P_2").append('svg').attr("width", 1000).attr("height", 1000);
        svg.append('circle')
            .attr("cx", '50px')
            .attr("cy", '50px')
            .attr("r", '50px')
            .attr('fill', 'red');
    }, []);

    useEffect(() => {
        draw();
    }, [draw]);
    return (
        <div id="P_2">
        </div>
    )
}

export function P_1() {
    const draw = useCallback(() => {
        const svg = d3.selectAll("#P_1").append('svg').attr("width", 1000).attr("height", 1000);
        const l = d3.line().x((a,b) => a[0])
        // svg.append("path")
        //     .attr("d", l([[1,1], [1, 20]]))
        svg.append("line")
            .attr("x1", 20)
            .attr("y1", 20)
            .attr("x2", 300)
            .attr("y2", 100)
            .attr("stroke", "black")
            .attr("stroke-width", "2px");
    }, []);

    useEffect(() => {
        draw();
    }, [draw]);
    return (
        <div id="P_1">
        </div>
    )
}
