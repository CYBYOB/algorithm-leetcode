# 标题：算法（leetode，附思维导图 + 全部解法）300题之（5）最长回文子串

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-1/1627790291413-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-1/1627790309769-image.png)

# 二 解法总览（思维导图）

![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-1/1627807351493-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%885%EF%BC%89%E6%9C%80%E9%95%BF%E5%9B%9E%E6%96%87%E5%AD%90%E4%B8%B2.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 滑动窗口法（“时间复杂度高，一般通过不了”）
var longestPalindrome = function(s) {
    // 是否为 回文串。（subStr = '' 稍微体现下编程的严谨性）
    const isValid = (subStr = '') => {
        const l = subStr.length;
        let resFlag = true;

        // 边界：i < l/2
        for(let i = 0; i < l/2; i++) {
            // “对称位置”上的字符不相等，那么肯定就不是 回文串 了
            if (subStr[i] !== subStr[(l - 1) - i]) {
                resFlag = false;
                break;
            }
        }

        return resFlag;
    }

    const l = s.length;
    // curMaxLength 当前回文子串的最大长度，范围：[l, 1]
    for (let curMaxLength = l; curMaxLength > 0; curMaxLength--) {
        // 在 curMaxLength 下，curStartIndex的有效范围为 [0, ((l + 1) - curMaxLength) )
        for (let curStartIndex = 0; curStartIndex < ((l + 1) - curMaxLength); curStartIndex++) {
            const subStr = s.substr(curStartIndex, curMaxLength);
            // 一旦符合 回文串 ，那么当前子串一定是我们的预期答案（“之一”）
            // 因为我们 curMaxLength 在一次次遍历中在递减
            if (isValid(subStr)) {
                return subStr;
            }
        }
    }

    // 边界：可能 l为0 、然后直接到这里了，需要返回空字符串（不过题目 1 <= s.length <= 1000 ，故 可省略 ）
    return "";
}
```

### 2 方案2
1)代码：
```js
// 方案2 动态规划，(s[i] === s[j] && dp[i + 1][j - 1]) || (s[i] === s[j] && ((j + 1) - i) < 3)
var longestPalindrome = function(s) {
    const l = s.length,
        // 1）含义：s[i][j] 表示s[i, j]是否为回文串（双闭区间）
        // 初始化1：dp， n*n 个值都初始化为 false 
        dp = new Array(l).fill(false).map(item => new Array(l).fill(false));
    // 当前 最长回文子串 的开始下标、最大长度
    let maxStartIndex = 0,
        // 边界：maxLength 初始化为1。不然会有问题、可自行思考~
        maxLength = 1;

    // 初始化2：dp对角线上值 均为 true 
    for (let i = 0; i < l; i++) {
        for(let j = 0; j < l; j++) {
            if (i === j) {
                dp[i][j] = true;
            }
        }
    }

    // 2）状态转移方程：
    // s[i][j] = (s[i] === s[j] && dp[i + 1][j - 1]) || (s[i] === s[j] && ((j + 1) - i) < 3)
    // s[i][j] = (当前首、尾字符相同 && 首、尾各往中间缩1位依旧是回文串) 
    // 或 (当前首、尾字符相同 && 当前首、尾位置间隔 < 3) 如 "bb" 这种长度小于3时，只要保证 首、尾字符相同即可
    for (let j = 1; j < l; j++) {
        for(let i = 0; i < j; i++) {
            if ((s[i] === s[j] && dp[i + 1][j - 1]) || (s[i] === s[j] && ((j + 1) - i) < 3)) {
                dp[i][j] = true;
                // 当前s[i, j]为回文串了，才看是否需要更新 maxStartIndex、maxLength 值
                // 3）当 s[i, j]为回文串 && (j + 1) - i) > maxLength 时，更新 maxStartIndex、maxLength 值
                if (((j + 1) - i) > maxLength) {
                    maxStartIndex = i;
                    maxLength = ((j + 1) - i);
                }
            } else {
                dp[i][j] = false;
            }
        }
    }

    // 最后根据 “我们所维护的” maxStartIndex, maxLength 得出相应的子串
    return s.substr(maxStartIndex, maxLength);
}
```

### 3 方案3
1)代码：
```js
// 方案3 中心扩散法（注意“都进行奇、偶情况的处理”）
var longestPalindrome = function(s) {
    // 根据传入的子串、左 右边界下标，不断“向外”移动、试图拿到更长的回文串
    const helper = (str, left, right) => {
        while(left >=0 && right < l) {
            if (str[left] === str[right]) {
                // 看看是否需更新 maxStartIndex、maxLength 值
                if ((right + 1 - left) > maxLength) {
                    maxStartIndex = left;
                    maxLength = (right + 1 - left);
                }
                // 注意：这2语句放当前if分支的最后面、别放在最前面了！！
                // 继续“向外”移动、试图拿到更长的回文串
                left--;
                right++;
            } else {
                // 此时 str[left] !== str[right] ，肯定无法拿到更长的回文串，退出循环！
                break;
            }
        }
    }

    const l = s.length;
    // 当前“最长回文串”对应的 开始下标、最大长度。
    let maxStartIndex = 0,
        maxLength = 0;

    for (let i = 0 ; i < l; i++) {
        // 1）奇数：以 s[i] “向外”移动、试图拿到更长的回文串
        helper(s, i ,i);
        // 2）偶数：以 s[i]、s[i + 1] “向外”移动、试图拿到更长的回文串
        helper(s, i, i + 1);
    }
    
    return s.substr(maxStartIndex, maxLength);
}
```

### 4 方案4
1)代码：
```java
// 方案4 Manacher（“马拉车”）算法
class Solution {
    public String longestPalindrome(String s) {
        int start = 0, end = -1;
        StringBuffer t = new StringBuffer("#");
        for (int i = 0; i < s.length(); ++i) {
            t.append(s.charAt(i));
            t.append('#');
        }
        t.append('#');
        s = t.toString();

        List<Integer> arm_len = new ArrayList<Integer>();
        int right = -1, j = -1;
        for (int i = 0; i < s.length(); ++i) {
            int cur_arm_len;
            if (right >= i) {
                int i_sym = j * 2 - i;
                int min_arm_len = Math.min(arm_len.get(i_sym), right - i);
                cur_arm_len = expand(s, i - min_arm_len, i + min_arm_len);
            } else {
                cur_arm_len = expand(s, i, i);
            }
            arm_len.add(cur_arm_len);
            if (i + cur_arm_len > right) {
                j = i;
                right = i + cur_arm_len;
            }
            if (cur_arm_len * 2 + 1 > end - start) {
                start = i - cur_arm_len;
                end = i + cur_arm_len;
            }
        }

        StringBuffer ans = new StringBuffer();
        for (int i = start; i <= end; ++i) {
            if (s.charAt(i) != '#') {
                ans.append(s.charAt(i));
            }
        }
        return ans.toString();
    }

    public int expand(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            --left;
            ++right;
        }
        return (right - left - 2) / 2;
    }
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