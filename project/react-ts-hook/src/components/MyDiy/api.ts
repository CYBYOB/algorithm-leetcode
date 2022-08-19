export interface IService {
    id: string;
    name: string;
    enable: boolean;
    scopeEnable?: boolean;
    children: IService[];
}

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
