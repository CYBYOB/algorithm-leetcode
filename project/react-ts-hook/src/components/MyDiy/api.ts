export interface IData {
    service: IService;
}

export interface IService {
    id: string;
    name: string;
    enable: boolean;
    children: IService[];
}

export const fetchData = new Promise((res, rej) => {
    setTimeout(() => {
        const data: IData = {
            service: {
                id: 'service-1',
                name: '服务1',
                enable: true,
                children: [
                    {
                        id: 'service-2',
                        name: '服务2',
                        enable: true,
                        children: [
                            {
                                id: 'service-1',
                                name: '服务1',
                                enable: true,
                                children: [{
                                    id: 'service-4',
                                    name: '服务4',
                                    enable: true,
                                    children: []
                                }],
                            }
                        ]
                    },
                    {
                        id: 'service-3',
                        name: '服务2',
                        enable: false,
                        children: []
                    },
                ]
            }
        };

        res({
            data
        })
    }, 1 * 1000);
});
