# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（22）括号生成

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/1dcb997e-ac67-4de6-8e74-cec1dc843617.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/d39fb62c-d606-4f92-b3b1-84501ed23437.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 暴力法（简单而直观）。
// 1）穷举所有的组合。
// 2）接着遍历所有的组合，看其是否为有效的括号组合。
// 若 有效 ，则 保存到数组里 —— 最后将该数组返回即可。
var generateParenthesis = function(n) {
    // 递归实现。
    const dfs = (curIndex, maxIndex, curArr, resArr) => {
        // 1）递归出口。
        // 当前下标 curIndex 为 最大的下标值时，保存该组合 并 退出此时递归。
        if (curIndex === maxIndex) {
            resArr.push(curArr.join(''));
            return;
        }

        // 2）递归主体。分 2种 选择。
        // 2.1）选择 '(' ，下标加1 并 继续递归下去。 
        curArr[curIndex] = '(';
        dfs(curIndex + 1, maxIndex, curArr, resArr);
        // 2.2）选择 ')' ，下标加1 并 继续递归下去。 
        curArr[curIndex] = ')';
        dfs(curIndex + 1, maxIndex, curArr, resArr);
    }

    // 判断当前组合（ str ）是否为有效的括号组合
    const isValid = function(str) {
        // 1）初始化 相关的正则表达式 。
        const reg = /\(\)/;

        // 2）处理。
        // 核心：若 str存在 () 子串，则 将给它们不断的替换成 '' ，并 更新str值 。
        while (reg.test(str)) {
            str = str.replace(reg, '');
        }

        // 3）返回结果。
        // 若 将所有的 () 子串 都替换成 '' 后、str长度为0，则 为有效的的括号。
        return str.length === 0;
    }
    

    // 1）初始化相关变量
    const curIndex = 0,
        curArr = [];
    let resArr = [];

    // 2）调用定义好的 递归 函数，将所有组合存放至 数组 resArr 。
    dfs(curIndex, n * 2, curArr, resArr);

    // 3）遍历 resArr 。
    // 若 当前组合是有效的，则 将其保留下来（使用 JS 自带的 filter 函数 + 我们刚实现的 isValid 函数 ）。
    resArr = resArr.filter(item => {
        return isValid(item);
    });

    // 4）返回结果 resArr 。
    return resArr;
}
```

### 2 方案2
1)代码：
```js
// 方案2 “回溯（含剪枝）” —— 即方案2的优化版。
// 技巧、核心：在于剪枝；相关的核心代码如下：
// if (leftNum < rightNum || leftNum > n) {
//     return;
// }
var generateParenthesis = function(n) {
    // 递归实现。
    const dfs = (leftNum, rightNum, n, curStr, resArr) => {
        // 1）递归出口
        // 1.1）优化、边界、核心：其实就是做了剪枝，因为此时继续产生的组合肯定为 非有效的。
        if (leftNum < rightNum || leftNum > n) {
            return;
        }
        // 1.2）边界：此时必为 有效的，直接将该组合 放入resArr 并 终止本次递归 即可。
        if (leftNum === rightNum && leftNum === n) {
            resArr.push(curStr);
            return;
        }

        // 2）递归主体。分 2种 选择。
        // 2.1 选择 '(' ，leftNum 加1 并 继续递归下去。 
        dfs(leftNum + 1, rightNum, n, curStr + '(', resArr);
        // 2.1 选择 ')' ，rightNum 加1 并 继续递归下去。 
        dfs(leftNum, rightNum + 1, n, curStr + ')', resArr);
    }
    
    // 1）初始化相关变量
    const leftNum = rightNum = 0,
        curStr = '',
        resArr = [];
    
    // 2）调用定义好的 dfs 函数，得到所有的有效组合（均存放在数组 resArr 里）。
    dfs(leftNum, rightNum, n, curStr, resArr);

    // 3）返回结果 resArr 。
    return resArr;
}
```

### 3 方案3
1)代码：
```js
// 方案3 动态规划（即 DP ） - 版本1。
// 核心：dp[i][m] = "(" + dp[m -1][0...m_l] + ")" + dp[k][0...k_l]
// 其中 0 <= m < i && m + k = i - 1
// dp[i] 为 一维数组 —— 保存其所有有效的组合。
// 综上，dp[n] 为 结果数组。
var generateParenthesis = function(n) {
    // 1）状态初始化
    const dp = [];
    dp[0] = [""];
    dp[1] = ["()"];

    // 2）核心：根据递推公式处理
    for (let i = 2; i <= n; i++) {
        let resArr = [];
        for (let m = 0; m < i; m++) {
            const k = (i - 1) - m,
                arr_1 = dp[m],
                arr_2 = dp[k],
                l_1 = arr_1.length,
                l_2 = arr_2.length;

            for (let ii = 0; ii < l_1; ii++) {
                for (let jj = 0; jj < l_2; jj++) {
                    // 2.1）将所有有效的组合放入 数组 resArr 里。
                    resArr.push("(" + arr_1[ii] + ")" + arr_2[jj]);
                }
            }
        }

        // 2.2）将当前的 数组 resArr 赋值给 dp[i] 。
        dp[i] = resArr;
    }

    // 3）返回结果 dp[n] 。
    return dp[n];
}
```

### 4 方案4
1)代码：
```js
// 方案4 动态规划（即 DP ） - 版本2。
// 技巧：遍历 dp[i - 1] 得到 curStr 。
// dp[i]此时可以加入3种情况 —— ...new Set([`(${curStr})`, `()${curStr}`, `${curStr}()`]) ，边界：需去重
// 注：未通过，可能有些情况为考虑到。
var generateParenthesis = function(n) {
    // 1）状态初始化
    const dp = [];
    dp[0] = [""];
    dp[1] = ["()"];

    // 2）核心：根据递推公式处理。
    for (let i = 1; i<= n; i++) {
        const arrPre = dp[i - 1],
            arrPreLength = arrPre.length;
        dp[i] = [];
        
        for (let j = 0; j < arrPreLength; j++) {
            const curStr = arrPre[j];
            // 2.1）核心：分 3种 情况，() 放2边、往左边放 + 往右边放。
            dp[i].push(...new Set([`(${curStr})`, `()${curStr}`, `${curStr}()`]));
        }
    }

    // 3）返回结果 dp[n] 。
    return dp[n];

    // 参考：
    // 1）https://leetcode-cn.com/problems/generate-parentheses/solution/dong-tai-gui-hua-by-youngluo-icyk/
}
```

# 四 更多
### 1 GitHub - LeetCode项目仓库
```
0）本项目地址： https://github.com/CYBYOB/algorithm-leetcode 。
目标、愿景：
让每个人都能拥有一定的算法能力、以应对面试中（会举一反三的同学还可以将其融入自己的肌肉和血液，甚至能够赋能于公司的业务和技术）的算法。

1）项目的根目录下的 README.md 文件，
可以帮您快速查阅每1道题的来源、难度、所有的题解方案等。

2）而每个题解（即 index.md 文件）中，
还将附带题目描述、所有的题解方案的思维导图（ .xmind 文件）、思路和技巧等。

3）每种题解方案都有详细的注释，
通过“数字步骤”将抽象的算法逻辑、
清晰和有层次的展示于您的面前。
可以说是，
开箱即用~

4）所有的题解方案都是经过作者1人之手，
故代码风格及其统一。
一旦阅读达到一定量后，
后续将大大提升您的阅读速度 —— “正所谓、量变引起质变”。

5）本人每周仍在不断的更新 —— 保证每周都有新的题目、题解方案刺激着您的神经 和 刷题欲望。
欢迎对算法感兴趣的同学加入我们的社群。
QQ群： 933919972 ；
作者QQ： 1520112971 ；
作者VX： c13227839870（可拉您进群、一起学习与交流~） 。
```

![GitHub：algorithm-leetcode - 项目亮点](https://files.mdnice.com/user/6999/772fafdd-76ab-4e0c-a1f9-34e65ac63fad.png)

![GitHub：algorithm-leetcode - 题目总览](https://files.mdnice.com/user/6999/7b92db4c-d5d3-4558-8003-284d3e24b86b.png)

### 2 作者标签
```
1）“伪全栈工程师，主攻前端，偶尔写点后端”。

2）2019年的微信小程序应用开发赛 - 全国三等奖；
2019CODA比赛 - 前 17/211 强 且 荣获“优秀团队”称号 等。

3）“半自媒体人”，
在校期间、个人公众号（IT三少。新自媒体（公众号）号： 码农三少 ）
在半年内实现了0到5.8K+的粉丝增长等。
```