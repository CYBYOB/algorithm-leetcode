# 标题：算法（leetode，附思维导图 + 全部解法）300题之（1）两数之和

# 一 题目描述
![两数之和的题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-5-9/1620527340333-image.png)

# 二 解法总览（思维导图）

![算法（leetode）300题之（1）两数之和【解法思维导图】](https://files.mdnice.com/user/6999/33b3825c-b514-4752-acde-ec4891305ce5.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 不考虑任何复杂度的限制，2层for循环即可
var twoSum = function(nums, target) {
    let l = nums.length;

    // 因为要找2个数，所以 i值最多为 l-2
    for(let i=0; i<l-1; i++) {
        // 因为要找2个数，所以 j值最多为 l-1
        for(let j=i+1; j<l; j++) {
            // 若 当前2个i、j下标 对应的数值相加 正好等于 target，
            // 直接返回当前的 i、j 所组成的数组（因为题目限定必存在唯一答案）
            let sumTmp = nums[i] + nums[j];
            if(sumTmp === target) {
                return [i, j]
            }
        }
    }
};
```

### 2 方案2
1）代码：
```js
// hash法（JS使用 Map数据结构）。“记住，程序 = 数据结构 + 算法”
// 此时，Map是我们的数据结构，具体遍历、判断值等逻辑是我们的算法。
var twoSum = function(nums, target) {
    // 虽然选定了Map结构，但Map是有“key、value”组成
    // 此时我们还需考虑“key、value”的结构（类型值）。
    // 这里 key、value 分别为数组某个具体元素的值、下标
    let l = nums.length,
        m = new Map();

    for(let i=0; i<l; i++) {
        m.set(nums[i], i);
    }

    for(let i=0; i<l-1; i++) {
        let valTmp = target - nums[i],
            idxTmp = m.get(valTmp);
        // 边界：别忘了 2个index 不能相同！（具体为啥大家可以评论区讨论~）
        if(idxTmp !== undefined && i !== idxTmp) {
            return [i, idxTmp];
        }
    }
};
```

### 3 方案3（方案2的优化版）
1）代码：
```js
// 优化的核心：遍历次数从2降到1。

// hash法（JS使用 Map数据结构）。“记住，程序 = 数据结构 + 算法”
// 此时，Map是我们的数据结构，具体遍历、判断值等逻辑是我们的算法。
var twoSum = function(nums, target) {
    // 虽然选定了Map结构，但Map是有“key、value”组成
    // 此时我们还需考虑“key、value”的结构（类型值）。
    // 这里 key、value 分别为数组某个具体元素的值、下标
    let l = nums.length,
        m = new Map();

    for(let i=0; i<l; i++) {
        let valTmp = target - nums[i],
            idxTmp = m.get(valTmp);
        // 边界：别忘了 2个index 不能相同！（具体为啥大家可以评论区讨论~）
        if(idxTmp !== undefined && i !== idxTmp) {
            // 不同：因为1遍遍历，所以下标可能需要调整（因为可能i > idxTmp）
            // 但实际上，其实 [1, 2] 和 [2, 1] 都能通过
            return [i, idxTmp];
        }
        // 优化：下面一行代码不放最前面，因为若当前找到了，就不用再 m.set 了
        m.set(nums[i], i);
    }
};
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
| [206. 反转链表（Reverse Linked List）](https://www.nowcoder.com/discuss/952847)  |  共 3 种  |  1.0 k+  |
| [215. 数组中的第K个最大元素（Kth Largest Element in an Array）](https://www.nowcoder.com/discuss/956928)  |  共 3 种  |  0.5 k+  |
| [236. 二叉树的最近公共祖先（Lowest Common Ancestor of a Binary Tree）](https://www.nowcoder.com/discuss/964696)  |  共 3 种  |  0.1 k+  |

![刷题进度 - LeetCode：527 / 2662 、《剑指offer》：66 / 66 ](https://files.mdnice.com/user/6999/225e837b-a0b7-4cc7-b86d-a77f9bf01367.png)

### 2 博主简介
码农三少 ，一个致力于编写 **极简、但齐全题解（算法**） 的博主。
专注于 **一题多解、结构化思维** ，欢迎一起刷穿 LeetCode ~