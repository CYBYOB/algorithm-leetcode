interface ICompany {
    companyName: string;
    stockRatio?: Number;
    subscribedAmount?: string;
    children: Array<ICompany>;
}

export const fetchData = new Promise<ICompany>((res, rej) => {
    setTimeout(() => {
        const result: ICompany = {
            companyName: '淘宝(中国) 软件有限公司',
            children: [
                {
                    companyName: '南京淘宝软件有限公司',
                    subscribedAmount: '100万人民币',
                    children: [],
                },
                {
                    companyName: '杭州阿里巴巴泽泰信息技术有限公司',
                    subscribedAmount: '290000万人民币',
                    children: [
                        {
                            companyName: '某A有限公司',
                            subscribedAmount: '1000万人民币',
                            children: [],
                        },
                        {
                            companyName: '某B有限公司',
                            subscribedAmount: '1000万人民币',
                            children: [],
                        },
                    ],
                },
            ]
        };
        return res(result);
    }, 1 * 1000);
}) 