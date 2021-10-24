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