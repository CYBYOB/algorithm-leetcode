import * as d3 from 'd3';
import { useCallback, useEffect } from 'react';

// import './index.css';
import './index.less';

export function MyD3_4() {
    const drawChart = useCallback(() => {
        const svg = d3.selectAll("#MyD3_4").append('svg').attr("width", 1000).attr("height", 1000),
            l = 700,
            xAxisLabelList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        // 设置y轴和x轴的范围
        let yScale = d3.scaleLinear().range([0, l]).domain([0, l]),
            xScale = d3.scaleLinear().range([0, l]).domain([0, l]),
            //设置x和y轴的刻度方向及刻度数
            yAxis = d3.axisLeft(yScale).scale(yScale)
                .ticks(7).tickFormat((domainValue, i) => i+''),
            xAxis = d3.axisBottom(xScale).scale(xScale)
                .ticks(7).tickFormat((domainValue, i) => xAxisLabelList[i]);
        
        yAxis(svg.append("g").attr("font-size","20").attr("transform", "translate(80,80)"))
        xAxis(svg.append("g").attr("font-size","20").attr("transform", `translate(80,${l + 80})`)
        )
        
        // svg.selectAll("g").selectAll('g').selectAll('text').attr('x', 30)
    }, []);

    useEffect(() => {
        // drawChart();
    }, [drawChart]);

    return (
        <div id="MyD3_4">
            <div>sss</div>
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
