# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（8）字符串转换整数 (atoi)

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-7/1628328547351-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-7/1628328635909-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-7/1628328845731-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-7/1628328966415-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-8/1628408331011-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%888%EF%BC%89%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%BD%AC%E6%8D%A2%E6%95%B4%E6%95%B0%20(atoi).png)


# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 
var myAtoi = function(s) {
    const l = s.length,
        numStrArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    let index = 0,
        // 正、负 情况
        sign = undefined,
        // 结果字符串
        resStr = '';

    // 1）不断去掉前面的 空格字符
    while (index < l && s[index] === ' ') {
        index++;
    }
    
    // 2）去完前面的空格字符后，后面的第一个字符必须是 "+"、"-" 或 数值字符
    // 不是的话直接返回 0 
    if (index < l) {
        if (s[index] === '-' || s[index] === '+' ) {
            sign = s[index];
            resStr += sign;
        } else {
            if (numStrArr.includes(s[index])) {
                resStr += s[index];
            } else {
                return 0;
            }
        }
    }

    // 3）+、- 号确定后，不断往后读取数值字符（若是遇到 非数值字符 就没必要往下读了） 并 不断存入resStr
    index += 1;
    while (index < l && numStrArr.includes(s[index])) {
        resStr += s[index];
        index++;
    }

    let resValue = parseInt(resStr);
    // 边界1："+-12" （核心：只有 +、- 字符等，此时 parseInt(resStr) 为 NaN，即Not A Number）
    resValue = Number.isNaN(resValue) ? 0 : resValue;
    // 边界2：范围的上下界处理
    resValue = resValue < Math.pow(-2, 31) ? Math.pow(-2, 31) : resValue;
    resValue = resValue > Math.pow(2, 31) - 1 ? Math.pow(2, 31) - 1 : resValue;

    // 4）返回最终的结果
    return resValue;
}
```

### 2 方案2
1)代码：
```js
// 方案2 方案1的”优化版“，其实没必要进行 去前面空格字符 等操作，直接使用 JS自带的 parseInt()
var myAtoi = function(str) {
    // 1）直接使用 parseInt() ，其帮我们少了不少“前置处理工作”
    let resValue = parseInt(str);

    // 2）边界处理
    // 边界1："+-12" （核心：只有 +、- 字符等，此时 parseInt(resStr) 为 NaN，即Not A Number）
    if (isNaN(resValue)) {
        return 0;
    } else {
        // 边界2：范围的上下界处理
        resValue = resValue < Math.pow(-2, 31) ? Math.pow(-2, 31) : resValue;
        resValue = resValue > Math.pow(2, 31) - 1 ? Math.pow(2, 31) - 1 : resValue;
    }

    // 3）返回最终的结果
    return resValue;
};
```

### 3 方案3
1)代码：
```js
// 方案3 状态机
var myAtoi = function(str) {
    // 根据当前 字符char，获取要变更为哪个 状态state
    const getStateIndex = char => {
        const numStrArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        // 初始化流转值为 'end' 状态，其实也可以有别的写法
        let resStateIndex = 3;

        if (char === ' ') {
            resStateIndex = 0;
        } else if (char === '+' || char === '-') {
            resStateIndex = 1;
        } else if (numStrArr.includes(char)){
            resStateIndex = 2;
        }

        return resStateIndex;
    };

    // 1）初始化各种值等，特别是 tableMap 的定义！！
    const l = str.length,
        // 状态机的表格形式
        tableMap = {
            'start': ['start', 'signed', 'in_number', 'end'],
            'signed': ['end', 'end', 'in_number', 'end'],
            'in_number': ['end', 'end', 'in_number', 'end'],
            'end': ['end', 'end', 'end', 'end'],
        };

    // state：当前的状态state值
    let state = 'start',
        sign = 1,
        index = 0,
        resValue = 0;

    // 2）不断向后遍历 字符串str ，根据当前遍历到的字符char去不断更新 state、resValue、sign 等值，
    // 当 index >=l || state === 'end' 时，退出遍历
    while (index < l) {
        const char = str[index];
        state = tableMap[state][getStateIndex(char)];
        if (state == 'in_number') {
            resValue = resValue * 10 + parseInt(char);
        } else if (state === 'signed') {
            // 因为 sign 初始化为 1，所以为 '-' 时才有必要处理
            if (char === '-') {
                sign = -1;
            }
        }
        
        index++;
        // 优化：当前state为'end'，就可以退出、不用再遍历
        if (state === 'end') {
            break;
        }
    }
    
    // 3）恢复符号
    resValue *= sign;

    // 4）边界处理
    // 边界1：范围的上下界处理
    resValue = resValue < Math.pow(-2, 31) ? Math.pow(-2, 31) : resValue;
    resValue = resValue > Math.pow(2, 31) - 1 ? Math.pow(2, 31) - 1 : resValue;

    // 5）返回结果
    return resValue;
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