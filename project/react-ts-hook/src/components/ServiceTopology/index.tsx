import axios from "axios";
import { useEffect } from "react";

export default function ServiceTopology() {
    useEffect(() => {
        axios.get('http://yapi.smart-xwork.cn/mock/149873/service/:serviceId/topology').then(res => {
            // const {data} = res
            // debugger
            res.data = [
                {
                    
                }
            ]
        })
    }, []);

    return (
        <div className="service-topology">
            我是ServiceTopology
        </div>
    )
}
