# 零 标题：算法（leetcode，附思维导图 + 全部解法）300题之（146）LRU 缓存

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/5a06087c-ee84-4b44-9198-91f75e9a382d.png)
![题目描述](https://files.mdnice.com/user/6999/9871c9b7-1d44-45a3-a242-81cdac870265.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/c654fc5c-0851-45cb-bd85-379e13c2f42c.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “自己。哈希法”。
// 技巧：遇到 O(1) 的get、put操作，优先考虑 哈希表（JS里的Map数据结构）。
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.curCapacity = 0;
    // 注：越是最近使用的key，就越往 map 的后面放！
    this.map = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    const {map} = this;
    let resVal = -1;
    
    // 边界1：get操作，若 已经有该key，
    // 则 先删该key、接着把该key放到map的最后 —— 表示最近使用过该key！
    if (map.has(key)) {
        resVal = map.get(key);
        map.delete(key);
        map.set(key, resVal);
    }
    
    return resVal;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    const {capacity, curCapacity, map} = this;

    // 边界2：put操作，若 已经有该key，
    // 则 先删该key、接着把该key放到map的最后 —— 表示最近使用过该key！
    if (map.has(key)) {
        map.delete(key);
        map.set(key, value);
        return;
    }

    // 边界3：put操作，若 当前已经放不下了（即 curCapacity >= capacity ），
    // 则 删除map的第一个key 且 将新key放到map的最后 —— 表示最近使用过该key！
    if (curCapacity >= capacity) {
        for (const [key, val] of map) {
            map.delete(key);
            break;
        }
        map.set(key, value);
    }
    // 边界4：put操作，若 当前放得下（即 curCapacity < capacity ），
    // 则 直接将新key放到map的最后 —— 表示最近使用过该key 且 this.curCapacity++ 。
    else {
        map.set(key, value);
        this.curCapacity++;
    }
    // 注：以上 5行 ，可以合并成如下 2行 （但为了可读性，可分拆为 if、else 2分支）：
    // }
    // map.set(key, value);
};
```

### 2 方案2
1)代码：
```js
// 方案2 “自己。哈希表 + 双向链表”。
// 参考：
// 1）https://leetcode.cn/problems/lru-cache/solution/146-lru-huan-cun-ji-zhi-by-chen-wei-f-tl1n/

// 思路：
// 1）重点实现 ListNode 和 LRUCache 2个类。
// 2）get、put操作：
// 根据当前情况进行 curCapacity、map、各种节点 的信息变更即可，详见代码的实现。

//双向链表的单个节点
class ListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        //指向后一个节点
        this.next = null;
        //指向前一个节点
        this.prev = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.curCapacity = 0;

        this.map = new Map();

        this.dummyHead = new ListNode();
        this.dummyTail = new ListNode();
        this.dummyHead.next = this.dummyTail;
        this.dummyTail.prev = this.dummyHead;
    }

    get(key) {
        const {map = new Map()} = this,
            node = map.get(key);
        
        // 没找到
        if (!node) {
            return - 1;
        }
        // 找到，将该节点挪到头部，并返回相应的值
        this.moveToHead(node);
        return node.value;
    }

    put(key, value) {
        const {map = new Map()} = this,
            node = map.get(key);
        
        if (!node) {
            // 不存在该节点，则进行节点的创建。
            const newNode = new ListNode(key, value);
            map.set(key, newNode);
            // 加入头结点（addToHead），而不是挪（moveToHead）
            this.addToHead(newNode);
            this.curCapacity++;
            // 边界：超容量了，得删除
            if (this.curCapacity > this.capacity) {
                this.removeLRUItem();
            }
        }
        else {
            // 存在该节点，更新其值 并 将该节点挪到头部
            node.value = value;
            this.moveToHead(node);
        }
    }

    moveToHead(node) {
        //从链表中删除该节点 并 将该节点添加至头结点
        this.removeFromList(node);
        this.addToHead(node);
    }

    // 节点的删除（本质：指针指向的变更）
    removeFromList(node) {
        let nodePre = node.prev,
            nodeNext = node.next;
        
        nodePre.next = nodeNext;
        nodeNext.prev = nodePre;
    }

    // 节点加入链表头部 的指针操作
    addToHead(node) {
        const {dummyHead = null} = this,
            dummyHeadNext = dummyHead.next;

        node.prev = dummyHead;
        node.next = dummyHeadNext;
        dummyHeadNext.prev = node;
        dummyHead.next = node;
        // 注：上面4行代码等价于下面1行（JS的语法糖）
        // [node.prev, node.next, dummyHeadNext.prev, dummyHead.next] = [dummyHead, dummyHeadNext, node, node];
    }

    removeLRUItem() {
        const {dummyTail = null, map = new Map()} = this,
            tailNode = dummyTail.prev;
        
        // 删除尾结点 并更新容量（即 curCapacity ）信息
        this.removeFromList(tailNode);
        map.delete(tailNode.key);
        this.curCapacity--;
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
