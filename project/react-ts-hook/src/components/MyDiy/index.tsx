import { useEffect } from "react";
import { fetchData } from "./api";
import './index.less';

// MyDiy_1：手撕拓扑图（网格开关）。
export function MyDiy_1() {
    useEffect(() => {
        fetchData.then(res => {
            debugger
        })
    }, []);
    
    return (
        <>
            <div id="MyDiy_1"></div>
        </>
    )
}
