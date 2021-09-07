# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（17）电话号码的字母组合

# 导读：
![我的解法很多 且 很 sao，你忍一下~](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-10/1628599234603-image.png)

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630120023621-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630120053432-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630132101782-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%8817%EF%BC%89%E7%94%B5%E8%AF%9D%E5%8F%B7%E7%A0%81%E7%9A%84%E5%AD%97%E6%AF%8D%E7%BB%84%E5%90%88.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 回溯（说白了、说穿了，就是递归。因为一般用递归实现回溯）。
// 技巧：永远记住，递归 = 递归出口（为了不陷入无线递归的死循环） + 递归主体（一般会变更一些参数后，在调用函数本身）。
// 一般 递归出口 放前面，递归主体 放后面。
var letterCombinations = function(digits) {
    // 1）定义回溯函数（即递归函数dfs）。
    const dfs = (index, l, digits, curStr, resArr) => {
        // 1.1）递归出口
        if (index >= l) {
            resArr.push(curStr);
            return;
        }

        // 1.2）递归主体
        const tempArr = map.get(digits[index]),
            tempLength = tempArr.length;
            
        // 核心：回溯 = 选 + 不选。
        // 该for循环表示穷举每种可能，然后 选tempArr[i] ，不选其他。
        for (let i = 0; i < tempLength; i++) {
            dfs(index + 1, l, digits, curStr + tempArr[i], resArr);
        }
    };

    // 2）状态初始化。
    const l = digits.length,
        map = new Map([
            ['2', ['a', 'b', 'c']],
            ['3', ['d', 'e', 'f']],
            ['4', ['g', 'h', 'i']],
            ['5', ['j', 'k', 'l']],
            ['6', ['m', 'n', 'o']],
            ['7', ['p', 'q', 'r', 's']],
            ['8', ['t', 'u', 'v']],
            ['9', ['w', 'x', 'y', 'z']]
        ]);

    let index = 0,
        curStr = '',
        resArr = [];

    // 3）调用自定义的回溯函数（即递归函数dfs）。
    // 3.1）边界："" ，预期为 []。
    // 若不加 该if分支， 则自己的将输出为 [""]。
    if (l <= 0) {
        return [];
    }
    dfs(index, l, digits, curStr, resArr);

    // 4）返回结果 resArr 。
    return resArr;
};
```

### 2 方案2
1)代码：
```js
// 方案2 将digits字符串转二维数组；不断遍历做笛卡尔积；返回最终的“笛卡尔积数组”。
// 技巧：涉及“映射、数量、重复性、唯一性（即次数）等”可优先考虑hash（JS里对应的是 map数据结构）。
// 1）"234" 转成 [ ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'] ]
// 2）核心：遍历该二维数组，不断跟下一个元素做笛卡尔积。
// 2.1）初始化：newAcc = ['a', 'b', 'c']
// 2.2）当前newAcc 与下一个元素['d', 'e', 'f'] 做笛卡尔积，
// 得到 newAcc = ["ad","ae","af","bd","be","bf","cd","ce","cf"]
// 2.3）重复2.2步骤，做笛卡尔积。
// 得到 newAcc = ["adg","adh","adi","aeg","aeh","aei","afg","afh","afi","bdg","bdh","bdi","beg","beh","bei","bfg","bfh","bfi","cdg","cdh","cdi","ceg","ceh","cei","cfg","cfh","cfi"]
// 3）遍历结束，返回 newAcc 。
var letterCombinations = function(digits) {
    // 1）状态初始化。
    const l = digits.length,
        map = new Map([
            ['2', ['a', 'b', 'c']],
            ['3', ['d', 'e', 'f']],
            ['4', ['g', 'h', 'i']],
            ['5', ['j', 'k', 'l']],
            ['6', ['m', 'n', 'o']],
            ['7', ['p', 'q', 'r', 's']],
            ['8', ['t', 'u', 'v']],
            ['9', ['w', 'x', 'y', 'z']]
        ]);

    // 2）将原先的 digits字符串 转成 相应的二维数组tempArr。
    // 如 "234" 转成 [ ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'] ]。
    const tempArr = digits.split('').map(item => {
        return map.get(item);
    });

    let newAcc = [];
    // 3）将上面转换得到的二维数组tempArr 变成 一维数组resArr 。
    // 技巧：多变一，优先考虑使用 数组的reduce方法 。
    const resArr = tempArr.reduce((acc, cur, index, item) => {
        // 边界：若是第一个元素，直接返回 item[index] 。
        if (index === 0) {
            newAcc = item[index];
            return newAcc;
        }

        const accLength = acc.length,
            curLength = cur.length;
        // 边界：需重置 newAcc 为 [] ，
        // 继续 用当前的acc、cur 拼接出 newAcc 。
        newAcc = [];
        // 3.1）核心：遍历 acc、cur ，拼接出 newAcc 。
        for (let i = 0; i < accLength; i++) {
            for (let j = 0; j < curLength; j++) {
                newAcc.push(acc[i] + cur[j]);
            }
        }
        
        // 3.2）返回由 acc、cur 拼接出的 newAcc 。
        return newAcc;
    }, []);

    // 4）返回结果 resArr 。
    return resArr;
}
```

### 3 方案3
1)代码：
```js
// 方案3 与方案2类似，只是不使用 reduce 函数了。
// 也是不断遍历做笛卡尔积；返回最终的“笛卡尔积数组”。
// 技巧：涉及“映射、数量、重复性、唯一性（即次数）等”可优先考虑hash（JS里对应的是 map数据结构）。
// 1）"234" 转成 [ ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'] ]
// 2）核心：遍历该二维数组，不断跟下一个元素做笛卡尔积。
// 2.1）初始化：resArr = ['a', 'b', 'c']
// 2.2）当前resArr 与下一个元素['d', 'e', 'f'] 做笛卡尔积，
// 得到 resArr = ["ad","ae","af","bd","be","bf","cd","ce","cf"]
// 2.3）重复2.2步骤，做笛卡尔积。
// 得到 resArr = ["adg","adh","adi","aeg","aeh","aei","afg","afh","afi","bdg","bdh","bdi","beg","beh","bei","bfg","bfh","bfi","cdg","cdh","cdi","ceg","ceh","cei","cfg","cfh","cfi"]
// 3）遍历结束，返回 resArr 。
var letterCombinations = function(digits) {
    // 1）状态初始化。
    const l = digits.length,
        map = new Map([
            ['2', ['a', 'b', 'c']],
            ['3', ['d', 'e', 'f']],
            ['4', ['g', 'h', 'i']],
            ['5', ['j', 'k', 'l']],
            ['6', ['m', 'n', 'o']],
            ['7', ['p', 'q', 'r', 's']],
            ['8', ['t', 'u', 'v']],
            ['9', ['w', 'x', 'y', 'z']]
        ]);
    let resArr = [];

    // 边界：若长度为 0 ，则 直接返回[] 。
    if (l === 0) {
        // 其实就是 return [];
        return resArr;
    } else {
        // 若长度 不为 0 ，则 初始化 resArr 为  map.get(digits[0]); 。
        resArr = map.get(digits[0]);
    }

    // 2）遍历。
    // 核心：不断做笛卡尔积、更新 resArr 值。
    // 注：下标从1（因为之前已经 resArr = map.get(digits[0]); ）开始！
    for (let i = 1; i < l; i++) {
        const tempArr = map.get(digits[i]),
            tempArrLength = tempArr.length,
            resArrLength = resArr.length;
        let newResArr = [];

        for (let j = 0; j < resArrLength; j++) {
            for (let k = 0; k < tempArrLength; k++) {
                newResArr.push(resArr[j] + tempArr[k]);
            }
        }

        resArr = newResArr;
    }

    // 3）返回结果 resArr 。
    return resArr;
}
```