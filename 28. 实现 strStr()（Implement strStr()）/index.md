# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（28）实现 strStr()

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/4b2e2293-7bc5-4447-b96d-34ca6edc879d.png)
![题目描述](https://files.mdnice.com/user/6999/9910a3ec-8807-4700-bc1c-f24950175c70.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/69664ded-f4d0-4714-9dd9-1fe57f3f8295.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “滑动窗口法”

// 思路：
// 1）假定找不到：let resIndex = -1; 。
// 2）遍历-“滑动窗口形式”。不断判断 haystack 中长度为 needleLength 的所有子串是否等于 needle 。
// 注意：循环条件是 i <= (haystackLength - needleLength) ，别漏了 “=” —— 为了case： haystack = "", needle = "" 。
// 2.1）若 当前子串 haystack.substr(i, needleLength) === needle，则 resIndex = i; 并结束循环处理。
// 3）返回结果 resIndex 。
var strStr = function(haystack, needle) {
    // 1）假定找不到：let resIndex = -1; 。
    const haystackLength = haystack.length,
        needleLength = needle.length;
    let resIndex = -1;

    // 2）遍历-“滑动窗口形式”。不断判断 haystack 中长度为 needleLength 的所有子串是否等于 needle 。
    // 注意：循环条件是 i <= (haystackLength - needleLength) ，别漏了 “=” —— 为了case： haystack = "", needle = "" 。
    for (let i = 0; i <= (haystackLength - needleLength); i++) {
        // 2.1）若 当前子串 haystack.substr(i, needleLength) === needle，则 resIndex = i; 并结束循环处理。
        if (haystack.substr(i, needleLength) === needle) {
            resIndex = i;
            break;
        }
    }

    // 3）返回结果 resIndex 。
    return resIndex;
}
```

### 2 方案2
1)代码：
```js
// 方案2 “结合Map数据结构的滑动窗口法 —— 方案1的优化版”。

// 思路：
// 1）初始化：map = new Map(), resIndex = -1。
// 2）遍历 haystack ：若 haystack[i] === needle[0] ，则 将当前对应字符存入 map —— map.set(i, haystack.substr(i, needleLength));。
// 3）遍历 map ：若 当前 val === needle，则 resIndex = key; 并 退出遍历 。
// 4）返回结果 resIndex 。 
var strStr = function(haystack, needle) {
    // 1）初始化：map = new Map(), resIndex = -1。
    const haystackLength = haystack.length,
        needleLength = needle.length;
    let map = new Map(),
        resIndex = -1;
    
    // 边界："a" "" 。只要 needle 为 '' （即长度为 0 ），直接返回 0 。
    if (needleLength === 0) {
        return 0;
    }

    // 2）遍历 haystack ：若 haystack[i] === needle[0] ，则 将当前对应字符存入 map —— map.set(i, haystack.substr(i, needleLength));。
    for (let i = 0; i <= (haystackLength - needleLength); i++) {
        if (haystack[i] === needle[0]) {
            map.set(i, haystack.substr(i, needleLength));
        }
    }

    // 3）遍历 map ：若 当前 val === needle，则 resIndex = key; 并 退出遍历 。
    for (const [key, val] of map) {
        if (val === needle) {
            resIndex = key;
            break;
        }
    }

    // 4）返回结果 resIndex 。 
    return resIndex;
}
```

### 3 方案3
1)代码：
```js
// 方案3 “双指针 —— 本质上，类似 滑动窗口法 ，感兴趣的同学可以写一下”。

// 思路：
// 1）初始化：haystackIndex = 0, needleIndex = 0, resIndex = -1。
// 2）遍历：条件 —— haystackIndex < haystackLength 。
// 2.1）若 此时 haystack[haystackIndex] === needle[needleIndex] ，
// 则 说明当前子串可能可以匹配上。
// 2.1.1）核心：利用“双指针”，判断是否能匹配上。
// 2.1.2）若 此时 needleIndex === needleLength ，则 匹配成功 。
// 此时直接 return haystackIndex; 。
// 2.1.3）若 此时 needleIndex !== needleLength ，则 匹配失败 。
// needleIndex 置为 0，开始新的“外层循环” —— 期待下1次的 haystack[haystackIndex] === needle[needleIndex] 。
// 2.2）若 走到这，则 说明 此时 haystackIndex 开始的子串与needle 匹配失败。
// 将 haystackIndex 往后拉，继续新的循环逻辑处理。
// 3）返回结果 resIndex 。
var strStr = function(haystack, needle) {
    // 1）初始化：haystackIndex = 0, needleIndex = 0, resIndex = -1。
    const haystackLength = haystack.length,
        needleLength = needle.length;
    let haystackIndex = 0,
        needleIndex = 0,
        resIndex = -1;

    // 边界："a" "" 。只要 needle 为 '' （即长度为 0 ），直接返回 0 。
    if (needleLength === 0) {
        return 0;
    }

    // 2）遍历：条件 —— haystackIndex < haystackLength 。
    while (haystackIndex < haystackLength) {
        // 2.1）若 此时 haystack[haystackIndex] === needle[needleIndex] ，
        // 则 说明当前子串可能可以匹配上。
        if (haystack[haystackIndex] === needle[needleIndex]) {
            let haystackIndexTemp = haystackIndex + 1;
            needleIndex = needleIndex + 1;

            // 2.1.1）核心：利用“双指针”，判断是否能匹配上。
            while (haystack[haystackIndexTemp] === needle[needleIndex] && needleIndex < needleLength) {
                haystackIndexTemp++;
                needleIndex++;
            }

            // 2.1.2）若 此时 needleIndex === needleLength ，则 匹配成功 。
            // 此时直接 return haystackIndex; 。
            if (needleIndex === needleLength) {
                return haystackIndex;
            }
            // 2.1.3）若 此时 needleIndex !== needleLength ，则 匹配失败 。
            // needleIndex 置为 0，开始新的“外层循环” —— 期待下1次的 haystack[haystackIndex] === needle[needleIndex] 。
            else { 
                needleIndex = 0;
            }
        }
        // 2.2）若 走到这，则 说明 此时 haystackIndex 开始的子串与needle 匹配失败。
        // 将 haystackIndex 往后拉，继续新的循环逻辑处理。
        haystackIndex++;
    }

    // 3）返回结果 resIndex 。
    return resIndex;
}
```

### 4 方案4
1)代码：
```js
// 方案4 “正则法”。

// 思路：
// 1）构造正则表达式：reg = new RegExp(needle); 。
// 2）根据正则表达式的匹配情况返回结果：
// return haystack.match(reg) !== null ? haystack.match(reg).index : -1;
var strStr = function(haystack, needle) {
    // 1）构造正则表达式：reg = new RegExp(needle); 。
    const reg = new RegExp(needle);
    
    // 2）根据正则表达式的匹配情况返回结果：
    // return haystack.match(reg) !== null ? haystack.match(reg).index : -1;
    return haystack.match(reg) !== null ? haystack.match(reg).index : -1;
}
```

### 5 方案5
1)代码：
```js
// 方案5 “Knuth-Morris-Pratt 算法，即 KMP 算法（TODO：有点复杂，需要理清）”。

// 参考：
// 1）https://leetcode-cn.com/problems/implement-strstr/solution/shi-xian-strstr-by-leetcode-solution-ds6y/
var strStr = function(haystack, needle) {
    // 1）边界处理：needle 长度为 0 时。
    const n = haystack.length, m = needle.length;
    if (m === 0) {
        return 0;
    }

    // 2）核心处理：KMP算法。
    const pi = new Array(m).fill(0);
    for (let i = 1, j = 0; i < m; i++) {
        while (j > 0 && needle[i] !== needle[j]) {
            j = pi[j - 1];
        }
        if (needle[i] == needle[j]) {
            j++;
        }
        pi[i] = j;
    }

    for (let i = 0, j = 0; i < n; i++) {
        while (j > 0 && haystack[i] != needle[j]) {
            j = pi[j - 1];
        }
        if (haystack[i] == needle[j]) {
            j++;
        }
        if (j === m) {
            return i - m + 1;
        }
    }

    // 3）走到这里说明，匹配失败、返回 -1 ！
    return -1;
};
```

# 四 更多
### 1 刷题进度
```
1）LeetCode：307 / 2390 。

2）《剑指offer》：66 / 66 。

3）相关学习资料与笔记汇总： 
https://github.com/CYBYOB/algorithm-leetcode/tree/master/资料%26笔记 。

4）注：所有题目均有 2-5种 左右的解法，后续还将不断更新题目 & 题解。
敬请期待~
也欢迎大家进群一起 学习、交流、刷题&拿高薪~
```

![刷题进度 - LeetCode：307 / 2390 、《剑指offer》：66 / 66 ](https://files.mdnice.com/user/6999/09201cae-28f0-4062-8a07-03d027f4fc0c.png)

### 2 GitHub - LeetCode项目仓库
```
0）本项目地址： 
https://github.com/CYBYOB/algorithm-leetcode 。
目标、愿景：
让每个人都能拥有一定的算法能力、以应对面试中（会举一反三的同学还可以将其融入自己的肌肉和血液，甚至能够赋能于公司的业务和技术）的算法。

本人每周仍在不断的更新 —— 保证每周都有新的题目、题解方案刺激着您的神经 和 刷题欲望。
欢迎对算法感兴趣的同学加入我们的社群。
QQ群： 933919972 ；
作者QQ： 1520112971 ；
作者VX： c13227839870（可拉您进群、一起学习与交流~） 。
```

![GitHub：algorithm-leetcode - 项目亮点](https://files.mdnice.com/user/6999/772fafdd-76ab-4e0c-a1f9-34e65ac63fad.png)

![GitHub：algorithm-leetcode - 题目总览](https://files.mdnice.com/user/6999/7b92db4c-d5d3-4558-8003-284d3e24b86b.png)

### 3 作者标签
```
1）“BAT里1名小小的伪全栈工程师，主攻前端，偶尔写点后端”。

2）2019年的微信小程序应用开发赛 - 全国三等奖；
2019CODA比赛 - 前 17/211 强 且 荣获“优秀团队”称号 等。

3）“半自媒体人”，
在校期间、个人公众号（IT三少。新自媒体（公众号）号： 码农三少 ）
在半年内实现了0到5.8K+的粉丝增长等。
```