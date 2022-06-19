# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（17）电话号码的字母组合

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630120023621-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630120053432-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630132101782-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%8817%EF%BC%89%E7%94%B5%E8%AF%9D%E5%8F%B7%E7%A0%81%E7%9A%84%E5%AD%97%E6%AF%8D%E7%BB%84%E5%90%88.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 回溯（说白了、说穿了，就是递归。因为一般用递归实现回溯）。
// 技巧：永远记住，递归 = 递归出口（为了不陷入无线递归的死循环） + 递归主体（一般会变更一些参数后，在调用函数本身）。
// 一般 递归出口 放前面，递归主体 放后面。
var letterCombinations = function(digits) {
    // 1）定义回溯函数（即递归函数dfs）。
    const dfs = (index, l, digits, curStr, resArr) => {
        // 1.1）递归出口
        if (index >= l) {
            resArr.push(curStr);
            return;
        }

        // 1.2）递归主体
        const tempArr = map.get(digits[index]),
            tempLength = tempArr.length;
            
        // 核心：回溯 = 选 + 不选。
        // 该for循环表示穷举每种可能，然后 选tempArr[i] ，不选其他。
        for (let i = 0; i < tempLength; i++) {
            dfs(index + 1, l, digits, curStr + tempArr[i], resArr);
        }
    };

    // 2）状态初始化。
    const l = digits.length,
        map = new Map([
            ['2', ['a', 'b', 'c']],
            ['3', ['d', 'e', 'f']],
            ['4', ['g', 'h', 'i']],
            ['5', ['j', 'k', 'l']],
            ['6', ['m', 'n', 'o']],
            ['7', ['p', 'q', 'r', 's']],
            ['8', ['t', 'u', 'v']],
            ['9', ['w', 'x', 'y', 'z']]
        ]);

    let index = 0,
        curStr = '',
        resArr = [];

    // 3）调用自定义的回溯函数（即递归函数dfs）。
    // 3.1）边界："" ，预期为 []。
    // 若不加 该if分支， 则自己的将输出为 [""]。
    if (l <= 0) {
        return [];
    }
    dfs(index, l, digits, curStr, resArr);

    // 4）返回结果 resArr 。
    return resArr;
};
```

### 2 方案2
1)代码：
```js
// 方案2 将digits字符串转二维数组；不断遍历做笛卡尔积；返回最终的“笛卡尔积数组”。
// 技巧：涉及“映射、数量、重复性、唯一性（即次数）等”可优先考虑hash（JS里对应的是 map数据结构）。
// 1）"234" 转成 [ ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'] ]
// 2）核心：遍历该二维数组，不断跟下一个元素做笛卡尔积。
// 2.1）初始化：newAcc = ['a', 'b', 'c']
// 2.2）当前newAcc 与下一个元素['d', 'e', 'f'] 做笛卡尔积，
// 得到 newAcc = ["ad","ae","af","bd","be","bf","cd","ce","cf"]
// 2.3）重复2.2步骤，做笛卡尔积。
// 得到 newAcc = ["adg","adh","adi","aeg","aeh","aei","afg","afh","afi","bdg","bdh","bdi","beg","beh","bei","bfg","bfh","bfi","cdg","cdh","cdi","ceg","ceh","cei","cfg","cfh","cfi"]
// 3）遍历结束，返回 newAcc 。
var letterCombinations = function(digits) {
    // 1）状态初始化。
    const l = digits.length,
        map = new Map([
            ['2', ['a', 'b', 'c']],
            ['3', ['d', 'e', 'f']],
            ['4', ['g', 'h', 'i']],
            ['5', ['j', 'k', 'l']],
            ['6', ['m', 'n', 'o']],
            ['7', ['p', 'q', 'r', 's']],
            ['8', ['t', 'u', 'v']],
            ['9', ['w', 'x', 'y', 'z']]
        ]);

    // 2）将原先的 digits字符串 转成 相应的二维数组tempArr。
    // 如 "234" 转成 [ ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'] ]。
    const tempArr = digits.split('').map(item => {
        return map.get(item);
    });

    let newAcc = [];
    // 3）将上面转换得到的二维数组tempArr 变成 一维数组resArr 。
    // 技巧：多变一，优先考虑使用 数组的reduce方法 。
    const resArr = tempArr.reduce((acc, cur, index, item) => {
        // 边界：若是第一个元素，直接返回 item[index] 。
        if (index === 0) {
            newAcc = item[index];
            return newAcc;
        }

        const accLength = acc.length,
            curLength = cur.length;
        // 边界：需重置 newAcc 为 [] ，
        // 继续 用当前的acc、cur 拼接出 newAcc 。
        newAcc = [];
        // 3.1）核心：遍历 acc、cur ，拼接出 newAcc 。
        for (let i = 0; i < accLength; i++) {
            for (let j = 0; j < curLength; j++) {
                newAcc.push(acc[i] + cur[j]);
            }
        }
        
        // 3.2）返回由 acc、cur 拼接出的 newAcc 。
        return newAcc;
    }, []);

    // 4）返回结果 resArr 。
    return resArr;
}
```

### 3 方案3
1)代码：
```js
// 方案3 与方案2类似，只是不使用 reduce 函数了。
// 也是不断遍历做笛卡尔积；返回最终的“笛卡尔积数组”。
// 技巧：涉及“映射、数量、重复性、唯一性（即次数）等”可优先考虑hash（JS里对应的是 map数据结构）。
// 1）"234" 转成 [ ['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i'] ]
// 2）核心：遍历该二维数组，不断跟下一个元素做笛卡尔积。
// 2.1）初始化：resArr = ['a', 'b', 'c']
// 2.2）当前resArr 与下一个元素['d', 'e', 'f'] 做笛卡尔积，
// 得到 resArr = ["ad","ae","af","bd","be","bf","cd","ce","cf"]
// 2.3）重复2.2步骤，做笛卡尔积。
// 得到 resArr = ["adg","adh","adi","aeg","aeh","aei","afg","afh","afi","bdg","bdh","bdi","beg","beh","bei","bfg","bfh","bfi","cdg","cdh","cdi","ceg","ceh","cei","cfg","cfh","cfi"]
// 3）遍历结束，返回 resArr 。
var letterCombinations = function(digits) {
    // 1）状态初始化。
    const l = digits.length,
        map = new Map([
            ['2', ['a', 'b', 'c']],
            ['3', ['d', 'e', 'f']],
            ['4', ['g', 'h', 'i']],
            ['5', ['j', 'k', 'l']],
            ['6', ['m', 'n', 'o']],
            ['7', ['p', 'q', 'r', 's']],
            ['8', ['t', 'u', 'v']],
            ['9', ['w', 'x', 'y', 'z']]
        ]);
    let resArr = [];

    // 边界：若长度为 0 ，则 直接返回[] 。
    if (l === 0) {
        // 其实就是 return [];
        return resArr;
    } else {
        // 若长度 不为 0 ，则 初始化 resArr 为  map.get(digits[0]); 。
        resArr = map.get(digits[0]);
    }

    // 2）遍历。
    // 核心：不断做笛卡尔积、更新 resArr 值。
    // 注：下标从1（因为之前已经 resArr = map.get(digits[0]); ）开始！
    for (let i = 1; i < l; i++) {
        const tempArr = map.get(digits[i]),
            tempArrLength = tempArr.length,
            resArrLength = resArr.length;
        let newResArr = [];

        for (let j = 0; j < resArrLength; j++) {
            for (let k = 0; k < tempArrLength; k++) {
                newResArr.push(resArr[j] + tempArr[k]);
            }
        }

        resArr = newResArr;
    }

    // 3）返回结果 resArr 。
    return resArr;
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