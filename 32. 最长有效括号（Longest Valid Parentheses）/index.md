# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（32）最长有效括号

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/98d1524c-ad94-4a41-95e7-a55dc53c7391.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/fa020477-330d-4fb5-b20a-51ef76b128fa.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “滑动窗口法”。
// 通过：229 / 231，超时！
// 例子：太长，暂不罗列。

// 思路：
// 1）初始化状态。
// 2）核心：窗口大小固定为 tempL（范围：[l, 0] ） ，不断穷举所有的可能情况、然后做处理
// tempL：当前窗口大小， left、right 分别为当前窗口的左右边。
// 3）返回结果
var longestValidParentheses = function(s) {
    // 判断当前子串 tempS 是否为 有效括号
    const isValidParentheses = (tempS = '') => {
        const l = tempS.length;
        let stack = [];

        for (let i = 0; i < l; i++) {
            if (tempS[i] === '(') {
                stack.push('(');
            }
            else {
                const tempChar = stack.pop();
                if (tempChar !== '(') {
                    return false;
                }
            }
        }

        return stack.length === 0;
    };

    // 1）初始化状态。
    const l = s.length;

    // 2）核心：窗口大小固定为 tempL（范围：[l, 0] ） ，不断穷举所有的可能情况、然后做处理
    // tempL：当前窗口大小， left、right 分别为当前窗口的左右边。
    for (let tempL = l; tempL > 0; tempL--) {
        // 优化：长度为奇数，肯定不是！
        if (tempL % 2 === 1) {
            continue;
        }

        for (let left = 0; left < (l - tempL + 1); left++) {
            const right = (left + tempL - 1);
            // 优化：最左、最右的字符一定分别是 '('、')' ！
            if (s[left] !== '(' || s[right] !== ')') {
                continue;
            }
            else {
                const tempS = s.slice(left, right + 1);
                if (isValidParentheses(tempS)) {
                    // 3）返回结果
                    return tempL;
                }
            }
        }
    }

    // 3.2）返回结果
    return 0;
};
```

### 2 方案2
1)代码：
```js
// 方案2 “动态规划”。

// 思路：
// 1）我们用 dp[i] 表示以 i 结尾的最长有效括号
// 2.1）若 s[i] 为 ( ，则 dp[i] 必然等于 0，因为不可能组成有效的括号
// 2.2）若 s[i] 为 )，
// 2.2.1）且当 s[i-1] 为 (，则 dp[i] = dp[i-2] + 2；
// 2.2.2）且当 s[i-1] 为 ) && s[i-dp[i-1] - 1] 为 (，则 dp[i] = dp[i-1] + 2 + dp[i-dp[i-1]-2] 。
// 3）返回结果 resLength 
// 参考：
// 1）https://leetcode-cn.com/problems/longest-valid-parentheses/solution/dong-tai-gui-hua-si-lu-xiang-jie-c-by-zhanganan042/
var longestValidParentheses = function(s) {
    // 1）状态初始化
    const l = s.length;
    let dp = Array(l).fill(0),
        resLength = 0;

    // 2）核心：
    // 1）我们用 dp[i] 表示以 i 结尾的最长有效括号
    // 2.1）若 s[i] 为 ( ，则 dp[i] 必然等于 0，因为不可能组成有效的括号
    // 2.2）若 s[i] 为 )，
    // 2.2.1）且当 s[i-1] 为 (，则 dp[i] = dp[i-2] + 2；
    // 2.2.2）且当 s[i-1] 为 ) && s[i-dp[i-1] - 1] 为 (，则 dp[i] = dp[i-1] + 2 + dp[i-dp[i-1]-2] 。
    for (let i = 0; i < l; i++) {
        if (i > 0 && s[i] === ')') {
            if (s[i - 1] === '(') {
                dp[i] = ((i - 2 >= 0) ? dp[i - 2] + 2 : 2);
            }
            else if (s[i - 1] === ')' && (i - dp[i - 1] - 1 >= 0) && (s[i- dp[i - 1] - 1] === '(')) {
                dp[i] = dp[i - 1] + 2 + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0);
            }
        }
        resLength = Math.max(resLength, dp[i]);
    }

    // 3）返回结果 resLength 
    return resLength;
}
```

# 四 资源分享 & 更多
### 1 历史文章 - 总览
![历史文章 - 总览](https://files.mdnice.com/user/6999/7b92db4c-d5d3-4558-8003-284d3e24b86b.png)

![刷题进度 - LeetCode：355 / 2492 、《剑指offer》：66 / 66 ](https://files.mdnice.com/user/6999/0fb20e8c-ac87-4f48-954a-69dbadf0e8bf.png)

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
码农三少 ，一个致力于编写 **极简、但齐全题解（算法**） 的博主。
专注于 **一题多解、结构化思维** ，欢迎一起刷穿 LeetCode ~

![博主简介](https://files.mdnice.com/user/6999/0b3d3906-d883-43be-b243-5e08ea066aac.png)