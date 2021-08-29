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