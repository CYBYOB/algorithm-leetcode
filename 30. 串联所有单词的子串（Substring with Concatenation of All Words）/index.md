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