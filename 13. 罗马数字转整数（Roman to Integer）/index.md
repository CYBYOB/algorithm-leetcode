# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（13）罗马数字转整数

# 导读：
![我的解法很多 且 很 sao，你忍一下~](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-10/1628599234603-image.png)

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-16/1629078238427-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-16/1629078260231-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-16/1629078307814-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-21/1629517976868-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%8813%EF%BC%89%E7%BD%97%E9%A9%AC%E6%95%B0%E5%AD%97%E8%BD%AC%E6%95%B4%E6%95%B0.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 "状态机"，一遍遍历。
var romanToInt = function(s) {
    const l = s.length;
    let index = 0,
        resNum = 0;

    // 1）不断往后走（“拉”），边界：index < l。
    // 核心：通过 if、else 等的组合“穷举所有的状态流转可能”。
    // 处理：根据最终流转出来的“状态”，变更 index 和 resNum 的值。
    while (index < l) {
        if (s[index] === 'M') {
            resNum += 1000;
        } else if (s[index] === 'D') {
            resNum += 500;
        } else if (s[index] === 'C') {
            if (s[index + 1] === 'D') {
                resNum += 400;
                // 边界：比其他普通情况多往后走1步，下同
                index++;
            } else if (s[index + 1] === 'M') {
                resNum += 900;
                index++;
            } else {
                resNum += 100;
            }
        } else if (s[index] === 'L') {
            resNum += 50;
        } else if (s[index] === 'X') {
            if (s[index + 1] === 'L') {
                resNum += 40;
                index++;
            } else if (s[index + 1] === 'C') {
                resNum += 90;
                index++;
            } else {
                resNum += 10;
            }
        } else if (s[index] === 'V') {
            resNum += 5;
        } else if (s[index] === 'I') {
            if (s[index + 1] === 'V') {
                resNum += 4;
                index++;
            } else if (s[index + 1] === 'X') {
                resNum += 9;
                index++;
            } else {
                resNum += 1;
            }
        }

        // 边界：不管怎么样都 ++ ，往往走1位
        index++;
    }

    // 2）返回上面所累计得到的 resNum 值
    return resNum;
}
```

### 2 方案2
1)代码：
```js
// 方案2 建立所有的“数据映射集”，根据情况去分别做“加、减法”。
// 技巧：映射关系优先考虑hash这种数据结构（对应 JS的Map ）
var romanToInt = function(s) {
    // 1）建立所有的“数据映射集”
    const l = s.length,
        map = new Map([
        ['I', 1],
        ['V', 5],
        ['X', 10],
        ['L', 50],
        ['C', 100],
        ['D', 500],
        ['M', 1000]
    ]);

    let index = 0,
        resNum = 0;

    // 2）根据情况去分别做“加、减法”（不断往后拉，边界： index < l）
    // III 可视为 0（初始化） + 1 + 1 + 1 = 3
    // IV 可视为 0（初始化） + 5（V） - 1（I，因为I放在V左边，故作减法） = 4
    while (index < l) {
        const tempNum = map.get(s[index]);
        if (index < l-1 && tempNum < map.get(s[index + 1])) {
            resNum -= tempNum;
        } else {
            resNum += tempNum;
        }

        index++;        
    }

    // 3）返回上面所累计得到的 resNum 值
    return resNum;
}
```

### 3 方案3
1)代码：
```js
// 方案3 “预处理化”，根据预处理化后的“新罗马数值字符串”进行遍历。
// 技巧：“有序胜过无序”。
var romanToInt = function(s) {
    // 1）预处理化 —— 如将 'IV' 替换成 'a'、'IX' 替换成 'b' 等
    // a、b、c、d、e、f 分别表示 4、9、40、90、400、900。
    // 优化：链式调用。
    s = s.replace('IV', 'a')
        .replace('IX', 'b')
        .replace('XL', 'c')
        .replace('XC', 'd')
        .replace('CD', 'e')
        .replace('CM', 'f');

    // 2）通过 Map 定义全新的“数据映射集”。
    const l = s.length,
        map = new Map([
        ['I', 1],
        ['V', 5],
        ['X', 10],
        ['L', 50],
        ['C', 100],
        ['D', 500],
        ['M', 1000],
        ['a', 4],
        ['b', 9],
        ['c', 40],
        ['d', 90],
        ['e', 400],
        ['f', 900]
    ]);

    let index = 0,
        resNum = 0;
    
    // 3）根据替换后、“新罗马数值字符串”进行遍历，结合map去变更 resNum 值。
    while (index < l) {
        resNum += map.get(s[index]);
        index++;
    }

    // 4）返回上面所累计得到的 resNum 值。
    return resNum;
}
```