# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（18）四数之和

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630132357344-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-29/1630222548251-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%8818%EF%BC%89%E5%9B%9B%E6%95%B0%E4%B9%8B%E5%92%8C.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “暴力”。
// 先排序，再4层for循环、穷举所有的可能。
// 超时，通过 282 / 286 。
var fourSum = function(nums, target) {
    const l = nums.length;
    
    // 1）排序。
    nums = nums.sort((a, b) => a - b);

    // 2）状态初始化。
    let map = new Map(),
        resArr = [];

    // 3）核心：4层for循环、穷举所有的可能。
    for (let i = 0; i < l-3; i++) {
        for (let j = i + 1; j < l-2; j++) {
            for (let k = j + 1; k < l-1; k++) {
                for (let z = k + 1; z < l; z++) {
                    const tempSum = nums[i] + nums[j] + nums[k] + nums[z],
                        tempStr = [nums[i], nums[j], nums[k], nums[z]].join('#');
                    
                    // 3.1）判断“当前4个数组合的和” 是否等于 target 且 之前没有存储过。
                    if (tempSum === target && !map.has(tempStr)) {
                        resArr.push([nums[i], nums[j], nums[k], nums[z]]);
                        map.set(tempStr, 1);
                    }
                }
            }
        }
    }

    // 4）返回结果 resArr 。
    return resArr;
};
```

### 2 方案2
1)代码：
```js
// 方案2 “方案1的优化版”。
// 原先的4层for循环 --> 2层for循环 + 双指针 。
// 技巧：“有序胜过无序”。
// 通过sort方法（时间复杂度仅为 O(nlogn)）将无序的数组变有序是一件很划算的事情。
// 要想使用双指针等，必须先排序、使其变有序。
var fourSum = function(nums, target) {
    const l = nums.length;
    
    // 1）排序。
    nums = nums.sort((a, b) => a - b);

    // 2）状态初始化。
    let map = new Map(),
        resArr = [];

    // 3）核心：2层for循环 + 双指针 。
    for (let i = 0; i < l-3; i++) {
        for (let j = i + 1; j < l-2; j++) {
            let left = j + 1,
                right = l-1;
            
            while (left < right) {
                const tempSum = nums[i] + nums[j] + nums[left] + nums[right],
                    tempStr = [nums[i], nums[j], nums[left], nums[right]].join('#');

                // 3.1）判断“当前4个数组合的和” 是否等于 target 且 之前没有存储过。
                if (tempSum === target) {
                    if (!map.has(tempStr)) {
                        resArr.push([nums[i], nums[j], nums[left], nums[right]]);
                        map.set(tempStr, 1);
                    }

                    // 3.2）核心：若 tempSum === target ，
                    // 则下一次的可能结果必须得让 left、right 各往中间至少走一步，不然组合必重复！
                    left++;
                    right--;
                } else if (tempSum < target){
                    left++;
                } else {
                    right--;
                }
            }
        }
    }

    // 4）返回结果 resArr 。
    return resArr;
};
```

### 3 方案3
1)代码：
```js
// 方案3 回溯（说白了、说穿了，就是递归。因为一般用递归实现回溯）。
// 本质：跟4层for循环差不多，可能的区别会体现在代码的可读性上。
// 超时，通过 268 / 286 。
var fourSum = function(nums, target) {
    // 技巧：永远记住，递归 = 递归出口（为了不陷入无线递归的死循环） + 递归主体（一般会变更一些参数后，在调用函数本身）。
    // 一般 递归出口 放前面， 递归主体 放后面。
    // 1）递归
    const dfs = (index, l, curArr, resArr, nums, target) => {
        const curLength = curArr.length;
        // 1.1）递归出口。
        // 边界：是 index > l ，而不是 index >= l（这样会遗漏答案，case：[1,0,-1,0,-2,2] 0 ）。
        if (index > l || curLength > 4) {
            return;
        }

        // 1.2）递归主体
        if (curLength === 4) {
            const tempSum = curArr.reduce((acc, cur) => {
                acc += cur;
                return acc;
            }, 0),
                tempStr = curArr.join('#');
            
            // 判断“当前4个数组合的和” 是否等于 target 且 之前没有存储过。
            if (tempSum === target) {
                if (!map.has(tempStr)) {
                    resArr.push(curArr.slice());
                    map.set(tempStr, 1);
                }
            }
        } else if (curLength < 4) {
            // 技巧：回溯的核心 = 选 + 不选 。
            // 1.2.1）选
            curArr.push(nums[index]);
            dfs(index + 1, l, curArr, resArr, nums, target);
            // 1.2.1）不选
            curArr.pop();
            dfs(index + 1, l, curArr, resArr, nums, target);
        }
    };

    // 2）排序。
    nums = nums.sort((a, b) => a - b);

    // 3）状态初始化。
    const l = nums.length;
    let index = 0,
        map = new Map(),
        curArr = [],
        resArr = [];

    // 4）调用 回溯函数 —— dfs递归。
    dfs(index, l, curArr, resArr, nums, target);

    // 5）返回结果 resArr 。
    return resArr;
}
```

### 4 方案4
1)代码：
```js
// 方案4 “方案3（回溯）的优化版” —— 剪枝。
// TODO：暂时想不出，跳过。
// case：[-477,-476,-471,-462,-440,-400,-398,-394,-394,-393,-389,-386,-350,-346,-338,-315,-273,-249,-182,-172,-166,-161,-149,-116,-112,-109,-100,-73,-33,-26,-22,-11,6,8,13,19,56,78,101,102,111,140,155,158,181,205,211,225,232,242,254,265,281,308,310,320,320,364,366,381,385,387,443,496,496]
// 1236
var fourSum = function(nums, target) {
    // TODO：暂时想不出，跳过。
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