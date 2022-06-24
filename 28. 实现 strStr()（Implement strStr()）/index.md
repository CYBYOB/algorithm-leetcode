# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（28）实现 strStr()

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/4b2e2293-7bc5-4447-b96d-34ca6edc879d.png)
![题目描述](https://files.mdnice.com/user/6999/9910a3ec-8807-4700-bc1c-f24950175c70.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/69664ded-f4d0-4714-9dd9-1fe57f3f8295.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “滑动窗口法”

// 思路：
// 1）假定找不到：let resIndex = -1; 。
// 2）遍历-“滑动窗口形式”。不断判断 haystack 中长度为 needleLength 的所有子串是否等于 needle 。
// 注意：循环条件是 i <= (haystackLength - needleLength) ，别漏了 “=” —— 为了case： haystack = "", needle = "" 。
// 2.1）若 当前子串 haystack.substr(i, needleLength) === needle，则 resIndex = i; 并结束循环处理。
// 3）返回结果 resIndex 。
var strStr = function(haystack, needle) {
    // 1）假定找不到：let resIndex = -1; 。
    const haystackLength = haystack.length,
        needleLength = needle.length;
    let resIndex = -1;

    // 2）遍历-“滑动窗口形式”。不断判断 haystack 中长度为 needleLength 的所有子串是否等于 needle 。
    // 注意：循环条件是 i <= (haystackLength - needleLength) ，别漏了 “=” —— 为了case： haystack = "", needle = "" 。
    for (let i = 0; i <= (haystackLength - needleLength); i++) {
        // 2.1）若 当前子串 haystack.substr(i, needleLength) === needle，则 resIndex = i; 并结束循环处理。
        if (haystack.substr(i, needleLength) === needle) {
            resIndex = i;
            break;
        }
    }

    // 3）返回结果 resIndex 。
    return resIndex;
}
```

### 2 方案2
1)代码：
```js
// 方案2 “结合Map数据结构的滑动窗口法 —— 方案1的优化版”。

// 思路：
// 1）初始化：map = new Map(), resIndex = -1。
// 2）遍历 haystack ：若 haystack[i] === needle[0] ，则 将当前对应字符存入 map —— map.set(i, haystack.substr(i, needleLength));。
// 3）遍历 map ：若 当前 val === needle，则 resIndex = key; 并 退出遍历 。
// 4）返回结果 resIndex 。 
var strStr = function(haystack, needle) {
    // 1）初始化：map = new Map(), resIndex = -1。
    const haystackLength = haystack.length,
        needleLength = needle.length;
    let map = new Map(),
        resIndex = -1;
    
    // 边界："a" "" 。只要 needle 为 '' （即长度为 0 ），直接返回 0 。
    if (needleLength === 0) {
        return 0;
    }

    // 2）遍历 haystack ：若 haystack[i] === needle[0] ，则 将当前对应字符存入 map —— map.set(i, haystack.substr(i, needleLength));。
    for (let i = 0; i <= (haystackLength - needleLength); i++) {
        if (haystack[i] === needle[0]) {
            map.set(i, haystack.substr(i, needleLength));
        }
    }

    // 3）遍历 map ：若 当前 val === needle，则 resIndex = key; 并 退出遍历 。
    for (const [key, val] of map) {
        if (val === needle) {
            resIndex = key;
            break;
        }
    }

    // 4）返回结果 resIndex 。 
    return resIndex;
}
```

### 3 方案3
1)代码：
```js
// 方案3 “双指针 —— 本质上，类似 滑动窗口法 ，感兴趣的同学可以写一下”。

// 思路：
// 1）初始化：haystackIndex = 0, needleIndex = 0, resIndex = -1。
// 2）遍历：条件 —— haystackIndex < haystackLength 。
// 2.1）若 此时 haystack[haystackIndex] === needle[needleIndex] ，
// 则 说明当前子串可能可以匹配上。
// 2.1.1）核心：利用“双指针”，判断是否能匹配上。
// 2.1.2）若 此时 needleIndex === needleLength ，则 匹配成功 。
// 此时直接 return haystackIndex; 。
// 2.1.3）若 此时 needleIndex !== needleLength ，则 匹配失败 。
// needleIndex 置为 0，开始新的“外层循环” —— 期待下1次的 haystack[haystackIndex] === needle[needleIndex] 。
// 2.2）若 走到这，则 说明 此时 haystackIndex 开始的子串与needle 匹配失败。
// 将 haystackIndex 往后拉，继续新的循环逻辑处理。
// 3）返回结果 resIndex 。
var strStr = function(haystack, needle) {
    // 1）初始化：haystackIndex = 0, needleIndex = 0, resIndex = -1。
    const haystackLength = haystack.length,
        needleLength = needle.length;
    let haystackIndex = 0,
        needleIndex = 0,
        resIndex = -1;

    // 边界："a" "" 。只要 needle 为 '' （即长度为 0 ），直接返回 0 。
    if (needleLength === 0) {
        return 0;
    }

    // 2）遍历：条件 —— haystackIndex < haystackLength 。
    while (haystackIndex < haystackLength) {
        // 2.1）若 此时 haystack[haystackIndex] === needle[needleIndex] ，
        // 则 说明当前子串可能可以匹配上。
        if (haystack[haystackIndex] === needle[needleIndex]) {
            let haystackIndexTemp = haystackIndex + 1;
            needleIndex = needleIndex + 1;

            // 2.1.1）核心：利用“双指针”，判断是否能匹配上。
            while (haystack[haystackIndexTemp] === needle[needleIndex] && needleIndex < needleLength) {
                haystackIndexTemp++;
                needleIndex++;
            }

            // 2.1.2）若 此时 needleIndex === needleLength ，则 匹配成功 。
            // 此时直接 return haystackIndex; 。
            if (needleIndex === needleLength) {
                return haystackIndex;
            }
            // 2.1.3）若 此时 needleIndex !== needleLength ，则 匹配失败 。
            // needleIndex 置为 0，开始新的“外层循环” —— 期待下1次的 haystack[haystackIndex] === needle[needleIndex] 。
            else { 
                needleIndex = 0;
            }
        }
        // 2.2）若 走到这，则 说明 此时 haystackIndex 开始的子串与needle 匹配失败。
        // 将 haystackIndex 往后拉，继续新的循环逻辑处理。
        haystackIndex++;
    }

    // 3）返回结果 resIndex 。
    return resIndex;
}
```

### 4 方案4
1)代码：
```js
// 方案4 “正则法”。

// 思路：
// 1）构造正则表达式：reg = new RegExp(needle); 。
// 2）根据正则表达式的匹配情况返回结果：
// return haystack.match(reg) !== null ? haystack.match(reg).index : -1;
var strStr = function(haystack, needle) {
    // 1）构造正则表达式：reg = new RegExp(needle); 。
    const reg = new RegExp(needle);
    
    // 2）根据正则表达式的匹配情况返回结果：
    // return haystack.match(reg) !== null ? haystack.match(reg).index : -1;
    return haystack.match(reg) !== null ? haystack.match(reg).index : -1;
}
```

### 5 方案5
1)代码：
```js
// 方案5 “Knuth-Morris-Pratt 算法，即 KMP 算法（TODO：有点复杂，需要理清）”。

// 参考：
// 1）https://leetcode-cn.com/problems/implement-strstr/solution/shi-xian-strstr-by-leetcode-solution-ds6y/
var strStr = function(haystack, needle) {
    // 1）边界处理：needle 长度为 0 时。
    const n = haystack.length, m = needle.length;
    if (m === 0) {
        return 0;
    }

    // 2）核心处理：KMP算法。
    const pi = new Array(m).fill(0);
    for (let i = 1, j = 0; i < m; i++) {
        while (j > 0 && needle[i] !== needle[j]) {
            j = pi[j - 1];
        }
        if (needle[i] == needle[j]) {
            j++;
        }
        pi[i] = j;
    }

    for (let i = 0, j = 0; i < n; i++) {
        while (j > 0 && haystack[i] != needle[j]) {
            j = pi[j - 1];
        }
        if (haystack[i] == needle[j]) {
            j++;
        }
        if (j === m) {
            return i - m + 1;
        }
    }

    // 3）走到这里说明，匹配失败、返回 -1 ！
    return -1;
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