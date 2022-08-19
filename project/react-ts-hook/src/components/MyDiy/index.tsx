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
import { fetchData, IService } from "./api";
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
};

// MyDiy_2：（ReactECharts 带交互）（多维度下的网格开关等）。
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
        debugger
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
        debugger
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
        if (dataType === 'node') {
            const {id: serviceId, itemStyle: {color}} = data,
                targetService = findClickService(serviceId, result);
            
            if (!targetService) {
                return result;
            }
            
            // 更新服务、服务链路的状态
            const newEnable = !targetService.enable;
            targetService.enable = newEnable;
            targetService.children.map(v => v.scopeEnable = newEnable);
            return result;
        }
        return undefined;
    }, [findClickService, result]);

    const onEvents = useMemo(() => {
        return {
            'click': (e: any) => {
                const {dataType, data} = e,
                    result = getNewResultByOperation(dataType, data);
                // TODO：优化写法，不要2次 setResult 。
                setResult(undefined);
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
