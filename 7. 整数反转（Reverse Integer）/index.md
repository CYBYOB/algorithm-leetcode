# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（7）整数反转

# 导读：
![我的解法很多 且 很 sao，你忍一下~](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-10/1628599234603-image.png)

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-7/1628325944833-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-7/1628325955688-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-7/1628328122350-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%887%EF%BC%89%E6%95%B4%E6%95%B0%E5%8F%8D%E8%BD%AC.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 
var reverse = function(x) {
    // 1）先用 flag 保存x的正负情况，x转为字符串xStr（不含正、负号，纯数值）、初始化 resValue 为0 等
    const flag = x < 0 ? -1 : 1,
        xStr = (x < 0 ? Math.abs(x) : x) + '',
        l = xStr.length;
    let index = 0,
        resValue = 0;
    
    // 2）当 index < l 时不断向后拉xStr，
    // 处理：resValue += parseInt(xStr[index]) * Math.pow(10, index); index++;
    while (index < l) {
        const indexNum = parseInt(xStr[index]),
            weight = Math.pow(10, index);
        
        resValue += indexNum * weight;
        index++;
    }

    // 3）进行符号的恢复，根据此时 resValue 情况去返回不同的值
    resValue *= flag;
    // 边界：resValue不在 [−231,  231 − 1] 时，需返回 0 
    if (resValue < Math.pow(-2, 31) || resValue > Math.pow(2, 31) - 1) {
        resValue = 0;
    }

    return resValue;
};
```

### 2 方案2
1)代码：
```js
// 方案2 方案1的“优化版”，通过各种函数、技巧等减少代码量
var reverse = function(x) {
    const xStr = (x < 0 ? Math.abs(x) : x) + '',
        flag = x < 0 ? -1 : 1;
    
    let resValue = xStr.split('').reduce((acc, cur, index) => {
        // 下面2行可合并成
        // return acc += parseInt(cur) * Math.pow(10, index);
        acc += parseInt(cur) * Math.pow(10, index);
        return acc;
    }, 0);
    
    // 恢复符号
    resValue *= flag;

    // 下面3行可合并成 return (resValue < Math.pow(-2, 31) || resValue > Math.pow(2, 31) - 1) ? 0 : resValue;
    if (resValue < Math.pow(-2, 31) || resValue > Math.pow(2, 31) - 1) {
        resValue = 0;
    }

    return resValue;
}
```

### 3 方案3
1)代码：
```js
// 方案3 也是方案1的“优化版”，通过各种函数、技巧等减少代码量
var reverse = function(x) {
    const flag = x > 0 ? 1 : -1,
        reverseValue = (Math.abs(x) + '').split('').reverse().join('');

    if (parseInt(reverseValue) < Math.pow(-2, 31) || parseInt(reverseValue) > Math.pow(2, 31) - 1) {
        return 0;
    }

    return reverseValue * flag;
}
```

# 四 更多
### 1 刷题进度
```
1）LeetCode：307 / 2390 。

2）《剑指offer》：66 / 66 。

3）相关学习资料与笔记汇总： 
https://github.com/CYBYOB/algorithm-leetcode/tree/master/资料%26笔记 。

4）注：所有题目均有 2-5种 左右的解法，后续还将不断更新题目 & 题解。
敬请期待~
也欢迎大家进群一起 学习、交流、刷题&拿高薪~
```

![刷题进度 - LeetCode：307 / 2390 、《剑指offer》：66 / 66 ](https://files.mdnice.com/user/6999/09201cae-28f0-4062-8a07-03d027f4fc0c.png)

### 2 GitHub - LeetCode项目仓库
```
0）本项目地址： 
https://github.com/CYBYOB/algorithm-leetcode 。
目标、愿景：
让每个人都能拥有一定的算法能力、以应对面试中（会举一反三的同学还可以将其融入自己的肌肉和血液，甚至能够赋能于公司的业务和技术）的算法。

本人每周仍在不断的更新 —— 保证每周都有新的题目、题解方案刺激着您的神经 和 刷题欲望。
欢迎对算法感兴趣的同学加入我们的社群。
QQ群： 933919972 ；
作者QQ： 1520112971 ；
作者VX： c13227839870（可拉您进群、一起学习与交流~） 。
```

![GitHub：algorithm-leetcode - 项目亮点](https://files.mdnice.com/user/6999/772fafdd-76ab-4e0c-a1f9-34e65ac63fad.png)

![GitHub：algorithm-leetcode - 题目总览](https://files.mdnice.com/user/6999/7b92db4c-d5d3-4558-8003-284d3e24b86b.png)

### 3 作者标签
```
1）“BAT里1名小小的伪全栈工程师，主攻前端，偶尔写点后端”。

2）2019年的微信小程序应用开发赛 - 全国三等奖；
2019CODA比赛 - 前 17/211 强 且 荣获“优秀团队”称号 等。

3）“半自媒体人”，
在校期间、个人公众号（IT三少。新自媒体（公众号）号： 码农三少 ）
在半年内实现了0到5.8K+的粉丝增长等。
```