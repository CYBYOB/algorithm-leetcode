import * as d3 from 'd3';
import { useCallback, useEffect } from "react"


export function TianYan_1() {
    const draw = useCallback(() => {
        const svg = d3.selectAll("#P_2").append('svg').attr("width", 1000).attr("height", 1000);
        d3.select("#P_2")
            .selectAll("p")
            .data([4, 8, 15, 16, 23, 42])
            .enter().append("p")
            .text(function(d) { return "I’m number " + d + "!"; })
            .attr('data', (e) => e)
            .on("click", function(a, b){ console.log(a, b)});
    }, []);

    useEffect(() => {
        draw();
    }, [draw]);
    return (
        <div id="TianYan_1">
        </div>
    )
}