# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（23）合并K个升序链表

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/8cced089-9ea9-4c33-9e43-e38d5889ac5e.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/2774d5a1-40d8-4508-8a04-daf2b4f15f10.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “化归思想” —— “不熟悉的 --> 熟悉的”。
// 技巧：若 我们并不知道从 A-->C 的最佳路线、但知道 B-->C 的路线，
// 则 原先的 A-->C 问题就变成了 A-->B 问题。
// 步骤：
// 1）初始化变量。
// 2）遍历所有链表，并将每个节点上的值 存入 数组 resArr 里。
// 3）重排 resArr ，使其变得有序。
// 4）遍历 resArr ，将每个元素存在新链表里。
// 5）返回新链表的头结点。
var mergeKLists = function(lists) {
    // 1）初始化变量。
    const l = lists.length;
    let resArr = [];
    
    // 2）遍历所有链表，并将每个节点上的值 存入 数组 resArr 里。
    for (let i = 0; i < l; i++) {
        let tempHead = lists[i];
        // 2.1）取得每一个链表，不断将它们往后拉 并 存节点值 至 resArr 。
        while (tempHead) {
            resArr.push(tempHead.val);
            tempHead = tempHead.next;
        }
    }

    // 3）重排 resArr ，使其变得有序。
    resArr = resArr.sort((a, b) => a - b);
    
    // 4）遍历 resArr ，将每个元素存在新链表里。
    const resArrLength = resArr.length;
    let index = 1,
        resHead = tempHead = new ListNode(resArr[0]);

    // 边界：若 lists 为[]、[[]] 时，则直接 return null 即可。
    if (resArrLength === 0) {
        return null;
    }
    // 4.1）遍历 resArr ，将当前元素放入 节点 并 往后拉链表。
    while (index < resArrLength) {
        tempHead.next = new ListNode(resArr[index]);
        tempHead = tempHead.next;
        index++;
    }
    
    // 5）返回新链表的头结点。
    return resHead;
};
```

### 2 方案2
1)代码：
```js
// 方案2 “升级版的化归法”。
// 我们之前写过合并2个有序链表。
// 步骤：
// 1）处理边界（其实可以省略，因为核心处理能覆盖）。如 [] 、 [[]] 或 [[1,4,5]] 等。
// 2）核心处理：不断遍历 lists ，每次取其中的2项（l1、l2）、调用 mergeTwoLists 不断将 l1、l2 合并。
// 3）返回结果 resHead（头结点） 。
var mergeKLists = function(lists) {
    // 合并2个有序链表（使用递归）。
    const mergeTwoLists = (l1, l2) => {
        // 1）递归出口。
        if (l1 === null) {
            return l2;
        }
        if (l2 === null) {
            return l1;
        }

        // 2）递归主体。
        // 核心：此时 l1、l2 均不为null。
        const val_1 = l1.val,
            val_2 = l2.val;

        if (val_1 <= val_2) {
            // 2.1）核心：“谁小就需要自己去主动找到自己的下家（即下一个节点 next 值）”。
            l1.next = mergeTwoLists(l1.next, l2);
            // 并将当前小的的节点返回出去 —— 供上层调用 mergeTwoLists 的调用者使用。
            return l1;
        } else {
            // 2.2）核心：“谁小就需要自己去主动找到自己的下家（即下一个节点 next 值）”。
            l2.next = mergeTwoLists(l2.next, l1);
            // 并将当前小的的节点返回出去 —— 供上层调用 mergeTwoLists 的调用者使用。
            return l2;
        }
    }

    const l = lists.length;

    // 1）边界。
    if (l === 0) {
        return null;
    }
    if (l === 1) {
        return lists[0];
    }

    // 2）核心处理：不断遍历 lists ，每次取其中的2项（l1、l2）、调用 mergeTwoLists 不断将 l1、l2 合并。
    // 技巧：数组的“多 变 一” —— 优先考虑 reduce（或 reduceRight） 函数。
    const resHead = lists.reduce((acc, cur) => {
        acc = mergeTwoLists(acc, cur);
        return acc;
    }, null);

    // 3）返回结果 resHead（头结点） 。
    return resHead;
}
```

### 3 方案3
1)代码：
```js
// 方案3 ”N指针法“。通过 24 / 133 ，TODO：写法有问题，待完善~
// 注：此时， N = K 。 
var mergeKLists = function(lists) {
    // 获取下一个节点（即 tempHeadList 里最小值对应的节点）。
    const getNextNodeByTempHeadList = (tempHeadList) => {
        // 边界：当前位于“头结点”为null时，不参与“比较”过程。
        tempHeadList = tempHeadList.filter(item => item !== null);

        // 1）找出目前最小值对应的下标
        const l = tempHeadList.length;
        let index = 0,
            resMinIndex = -1,
            resMinVal = Number.POSITIVE_INFINITY;
        
        while (index < l) {
            const tempVal = tempHeadList[index].val;
            if (tempVal <= resMinVal) {
                resMinVal = tempVal;
                resMinIndex = index;
            }
            index++;
        }

        // 边界：目前最小值对应的下标 为 -1时。
        if (resMinIndex === -1) {
            return [null, []];
        }
        const tempHeadNew = tempHeadList[resMinIndex];
        tempHeadList[resMinIndex] = tempHeadList[resMinIndex].next;

        // 2）返回下一个节点（tempHeadNew） 和 新的tempHeadList。
        return [tempHeadNew, tempHeadList];
    }


    const l = lists.length;
    let tempHeadList = [];

    // 1）遍历 lists ，将每一组的“头结点（非 null 时）”放入 tempHeadList 中，
    // tempHeadList 作为 获取下一个节点（即 tempHeadList 里最小值对应的节点）
    // —— getNextNodeByTempHeadList的输入参数。
    for (let i = 0; i < l; i++) {
        if (lists[i] !== null) {
            tempHeadList.push(lists[i]);
        }   
    }

    let resHead = null,
        tempHead = null;
    while (tempHeadList.length !== 0) {
        const [tempHeadNew, tempHeadListNew] = getNextNodeByTempHeadList(tempHeadList);
        // 边界
        if (tempHeadNew === null) {
            break;
        }
        
        if (resHead === null) {
            resHead = tempHead = tempHeadNew;
        } else {
            tempHead = tempHeadNew;
        }

        tempHead = tempHead.next;
        tempHeadList = tempHeadListNew;
    }

    // 2）返回结果
    return resHead;
}
```

### 4 方案4
1)代码：
```Java
class Solution {
    public ListNode mergeKLists(ListNode[] lists) { 
        int k = lists.length;
        ListNode dummyHead = new ListNode(0);
        ListNode tail = dummyHead;
        while (true) {
            ListNode minNode = null;
            int minPointer = -1;
            for (int i = 0; i < k; i++) {
                if (lists[i] == null) {
                    continue;
                }
                if (minNode == null || lists[i].val < minNode.val) {
                    minNode = lists[i];
                    minPointer = i;
                }
            }
            if (minPointer == -1) {
                break;
            }
            tail.next = minNode;
            tail = tail.next;
            lists[minPointer] = lists[minPointer].next;
        }
        return dummyHead.next;
    }
}

参考：
1）https://leetcode-cn.com/problems/merge-k-sorted-lists/solution/4-chong-fang-fa-xiang-jie-bi-xu-miao-dong-by-sweet/
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