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