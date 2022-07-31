# 零 标题：算法（leetcode，附思维导图 + 全部解法）300题之（88）合并两个有序数组

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/59b43d3c-299f-4c3f-8cc2-f61e15f3251a.png)
![题目描述](https://files.mdnice.com/user/6999/3ded0ef2-3380-4d8a-bc8e-5a2d407297b6.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/a0c579f6-f793-45f3-9d54-132683ba9c36.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “自己。（无视题目要求）”。

// 思路：
// 1）状态初始化预处理 nums1（即 nums1.splice(m) ） 和 nums2（即 nums2.splice(n) ） 。
// 该操作均使得 nums1、nums2 发生改变，改变原数组！！
// 2）合并：将 nums2 并入 nums1 中。
// 3）返回结果：将 nums1 升序并返回。
var merge = function(nums1, m, nums2, n) {
    // 1）状态初始化预处理 nums1（即 nums1.splice(m) ） 和 nums2（即 nums2.splice(n) ） 。
    // 该操作均使得 nums1、nums2 发生改变，改变原数组！！
    nums1.splice(m);
    nums2.splice(n);
    
    // 2）合并：将 nums2 并入 nums1 中。
    nums1.push(...nums2);
    
    // 3）返回结果：将 nums1 升序并返回。
    return nums1.sort((a,b) => a-b);
};
```

### 2 方案2
1)代码：
```js
// 方案2 “自己。双指针 + 额外数组法”。
// 技巧：“既然要求时间复杂度为 O(m + n)，那么我们可以通过 空间 来换 时间”。

// 思路：
// 1）状态初始化：nums1Index = 0, nums2Index = 0, sortedList = [] 。

// 2）循环处理，条件为 nums1Index < m && nums2Index < n 。
// 2.1）若 nums1Val <= nums2Val ，则 sortedList.push(nums1Val); nums1Index++ 。
// 2.2）若 nums1Val > nums2Val ，则 sortedList.push(nums2Val); nums2Index++ 。

// 3）边界：可能有一边还有剩余，将它们放入 sortedList 中。

// 4）遍历 sortedList ，依次覆盖 nums1 上的值。
var merge = function(nums1, m, nums2, n) {
    // 1）状态初始化：nums1Index = 0, nums2Index = 0, sortedList = [] 。
    let nums1Index = 0,
        nums2Index = 0,
        sortedList = [];

    // 2）循环处理，条件为 nums1Index < m && nums2Index < n 。
    while (nums1Index < m && nums2Index < n) {
        const nums1Val = nums1[nums1Index],
            nums2Val = nums2[nums2Index];
        
        // 2.1）若 nums1Val <= nums2Val ，则 sortedList.push(nums1Val); nums1Index++ 。
        if (nums1Val <= nums2Val) {
            sortedList.push(nums1Val);
            nums1Index++;
        }
        // 2.2）若 nums1Val > nums2Val ，则 sortedList.push(nums2Val); nums2Index++ 。
        else {
            sortedList.push(nums2Val);
            nums2Index++;
        }
    }

    // 3）边界：可能有一边还有剩余，将它们放入 sortedList 中。
    if (nums1Index === m) {
        sortedList.push(...nums2.slice(nums2Index));
    }
    else if (nums2Index === n) {
        sortedList.push(...nums1.slice(nums1Index));
    }

    // 4）遍历 sortedList ，依次覆盖 nums1 上的值。
    for (let i = 0; i < (m + n); i++) {
        nums1[i] = sortedList[i];
    }
}
```

### 3 方案3
1)代码：
```js
// 方案3 “逆向指针法”。
// 参考：
// 1）https://leetcode.cn/problems/merge-sorted-array/solution/he-bing-liang-ge-you-xu-shu-zu-by-leetco-rrb0/

// 思路：
// 1）状态初始化：nums1Index = m - 1, 
// nums2Index = n - 1, fillIndex = m + n - 1 。

// 2）核心：循环处理，条件为 nums1Index >= 0 || nums2Index >= 0 。
// 2.1）若 nums1 已“用完”（即 nums1Index === -1 ），
// 则 fillVal = nums2Val; nums2Index--; 。
// 2.2）若 nums2 已“用完”（即 nums2Index === -1 ），
// 则 fillVal = nums1Val; nums1Index--; 。
// 2.3）若 nums1Val > nums2Val，
// 则 fillVal = nums1Val; nums1Index--; 。
// 2.4）若 nums1Val <= nums2Val，
// 则 fillVal = nums2Val; nums2Index--; 。
// 2.5）nums1[fillIndex] = fillVal; fillIndex--; 。
var merge = function(nums1, m, nums2, n) {
    // 1）状态初始化：nums1Index = m - 1, 
    // nums2Index = n - 1, fillIndex = m + n - 1 。
    let nums1Index = m - 1,
        nums2Index = n - 1,
        fillIndex = m + n - 1;
    
    // 2）核心：循环处理，条件为 nums1Index >= 0 || nums2Index >= 0 。
    while (nums1Index >= 0 || nums2Index >= 0) {
        const nums1Val = nums1[nums1Index],
            nums2Val = nums2[nums2Index];
        let fillVal;
        
        // 2.1）若 nums1 已“用完”（即 nums1Index === -1 ），
        // 则 fillVal = nums2Val; nums2Index--; 。
        if (nums1Index === -1) {
            fillVal = nums2Val;
            nums2Index--
        }
        // 2.2）若 nums2 已“用完”（即 nums2Index === -1 ），
        // 则 fillVal = nums1Val; nums1Index--; 。
        else if (nums2Index === -1) {
            fillVal = nums1[nums1Index];
            nums1Index--;
        }
        // 2.3）若 nums1Val > nums2Val，
        // 则 fillVal = nums1Val; nums1Index--; 。
        else if (nums1Val > nums2Val) {
            fillVal = nums1Val;
            nums1Index--;
        }
        // 2.4）若 nums1Val <= nums2Val，
        // 则 fillVal = nums2Val; nums2Index--; 。
        else {
            fillVal = nums2Val;
            nums2Index--;
        }

        // 2.5）nums1[fillIndex] = fillVal; fillIndex--; 。
        nums1[fillIndex] = fillVal;
        fillIndex--;
    }
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
