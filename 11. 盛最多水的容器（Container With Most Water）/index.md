# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（11）盛最多水的容器

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-14/1628933655308-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-14/1628933692526-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-14/1628933737153-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%8811%EF%BC%89%E7%9B%9B%E6%9C%80%E5%A4%9A%E6%B0%B4%E7%9A%84%E5%AE%B9%E5%99%A8.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
var maxArea = function(height) {
    const l = height.length;
    let resMax = Number.NEGATIVE_INFINITY;

    for (let left = 0; left < l-1; left++) {
        for (let right = left + 1; right < l; right++) {
            // 核心：能盛的水容量 = min(左边的高度, 右边的高度) * (左、右的间隔距离)
            const tempVal = Math.min(height[left], height[right]) * (right - left);
            resMax = Math.max(resMax, tempVal);
        }
    }

    return resMax;
}
```

### 2 方案2
1)代码：
```js
var maxArea = function(height) {
    const l = height.length;
    // 1）left = 0、right = l - 1 从2端开始（先保证 它们的间隔尽可能的大）往中间循环缩
    let left = 0,
        right = l - 1,
        resMax = Number.NEGATIVE_INFINITY;

    // 1.1）循环条件：left < right
    while (left < right) {
        // 2）然后 求得当前的面积 tempVal ，更新结果：resMax = Math.max(resMax, tempVal);
        const tempVal = Math.min(height[left], height[right]) * (right - left);
        resMax = Math.max(resMax, tempVal);

        // 3）核心：接着，若 height[left] <= height[right] 则 left++; 否则 right--;
        if (height[left] <= height[right]) {
            left++;
        } else {
            right--;
        }
    }

    // 4）最后返回结果
    return resMax;
}
```

### 3 方案3
1)代码：
```js
var maxArea = function(height) {
    const l = height.length;
    // 1）初始化，dp[i][j] = 0, if i范围在[0, l-1] && j范围在[0, l-1]
    const dp = Array(l).fill(0).map(item => Array(l).fill(0));

    // 1.1）初始化。dp[i][j] = min(height[i][j]) * 1, if j -i == 1（即i、j间隔距离为1）。
    for (let i = 0; i < l - 1; i++) {
        const j = i+1;
        dp[i][j] = Math.min(height[i], height[j]);
    }

    // 2）开始状态转移。需注意循环的边界~
    // 核心：
    // dp[i][j] = Math.max(
    //     Math.min(height[i], height[j]) * tempL,
    //     dp[i + 1][j],
    //     dp[i][j - 1]
    // );
    for (let tempL = 2; tempL < l; tempL++) {
        for (let i = 0; i < l - tempL; i++) {
            const j = i + tempL;

            dp[i][j] = Math.max(
                Math.min(height[i], height[j]) * tempL,
                dp[i + 1][j],
                dp[i][j - 1]
            );
        }
    }

    // 3）根据DP的 状态定义 和 状态转移方程，知 dp[0][l-1] 就是答案
    return dp[0][l-1];
}
```

### 4 方案4
1)代码：
```js
var maxArea = function(height) {
    const l = height.length;
    // 1）初始化，dp[i][j] = 0, if i范围在[0, l-1] && j范围在[0, l-1]
    const dp = Array(l).fill(0).map(item => Array(l).fill(0));

    // 1.1）初始化。dp[i][j] = min(height[i][j]) * 1, if j -i == 1（即i、j间隔距离为1）。
    for (let i = 0; i < l - 1; i++) {
        const j = i+1;
        dp[i][j] = Math.min(height[i], height[j]);
    }

    // 2）开始状态转移。需注意循环的边界~
    // 核心：
    // dp[i][j] = Math.max(
    //     Math.min(height[i], height[j]) * tempL,
    //     dp[i + 1][j],
    //     dp[i][j - 1]
    // );
    for (let tempL = 2; tempL < l; tempL++) {
        for (let i = 0; i < l - tempL; i++) {
            const j = i + tempL;
            // 2.1）优化：增加剪枝的处理
            const tempVal = (height[i] <= height[j]) ? (dp[i + 1][j]) : (dp[i][j - 1]);

            dp[i][j] = Math.max(
                Math.min(height[i], height[j]) * tempL,
                tempVal
            );
        }
    }

    // 3）根据DP的 状态定义 和 状态转移方程，知 dp[0][l-1] 就是答案
    return dp[0][l-1];
}
```

### 5 方案5
1)代码：
```js
var maxArea = function(height) {
    // 1）定义递归函数
    const dfs = (height, i, j) => {
        // 递归的2大部分 —— 递归出口 + 递归函数体
        // 1.1）递归出口。当i、j柱子间隔为1就是出口
        if (j - i === 1) {
            return Math.min(height[i], height[j]);
        }

        // 1.2）函数体。
        const tempVal1 = Math.min(height[i], height[j]) * (j - i);
        const tempVal2 = height[i] <= height[j]
            ? dfs(height, i + 1, j)  // 左边的柱子i 往右缩
            : dfs(height, i, j - 1); // 右边的柱子j 往左缩
        
        return Math.max(tempVal1, tempVal2);
    }

    // 2）调用递归函数并返回结果
    const l = height.length;
    return dfs(height, 0, l - 1);
}
```

# 四 资源分享 & 更多
### 1 历史文章 - 总览
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

![刷题进度 - LeetCode：535 / 2672 、《剑指offer》：66 / 66 ](https://files.mdnice.com/user/6999/de513ce9-a168-4c0a-8940-81779d59e83b.png)

### 2 博主简介
码农三少 ，一个致力于编写 **极简、但齐全题解（算法**） 的博主。
专注于 **一题多解、结构化思维** ，欢迎一起刷穿 LeetCode ~