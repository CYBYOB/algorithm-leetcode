import * as echarts from 'echarts';
import {
    // 公共的 option 类型
    EChartsOption,
} from 'echarts/types/dist/shared';
import {
    // 折线/面积图
    LineSeriesOption,
} from 'echarts/charts';
import ReactECharts from 'echarts-for-react';
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchData, fetchDataPerformance, IService } from "./api";
import _ from 'lodash';
import './index.less';

const enableColor = 'green';
const disableColor = 'gray';

interface IServiceData extends IServiceNode {
    x: number;
    y: number;
};
// 拓扑图上的服务节点
interface IServiceNode {
    id: string;
    name: string;
    enable: boolean;
    itemStyle?: Object;
    symbolSize?: Array<number>;
};

// MyDiy_4：性能测试（1千服务 + 1万链路【静态，仅前端侧的交互与渲染】？）。
// 结论：1千服务 + 1万链路【静态，仅前端侧的交互与渲染】，差不多耗时在 3-4秒左右 —— 还可以。
export function MyDiy_4() {
    const [result, setResult] = useState<IService>();
    useEffect(() => {
        fetchDataPerformance.then(res => {
            const { result } = res || {};
            setResult(result);
        })
    }, []);

    // 层序遍历
    const data = useMemo(() => {
        // 边界
        if (!result) {
            return [];
        }

        let queue_1 = [result],
            queue_2 = [],
            curLevel = 0,
            resList: IServiceNode[][] = [];

        while (queue_1.length) {
            const { id, name, enable, children } = queue_1.shift() as IService;
            if (!resList[curLevel]) {
                resList[curLevel] = [];
            }
            resList[curLevel].push(
                {
                    id,
                    name,
                    enable,
                    itemStyle: {
                        color: enable ? enableColor : disableColor
                    },
                });

            if (children.length) {
                queue_2.push(...children);
            }

            if (!queue_1.length) {
                queue_1 = queue_2;
                queue_2 = [];
                curLevel++;
            }
        }

        let resData: IServiceData[] = [];
        resList.map((serviceNodeList: IServiceNode[], serviceNodeListIndex) => {
            const serviceNodeListLength = serviceNodeList.length;
            // debugger
            return serviceNodeList.map((serviceNodeItem, serviceNodeItemIndex) => {
                const { id, name, enable, itemStyle } = serviceNodeItem;
                resData.push(
                    {
                        id,
                        name,
                        enable,
                        x: 0 + serviceNodeListIndex * 600,
                        y: 0 + (serviceNodeItemIndex - (serviceNodeListLength - 1) / 2) * 50,
                        itemStyle,
                        // symbolSize: [40, 40]
                    }
                );
            });
        });

        return resData;
    }, [result]);

    // 递归处理
    const getLinksByResult = useCallback((result?: IService) => {
        if (!result) {
            return [];
        }

        const { id: sourceId, enable: serviceEnable, children } = result;
        let resLinkList: any[] = [];
        children.forEach((v) => {
            const {id: targetId, scopeEnable} = v;
            resLinkList.push(
                {
                    source: sourceId,
                    target: targetId,
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {
                        color: (serviceEnable && scopeEnable) ? enableColor : disableColor,
                        width: 5,
                        curveness: 0.2
                    }
                }
            );
        });

        children.forEach((v) => {
            resLinkList.push(...getLinksByResult(v))
        });

        return resLinkList;
    }, []);

    const links = useMemo(() => {
        return getLinksByResult(result);
    }, [getLinksByResult, result]);

    const option = useMemo(() => {
        return {
            title: {
                text: '多维度下的网格开关'
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            series: [
                {
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 50,
                    roam: true,
                    label: {
                        show: true
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        fontSize: 20
                    },
                    data: data,
                    links: links,
                    lineStyle: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    },
                    zoom: 10
                }
            ]
        };
    }, [data, links]);

    const findClickService = useCallback((serviceId: string, curResult: IService | undefined): IService | undefined => {
        // 
        if (!curResult) {
            return undefined;
        }

        const {id, children} = curResult,
            childrenLength = children.length;
        if (id === serviceId) {
            return curResult;
        }

        // 
        for (let i = 0; i < childrenLength; i++) {
            const targetService = findClickService(serviceId, children[i]);
            if (targetService) {
                return targetService;
            }
        }
    }, []);
    const getNewResultByOperation = useCallback((dataType, data): IService | undefined => {
        const newResult = _.cloneDeep(result);

        if (dataType === 'node') {
            const {id: serviceId} = data,
                targetService = findClickService(serviceId, newResult);
            
            if (!targetService) {
                return result;
            }
            
            // 更新服务、服务链路的状态
            const newEnable = !targetService.enable;
            targetService.enable = newEnable;
        }
        else {
            const {source: consumerId, target: providerId, lineStyle: {color}} = data,
                consumerService = findClickService(consumerId, newResult),
                children = consumerService?.children ?? [],
                childrenLength = children?.length ?? 0,
                newEnable = !(color === enableColor);
            
            for (let i = 0 ; i < childrenLength; i++) {
                if (children[i].id === providerId) {
                    children[i].scopeEnable = newEnable;
                }
            }
        }
        debugger
        return newResult;
    }, [findClickService, result]);

    const onEvents = useMemo(() => {
        return {
            'click': (e: any) => {
                debugger
                const {dataType, data} = e,
                    result = getNewResultByOperation(dataType, data);
                // TODO：似乎不是局部更新（可能会存在性能问题）
                setResult(result);
            },
        };
    }, [getNewResultByOperation]);

    return <ReactECharts style={{height: '1200px'}} onEvents={onEvents} option={option} />
}

// 【TODO】MyDiy_3：（ReactECharts 带前、后端的交互）（多维度下的网格开关等）。
export function MyDiy_3() {
    const [result, setResult] = useState<IService>();
    useEffect(() => {
        fetchData.then(res => {
            const { result } = res || {};
            setResult(result);
        })
    }, []);

    // 层序遍历
    const data = useMemo(() => {
        // 边界
        if (!result) {
            return [];
        }

        let queue_1 = [result],
            queue_2 = [],
            curLevel = 0,
            resList: IServiceNode[][] = [];

        while (queue_1.length) {
            const { id, name, enable, children } = queue_1.shift() as IService;
            if (!resList[curLevel]) {
                resList[curLevel] = [];
            }
            resList[curLevel].push(
                {
                    id,
                    name,
                    enable,
                    itemStyle: {
                        color: enable ? enableColor : disableColor
                    },
                });

            if (children.length) {
                queue_2.push(...children);
            }

            if (!queue_1.length) {
                queue_1 = queue_2;
                queue_2 = [];
                curLevel++;
            }
        }

        let resData: IServiceData[] = [];
        resList.map((serviceNodeList: IServiceNode[], serviceNodeListIndex) => {
            const serviceNodeListLength = serviceNodeList.length;
            return serviceNodeList.map((serviceNodeItem, serviceNodeItemIndex) => {
                const { id, name, enable, itemStyle } = serviceNodeItem;
                resData.push(
                    {
                        id,
                        name,
                        enable,
                        x: 300 + serviceNodeListIndex * 50,
                        y: 500 + (serviceNodeItemIndex - (serviceNodeListLength - 1) / 2) * 50,
                        itemStyle
                    }
                );
            });
        });

        return resData;
    }, [result]);

    // 递归处理
    const getLinksByResult = useCallback((result?: IService) => {
        if (!result) {
            return [];
        }

        const { id: sourceId, enable: serviceEnable, children } = result;
        let resLinkList: any[] = [];
        children.forEach((v) => {
            const {id: targetId, scopeEnable} = v;
            resLinkList.push(
                {
                    source: sourceId,
                    target: targetId,
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {
                        color: (serviceEnable && scopeEnable) ? enableColor : disableColor,
                        width: 5,
                        curveness: 0.2
                    }
                }
            );
        });

        children.forEach((v) => {
            resLinkList.push(...getLinksByResult(v))
        });

        return resLinkList;
    }, []);

    const links = useMemo(() => {
        return getLinksByResult(result);
    }, [getLinksByResult, result]);

    const option = useMemo(() => {
        return {
            title: {
                text: '多维度下的网格开关'
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            series: [
                {
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 50,
                    roam: true,
                    label: {
                        show: true
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        fontSize: 20
                    },
                    data: data,
                    links: links,
                    lineStyle: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    },
                }
            ]
        };
    }, [data, links]);

    const findClickService = useCallback((serviceId: string, curResult: IService | undefined): IService | undefined => {
        // 
        if (!curResult) {
            return undefined;
        }

        const {id, children} = curResult,
            childrenLength = children.length;
        if (id === serviceId) {
            return curResult;
        }

        // 
        for (let i = 0; i < childrenLength; i++) {
            const targetService = findClickService(serviceId, children[i]);
            if (targetService) {
                return targetService;
            }
        }
    }, []);
    const getNewResultByOperation = useCallback((dataType, data): IService | undefined => {
        const newResult = _.cloneDeep(result);

        if (dataType === 'node') {
            const {id: serviceId} = data,
                targetService = findClickService(serviceId, newResult);
            
            if (!targetService) {
                return result;
            }
            
            // 更新服务、服务链路的状态
            const newEnable = !targetService.enable;
            targetService.enable = newEnable;
        }
        else {
            const {source: consumerId, target: providerId, lineStyle: {color}} = data,
                consumerService = findClickService(consumerId, newResult),
                children = consumerService?.children ?? [],
                childrenLength = children?.length ?? 0,
                newEnable = !(color === enableColor);
            
            for (let i = 0 ; i < childrenLength; i++) {
                if (children[i].id === providerId) {
                    children[i].scopeEnable = newEnable;
                }
            }
        }
        return newResult;
    }, [findClickService, result]);

    const onEvents = useMemo(() => {
        return {
            'click': (e: any) => {
                const {dataType, data} = e,
                    result = getNewResultByOperation(dataType, data);
                // TODO：似乎不是局部更新（可能会存在性能问题）
                setResult(result);
            },
        };
    }, [getNewResultByOperation]);

    return <ReactECharts onEvents={onEvents} option={option} />
}

// MyDiy_2：（ReactECharts 带前端一侧的交互）（多维度下的网格开关等）。
export function MyDiy_2() {
    const [result, setResult] = useState<IService>();
    useEffect(() => {
        fetchData.then(res => {
            const { result } = res || {};
            setResult(result);
        })
    }, []);

    // 层序遍历
    const data = useMemo(() => {
        // 边界
        if (!result) {
            return [];
        }

        let queue_1 = [result],
            queue_2 = [],
            curLevel = 0,
            resList: IServiceNode[][] = [];

        while (queue_1.length) {
            const { id, name, enable, children } = queue_1.shift() as IService;
            if (!resList[curLevel]) {
                resList[curLevel] = [];
            }
            resList[curLevel].push(
                {
                    id,
                    name,
                    enable,
                    itemStyle: {
                        color: enable ? enableColor : disableColor
                    },
                });

            if (children.length) {
                queue_2.push(...children);
            }

            if (!queue_1.length) {
                queue_1 = queue_2;
                queue_2 = [];
                curLevel++;
            }
        }

        let resData: IServiceData[] = [];
        resList.map((serviceNodeList: IServiceNode[], serviceNodeListIndex) => {
            const serviceNodeListLength = serviceNodeList.length;
            return serviceNodeList.map((serviceNodeItem, serviceNodeItemIndex) => {
                const { id, name, enable, itemStyle } = serviceNodeItem;
                resData.push(
                    {
                        id,
                        name,
                        enable,
                        x: 300 + serviceNodeListIndex * 50,
                        y: 500 + (serviceNodeItemIndex - (serviceNodeListLength - 1) / 2) * 50,
                        itemStyle
                    }
                );
            });
        });

        return resData;
    }, [result]);

    // 递归处理
    const getLinksByResult = useCallback((result?: IService) => {
        if (!result) {
            return [];
        }

        const { id: sourceId, enable: serviceEnable, children } = result;
        let resLinkList: any[] = [];
        children.forEach((v) => {
            const {id: targetId, scopeEnable} = v;
            resLinkList.push(
                {
                    source: sourceId,
                    target: targetId,
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {
                        color: (serviceEnable && scopeEnable) ? enableColor : disableColor,
                        width: 5,
                        curveness: 0.2
                    }
                }
            );
        });

        children.forEach((v) => {
            resLinkList.push(...getLinksByResult(v))
        });

        return resLinkList;
    }, []);

    const links = useMemo(() => {
        return getLinksByResult(result);
    }, [getLinksByResult, result]);

    const option = useMemo(() => {
        return {
            title: {
                text: '多维度下的网格开关'
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            series: [
                {
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 50,
                    roam: true,
                    label: {
                        show: true
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        fontSize: 20
                    },
                    data: data,
                    links: links,
                    lineStyle: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    }
                }
            ]
        };
    }, [data, links]);

    const findClickService = useCallback((serviceId: string, curResult: IService | undefined): IService | undefined => {
        // 
        if (!curResult) {
            return undefined;
        }

        const {id, children} = curResult,
            childrenLength = children.length;
        if (id === serviceId) {
            return curResult;
        }

        // 
        for (let i = 0; i < childrenLength; i++) {
            const targetService = findClickService(serviceId, children[i]);
            if (targetService) {
                return targetService;
            }
        }
    }, []);
    const getNewResultByOperation = useCallback((dataType, data): IService | undefined => {
        const newResult = _.cloneDeep(result);

        if (dataType === 'node') {
            const {id: serviceId} = data,
                targetService = findClickService(serviceId, newResult);
            
            if (!targetService) {
                return result;
            }
            
            // 更新服务、服务链路的状态
            const newEnable = !targetService.enable;
            targetService.enable = newEnable;
        }
        else {
            const {source: consumerId, target: providerId, lineStyle: {color}} = data,
                consumerService = findClickService(consumerId, newResult),
                children = consumerService?.children ?? [],
                childrenLength = children?.length ?? 0,
                newEnable = !(color === enableColor);
            
            for (let i = 0 ; i < childrenLength; i++) {
                if (children[i].id === providerId) {
                    children[i].scopeEnable = newEnable;
                }
            }
        }
        return newResult;
    }, [findClickService, result]);

    const onEvents = useMemo(() => {
        return {
            'click': (e: any) => {
                const {dataType, data} = e,
                    result = getNewResultByOperation(dataType, data);
                // TODO：似乎不是局部更新（可能会存在性能问题）
                setResult(result);
            },
        };
    }, [getNewResultByOperation]);

    return <ReactECharts onEvents={onEvents} option={option} />
}

// MyDiy_1：手撕静态拓扑图（多维度下的网格开关。递归 + 层序遍历算法，实现节点、连线的绘制）。
export function MyDiy_1() {
    // 递归处理
    const getLinksByResult = useCallback((result: IService) => {
        const { id, children } = result;
        let resLinkList: any[] = [];
        children.forEach((v) => {
            resLinkList.push(
                {
                    source: id,
                    target: v.id,
                    symbolSize: [5, 20],
                    label: {
                        show: false
                    },
                    lineStyle: {
                        width: 5,
                        curveness: 0.2
                    }
                }
            );
        });

        children.forEach((v) => {
            resLinkList.push(...getLinksByResult(v))
        });

        return resLinkList;
    }, []);

    // 层序遍历
    const getDataByResult = useCallback((result: IService) => {
        // 边界
        if (JSON.stringify(result) === '{}') {
            return [];
        }

        let queue_1 = [result],
            queue_2 = [],
            curLevel = 0,
            resList: IServiceNode[][] = [];


        while (queue_1.length) {
            const { id, name, enable, children } = queue_1.shift() as IService;
            if (!resList[curLevel]) {
                resList[curLevel] = [];
            }
            resList[curLevel].push({ id, name, enable });

            if (children.length) {
                queue_2.push(...children);
            }

            if (!queue_1.length) {
                queue_1 = queue_2;
                queue_2 = [];
                curLevel++;
            }
        }

        let resData: IServiceData[] = [];
        resList.map((serviceNodeList: IServiceNode[], serviceNodeListIndex) => {
            const serviceNodeListLength = serviceNodeList.length;
            return serviceNodeList.map((serviceNodeItem, serviceNodeItemIndex) => {
                const { id, name, enable } = serviceNodeItem;
                resData.push(
                    {
                        id,
                        name,
                        enable,
                        x: 300 + serviceNodeListIndex * 50,
                        y: 500 + (serviceNodeItemIndex - (serviceNodeListLength - 1) / 2) * 50
                    }
                );
            });
        });

        return resData;
    }, []);
    useEffect(() => {
        fetchData.then(res => {
            const { result } = res || {};
            const myChart = echarts.init(document.getElementById('MyDiy_1') as HTMLElement),
                data = getDataByResult(result),
                links = getLinksByResult(result),
                // 绘制图表
                option = {
                    title: {
                        text: '多维度下的网格开关'
                    },
                    tooltip: {},
                    animationDurationUpdate: 1500,
                    series: [
                        {
                            type: 'graph',
                            layout: 'none',
                            symbolSize: 50,
                            roam: true,
                            label: {
                                show: true
                            },
                            edgeSymbol: ['circle', 'arrow'],
                            edgeSymbolSize: [4, 10],
                            edgeLabel: {
                                fontSize: 20
                            },
                            data,
                            links,
                            lineStyle: {
                                opacity: 0.9,
                                width: 2,
                                curveness: 0
                            }
                        }
                    ]
                };
            myChart.on('click', function (params) {
                console.log(params.name);
                debugger
            });
            myChart.setOption(option);
        })
    }, [getDataByResult, getLinksByResult]);

    return (
        <>
            <div id="MyDiy_1"></div>
        </>
    )
}

// MyDiy_0：ReactECharts（简单入门示例）。
export function MyDiy_0() {
    const getOption = useMemo(() => {
        const option: EChartsOption = {
            title: {
                text: 'ECharts 入门示例',
            },
            tooltip: { show: true },
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20],
                },
            ]
        };

        return option;
    }, []);

    return <ReactECharts option={getOption} />
}
