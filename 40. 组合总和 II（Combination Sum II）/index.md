# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（40）组合总和 II

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/922a048e-0766-426b-861b-ee7142eeabb8.png)
![题目描述](https://files.mdnice.com/user/6999/bae8b85c-3fa9-46f4-8320-0e3fd568c049.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/2fc79155-ef40-45d4-869f-4f6f6cd60191.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 ”回溯法（递归版）“
// 通过：172 / 175。 输入 [1, 1, ... , 1, 1] 时会超时！！

// 技巧：“有序胜过无序”。
// 通过sort方法（时间复杂度仅为 O(nlogn)）将无序的数组变有序是一件很划算的事情。

// 思路：
// 1）状态初始化
// 2）调用 dfs 
// 3）结果去重
// 4）返回结果 resList 
var combinationSum2 = function(candidates, target) {
    const dfs = (curIndex, l, curSum, target, curArr, resList) => {
        // 1）递归出口
        if (curSum === target) {
            // 注：使用 slice ，取得其副本值 ！！
            resList.push(curArr.slice());
            return;
        }
        if (curIndex >= l || curSum > target) {
            return;
        }

        // 2）递归主体（回溯 = 选 + 不选）
        // 2.1）选
        curArr.push(candidates[curIndex]);
        curSum += candidates[curIndex];
        dfs(curIndex + 1, l, curSum, target, curArr, resList);
        // 2.1）不选（注：可能需要恢复环境，如下面的2行代码 —— pop、-= ）
        curArr.pop();
        curSum -= candidates[curIndex];
        dfs(curIndex + 1, l, curSum, target, curArr, resList);
    };

    // 1）状态初始化
    const l = candidates.length;
    candidates = candidates.sort((a, b) => a - b);
    let curIndex = 0,
        curSum = 0,
        curArr = [],
        resList = [];
    
    // 2）调用 dfs 
    dfs(curIndex, l, curSum, target, curArr, resList);

    // 3）结果去重
    resList = [...new Set(resList.map(item => item.join('#')))].map(item => item.split('#'));
    
    // 4）返回结果 resList 
    return resList;
};
```

### 2 方案2
1)代码：
```js
// 方案2 ”回溯法（递归版 - 优化）“

// 思路：
// 1）状态初始化
// 2）调用 dfs 
// 3）返回结果 resList

// 参考：
// 1）https://leetcode-cn.com/problems/combination-sum-ii/solution/man-tan-wo-li-jie-de-hui-su-chang-wen-shou-hua-tu-/
const combinationSum2 = (candidates, target) => {
    // 1）状态初始化
    const l = candidates.length;
    candidates = candidates.sort((a,b) => a - b );
    const resList = [];

    const dfs = (curIndex, curArr, sum) => { // start是索引 当前选择范围的第一个
        // 1）递归出口
        if (sum === target) {
            // 注：使用 slice ，深拷贝！
            resList.push(curArr.slice());
            return;
        }
        if (sum > target) {
            return;
        }

        // 2）递归主体
        // 枚举出当前的选择
        for (let i = curIndex; i < l; i++) {
            // 边界：当前选项和左邻选项一样，跳过！
            if (i - 1 >= curIndex && candidates[i - 1] == candidates[i]) { 
                continue;
            }
            // 2.1）选择
            curArr.push(candidates[i]);
            dfs(i + 1, curArr, sum + candidates[i]);
            // 2.2）不选
            curArr.pop();
        }
    };

    // 2）调用 dfs 
    dfs(0, [], 0);

    // 3）返回结果 resList
    return resList;
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