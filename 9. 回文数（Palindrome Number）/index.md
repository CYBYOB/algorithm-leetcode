# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（9）回文数

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-8/1628411342750-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-8/1628411348879-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-14/1628911015555-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%889%EF%BC%89%E5%9B%9E%E6%96%87%E6%95%B0.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
var isPalindrome = function(x) {
    // 1）x为负数直接返回false
    if (x < 0) {
        return false;
    }

    // 2）非负数，将x转换成字符串、反转，最后看看转换成数值后等不等于之前的数值x即可
    return parseInt((x + '').split('').reverse().join('')) === x;
};
```

### 2 方案2
1)代码：
```js
var isPalindrome = function(x) {
    // 注：tempX用于遍历
    let tempX = x,
        resX = 0;

    // 1）x为负数直接返回false
    if (x < 0) {
        return false;
    }

    // 2）非负数，tempX=x，遍历tempX、求得其“反转后的”值 resX
    while (tempX) {
        resX = (resX * 10) + (tempX % 10);
        // 边界：别漏了parseInt，仅保留除后的整数部分即可
        tempX = parseInt(tempX / 10);
    }
    
    // 3）return resX === x
    return resX === x;
}
```

### 3 方案3
1)代码：
```js
var isPalindrome = function(x) {
    const strX = x + '',
        l = strX.length;

    // 1）x为负数直接返回false
    if (x < 0) {
        return false;
    }

    // 2）非负数，strX = x + ''，遍历strX、看相对应的位置上的数值字符是否一样。
    // 核心：一旦不一样直接返回 false ，否则最后返回 true 
    for (let i = 0; i < parseInt(l/2); i++) {
        if (strX[i] !== strX[(l - 1) - i]) {
            return false;
        }
    }

    return true;
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