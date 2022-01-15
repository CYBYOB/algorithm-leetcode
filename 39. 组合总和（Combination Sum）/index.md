# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（39）组合总和

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/4b85992b-68a4-462b-af01-afc228f6e2f2.png)
![题目描述](https://files.mdnice.com/user/6999/d9881209-2364-4f6d-b953-dcce85dae076.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/5aede534-4f9d-49bc-995c-9c416ca62cb1.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “回溯（本质：递归）法”
// 技巧：说白了，就是通过回溯去穷举所有的情况，根据当前情况进行不同的处理。

// 思路：
// 1）状态初始化
// 2）调用 - 回溯
// 3）返回结果 resList 
var combinationSum = function(candidates, target) {
    const dfs = (curIndex, l, curSum, target, curArr, resList) => {
        // 1）递归出口
        if (curSum === target) {
            // 注：需要使用 slice 获取其副本值！
            resList.push(curArr.slice());
            return;
        }
        if (curIndex >= l || curSum > target) {
            return;
        }

        // 2）递归主体（“核心：回溯 = 选 + 不选”）
        // 2.1）选
        curSum += candidates[curIndex];
        curArr.push(candidates[curIndex]);
        dfs(curIndex, l, curSum, target, curArr,resList);

        // 2.2）不选（“边界：可能需要恢复环境！”）
        curSum -= candidates[curIndex];
        curArr.pop();
        dfs(curIndex + 1, l, curSum, target, curArr, resList);
    };

    // 1）状态初始化
    const l = candidates.length;
    let curIndex = 0,
        curSum = 0,
        curArr = [],
        resList = [];

    // 2）调用 - 回溯
    dfs(curIndex, l, curSum, target, curArr, resList);

    // 3）返回结果 resList 
    return resList;
};
```

### 2 方案2
1)代码：
```js
// 方案2 “动态规划 - 普通版”。
// TODO，注：通过 0 / 170，应该是代码哪里写错了！！！

// 思路：
// 1）状态定义：
// dp[i][j] 前i个物品（使用哨兵从1开始）能组合成j的序列

// 2）初始化：
// dp[0][j] = [], 没有物品则没有能组合成j的序列

// 3）转移方程：
// dp[i][j] 的值由两个方向递推得来：
// 当前能选的物品中，不选第i个物品就能组合成目标j的序列，即dp[i - 1][j]
// 当前能选的物品中，选k个第i个物品，即dp[i - 1][j - k * nums[i]]
// 注：动态规划数组中存储的是引用，所以要深拷贝

// 参考：
// 1）https://leetcode-cn.com/problems/combination-sum/solution/dong-tai-gui-hua-bei-bao-wen-ti-by-sjtxw-11yv/
var combinationSum = function(candidates, target) {
    // 1）dp 状态初始化
    const l = candidates.length;
    const dp = new Array(l + 1);
    for (let i = 0; i <= l; i++) {
        dp[i] = new Array(target + 1);
    };
    for (let i = 0; i <= target; i++) {
        dp[0][i] = [];
    };

    // 2）dp 状态转移 并 处理结果
    for (let i = 1; i <= l; i++) {
        dp[i][0] = [];
        for (let j = 1; j <= target; j++) {
            dp[i][j] = [];
            for (const item of dp[i - 1][j]) dp[i][j].push(Array.from(item)); // 不选当前元素
            for (let k = 1; j - k * candidates[i - 1] >= 0; k++) { // 选择k个当前元素
                const pre = j - k * candidates[i - 1];
                if (pre === 0) {
                    dp[i][j].push(new Array(k).fill(candidates[i - 1])); // 刚好k个当前元素
                } else {
                    for (const item of dp[i - 1][pre]) {
                        dp[i][j].push(item.concat(new Array(k).fill(candidates[i - 1])));
                    }
                }
            }
        }
    }

    // 3）返回结果 dp 数组
    return dp;
};
```

### 3 方案3
1)代码：
```js
// 方案3 “动态规划 - 优化版”。
// 本质：二维存储空间 压缩成 一维存储空间 

// 思路：
// 1）dp 状态初始化
// 2）dp 状态转移 并 处理结果
// 3）返回结果 dp[target] 
var combinationSum = function(candidates, target) {
    // 1）dp 状态初始化
    const l = candidates.length;
    const dp = new Array(target + 1);
    dp[0] = [];

    // 2）dp 状态转移 并 处理结果
    for (let i = 0; i < l; i++) {
        for (let j = 1; j <= target; j++) {
            if (dp[j] === undefined) dp[j] = [];
            const pre = j - candidates[i];
            if (pre < 0) continue;
            if (dp[pre] === undefined) dp[pre] = [];
            if (dp[pre].length === 0 && pre === 0) {
                dp[j].push([candidates[i]]); // target刚好等于当前物品
            } else {
                const t = [];
                for (const item of dp[pre]) {
                    const tt = Array.from(item); // 拷贝
                    tt.push(candidates[i]);
                    t.push(tt);
                }
                dp[j].push(...t);
            }
        }
    }

    // 3）返回结果 dp[target] 
    return dp[target];
};
```

# 四 资源分享 & 更多
### 1 历史文章 - 总览
![历史文章 - 总览](https://files.mdnice.com/user/6999/7b92db4c-d5d3-4558-8003-284d3e24b86b.png)

![刷题进度 - LeetCode：355 / 2492 、《剑指offer》：66 / 66 ](https://files.mdnice.com/user/6999/0fb20e8c-ac87-4f48-954a-69dbadf0e8bf.png)

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
码农三少 ，一个致力于编写 **极简、但齐全题解（算法**） 的博主。
专注于 **一题多解、结构化思维** ，欢迎一起刷穿 LeetCode ~

![博主简介](https://files.mdnice.com/user/6999/0b3d3906-d883-43be-b243-5e08ea066aac.png)