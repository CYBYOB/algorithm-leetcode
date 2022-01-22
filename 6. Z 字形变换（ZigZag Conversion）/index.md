# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（6）Z字形变换

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-1/1627807715665-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-1/1627807743493-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-7/1628322362575-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%886%EF%BC%89Z%E5%AD%97%E5%BD%A2%E5%8F%98%E6%8D%A2.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1：1）初始化 tempArr 等。 2）后续的下标值都由 tempArr最开始存放的几个值进行生成的
var convert = function(s, numRows) {
    let l = s.length,
        // 最顶上的几个数所组成的数组
        tempArr = [],
        // 记录已经存到 resStr 里的字符对应下标
        tempMap = new Map(),
        // 需要返回的字符串
        resStr = '';
    
    // 边界1："A" 1（核心：当 numRows = 1 时）
    if (numRows === 1) {
        return s;
    }

    // 初始化 tempArr、tempMap、resStr
    for (let i = 0; true; i += 2) {
        const index = i * (numRows - 1);
        if (index < l) {
            tempArr.push(index);
            tempMap.set(index, 1);
            resStr += s[index];
        } else {
            // 边界2："ABCD" 3（tempArr里的顶部下标多存1个，就不会漏生成一些下标了）
            tempArr.push(index);
            break;
        }
    }

    for (let bias = 1; bias < numRows; bias++) {
        for (let i = 0; i < tempArr.length; i++) {
            // 核心：根据 当前顶部的数值（tempArr[i]） 进行 +、- bias（ 取值范围：[1, numRows - 1] ）
            // 去分别生成新的下标 indexLeft、indexRight
            // 接着根据下标 indexLeft、indexRight 的有效情况，去进行不同的处理。
            const indexLeft = tempArr[i] - bias,
                indexRight = tempArr[i] + bias;

            // 边界3：别忘了 && indexLeft > 0 条件！！
            if (indexLeft < l && !tempMap.has(indexLeft) && indexLeft > 0) {
                tempMap.set(indexLeft, 1);
                resStr += s[indexLeft];
            }
            if (indexRight < l && !tempMap.has(indexRight)) {
                tempMap.set(indexRight, 1);
                resStr += s[indexRight];
            }
        }
    }

    return resStr;
};
```

### 2 方案2
1)代码：
```js
var convert = function(s, numRows) {
    if(numRows == 1)
        return s;

    const len = Math.min(s.length, numRows);
    const rows = [];
    for(let i = 0; i< len; i++) rows[i] = "";
    let loc = 0;
    let down = false;

    for(const c of s) {
        rows[loc] += c;
        if(loc == 0 || loc == numRows - 1)
            down = !down;
        loc += down ? 1 : -1;
    }

    let ans = "";
    for(const row of rows) {
        ans += row;
    }
    return ans;
};
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