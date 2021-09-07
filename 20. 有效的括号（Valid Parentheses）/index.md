# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（20）有效的括号

# 导读：
![我的解法很多 且 很 sao，你忍一下~](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-10/1628599234603-image.png)

# 作者简介
### 1 作者简历
![作者简历](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630133245439-image.png)
![2019年的微信小程序应用开发赛-全国三等奖](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630133461339-image.png)

### 2 作者标签
```
1）“伪全栈工程师，主攻前端，偶尔写点后端”。

2）2019年的微信小程序应用开发赛 - 全国三等奖；
2019CODA比赛 - 前 17/211 强 且 荣获“优秀团队”称号 等。

3）“半自媒体人”，
在校期间、个人公众号（IT三少。新自媒体（公众号）号： 码农三少 ）
在半年内实现了0到5.8K+的粉丝增长等。
```

![自媒体-粉丝数据（半年内实现了0到5.8K+的粉丝增长）](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630134068710-%E7%B2%89%E4%B8%9D-%E6%95%B0%E6%8D%AE.jpg)

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-9-4/1630763449476-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-9-4/1630763476325-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-9-5/1630834712720-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%8820%EF%BC%89%E6%9C%89%E6%95%88%E7%9A%84%E6%8B%AC%E5%8F%B7.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 栈 。
var isValid = function(s) {
    // 1）状态初始化
    const l = s.length;

    let leftStack = [],
        leftList = ['(','{','['],
        // 右括号到左括号的映射关系 —— 判断 看当前值 与 “栈顶”值是否匹配 。
        rightToLeftMap = new Map([
            [')', '('],
            ['}', '{'],
            [']', '[']
        ]);
    
    // 2）处理。
    for(let i = 0; i <= l; i++) {
        // 2.1）若 当前”左括号”，则 压入“栈顶” 。
        if(leftList.includes(s[i])){
            leftStack.push(s[i]);
        }
        // 2.2）若 当前为”右括号”，则 看当前值 与 “栈顶”值是否匹配 。
        else {
            // 2.2.1）若 不匹配，则直接 return false;
            if(leftStack.pop() !== rightToLeftMap.get(s[i])){
                return false;
            }
        }
    }

    // 3）返回结果。
    // 遍历完，若 左括号正好被消耗完（leftStack长度为 0 ），则 为有效的的括号。
    return leftStack.length === 0; 
};
```

### 2 方案2
1)代码：
```js
// 方案2 正则 。
var isValid = function(s) {
    // 1）初始化 相关的正则表达式 。
    const reg = /\[\]|\(\)|\{\}/;

    // 2）处理。
    // 核心：若 s不断存在 []、()或{}子串，则 将给它们不断的替换成 '' ，并 更新s值 。
    while (reg.test(s)) {
        s = s.replace(reg, '');
    }

    // 3）返回结果。
    // 若 将所有的 []、()或{}子串 都替换成 '' 后、s长度为0，则 为有效的的括号。
    return s.length === 0;
}
```