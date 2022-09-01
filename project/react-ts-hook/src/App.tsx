import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ServiceTopology from './components/ServiceTopology';
import {MyD3_1, MyD3_2, MyD3_3, MyD3_4, MyD3_5, MyD3_6} from './components/MyD3';
import {MyG6_1, MyG6_2} from './components/MyG6';
import {MyEcharts_1} from './components/MyEcharts';
import {MyDiy_1, MyDiy_2, MyDiy_3, MyDiy_4} from './components/MyDiy';
import { P_1, P_2, P_3, P_4, P_5 } from './components/MyD3/Practice';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ServiceTopology()}></Route>
                <Route path="/MyDiy_1" element={<MyDiy_1 />}></Route>
                <Route path="/MyDiy_2" element={<MyDiy_2 />}></Route>
                <Route path="/MyDiy_3" element={<MyDiy_3 />}></Route>
                <Route path="/MyDiy_4" element={<MyDiy_4 />}></Route>
                <Route path="/MyEcharts_1" element={<MyEcharts_1 />}></Route>
                <Route path="/P_5" element={<P_5 />}></Route>
                <Route path="/P_4" element={<P_4 />}></Route>
                <Route path="/P_3" element={<P_3 />}></Route>
                <Route path="/P_2" element={<P_2 />}></Route>
                <Route path="/P_1" element={<P_1 />}></Route>
                <Route path="/MyD3_1" element={<MyD3_1 />}></Route>
                <Route path="/MyD3_2" element={<MyD3_2 />}></Route>
                <Route path="/MyD3_3" element={<MyD3_3 />}></Route>
                <Route path="/MyD3_4" element={<MyD3_4 />}></Route>
                <Route path="/MyD3_5" element={<MyD3_5 />}></Route>
                <Route path="/MyD3_6" element={<MyD3_6 />}></Route>
                <Route path="/MyG6_1" element={<MyG6_1 />}></Route>
                <Route path="/MyG6_2" element={<MyG6_2 />}></Route>
            </Routes>
      </BrowserRouter>
    )
}

// export default function App() {
//     //初始化SDK实例
//     cloudbase.auth().anonymousAuthProvider().signIn().then(res => {
//     this.title = '匿名登录成功'
//    }).catch(err => {
//     console.error(err)
//    })
//     const app = cloudbase.init({
//         env: "cloud1-3gz421ii3445059c",
//         appSign: 'uniapp',
// 	appSecret: {
// 		appAccessKeyId: '1',
// 		appAccessKey:'应用凭证'
// 	}
//         // appSecret: {
//         //     appAccessKey: "76202327c4ce46da1f230cff215f40a4",
//         //     appAccessKeyId: "wx468a8bf22a59ac97"
//         // }
//     });
    
//     app.auth({persistence: 'local'}).weixinAuthProvider({
//         appid: 'AppID',
//         scope: 'snsapi_login'
//       }).then(() => {
  
//    alert('登录云开发成功！')
  
//         });

//     // const auth = app.auth({
//     //     persistence: "local" //用户显式退出或更改密码之前的30天一直有效
//     //   });

//     // const user = app.auth({persistence: "local"}).currentUser;
//     // debugger

//     // app.callFunction({
//     //     name: "biaoqingbao",
//     //     data: {
//     //         "action": "searchByKeyword",
//     //         "keyword": "ss",
//     //         "sourceTabIndex": 0
//     //     }
//     // })
//     // .finally((res: { result: any; }) => {
//     //     // debugger
//     //     const result = res.result; //云函数执行结果
//     // });


//     // 浏览器里会有跨域问题！！
//     // const url = 'https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=55_yb9mCmj5bPTLZ1X6M6kqpV8Wk_HjlsbXrENYhkFamMmflq_JiF1WJc6Q5CCWf3fo0fgGHbSPSWcvTlP73NSkcY6UbWBmtnvNdbXpshui8ELlsc7HgeVrEZbOKy2rV3qTkKHMfjy_LGiXBsFlQXJjAHAGNZ&env=cloud1-3gz421ii3445059c&name=biaoqingbao';

//     // axios.post(url, {
//     //     "action": "searchByKeyword",
//     //     "keyword": "ss",
//     //     "sourceTabIndex": 0
//     // }).then(res => {
//     //     debugger
//     // })
//     const [c, setC] = useState(0);
//     const onC = useCallback(() => {
//         setC(c + 1)
//     }, [c])
//     return (
//         <>
//         c: {c}
//         <button onClick={onC}>点击</button>
//         </>
//     )
// }
