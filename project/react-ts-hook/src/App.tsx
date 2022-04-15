import axios from 'axios';
import cloudbase from "@cloudbase/js-sdk";
import React, { useCallback, useState } from 'react';
import './App.css';

export default function App() {
    //初始化SDK实例
    cloudbase.auth().anonymousAuthProvider().signIn().then(res => {
    this.title = '匿名登录成功'
   }).catch(err => {
    console.error(err)
   })
    const app = cloudbase.init({
        env: "cloud1-3gz421ii3445059c",
        appSign: 'uniapp',
	appSecret: {
		appAccessKeyId: '1',
		appAccessKey:'应用凭证'
	}
        // appSecret: {
        //     appAccessKey: "76202327c4ce46da1f230cff215f40a4",
        //     appAccessKeyId: "wx468a8bf22a59ac97"
        // }
    });
    
    app.auth({persistence: 'local'}).weixinAuthProvider({
        appid: 'AppID',
        scope: 'snsapi_login'
      }).then(() => {
  
   alert('登录云开发成功！')
  
        });

    // const auth = app.auth({
    //     persistence: "local" //用户显式退出或更改密码之前的30天一直有效
    //   });

    // const user = app.auth({persistence: "local"}).currentUser;
    // debugger

    // app.callFunction({
    //     name: "biaoqingbao",
    //     data: {
    //         "action": "searchByKeyword",
    //         "keyword": "ss",
    //         "sourceTabIndex": 0
    //     }
    // })
    // .finally((res: { result: any; }) => {
    //     // debugger
    //     const result = res.result; //云函数执行结果
    // });


    // 浏览器里会有跨域问题！！
    // const url = 'https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=55_yb9mCmj5bPTLZ1X6M6kqpV8Wk_HjlsbXrENYhkFamMmflq_JiF1WJc6Q5CCWf3fo0fgGHbSPSWcvTlP73NSkcY6UbWBmtnvNdbXpshui8ELlsc7HgeVrEZbOKy2rV3qTkKHMfjy_LGiXBsFlQXJjAHAGNZ&env=cloud1-3gz421ii3445059c&name=biaoqingbao';

    // axios.post(url, {
    //     "action": "searchByKeyword",
    //     "keyword": "ss",
    //     "sourceTabIndex": 0
    // }).then(res => {
    //     debugger
    // })
    const [c, setC] = useState(0);
    const onC = useCallback(() => {
        setC(c + 1)
    }, [c])
    return (
        <>
        c: {c}
        <button onClick={onC}>点击</button>
        </>
    )
}
