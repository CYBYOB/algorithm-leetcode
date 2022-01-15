# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（36）有效的数独

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/66627272-dbc4-48df-9d80-ef1acfac8e25.png)
![题目描述](https://files.mdnice.com/user/6999/b86fe37d-93bb-412c-930a-bf95dcd43c1b.png)
![题目描述](https://files.mdnice.com/user/6999/c4f06ced-19af-4890-9439-69d9f649d339.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/511d0921-2ed5-40f6-a887-9cb3ef0d2ec6.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “遍历法”。
// 技巧：遍历1次，看当前 行、列、宫（即 boxList 、共 9 个）是否有重复值。

// 思路：
// 1）状态初始化
// 2）核心：遍历整个 board ，不断将 board[i][j] 存入相应的数组里 （rowList、columnList、boxList）
// 2.1）必须是非 '.' 才放入3个数组里
// 2.1.1）若 行、列、宫 中有重复值，则 直接返回 false
// 3）遍历结束，返回结果 true 
var isValidSudoku = function(board) {
    // 1）状态初始化
    const rowList = new Array(9).fill(0).map(() => new Array(9).fill(0));
    const columnList = new Array(9).fill(0).map(() => new Array(9).fill(0));
    const boxList = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => new Array(9).fill(0)));

    // 2）核心：遍历整个 board ，不断将 board[i][j] 存入相应的数组里 （rowList、columnList、boxList）
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const c = board[i][j];
            // 2.1）必须是非 '.' 才放入3个数组里
            if (c !== '.') {
                const index = c.charCodeAt() - '0'.charCodeAt() - 1;
                rowList[i][index]++;
                columnList[j][index]++;
                boxList[Math.floor(i / 3)][Math.floor(j / 3)][index]++;
                // 2.1.1）若 行、列、宫 中有重复值，则 直接返回 false
                if (rowList[i][index] > 1 || columnList[j][index] > 1 || boxList[Math.floor(i / 3)][Math.floor(j / 3)][index] > 1) {
                    return false;
                }
            }
        }
    }

    // 3）遍历结束，返回结果 true 
    return true;
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