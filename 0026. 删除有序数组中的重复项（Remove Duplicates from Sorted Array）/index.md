# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（26）删除有序数组中的重复项

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/0e66deef-ac87-414e-9862-d2a2df929bac.png)
![题目描述](https://files.mdnice.com/user/6999/e434b3bb-a7bb-4d6f-99c1-dada65ec7f6d.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/f5e17f79-aa49-4e4a-97fb-630c086b5f5f.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “Set集合去重法”。
// 技巧：涉及“映射、数量、重复性（即去重）、唯一性（即次数）等”可优先考虑hash（JS里对应的是 map数据结构）。

// 步骤：
// 1）状态初始化（使用 Map 数据结构辅助“去重”的实现）。
// 2）遍历 nums ，将未存放入 map 的数值存放入 map 中。
// 3）遍历 map（特性：遍历顺序就之前所存放的顺序） ，依次重置 nums[index] （index从0开始自增） 的值。
// 4）注意：需要删除后续多余的值。
// 5）返回结果 nums.length 。
var removeDuplicates = function(nums) {
    // 1）状态初始化（使用 Map 数据结构辅助“去重”的实现）。
    const l = nums.length;
    let index = 0,
        map = new Map();
        
    // 2）遍历 nums ，将未存放入 map 的数值存放入 map 中。
    while (index < l) {
        if (!map.has(nums[index])) {
            map.set(nums[index], 1);
        }
        index++;
    }

    // 3）遍历 map（特性：遍历顺序就之前所存放的顺序） ，依次重置 nums[index] （index从0开始自增） 的值。
    index = 0;
    for (const [key, val] of map) {
        nums[index] = key;
        index++;
    }

    // 4）注意：需要删除后续多余的值。
    nums.splice(index);

    // 5）返回结果 nums.length 。
    return nums.length;
}
```

### 2 方案2
1)代码：
```js
// 方案2 使用 JS 自带的数组元素删除函数 —— splice 。

// 思路：
// 1）循环、遍历处理。
// 注意：这里循环的条件是 i < nums.length （而且 nums.length 是不断变化的）。
// 2.1）deleteNum：从 下标i 开始需要删除多少个元素 —— nums.lastIndexOf(nums[i]) - nums.indexOf(nums[i])。
// 2.2）核心：循环体内调用 nums.splice(i, deleteNum) 。
// 3）返回结果 nums.length 。
var removeDuplicates = function(nums) {
    // 1）循环、遍历处理。
    // 注意：这里循环的条件是 i < nums.length （而且 nums.length 是不断变化的）。
    for(let i = 0; i < nums.length; i++){
        // 2.1）deleteNum：从 下标i 开始需要删除多少个元素 —— nums.lastIndexOf(nums[i]) - nums.indexOf(nums[i])。
        const deleteNum = nums.lastIndexOf(nums[i]) - nums.indexOf(nums[i]);
        // 2.2）核心：循环体内调用 nums.splice(i, deleteNum) 。
        nums.splice(i, deleteNum);
    }

    // 3）返回结果 nums.length 。
    return nums.length;
};
```

### 3 方案3
1)代码：
```js
// 方案3 “双指针”。

// 思路：
// 1）初始化：“快（fast）、慢（slow）” 2个指针均指向 下标0 。
// 2）当 “快指针” 没有走到尾时，根据不同情况进行处理。
// 2.1）若 当前 “快、慢”指针 所指向的数值一样（nums[slow] === nums[fast]），则 往后拉“快指针”（fast++） 即可。
// 2.2）若 当前 “快、慢”指针 所指向的数值 不一样，则 将当前的“快指针”值 赋给 slow往后一个位值的值 （nums[slow + 1] = nums[fast]）。
// “慢指针”往后一个位置（slow++）。
// 3）返回结果 slow + 1 （因为 slow指向下标，但这里返回数组长度，故需 加1 ）。
var removeDuplicates = function(nums) {
    // 1）初始化：“快（fast）、慢（slow）” 2个指针均指向 下标0 。
    const l = nums.length;
    let slow = fast = 0;

    // 2）当 “快指针” 没有走到尾时，根据不同情况进行处理。
    while (fast < l) {
        // 2.1）若 当前 “快、慢”指针 所指向的数值一样（nums[slow] === nums[fast]），则 往后拉“快指针”（fast++） 即可。
        if (nums[slow] === nums[fast]) {
            fast++;
        }
        // 2.2）若 当前 “快、慢”指针 所指向的数值 不一样，则 将当前的“快指针”值 赋给 slow往后一个位值的值 （nums[slow + 1] = nums[fast]）。
        // “慢指针”往后一个位置（slow++）。
        else {
            nums[slow + 1] = nums[fast];
            slow++;
        }
    }

    // 3）返回结果 slow + 1 （因为 slow指向下标，但这里返回数组长度，故需 加1 ）。
    return slow + 1;
}
```

### 4 方案4
1)代码：
```js
// 方案4 “LeetCode官方的题解”。
// 参考：
// 1）https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/solution/shan-chu-pai-xu-shu-zu-zhong-de-zhong-fu-tudo/

// 思路：
// 1）边界：入参为 [] 时。直接 return 0; 。
// 2）初始化：“快（fast）、慢（slow）” 2个指针均指向 下标1 。
// 3）核心处理：其实最关键的进行跟 nums[fast] 和 nums[fast - 1] 是否相等进行不同的处理！
// 4）返回结果 slow 。
var removeDuplicates = function(nums) {
    const l = nums.length;
    // 注意：下面3行可以去掉，当传入 [] ，此时返回 slow = 1 时也能通过。
    // 不过官方可能是为了编程的严谨性，然后给加上的。
    // 1）边界：入参为 [] 时。直接 return 0; 。
    if (l === 0) {
        return 0;
    }

    // 2）初始化：“快（fast）、慢（slow）” 2个指针均指向 下标1 。
    let fast = 1, slow = 1;
    // 3）核心处理：其实最关键的进行跟 nums[fast] 和 nums[fast - 1] 是否相等进行不同的处理！
    while (fast < l) {
        if (nums[fast] !== nums[fast - 1]) {
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }

    // 4）返回结果 slow 。
    return slow;
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