# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（6）Z字形变换

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-1/1627807715665-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-1/1627807743493-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-7/1628322362575-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%886%EF%BC%89Z%E5%AD%97%E5%BD%A2%E5%8F%98%E6%8D%A2.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1：1）初始化 tempArr 等。 2）后续的下标值都由 tempArr最开始存放的几个值进行生成的
var convert = function(s, numRows) {
    let l = s.length,
        // 最顶上的几个数所组成的数组
        tempArr = [],
        // 记录已经存到 resStr 里的字符对应下标
        tempMap = new Map(),
        // 需要返回的字符串
        resStr = '';
    
    // 边界1："A" 1（核心：当 numRows = 1 时）
    if (numRows === 1) {
        return s;
    }

    // 初始化 tempArr、tempMap、resStr
    for (let i = 0; true; i += 2) {
        const index = i * (numRows - 1);
        if (index < l) {
            tempArr.push(index);
            tempMap.set(index, 1);
            resStr += s[index];
        } else {
            // 边界2："ABCD" 3（tempArr里的顶部下标多存1个，就不会漏生成一些下标了）
            tempArr.push(index);
            break;
        }
    }

    for (let bias = 1; bias < numRows; bias++) {
        for (let i = 0; i < tempArr.length; i++) {
            // 核心：根据 当前顶部的数值（tempArr[i]） 进行 +、- bias（ 取值范围：[1, numRows - 1] ）
            // 去分别生成新的下标 indexLeft、indexRight
            // 接着根据下标 indexLeft、indexRight 的有效情况，去进行不同的处理。
            const indexLeft = tempArr[i] - bias,
                indexRight = tempArr[i] + bias;

            // 边界3：别忘了 && indexLeft > 0 条件！！
            if (indexLeft < l && !tempMap.has(indexLeft) && indexLeft > 0) {
                tempMap.set(indexLeft, 1);
                resStr += s[indexLeft];
            }
            if (indexRight < l && !tempMap.has(indexRight)) {
                tempMap.set(indexRight, 1);
                resStr += s[indexRight];
            }
        }
    }

    return resStr;
};
```

### 2 方案2
1)代码：
```js
var convert = function(s, numRows) {
    if(numRows == 1)
        return s;

    const len = Math.min(s.length, numRows);
    const rows = [];
    for(let i = 0; i< len; i++) rows[i] = "";
    let loc = 0;
    let down = false;

    for(const c of s) {
        rows[loc] += c;
        if(loc == 0 || loc == numRows - 1)
            down = !down;
        loc += down ? 1 : -1;
    }

    let ans = "";
    for(const row of rows) {
        ans += row;
    }
    return ans;
};
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