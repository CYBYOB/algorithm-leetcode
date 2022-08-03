import G6 from '@antv/g6';
import { useEffect } from "react"

export function MyG6_2() {
    useEffect(() => {
        
    }, []);

    return (
        <>
            <div id="container"></div>
        </>
    )
}


// MyG6_1：网格状的拓扑图 - 简单版。
export function MyG6_1() {
    useEffect(() => {
        const data = {
            nodes: [
                {
                    id: '0',
                    label: '0',
                },
                {
                    id: '1',
                    label: '1',
                },
                {
                    id: '2',
                    label: '2',
                },
                {
                    id: '3',
                    label: '3',
                },
                {
                    id: '4',
                    label: '4',
                },
                {
                    id: '5',
                    label: '5',
                },
                {
                    id: '6',
                    label: '6',
                },
                {
                    id: '7',
                    label: '7',
                },
            ],
            edges: [

                {
                    source: '0',
                    target: '1',
                },
                {
                    source: '0',
                    target: '2',
                },
                {
                    source: '0',
                    target: '3',
                },
                {
                    source: '0',
                    target: '4',
                },
                {
                    source: '0',
                    target: '5',
                },
                {
                    source: '0',
                    target: '7',
                },
            ],
        };

        const container = document.getElementById('container');
        const width = container?.scrollWidth || 800;
        const height = container?.scrollHeight || 500;
        const graph = new G6.Graph({
            container: 'container',
            width,
            height,
            modes: {
                default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
            },
            layout: {
                type: 'grid',
                begin: [20, 20],
                width: width - 20,
                height: height - 20,
            },
            animate: true,
            defaultNode: {
                size: 20,
            },
        });

        graph.data(data);
        graph.render();
    }, []);

    return (
        <>
            我是 网格状的拓扑图 - 简单版
            <div id="container"></div>
        </>
    )
};
