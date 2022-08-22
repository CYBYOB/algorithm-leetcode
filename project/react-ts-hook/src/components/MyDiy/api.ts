import _ from 'lodash';

export interface IService {
    id: string;
    name: string;
    enable: boolean;
    scopeEnable?: boolean;
    children: IService[];
}

// const genChildrenByCount = (count: number): IService[] => {
    // if (Number.isNaN(count)) {
    //     return [];
    // }
    
    // return new Array<IService>(count).fill(v => (
    //     {
    //         id: 0,
    //         name: '',
    //         enable: false,
    //         scopeEnable
    //     }
    //     // {
    //     //     id: _.random(0, 1e8, false),
    //     //     name: _.random(0, 1e8, false) + '',
    //     //     enable: _.random(0, 1)
    //     // }
    // ));

    // [
    //     {
    //         id: 'service-2',
    //         name: '服务2',
    //         enable: false,
    //         scopeEnable: true,
    //         children: [
    //             {
    //                 id: 'service-4',
    //                 name: '服务4',
    //                 enable: true,
    //                 scopeEnable: true,
    //                 children: [],
    //             }
    //         ]
    //     },
    // ]
// };

export const fetchDataPerformance = new Promise<{result: IService}>((res, rej) => {
    setTimeout(() => {
        // TODO：性能测试
        const result: IService = {
            id: '服务0',
            name: '服务0',
            enable: true,
            children: new Array(_.random(10, 10, false)).fill(1).map((_v: any, i: any) => (
                {
                    id: `服务1-${i}`,
                    name: `服务1-${i}`,
                    enable: false,
                    scopeEnable: true,
                    children: new Array(_.random(1000, 1000, false)).fill(1).map((_v: any, ii: any) => (
                        {
                            id: `服务2-${i}-${ii}`,
                            name: `服务2-${i}-${ii}`,
                            enable: false,
                            scopeEnable: true,
                            children: []
                        }
                    ))
                }
            ))
        };

        res({
            result
        })
    }, 1 * 1000);
});

export const fetchData = new Promise<{result: IService}>((res, rej) => {
    setTimeout(() => {
        const result: IService = {
            id: 'service-1',
            name: '服务1',
            enable: true,
            children: [
                {
                    id: 'service-2',
                    name: '服务2',
                    enable: false,
                    scopeEnable: true,
                    children: [
                        {
                            id: 'service-4',
                            name: '服务4',
                            enable: true,
                            scopeEnable: true,
                            children: [],
                        }
                    ]
                },
                {
                    id: 'service-3',
                    name: '服务3',
                    enable: false,
                    scopeEnable: false,
                    children: []
                },
            ]

        };

        res({
            result
        })
    }, 1 * 1000);
});
