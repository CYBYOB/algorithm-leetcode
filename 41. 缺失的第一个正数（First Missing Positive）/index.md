# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（41）缺失的第一个正数

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/ade486d5-0b6f-4b3a-b7e6-221c6d3373d1.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/24dfa02a-8e04-455f-a2ce-1cec9d67fc9e.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “无视要求，去重、排序、过滤 - 暴力法”

// 技巧：“有序胜过无序”。
// 通过sort方法（时间复杂度仅为 O(nlogn)）将无序的数组变有序是一件很划算的事情。

// 思路：
// 1）状态初始化。nums 去重、升序排列 并 只保留正整数部分
// 2）遍历 nums 
// 2.1）若 此时 nums[i] 和 resNum 不相等，则 退出循环 
// 2.2）否则 resNum++ 
// 3）返回结果 resNum 
var firstMissingPositive = function(nums) {
    // 1）状态初始化。nums 去重、升序排列 并 只保留正整数部分
    const l = nums.length;
    nums = [...new Set(nums)];
    nums = nums.sort((a, b) => a - b).filter(item => item > 0);
    let resNum = 1;

    // 2）遍历 nums 
    for (let i = 0; i < l; i++) {
        // 2.1）若 此时 nums[i] 和 resNum 不相等，则 退出循环 
        if (nums[i] !== resNum) {
            break;
        }
        // 2.2）否则 resNum++ 
        else {
            resNum++;
        }
    }

    // 3）返回结果 resNum 
    return resNum;
}
```

### 2 方案2
1)代码：
```js
// 方案2 “无视题目要求 - 哈希法（JS里的 Map数据结构 ）”。
// 注：目前实现的 时间、空间复杂度都是 O(n)，不符合题目要求 —— “时间复杂度为 O(n) 并且只使用常数级别额外空间” 。

// 思路：
// 1）状态初始化：map = new Map(), resVal = 1 。
// 2）核心1：遍历 nums 。
// 2.1）若 当前 nums[i] 值大于0（即 为正整数），则 将其放入 map 中。
// 3）核心2：循环，只要此时 resVal 小于 l + 1（注：这里的边界是 l + ，例子：[1]）。
// 3.1）若 此时的resVal 不存在于 map 中，则 退出循环 。
// 3.2）若 此时的resVal 不存在于 map 中，则 退出循环 。
// 4）返回结果 resVal 。
var firstMissingPositive = function(nums) {
    // 1）状态初始化：map = new Map(), resVal = 1 。
    const l = nums.length;
    let map = new Map(),
        resVal = 1;

    // 2）核心1：遍历 nums 。
    for (let i = 0; i < l; i++) {
        // 2.1）若 当前 nums[i] 值大于0（即 为正整数），则 将其放入 map 中。
        const tempVal = nums[i];
        if (tempVal > 0) {
            // 注：这里的 1（可换任何值） 起标记作用、 无意义！
            map.set(tempVal, 1);
        }
    }

    // 3）核心2：循环，只要此时 resVal 小于 l + 1（注：这里的边界是 l + ，例子：[1]）。
    while (resVal < l + 1) {
        // 3.1）若 此时的resVal 不存在于 map 中，则 退出循环 。
        if (!map.has(resVal)) {
            break;
        }
        // 3.2）若 此时的resVal 不存在于 map 中，则 退出循环 。
        else {
            resVal++;
        }
    }

    // 4）返回结果 resVal 。
    return resVal;
}
```

### 3 方案3
1)代码：
```js
// 方案3 “置换法”。
// 参考：
// 1）https://leetcode-cn.com/problems/first-missing-positive/solution/que-shi-de-di-yi-ge-zheng-shu-by-leetcode-solution/

// 思路：
// 1）状态初始化：resVal resVal = l + 1 。
// 2）遍历 nums 。
// 2.1）若 nums[i] 值在 范围 [0, l - 1] 且 nums[nums[i] - 1] 不等于 nums[i]，
// 则 不断（“需循环处理！！”）交换下标 nums[i] - 1 和 i 上的值。
// 3）遍历 nums 。
// 3.1）若 此时的 nums[i] 不等于 i + 1 ，则 resVal 置为 i + 1 并 退出循环处理。
// 4）返回结果 resVal 。
var firstMissingPositive = function(nums) {
    // 1）状态初始化：resVal resVal = l + 1 。
    const l = nums.length;
    let resVal = l + 1;

    // 2）遍历 nums 。
    for (let i = 0; i < l; i++) {
        // 2.1）若 nums[i] 值在 范围 [0, l - 1] 且 nums[nums[i] - 1] 不等于 nums[i]，
        // 则 不断（“需循环处理！！”）交换下标 nums[i] - 1 和 i 上的值。
        while (nums[i] > 0 && nums[i] <= l && nums[nums[i] - 1] !== nums[i]) {
            [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]];
        }
    }

    // 3）遍历 nums 。
    for (let i = 0; i < l; i++) {
        // 3.1）若 此时的 nums[i] 不等于 i + 1 ，则 resVal 置为 i + 1 并 退出循环处理。
        if (nums[i] !== i + 1) {
            resVal = i + 1;
            break;
        }
    }

    // 4）返回结果 resVal 。
    return resVal;
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