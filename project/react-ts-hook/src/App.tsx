import React, { useCallback, useState } from 'react';
import './App.css';

export default function App() {
    console.log('app');
    
    const [c, setC] = useState(0);
    const onC = useCallback(() => {
        console.log('useCallback');
        
        setC(c + 1)
    }, [c])
    return (
        <>
        c: {c}
        <button onClick={onC}>点击</button>
        </>
    )
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
