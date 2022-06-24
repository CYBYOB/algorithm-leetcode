# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（30）串联所有单词的子串

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/bf78fc7d-c7b0-4042-8972-11d140cff284.png)
![题目描述](https://files.mdnice.com/user/6999/2586d29a-6eec-4f39-ba68-92209338c7b7.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/e0e28f31-5c25-41c5-8b05-7a0384be7076.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “普通的滑动窗口法”。
// 技巧：
// 1）一般来说，字符串挺适合用 “滑动窗口” 的（“总之，算法与数据结构相适应~”）。

// 思路：
// 1）状态初始化。结果下标存放于 数组 resArr 。 
// 2）“滑动窗口”，核心：通过下标 i 穷举所有可能的 子串 tempS 。
// 2.1）按 单个单词长度（oneWordLength） 去取 tempS 的每个小段（substr） 。
// 2.1.1）若 此时 tempWords 不包含 当前小段（substr），则 直接退出本次循环处理 。
// 2.1.2）若 此时 tempWords 包含 当前小段（substr），则 tempWords 清空对应 substr 。
// 2.2）判断此时的 tempWords 长度。若 tempWords.length === 0 ，则 说明符合条件 、将 下标i 放入 结果数组 resArr 。
// 3）返回 结果数组 resArr 。
var findSubstring = function(s, words) {
    // 1）状态初始化。结果下标存放于 数组 resArr 。 
    const sLength = s.length,
        oneWordLength = words[0].length,
        wordsLength = words.length,
        wordStrLength = wordsLength * oneWordLength;

    let resArr = [];
    
    // 2）“滑动窗口”，核心：通过下标 i 穷举所有可能的 子串 tempS 。
    for (let i = 0; i <= (sLength - wordStrLength); i++) {
        const tempS = s.substr(i, wordStrLength),
            tempSLength = tempS.length,
            tempWords = JSON.parse(JSON.stringify(words));
        
        // 2.1）按 单个单词长度（oneWordLength） 去取 tempS 的每个小段（substr） 。
        for (let index = 0; index <= (tempSLength - oneWordLength); index += oneWordLength) {
            const substr = tempS.substr(index, oneWordLength);
            // 2.1.1）若 此时 tempWords 不包含 当前小段（substr），则 直接退出本次循环处理 。
            if (!(tempWords.includes(substr))) {
                break;
            }
            // 2.1.2）若 此时 tempWords 包含 当前小段（substr），则 tempWords 清空对应 substr 。
            else {
                const deleteIndex = tempWords.indexOf(substr);
                tempWords.splice(deleteIndex, 1);
            }
        }
        // 2.2）判断此时的 tempWords 长度。若 tempWords.length === 0 ，则 说明符合条件 、将 下标i 放入 结果数组 resArr 。
        if (tempWords.length === 0) {
            resArr.push(i);
        }
    }

    // 3）返回 结果数组 resArr 。
    return resArr;
}
```

### 2 方案2
1)代码：
```js
// 方案2 “滑动窗口 + hash + 递归”。
// 技巧：涉及“映射、数量、重复性（即去重）、唯一性（即次数）等”可优先考虑hash（JS里对应的是 map数据结构）。

// 思路：
// 1）状态初始化。结果下标存放于 数组 resArr 。
// 2）遍历 words ，将单词数组数据 存入 map 中（方便读取等操作）。
// 3）穷举所有可能的字符子串，调用递归函数。
// 4）返回 结果数组 resAr 。
var findSubstring = function(s, words) {
    // 递归
    const dfs = (index = 0, substr = '', map = new Map(), resArr = []) => {
        const tempStr = substr.substr(0, oneWordLength);
        // 1）递归出口。
        if (substr.length === oneWordLength && map.get(tempStr) === 1) {
            resArr.push(index);
            return;
        }
        if (!map.has(tempStr) || map.get(tempStr) <= 0) {
            return;
        }

        // 2）递归主体。不断更新 substr、map ，接着继续调用 递归处理函数dfs 。
        substr = substr.substr(oneWordLength);
        map.set(tempStr, map.get(tempStr) - 1);
        dfs(index, substr, map, resArr);
    };


    // 1）状态初始化。结果下标存放于 数组 resArr 。
    const sLength = s.length,
        oneWordLength = words[0].length,
        wordsLength = words.length,
        wordStrLength = wordsLength * oneWordLength;

    let resArr = [],
        map = new Map();

    // 2）遍历 words ，将单词数组数据 存入 map 中（方便读取等操作）。
    for (let i = 0; i < wordsLength; i++) {
        if (map.has(words[i])) {
            map.set(words[i], map.get(words[i]) + 1);
        }
        else {
            map.set(words[i], 1);
        }
    }

    // 3）穷举所有可能的字符子串，调用递归函数。
    for (let i = 0; i <= (sLength - wordStrLength); i++) {
        const substr = s.substr(i, wordStrLength);
        // 边界：不能直接使用 JSON 进行深拷贝！！
        let tempMap = new Map();
        map.forEach((value, key) => tempMap.set(key, value));
        dfs(i, substr, tempMap, resArr);
    }

    // 4）返回 结果数组 resAr 。
    return resArr;
}
```

### 3 方案3
1)代码：
```js
// 方案3 “递归”。
// 技巧：永远记住，递归 = 递归出口（为了不陷入无线递归的死循环） + 递归主体（一般会变更一些参数后，在调用函数本身）。
// 一般 递归出口 放前面， 递归主体 放后面。

// 思路：
// 1）状态初始化。结果下标存放于 数组 resArr 。 
// 2）不断穷举所有的子串，调用递归函数。
// 若 递归函数处理结果符合预期，则 将下标i 存入 结果数组 resAr 。
// 3）返回 结果数组 resAr 。
var findSubstring = function(s, words) {
    // 递归
    const dfs = (index = 0, substr = '', words = [], resArr = []) => {
        const tempStr = substr.substr(0, oneWordLength);
        // 1）递归出口。
        if (substr.length === oneWordLength && words[0] === substr) {
            resArr.push(index);
            return;
        }
        if (!words.includes(tempStr)) {
            return;
        }

        // 2）递归主体。处理完 substr、words 后，继续调用 递归函数dfs 。
        substr = substr.substr(oneWordLength);
        const deleteIndex = words.indexOf(tempStr);
        words.splice(deleteIndex, 1);
        dfs(index, substr, words, resArr);
    };


    //  1）状态初始化。结果下标存放于 数组 resArr 。 
    const sLength = s.length,
        oneWordLength = words[0].length,
        wordsLength = words.length,
        wordStrLength = wordsLength * oneWordLength;

    let resArr = [];

    // 2）不断穷举所有的子串，调用递归函数。
    // 若 递归函数处理结果符合预期，则 将下标i 存入 结果数组 resAr 。
    for (let i = 0; i <= (sLength - wordStrLength); i++) {
        const substr = s.substr(i, wordStrLength);
        // 边界：要对 words 进行深拷贝！！
        const tempWords = JSON.parse(JSON.stringify(words));
        dfs(i, substr, tempWords, resArr);
    }

    // 3）返回 结果数组 resAr 。
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