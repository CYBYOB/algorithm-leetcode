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
![历史文章 - 总览](https://files.mdnice.com/user/6999/7b92db4c-d5d3-4558-8003-284d3e24b86b.png)

![刷题进度 - LeetCode：381 / 2498 、《剑指offer》：66 / 66 ](https://files.mdnice.com/user/6999/aa583ce2-ca99-44eb-ab95-81c1d3a37eed.png)

### 2 【资源分享】算法通关 + 面试宝典算法通关 + 面试宝典
```
1）算法通关40讲（极客 - 外企大佬讲的）：
链接: https://pan.baidu.com/s/1C175QEmcAunjnCzYzoLBz 提取码: hjna

2）动态规划专题（价值几百美刀~）：https://www.bilibili.com/video/BV1nt4y1Y7nz

3）前端面经：
3.1）https://www.nowcoder.com/tutorial/96
3.2）https://muyiy.cn/question
3.3）https://hub.fastgit.org/haizlin/fe-interview/blob/master/category/history.md

注：若失效请前往VX公众号： 码农三少 ，发送关键字： LeetCode 或 算法 ，即可获取最新的链接~
```

![算法通关 + 面试宝典](https://files.mdnice.com/user/6999/624dbb9c-9ead-4e64-a840-0c52c40c1856.jpg)

### 3 博主简介
**码农三少** ，一个致力于编写 **极简、但齐全题解（算法**） 的博主。
专注于 **一题多解、结构化思维** ，欢迎一起刷穿 LeetCode ~

![博主简介](https://files.mdnice.com/user/6999/0b3d3906-d883-43be-b243-5e08ea066aac.png)