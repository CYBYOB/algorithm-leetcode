# 零 标题：算法（leetcode，附思维导图 + 全部解法）300题之（200）岛屿数量

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/b53b8a82-c128-46e2-a55c-69a3c773428c.png)
![题目描述](https://files.mdnice.com/user/6999/5a4cdbb8-db9c-48ae-b041-1836f6917a71.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/1fe7b5fc-97bf-497f-b26c-ee0da856e68a.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “自己。模拟 - 标记法”。

// 思路：
// 1）状态初始化：m = grid.length, n = grid[0].length; 。
// tempMap = new Map(), resMap = getMapByGrid(), resCount = 0; 。
// 2）核心：循环处理 —— 条件为 存在未被访问过的陆地 。
// 3）返回结果 resCount 。
var numIslands = function(grid) {
    const getMapByGrid = () => {
        let resMap = new Map();

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (grid[i][j] === '1') {
                    const tempVal = `${i}#${j}`;
                    resMap.set(tempVal, 1);
                }
            }
        }

        return resMap;
    };

    // 1）状态初始化：m = grid.length, n = grid[0].length; 。
    // tempMap = new Map(), resMap = getMapByGrid(), resCount = 0; 。
    const m = grid.length,
        n = grid[0].length;
    let // tempMap：目前已被访问过的陆地。
        tempMap = new Map(),
        resMap = getMapByGrid(),
        resCount = 0;

    // 2）核心：循环处理 —— 条件为 存在未被访问过的陆地 。
    while (resMap.size !== 0) {
        for (const [key, val] of resMap) {
            if (!tempMap.has(key)) {
                tempMap.set(key, 1);
                let tempQueue = [key];
                
                while (tempQueue.length !== 0) {
                    const key = tempQueue.shift(),
                        [tempI, tempJ] = key.split('#').map(v => parseInt(v));
                    
                    // 标记为已被访问。
                    resMap.delete(key);

                    // 4个方向的访问。
                    // 上
                    if (tempI - 1 >= 0 && grid[tempI - 1][tempJ] === '1') {
                        const key = `${tempI - 1}#${tempJ}`;
                        if (!tempMap.has(key)) {
                            tempQueue.push(key);
                            tempMap.set(key, 1);
                        }
                    }
                    // 下

                    if (tempI + 1 < m && grid[tempI + 1][tempJ] === '1') {
                        const key = `${tempI + 1}#${tempJ}`;
                        if (!tempMap.has(key)) {
                            tempQueue.push(key);
                            tempMap.set(key, 1);
                        }
                    }
                    // 左
                    if (tempJ - 1 >= 0 && grid[tempI][tempJ - 1] === '1') {
                        const key = `${tempI}#${tempJ - 1}`;
                        if (!tempMap.has(key)) {
                            tempQueue.push(key);
                            tempMap.set(key, 1);
                        }
                    }
                    // 右
                    if (tempJ + 1 < n && grid[tempI][tempJ + 1] === '1') {
                        const key = `${tempI}#${tempJ + 1}`;
                        if (!tempMap.has(key)) {
                            tempQueue.push(key);
                            tempMap.set(key, 1);
                        }
                    }
                }

                // 当前岛屿无法再次连接到任何陆地了。
                resCount++;
            }
            break;
        }
    }

    // 3）返回结果 resCount 。
    return resCount;
};
```

### 2 方案2
1)代码：
```js
// 方案2 “自己。深度优先搜索法”。
// 参考：
// 1）https://leetcode.cn/problems/number-of-islands/solution/dao-yu-shu-liang-by-leetcode/

// 思路：
// 1）状态初始化：m = grid.length, n = grid[0].length; 。
// resCount = 0;
// 2）核心：遍历 grid 。
// 2.1）若 当前的格子为 陆地，则 岛屿数量增加1 并 执行深度搜索函数 —— dfs(i, j) 。
// 3）返回结果 resCount 。
var numIslands = function(grid) {
    // 深度搜索（实现：递归）
    const dfs = (curI = 0, curJ = 0) => {
        // 1）递归出口：其实被隐藏起来 —— 当坐标超出格子范围 或 坐标不符合条件时。

        // 2）递归主体。
        // 2.1）当前陆地置为 水 。
        grid[curI][curJ] = '0';

        // 2.2）上下左右，四个方向执行深度搜索。
        if (curI - 1 >= 0 && grid[curI - 1][curJ] === '1') {
            dfs(curI - 1, curJ);
        }
        if (curI + 1 < m && grid[curI + 1][curJ] === '1') {
            dfs(curI + 1, curJ);
        }
        if (curJ - 1 >= 0 && grid[curI][curJ - 1] === '1') {
            dfs(curI, curJ - 1);
        }
        if (curJ + 1 < n && grid[curI][curJ + 1] === '1') {
            dfs(curI, curJ + 1);
        }
    };

    // 1）状态初始化：m = grid.length, n = grid[0].length; 。
    // resCount = 0;
    const m = grid.length,
        n = grid[0].length;
    let resCount = 0;

    // 2）核心：遍历 grid 。
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 2.1）若 当前的格子为 陆地，则 岛屿数量增加1 并 执行深度搜索函数 —— dfs(i, j) 。
            if (grid[i][j] === '1') {
                resCount++;
                dfs(i, j);
            }
        }
    }

    // 3）返回结果 resCount 。
    return resCount;
};
```

### 3 方案3
1)代码：
```js
// 方案3 “广度优先搜索法（本质：跟方案1差不多）”。
// 参考：
// 1）https://leetcode.cn/problems/number-of-islands/solution/dao-yu-shu-liang-by-leetcode/

// 思路：
// 1）状态初始化：m = grid.length, n = grid[0].length;
// resCount = 0; 。
// 2）核心：2层循环的遍历。
// 2.1）若 当前位置为 陆地 ，特殊处理，
// 并 进行 广度优先（使用队列 queue ）的遍历处理。
// 3）返回结果 resCount 。
var numIslands = function(grid) {
    // 1）状态初始化：m = grid.length, n = grid[0].length;
    // resCount = 0; 。
    const m = grid.length,
        n = grid[0].length;
    let resCount = 0;

    // 2）核心：2层循环的遍历。
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 2.1）若 当前位置为 陆地 ，特殊处理，
            // 并 进行 广度优先（使用队列 queue ）的遍历处理。
            if (grid[i][j] === '1') {
                grid[i][j] = '0';
                resCount++;
                let queue = [[i, j]];
                
                while (queue.length !== 0) {
                    const [tempI, tempJ] = queue.shift();
                    // 上下左右，4个方向。
                    if (tempI - 1 >= 0 &&grid[tempI - 1][tempJ] === '1') {
                        queue.push([tempI - 1, tempJ]);
                        grid[tempI - 1][tempJ] = '0';
                    }
                    if (tempI + 1 < m &&grid[tempI + 1][tempJ] === '1') {
                        queue.push([tempI + 1, tempJ]);
                        grid[tempI + 1][tempJ] = '0';
                    }
                    if (tempJ - 1 >= 0 &&grid[tempI][tempJ - 1] === '1') {
                        queue.push([tempI, tempJ - 1]);
                        grid[tempI][tempJ - 1] = '0';
                    }
                    if (tempJ + 1 < n &&grid[tempI][tempJ + 1] === '1') {
                        queue.push([tempI, tempJ + 1]);
                        grid[tempI][tempJ + 1] = '0';
                    }
                }
            }
        }
    }

    // 3）返回结果 resCount 。
    return resCount;
}
```

### 4 方案4
1)代码：
```js
// 方案4 “并查集法”。
// 参考：
// 1）https://leetcode.cn/problems/number-of-islands/solution/dao-yu-shu-liang-by-leetcode/

// 注：有问题，通过 12 / 49 。TODO：排查问题 && 重新手撕。
var numIslands = function(grid) {
    class Unionfind {
        constructor() {
            let count = 0,
                parent = [],
                rank = [];
            
            for (let i = 0; i < m; i++) {
                for (let j = 0; j < n; j++) {
                    const tempIndex = n * i + j;
                    if (grid[i][j] === '1') {
                        parent[tempIndex] = tempIndex;
                        count++;
                    }
                    // ？
                    rank[tempIndex] = 0;
                }
            }

            this.count = count;
            this.parent = parent;
            this.rank = rank;
        }

        find(index) {
            const {parent} = this;
            if (parent[index] !== index) {
                // 找到该坐标最开始的“祖先”？
                parent[index] = this.find(parent[index]);
            }
            
            this.parent = parent;
            return parent[index];
        }

        union(index_1, index_2) {
            let {rank, parent, count} = this;

            const root_1 = this.find(index_1),
                root_2 = this.find(index_2);
            
            if (root_1 !== root_2) {
                if (rank[root_1] > rank[root_2]) {
                    parent[root_2] = root_1;
                }
                else if (rank[root_1] < rank[root_2]) {
                    parent[root_1] = root_2;
                }
                else {
                    parent[root_2] = root_1;
                    // ？
                    rank[root_1] += 1;
                }
                count--;
            }
            
            this.count = count;
            this.parent = parent;
            this.rank = rank;
        }

        getCount() {
            const {count} = this;

            return count;
        }
    }

    const m = grid.length,
        n = grid[0].length;
    let unionfind = new Unionfind();

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                grid[i][j] = '0';
            }

            // 上下左右，4个方向。
            const tempIndex = n * i + j;
            if (i - 1 >= 0 && grid[i - 1][j] === '1') {
                unionfind.union(tempIndex, n * (i - 1) + j);
            }
            if (i + 1 < m && grid[i + 1][j] === '1') {
                unionfind.union(tempIndex, n * (i + 1) + j);
            }
            if (j - 1 >= 0 && grid[i][j - 1] === '1') {
                unionfind.union(tempIndex, n * i + (j - 1));
            }
            if (j + 1 < n && grid[i][j + 1] === '1') {
                unionfind.union(tempIndex, n * i + (j + 1));
            }
        }
    }

    return unionfind.getCount();
}
```

# 四 资源分享 & 更多
### 1 历史文章 - 总览
![历史文章 - 总览](https://files.mdnice.com/user/6999/e3ef7bb9-c5fc-4b61-bc7d-c2614e26b416.png)
![历史文章 - 总览](https://files.mdnice.com/user/6999/11de2d11-4c85-4c57-90a0-90b5901495cc.png)

|  文章名称  |  解法  |  阅读量  |
|  ----  |  ----  |  ----  |
| [1. 两数之和（Two Sum）](https://www.nowcoder.com/discuss/694669)  |  共 3 种  |  2.7 k+  |
| [2. 两数相加 （Add Two Numbers）](https://www.nowcoder.com/discuss/694670)  |  共 4 种  |  2.7 k+  |
| [3. 无重复字符的最长子串（Longest Substring Without Repeating Characters）](https://www.nowcoder.com/discuss/694672)  |  共 3 种  |  2.6 k+  |
| [4. 寻找两个正序数组的中位数（Median of Two Sorted Arrays）](https://www.nowcoder.com/discuss/694678)  |  共 3 种  |  2.8 k+  |
| [5. 最长回文子串（Longest Palindromic Substring）](https://www.nowcoder.com/discuss/698291)  |  共 4 种  |  2.8 k+  |
| [6. Z 字形变换（ZigZag Conversion）](https://www.nowcoder.com/discuss/700500)  |  共 2 种  |  1.9 k+  |
| [7. 整数反转（Reverse Integer）](https://www.nowcoder.com/discuss/700970)  |  共 2 种  |  2.4 k+  |
| [8. 字符串转换整数 (atoi)（String to Integer (atoi)）](https://www.nowcoder.com/discuss/703073)  |  共 3 种  |  4.2 k+  |
| [9. 回文数（Palindrome Number）](https://www.nowcoder.com/discuss/707310)  |  共 3 种  |  4.3 k+  |
|    |    |    |
| [11. 盛最多水的容器（Container With Most Water）](https://www.nowcoder.com/discuss/707799)  |  共 5 种  |  4.0 k+  |
| [12. 整数转罗马数字（Integer to Roman）](https://www.nowcoder.com/discuss/714981)  |  共 3 种  |  3.2 k+  |
| [13. 罗马数字转整数（Roman to Integer）](https://www.nowcoder.com/discuss/715379)  |  共 3 种  |  3.8 k+  |
| [14. 最长公共前缀（Longest Common Prefix）](https://www.nowcoder.com/discuss/717512)  |  共 4 种  |  3.0 k+  |
| [15. 三数之和（3Sum）](https://www.nowcoder.com/discuss/723145)  |  共 3 种  |  60.7 k+  |
| [16. 最接近的三数之和（3Sum Closest）](https://www.nowcoder.com/discuss/724097)  |  共 3 种  |  4.7 k+  |
| [17. 电话号码的字母组合（Letter Combinations of a Phone Number）](https://www.nowcoder.com/discuss/724373)  |  共 3 种  |  3.1 k+  |
| [18. 四数之和（4Sum）](https://www.nowcoder.com/discuss/729584)  |  共 4 种  |  11.5 k+  |
| [19. 删除链表的倒数第 N 个结点（Remove Nth Node From End of List）](https://www.nowcoder.com/discuss/732151)  |  共 4 种  |  1.2 k+  |
| [20. 有效的括号（Valid Parentheses）](https://www.nowcoder.com/discuss/743116)  |  共 2 种  |  1.8 k+  |
|    |    |    |
| [21. 合并两个有序链表（Merge Two Sorted Lists）](https://www.nowcoder.com/discuss/756174)  |  共 3 种  |  1.2 k+  |
| [22. 括号生成（Generate Parentheses）](https://www.nowcoder.com/discuss/763914)  |  共 4 种  |  1.1 k+  |
| [23. 合并K个升序链表（Merge k Sorted Lists）](https://www.nowcoder.com/discuss/765397)  |  共 4 种  |  0.9 k+  |
| [24. 两两交换链表中的节点（Swap Nodes in Pairs）](https://www.nowcoder.com/discuss/772985)  |  共 3 种  |  0.5 k+  |
| [25. K 个一组翻转链表（Reverse Nodes in k-Group）](https://www.nowcoder.com/discuss/772990)  |  共 5 种  |  1.3 k+  |
| [26. 删除有序数组中的重复项（Remove Duplicates from Sorted Array）](https://www.nowcoder.com/discuss/776495)  |  共 4 种  |  1.3 k+  |
| [27. 移除元素（Remove Element）](https://www.nowcoder.com/discuss/777291)  |  共 4 种  |  0.4 k+  |
| [28. 实现 strStr()（Implement strStr()）](https://www.nowcoder.com/discuss/782696)  |  共 5 种  |  0.8 k+  |
| [29. 两数相除（Divide Two Integers）](https://www.nowcoder.com/discuss/792278)  |  共 4 种  |  0.6 k+  |
| [30. 串联所有单词的子串（Substring with Concatenation of All Words）](https://www.nowcoder.com/discuss/799063)  |  共 3 种  |  0.6 k+  |
|    |    |    |
| [31. 下一个排列（Next Permutation）](https://www.nowcoder.com/discuss/809149)  |  共 2 种  |  0.8 k+  |
| [32. 最长有效括号（Longest Valid Parentheses）](https://www.nowcoder.com/discuss/813508)  |  共 2 种  |  1.4 k+  |
| [33. 搜索旋转排序数组（Search in Rotated Sorted Array）](https://www.nowcoder.com/discuss/816990)  |  共 3 种  |  1.0k+  |
| [34. 在排序数组中查找元素的第一个和最后一个位置（Find First and Last Position of Element in Sorted Array）](https://www.nowcoder.com/discuss/817432)  |  共 3 种  |  0.5 k+  |
| [35. 搜索插入位置（Search Insert Position）](https://www.nowcoder.com/discuss/820192)  |  共 3 种  |  0.3 k+  |
| [36. 有效的数独（Valid Sudoku）](https://www.nowcoder.com/discuss/823293)  |  共 1 种  |  0.6 k+  |
| [38. 外观数列（Count and Say）](https://www.nowcoder.com/discuss/829005)  |  共 5 种  |  1.1 k+  |
| [39. 组合总和（Combination Sum）](https://www.nowcoder.com/discuss/829181)  |  共 3 种  |  1.4 k+  |
| [40. 组合总和 II（Combination Sum II）](https://www.nowcoder.com/discuss/829482)  |  共 2 种  |  1.6 k+  |
|    |    |    |
| [41. 缺失的第一个正数（First Missing Positive）](https://www.nowcoder.com/discuss/830694)  |  共 3 种  |  1.2 k+  |
| [53. 最大子数组和（Maximum Subarray）](https://www.nowcoder.com/discuss/960689)  |  共 3 种  |  0.3k+  |
| [88. 合并两个有序数组（Merge Sorted Array）](https://www.nowcoder.com/discuss/964446)  |  共 3 种  |  0.4 k+  |
| [102. 二叉树的层序遍历（Binary Tree Level Order Traversal）](https://www.nowcoder.com/discuss/963081)  |  共 3 种  |  0.4 k+  |
| [146. LRU 缓存（LRU Cache）](https://www.nowcoder.com/discuss/953216)  |  共 2 种  |  0.5 k+  |
| [160. 相交链表（Intersection of Two Linked Lists）](https://www.nowcoder.com/discuss/967316)  |  共 2 种  |  0.1 k+  |
| [200. 岛屿数量（Number of Islands）](https://www.nowcoder.com/discuss/967192)  |  共 4 种  |  0.1 k+  |
| [206. 反转链表（Reverse Linked List）](https://www.nowcoder.com/discuss/952847)  |  共 3 种  |  1.0 k+  |
| [215. 数组中的第K个最大元素（Kth Largest Element in an Array）](https://www.nowcoder.com/discuss/956928)  |  共 3 种  |  0.5 k+  |
| [236. 二叉树的最近公共祖先（Lowest Common Ancestor of a Binary Tree）](https://www.nowcoder.com/discuss/964696)  |  共 3 种  |  0.1 k+  |
| [2119. 反转两次的数字（A Number After a Double Reversal）](https://www.nowcoder.com/discuss/867972)  |  共 2 种  |  0.3 k+  |
| [2120. 执行所有后缀指令（Execution of All Suffix Instructions Staying in a Grid）](https://www.nowcoder.com/discuss/846814)  |  共 1 种  |  0.4 k+  |
| [2124. 检查是否所有 A 都在 B 之前（Check if All A's Appears Before All B's）](https://www.nowcoder.com/discuss/841288)  |  共 4 种  |  0.4 k+  |
| [2125. 银行中的激光束数量（Number of Laser Beams in a Bank）](https://www.nowcoder.com/discuss/840968)  |  共 3 种  |  0.3 k+  |
| [2126. 摧毁小行星（Destroying Asteroids）](https://www.nowcoder.com/discuss/834640)  |  共 2 种  |  1.6 k+  |
| [2129. 将标题首字母大写（Capitalize the Title）](https://www.nowcoder.com/discuss/832690)  |  共 2 种  |  0.6 k+  |
| [2130. 链表最大孪生和（Maximum Twin Sum of a Linked List）](https://www.nowcoder.com/discuss/832131)  |  共 2 种  |  0.6 k+  |
| [2133. 检查是否每一行每一列都包含全部整数（Check if Every Row and Column Contains All Numbers）](https://www.nowcoder.com/discuss/830828)  |  共 1 种  |  0.6 k+  |

![刷题进度 - LeetCode：578 / 2722 、《剑指offer》：66 / 66 ](https://files.mdnice.com/user/6999/e19461e7-4989-4d94-bdee-5f593351ac56.png)

### 2 博主简介
码农三少 ，一个致力于编写 **极简、但齐全题解（算法**） 的博主。
专注于 **一题多解、结构化思维** ，欢迎一起刷穿 LeetCode ~
