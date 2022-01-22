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

# 四 资源分享 & 更多
### 1 历史文章 - 总览
![历史文章 - 总览](https://files.mdnice.com/user/6999/7b92db4c-d5d3-4558-8003-284d3e24b86b.png)

![刷题进度 - LeetCode：381 / 2498 、《剑指offer》：66 / 66 ](https://files.mdnice.com/user/6999/aa583ce2-ca99-44eb-ab95-81c1d3a37eed.png)

### 2 【资源分享】算法通关 + 面试宝典算法通关 + 面试宝典
```
1）算法通关40讲（极客 - 外企大佬讲的）：
链接: https://pan.baidu.com/s/1C175QEmcAunjnCzYzoLBz 提取码: hjna

2）动态规划专题（价值几百美刀~）：https://www.bilibili.com/video/BV1nt4y1Y7nz

3）前端面经：
3.1）https://www.nowcoder.com/tutorial/96
3.2）https://muyiy.cn/question
3.3）https://hub.fastgit.org/haizlin/fe-interview/blob/master/category/history.md

注：若失效请前往VX公众号： 码农三少 ，发送关键字： LeetCode 或 算法 ，即可获取最新的链接~
```

![算法通关 + 面试宝典](https://files.mdnice.com/user/6999/624dbb9c-9ead-4e64-a840-0c52c40c1856.jpg)

### 3 博主简介
**码农三少** ，一个致力于编写 **极简、但齐全题解（算法**） 的博主。
专注于 **一题多解、结构化思维** ，欢迎一起刷穿 LeetCode ~

![博主简介](https://files.mdnice.com/user/6999/0b3d3906-d883-43be-b243-5e08ea066aac.png)