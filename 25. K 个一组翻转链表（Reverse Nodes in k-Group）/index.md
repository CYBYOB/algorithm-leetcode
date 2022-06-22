# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（25）K 个一组翻转链表

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/6e471147-894d-4f60-8de6-321f67dd215f.png)
![题目描述](https://files.mdnice.com/user/6999/ab9878f1-e9c1-49c7-9cc0-caca7968b40f.png)
![题目描述](https://files.mdnice.com/user/6999/b304de74-6b98-47f1-b329-619402d6ecac.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/1a464f85-eaa5-407d-9194-b10a082e2a11.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “化归思想” —— “不熟悉的 --> 熟悉的”。
// 技巧：若 我们并不知道从 A-->C 的最佳路线、但知道 B-->C 的路线，
// 则 原先的 A-->C 问题就变成了 A-->B 问题。

// 思路：
// 1）遍历链表，将节点值放入 tempList 。
// 2）遍历 tempList ，K个一组进行翻转、得到 kList，不断将 kList 放入 resList 。
// 3）遍历 resList ，依次将节点值取出并构造出相关的新链表 —— 返回其头结点 resHead 即可。
// 4）返回新链表的头结点 resHead 。
var reverseKGroup = function(head, k) {
    // 1）遍历链表，将节点值放入 tempList 。
    let tempList = [];
    while (head) {
        tempList.push(head.val);
        head = head.next;
    }

    // 2）遍历 tempList ，K个一组进行翻转、得到 kList，不断将 kList 放入 resList 。
    const l = tempList.length;
    let resList = [];
    // 2.1）注意：这里用的是 var ，而不是 let && 循环条件是 i <= i- k 。
    for (var i = 0; i <= l - k; i += k) {
        resList.push(...tempList.slice(i, i + k).reverse());
    }
    // 2.2）边界：可能有剩余，需要继续放入 resList 。
    resList.push(...tempList.slice(i));

    // 3）遍历 resList ，依次将节点值取出并构造出相关的链表 —— 返回其头结点 resHead 即可。
    // 3.1）边界：若 链表长度 小于0 ，则 直接返回 null 。
    if (l < 0) {
        return null;
    }

    // 3.2）普通情况：遍历 resList ，构造出相应的新链表。
    let resHead = tempHead = new ListNode(resList[0]);
    for (let i = 1; i < l; i++) {
        tempHead.next = new ListNode(resList[i]);
        tempHead = tempHead.next;
    }

    // 4）返回新链表的头结点 resHead 。
    return resHead;
};
```

### 2 方案2
1)代码：
```js
// 方案2 “长度为 K 的栈” —— 其实可以算是 方案1的 优化版。
// 技巧：翻转的话，我们可以想到栈 —— 遍历存入栈、然后弹栈，后面就出来 “翻转”效果了。
// 思路：
// 1）resHead = temHead = head; 
// resHead：要返回的。 temHead不断往后拉并将节点值放入 栈stack 。 head：记录本次翻转的开始节点位置。
// 2）不断往后拉动 tempHead （进行核心逻辑的处理，特别是 “边界（不足k个）、翻转（够k个）”的处理）。
// 3）返回结果 resHead 。
var reverseKGroup = function(head, k) {
    // 1）resHead = temHead = head; 
    // resHead：要返回的。 temHead不断往后拉并将节点值放入 栈stack 。 head：记录本次翻转的开始节点位置。
    let resHead = temHead = head,
        tempK = k,
        stack = [];

    // 2）不断往后拉动 tempHead （进行核心逻辑的处理，特别是 “边界（不足k个）、翻转（够k个）”的处理）。
    while (temHead) {
        // 注意：别漏了 && temHead 。
        while (tempK > 0 && temHead) {
            stack.push(temHead.val);
            temHead = temHead.next;
            tempK--;
        }

        // 2.1）边界：说明不需要翻转了，结束所有的流程。
        if (tempK > 0) {
            break;
        }
        // 2.2）此时说明，需要对 k个节点进行翻转，从 head 节点开始。
        if (tempK === 0) {
            while (stack.length > 0) {
                head.val = stack.pop();
                head = head.next;
            }
        }

        // 2.3）下一轮开始之前恢复 tempK 值成 k 。
        tempK = k;
    }

    // 3）返回结果 resHead 。
    return resHead;
}
```

### 3 方案3
1)代码：
```js
// 方案3 “递归”。
// 技巧：“对于 树、链表 这种数据结构的题目，我们基本都可以使用递归处理”。
// 原理：“结构 与 与 算法 相适应，因为递归的本质就是 栈 ，栈的本质是函数。
// 一般来说，处理每一节点都需要调用我们定义好的函数 —— 形如 dfs(某个节点, 其他各种参数)”。
// 思路：
// 1）状态初始化。
// 2）以 k个链表节点(需要保障当前 head 存在) 一组不断遍历，将当前节点存入 栈stack 中。
// 3）判断 栈stack 里面的节点是否需要翻转，并分别进行 不同的处理 。
var reverseKGroup = function(head, k) {
    // 1）状态初始化。
    let resHead = head,
        tempK = k,
        stack = [];

    // 2）以 k个链表节点(需要保障当前 head 存在) 一组不断遍历，将当前节点存入 栈stack 中。
    while (head && tempK > 0) {
        stack.push(head);
        head = head.next;
        tempK--;
    }

    // 3）判断 栈stack 里面的节点是否需要翻转，并分别进行 不同的处理 。
    // 3.1）若 tempK > 0，则 说明个数不够、无序翻转，直接返回 传入的头结点 即可。
    // 注意：这里不能返回 head ，因为 遍历时拉动了 head 。而 resHead = head 后，没有动 resHead 。
    if (tempK > 0) {
        return resHead;
    }

    // 3.2）若 tempK === 0，则 进行翻转。
    else {
        let tempHead = null;
        resHead = tempHead = stack.pop();

        // 3.2.1）翻转里面的 链表 节点。
        while (stack.length > 0) {
            const nextNode =  stack.pop();
            tempHead.next = nextNode;
            tempHead = tempHead.next;
        }
        
        // 3.2.2）此时最开始的头结点需指向 reverseKGroup(head, k) 。
        tempHead.next = reverseKGroup(head, k);

        // 3.2.3）返回结果节点 resHead 。
        return resHead;
    }
}
```

### 4 方案4
1)代码：
```js
方案4 “迭代”。
// TODO：比较难，待实现。到时统一更新至：
// 1）VX公众号 “码农三少” 。
// 2）GitHub：https://github.com/CYBYOB/algorithm-leetcode 。
const myReverse = (head, tail) => {

}
```

### 5 方案5
1)代码：
```js
// 方案5 LeetCode官方。
// 参考：
// 1）https://leetcode-cn.com/problems/reverse-nodes-in-k-group/solution/k-ge-yi-zu-fan-zhuan-lian-biao-by-leetcode-solutio/
const myReverse = (head, tail) => {
    let prev = tail.next;
    let p = head;
    while (prev !== tail) {
        const nex = p.next;
        p.next = prev;
        prev = p;
        p = nex;
    }
    return [tail, head];
}
var reverseKGroup = function(head, k) {
    const hair = new ListNode(0);
    hair.next = head;
    let pre = hair;

    while (head) {
        let tail = pre;
        // 查看剩余部分长度是否大于等于 k
        for (let i = 0; i < k; ++i) {
            tail = tail.next;
            if (!tail) {
                return hair.next;
            }
        }
        const nex = tail.next;
        [head, tail] = myReverse(head, tail);
        // 把子链表重新接回原链表
        pre.next = head;
        tail.next = nex;
        pre = tail;
        head = tail.next;
    }
    return hair.next;
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