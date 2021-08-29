# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（14）最长公共前缀

# 导读：
![我的解法很多 且 很 sao，你忍一下~](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-10/1628599234603-image.png)

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-21/1629518204530-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-21/1629523145232-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%8814%EF%BC%89%E6%9C%80%E9%95%BF%E5%85%AC%E5%85%B1%E5%89%8D%E7%BC%80.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 佛说：“有序胜过无序”
// 技巧：
// 1）将 strs 将一定顺序（升或降序）排列，
// 2）第1个和最后1个字符串的最长公共前缀就是我们的答案
var longestCommonPrefix = function(strs) {
    const l = strs.length;
    let index = 0,
        resStr = '';
    
    // 边界：若 strs的长度为 1，则直接返回 第1个字符串
    if (l === 1) {
        return strs[0];
    }

    // 1）将 strs 将一定顺序（升或降序）排列，
    strs.sort();

    // 边界：&& strs[0][index] !== undefined，是为了类似 ["", "", ""] 的情况
    // 2）第1个和最后1个字符串的最长公共前缀就是我们的答案
    while (strs[0][index] === strs[l - 1][index] && strs[0][index] !== undefined) {
        resStr += strs[0][index];
        index++;
    }

    return resStr;
};
```

### 2 方案2
1)代码：
```js
// 方案2 不断遍历，借助"i、innerIndex"等变量去做处理。
var longestCommonPrefix = function(strs) {
    const l = strs.length;

    let innerIndex = 0,
        resStr = '';

    // 边界：若 strs的长度为 1，则直接返回 第1个字符串
    if (l === 1) {
        return strs[0];
    }

    // 1）不断遍历。
    // 核心：strs[0][innerIndex] === strs[i][innerIndex] ，即第1个（下标为0）字符串的某个字符（innerIndex）
    // === 第当前个（下标为i）字符串的某个字符（innerIndex）时，就不断往后走。
    // 注：当 i === l-1，”走完一轮了“，需要 innerIndex++; 且 i = 0（重置i）。
    // 边界：退出核心是 当 strs[0][innerIndex] !== strs[i][innerIndex] 时。
    for (let i = 1; i < l; i++) {
        // 边界：&& strs[0][innerIndex] !== undefined，是为了类似 ["", "", ""] 的情况
        if (strs[0][innerIndex] === strs[i][innerIndex] && strs[0][innerIndex] !== undefined) {
            if (i === l - 1) {
                innerIndex++;
                i = 0;
            }
            continue;
        } else {
            resStr = strs[0].slice(0, innerIndex);
            break;
        }
    }

    // 2）返回结果 resStr 。
    return resStr;
}
```

### 3 方案3
1)代码：
```js
// 方案3 使用 Array.reduce 。
// 技巧：通过观察答案，我们发现 “输入到输出” 是一个多到一（字符串数组 变成 字符串）的过程，
// 故，我们可以优先考虑 Array.reduce 函数。
var longestCommonPrefix = function(strs) {
    // 1）使用 reduce（“多到一过程”） 进行遍历处理。
    const resStr = strs.reduce((acc, cur, index) => {
        if (index === 0) {
            acc = cur;
        } else {
            let index = 0,
                l = acc.length;
            while (index < l) {
                if (acc[index] === cur[index]) {
                    index++;
                } else {
                    break;
                }
            }
            acc = acc.slice(0, index);
        }
        return acc;
    }, '');

    // 2）返回结果 resStr 。
    return resStr;
}
```

### 4 方案4
1)代码：
```js
// 方案4 “分治”。
// 核心：LCP(S1, S2, ..., Sn) = LCP(LCP(S1, Sk), LCP(Sk+1, Sn)) 。
var longestCommonPrefix = function(strs) {
    // 若分裂后的两个数组长度不为 1，则继续分裂
    // 直到分裂后的数组长度都为 1，
    // 然后比较获取最长公共前缀
    const lcp = (strs) => {
        const  l = strs.length;
        if(l === 1) {
            return strs[0];
        }

        const mid = Math.floor(l / 2),
            left = strs.slice(0, mid),
            right = strs.slice(mid, l);
        return lcpTwo(lcp(left), lcp(right))
    }

    // 求 str1 与 str2 的最长公共前缀
    function lcpTwo(str1, str2) {
        let index = 0,
            l = str1.length;
        
        while (index < l) {
            if (str1[index] === str2[index]) {
                index++;
            } else {
                break;
            }
        }

        return str1.slice(0, index);
    }

    const l = strs.length;
    if (l === 0) {
        return "";
    }

    return lcp(strs)
};
```