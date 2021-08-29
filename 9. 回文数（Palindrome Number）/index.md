# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（9）回文数

# 导读：
![我的解法很多 且 很 sao，你忍一下~](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-10/1628599234603-image.png)

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