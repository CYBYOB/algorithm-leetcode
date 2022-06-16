# 标题：算法（leetode，附思维导图 + 全部解法）300题之（2）两数相加

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-7-24/1627097791820-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-7-24/1627097827561-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-7-24/1627097848398-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-7-24/1627117766083-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E5%92%8C%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%882%EF%BC%89%E4%B8%A4%E6%95%B0%E7%9B%B8%E5%8A%A0.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
var addTwoNumbers = function(l1, l2) {
    // 获取链表所代表的值
    const getValueByLink = (link) => {
        let resVal = 0
            // weight表示当前位置的权重，10的“整幂倍”
            weight = 1;
        while (link) {
            resVal += (link.val * weight);
            // 权重乘10，链表位置往后走
            weight *= 10;
            link = link.next;
        }
        return resVal;
    }

    const val_1 = getValueByLink(l1),
        val_2 = getValueByLink(l2);
    let sum = val_1 + val_2;

    // 根据sum值不断遍历、将相应的位置值放入 curLink 里
    // 若 sum = 807 ，则 resLink = [7, 0, 8]
    const resLink = curLink = new ListNode(sum % 10);
    sum = parseInt(sum/10);
    while (sum) {
        // curLink不断放当前sum值的“个位数值”。sum不断赋成parseInt(sum/10)
        curLink.next = new ListNode(sum % 10);
        curLink = curLink.next;
        // 别错写成 sum /= 10，漏了 parseInt ！！
        sum = parseInt(sum/10);
    }

    return resLink;
}
```

### 2 方案2
1)代码：
```js
var addTwoNumbers = function(l1, l2) {
    let resArr = [],
        // carry 是否有进位（其值范围一定是 [0, 1]）
        carry = 0;

    // 1）不断往后拉2个链表
    while (l1 && l2) {
        resArr.push((l1.val + l2.val + carry) % 10);
        carry = parseInt((l1.val + l2.val + carry) / 10);
        
        l1 = l1.next;
        l2 = l2.next;
    }
    // 2）判断l1、l2 长度情况。谁长就继续“往后拉”谁
    let tmpLink = l1 ? l1 : l2;
    while (tmpLink) {
        resArr.push((tmpLink.val + carry) % 10);
        carry = parseInt((tmpLink.val + carry) / 10);
        tmpLink = tmpLink.next;
    }
    // 3）最后1位可能有进位 —— 需要继续放
    if (carry) {
        resArr.push(carry);
    }
    // 因为 两个非空 的链表，遍历 resArr 将相应位置上的值放到 resLink 即可
    // resLink 是返回的“链表头”，curLink 用于存放“遍历所取到的值”
    let resLink = curLink = new ListNode(resArr[0]),
        i = 1,
        l = resArr.length;
    while (i < l) {
        curLink.next = new ListNode(resArr[i]);
        curLink = curLink.next;
        i++;
    }

    return resLink;
};
```

### 3 方案3（方案2的优化版：不用 resArr 中间变量，直接存链表里、节约内存开销）
1)代码：
```js
var addTwoNumbers = function(l1, l2) {
    let resLink = curLink = null,
        // carry 是否有进位（其值范围一定是 [0, 1]）
        carry = 0;

    // 1）不断往后拉2个链表
    while (l1 && l2) {
        const tmpVal = (l1.val + l2.val + carry) % 10;
        carry = parseInt((l1.val + l2.val + carry) / 10);
        // resLink 为 null，需初始化！
        if (!resLink) {
            resLink = curLink = new ListNode(tmpVal);
        } else {
            curLink.next = new ListNode(tmpVal);
            curLink = curLink.next;
        }
        
        l1 = l1.next;
        l2 = l2.next;
    }
    // 2）判断l1、l2 长度情况。谁长就继续“往后拉”谁
    let tmpLink = l1 ? l1 : l2;
    while (tmpLink) {
        curLink.next = new ListNode((tmpLink.val + carry) % 10);
        curLink = curLink.next;
        carry = parseInt((tmpLink.val + carry) / 10);
        tmpLink = tmpLink.next;
    }
    // 3）最后1位可能有进位 —— 需要继续放
    if (carry) {
        curLink.next = new ListNode(carry);
        curLink = curLink.next;
    }
    
    return resLink;
};
```

### 4 方案4（递归）
1)代码：
```js
var addTwoNumbers = function(l1, l2) {
    // “一般递归的特点”：
    // 1 2种实现 —— dfs（深度优先搜索） 和 bfs（广度优先搜索）
    // 2 3个核心
    // 1）确定返回值得类型及其含义
    // 2）确定递归的出口条件及对应的值
    // 3）递归处理的函数体
    const dfs = (l1, l2, carry) => {
        // 其实可以简写成 if (!l1 && !l2 && !carry)。
        // 1）下面3行是递归出口
        if (l1 === null && l2 === null && carry === 0) {
            return null;
        }

        // 2）下面7-8行是递归处理的函数体
        // 此时必定是 l1、l2或carry中存在“真值”（即有 非null 或 非0 值）
        const val_1 = l1 ? l1.val : 0,
            val_2 = l2 ? l2.val : 0,
            next_1 = l1 ? l1.next : null,
            next_2 = l2 ? l2.next : null,
            sum = (val_1 + val_2 + carry);

        let resLink = new ListNode(sum % 10);
        // 边界：别漏了 parseInt ，别的语言也需可直接 sum/10 ！
        resLink.next = dfs(next_1, next_2, parseInt(sum/10));

        // “本次递归”的返回值
        return resLink;
    }

    return dfs(l1, l2, 0);
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