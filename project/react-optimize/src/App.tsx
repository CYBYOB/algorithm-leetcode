import React, {useState, useContext} from 'react';
const numCtx = React.createContext<number>(0);
const updateNumCtx = React.createContext<React.Dispatch<number>>(() => 1);

export default function App() {
    const [num, updateNum] = useState(0);
    
    return (
        <numCtx.Provider value={num}>
            <updateNumCtx.Provider value={updateNum}>
                <Middle />
            </updateNumCtx.Provider>
        </numCtx.Provider>
    )
}

const Middle = () => {
    return (
        <>
            <Button />
            <Show />
        </>
    )
}

const Button = () => {
    const updateNum = useContext(updateNumCtx);
    console.log('Button render');
    
    return (
        <button onClick={() => updateNum(Math.random())}>点击产生随机数</button>
    )
}

const Show = () => {
    const num = useContext(numCtx);
    console.log('Show render');

    return (
        <p>num：{num}</p>
    )
}
