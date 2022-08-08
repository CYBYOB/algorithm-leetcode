import * as d3 from 'd3';
import { useCallback, useEffect } from 'react';

import './index.less';


// MyD3_5：x、y轴 + 折线图
export function MyD3_5() {
    const drawChart = useCallback(() => {
        const svg = d3.selectAll("#MyD3_5").append('svg').attr("width", 1000).attr("height", 1000),
            l = 700,
            xAxisLabelList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        // 设置y轴和x轴的范围
        let yScale = d3.scaleLinear().range([l, 0]).domain([0, l]),
            xScale = d3.scaleLinear().range([0, l]).domain([0, l]),
            //设置x和y轴的刻度方向及刻度数
            yAxis = d3.axisLeft(yScale).scale(yScale)
                .ticks(7).tickFormat((domainValue, i) => i + ''),
            xAxis = d3.axisBottom(xScale).scale(xScale)
                .ticks(7).tickFormat((domainValue, i) => xAxisLabelList[i]);

        yAxis(svg.append("g").attr("font-size", "20").attr("transform", "translate(80,80)"))
        xAxis(svg.append("g").attr("font-size", "20").attr("transform", `translate(80,${l + 80})`))

        // x坐标的刻度居中
        svg.selectChild('g:not(:nth-child(1))').selectAll('g').select('text').attr('x', 50);

        // 画折线
        //数据定义, 两条线
        const data = [
            [
                { x: 0, y: 0 },
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 3, y: 5 },
                { x: 4, y: 5 },
                { x: 5, y: 7 },
                { x: 6, y: 5 },
            ],
            d3.range(7).map(function (i) {
                return { x: i, y: Math.min(i) }
            })
        ]

        function drawLine() {
            //d3.line是把数组的坐标生成一个path路径
            let line = d3.line()
                .x(function (d) {
                    //这个d就是咱们的data[0] 遍历的数据了 return也就是坐标 相当于帮咱们生成了一个 M0,0 L 1,2.....这个样
                    return xScale(d[0])
                })
                .y(function (d) {
                    return yScale(d[1])
                })
                .curve(d3.curveCardinal)  //曲线效果

            // TODO：为啥是 path.path ？？
            svg.selectAll('path.path')
                .data(data)
                .enter()
                .append('path')
                .attr('d', function (d) {
                    return line(d.map(v => [v.x * 100, v.y * 100]))
                })
                .attr('stroke', 'red')
                .attr('fill', 'none')
                .attr('transform', `translate(130, 80)`)
        }

        drawLine();
    }, []);

    useEffect(() => {
        drawChart();
    }, [drawChart]);

    return (
        // 参考：
        // 1）https://juejin.cn/post/7002839463541882910#heading-5
        <div id="MyD3_5">
        </div>
    )
}

// MyD3_4：x、y轴的绘制
export function MyD3_4() {
    const drawChart = useCallback(() => {
        const svg = d3.selectAll("#MyD3_4").append('svg').attr("width", 1000).attr("height", 1000),
            l = 700,
            xAxisLabelList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        // 设置y轴和x轴的范围
        let yScale = d3.scaleLinear().range([l, 0]).domain([0, l]),
            xScale = d3.scaleLinear().range([0, l]).domain([0, l]),
            //设置x和y轴的刻度方向及刻度数
            yAxis = d3.axisLeft(yScale).scale(yScale)
                .ticks(7).tickFormat((domainValue, i) => i + ''),
            xAxis = d3.axisBottom(xScale).scale(xScale)
                .ticks(7).tickFormat((domainValue, i) => xAxisLabelList[i]);

        yAxis(svg.append("g").attr("font-size", "20").attr("transform", "translate(80,80)"))
        xAxis(svg.append("g").attr("font-size", "20").attr("transform", `translate(80,${l + 80})`))

        // x坐标的刻度居中
        svg.selectChild('g:not(:nth-child(1))').selectAll('g').select('text').attr('x', 50);
    }, []);

    useEffect(() => {
        drawChart();
    }, [drawChart]);

    return (
        <div id="MyD3_4">
        </div>
    )
}

// MyD3_3：智能的给不同柱子添加颜色
export function MyD3_3() {
    const drawChart = useCallback(() => {
        const colorList = ['red', 'green', 'blue'];
        const w = 700,
            h = 300,
            data = [12, 5, 6, 6, 9, 10],
            svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .style("margin-left", 100);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => h - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", (d, i) => colorList[i % colorList.length])
            .on('click', function (this, e, d) {
                console.log(`你点击的当前元素值为${d}`);
            })
    }, []);

    useEffect(() => {
        drawChart();
    }, [drawChart]);

    return (
        <>
            我是 简单的柱状图（可点击交互）
        </>
    )
}

// MyD3_2：简单的柱状图（可点击交互）
export function MyD3_2() {
    const drawChart = useCallback(() => {
        const w = 700,
            h = 300,
            data = [12, 5, 6, 6, 9, 10],
            svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .style("margin-left", 100);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => h - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", "green")
            .on('click', function (this, e, d) {
                console.log(`你点击的当前元素值为${d}`);
            })
    }, []);

    useEffect(() => {
        drawChart();
    }, [drawChart]);

    return (
        <>
            我是 简单的柱状图（可点击交互）
        </>
    )
}

// MyD3_1：简单的柱状图
export function MyD3_1() {
    const drawChart = useCallback(() => {
        const w = 700,
            h = 300,
            data = [12, 5, 6, 6, 9, 10],
            svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .style("margin-left", 100);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => h - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", "green")
    }, []);

    useEffect(() => {
        drawChart();
    }, [drawChart]);

    return (
        <>
            我是 简单的柱状图
        </>
    )
}
