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