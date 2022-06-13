# 标题：算法（leetode，附思维导图 + 全部解法）300题之（3）无重复字符的最长子串

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-7-25/1627186023857-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-7-25/1627186049411-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-7-25/1627202717363-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E5%92%8C%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%883%EF%BC%89%E6%97%A0%E9%87%8D%E5%A4%8D%E5%AD%97%E7%AC%A6%E7%9A%84%E6%9C%80%E9%95%BF%E5%AD%90%E4%B8%B2.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
var lengthOfLongestSubstring = function(s) {
    // 判断当前 “子字符串” 的每个字符是否具有唯一性
    const checkSubStrCharUnique = (subStr) => {
        // 技巧：涉及 “唯一性”、“数量” 统统优先考虑 Hash（JS中的Map）数据结构
        let map = new Map(),
            l = subStr.length,
            flag = true;

        for (let i = 0; i < l; i++) {
            // 之前map 已经存过该字符，则返回 false
            if (map.has(subStr[i])) {
                flag = false;
                break;
            } else {
                // set里的第二个参数无意义
                map.set(subStr[i], 1);
            }
        }

        return flag;
    }


    let resLength = 0,
        l = s.length;
    
    // 滑动窗口的长度范围 [l, 1]。0的话返回结果肯定是0（上面 resLength = 0已做处理）
    // curLength —— 本次循环的滑动窗口的长度
    for(let curLength = l; curLength >0; curLength--) {
        // start —— 本次循环的subStr开始下标
        for (let start=0; start<=l-curLength; start++) {
            // 本次循环的滑动窗口的长度 + subStr开始下标 --> subStr
            // 并判断 当前subStr 是否“合法”，是的话当前的 滑动窗口的长度curLength 就是我们预期的答案！
            const subStr = s.substr(start, curLength);
            if (checkSubStrCharUnique(subStr)) {
                resLength = curLength;
                return resLength;
            }
        }
    }

    return resLength;
}
```

### 2 方案2
1)代码：
```js
// 方案2 —— 优化版的“暴力滑动窗口”
var lengthOfLongestSubstring = function(s) {
    let i = 0,
        l = s.length,
        // 记录当前无重复字符子串
        curUniqueArr = [],
        // 当前最大的 当前无重复字符子串长度
        resLength = 0;
    
    while(i < l) {
        // 依旧不重复，故需往 curUniqueArr 塞
        if(curUniqueArr.indexOf(s[i]) === -1) {
            curUniqueArr.push(s[i]);
            // 判断当前的 resLength 是否需要更新
            resLength = Math.max(resLength, curUniqueArr.length);
        } else {
            // 重复了，将 curUniqueArr 的第一个字符去掉
            // 然后 continue —— 判断是否还需继续将 curUniqueArr 的第一个字符去掉！
            // 例子：s = "pwwkew" （"pww" 需要去掉p、w）
            curUniqueArr.shift();
            continue;
        }
        i++;
    }

    return resLength;
};
```

### 3 方案3
1)代码：
```js
// 方案3 —— 优化版的“暴力滑动窗口”。其实可以说是 方案2的优化版 ，
// 因为 i = map.get(s[j]); 代替了方案2里的 “将 curUniqueArr 的第一个字符丢弃直到 curUniqueArr 不再含有 s[i] 字符”
var lengthOfLongestSubstring = function(s) {
    let l = s.length,
        resLength = 0,
        // 涉及“唯一性”、“数量”优先考虑 Map这种数据类型
        map = new Map();

    // 注：i的取值可能发生“跃迁” —— i = map.get(s[j]);
    for(let i=0; i<l; i++){
        let j = i;
        map.clear();
        while(j < l){
            // 未重复，往 map 塞s[j]
            if(!map.has(s[j])){
                // 注：set的第二个值存的值 当前s[j] 的下标，有用！
                map.set(s[j], j);
            }else{
                // 重复了，更新 resLength 
                resLength = Math.max(resLength, map.size);
                // 需要跳到 与当前s[j]字符重复的 元素下标的下一个 —— +1，
                // 所以此时 i 置为 map.get(s[j]) —— +1 体现在for循环里的i++里了！
                i = map.get(s[j]);
                break;
            }
            j++;
        }
        // 有些情况会 “走到头”，千万别忘了这一条语句！！
        resLength = Math.max(resLength, map.size);
    }

    return resLength;
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
| [206. 反转链表（Reverse Linked List）](https://www.nowcoder.com/discuss/952847)  |  共 3 种  |  1.0 k+  |
| [215. 数组中的第K个最大元素（Kth Largest Element in an Array）](https://www.nowcoder.com/discuss/956928)  |  共 3 种  |  0.5 k+  |
| [236. 二叉树的最近公共祖先（Lowest Common Ancestor of a Binary Tree）](https://www.nowcoder.com/discuss/964696)  |  共 3 种  |  0.1 k+  |

![刷题进度 - LeetCode：527 / 2662 、《剑指offer》：66 / 66 ](https://files.mdnice.com/user/6999/225e837b-a0b7-4cc7-b86d-a77f9bf01367.png)

### 2 博主简介
码农三少 ，一个致力于编写 **极简、但齐全题解（算法**） 的博主。
专注于 **一题多解、结构化思维** ，欢迎一起刷穿 LeetCode ~