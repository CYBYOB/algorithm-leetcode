import * as d3 from 'd3';
import { useCallback, useEffect } from "react"


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
