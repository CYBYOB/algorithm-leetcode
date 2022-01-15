# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（38）外观数列

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/a12aa925-c361-4cee-8a3d-3c5d3d66976c.png)
![题目描述](https://files.mdnice.com/user/6999/2b1a703b-de7a-4c0f-ac97-e170966db961.png)
![题目描述](https://files.mdnice.com/user/6999/3bd7e872-20e5-4a89-8d24-dec4e2fc64ab.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/9815712b-92d4-42ef-be65-09e8c7f8a43a.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “类似斐波那切数列，使用2个变量”

// 思路：
// 1）状态初始化
// 2）循环处理 n-1 次，不断处理 pre、now 值
// 2.1）根据 pre 值，计算出 now 值
// 2.2）将 now值 赋值给 pre 值，now 置为 ''，接着进行下一次循环处理 ——> 根据 pre 值，计算出 now 值
// 3）返回结果 pre值 
var countAndSay = function(n) {
    // 1）状态初始化
    let pre = '1',
        now = '';

    // 2）循环处理 n-1 次，不断处理 pre、now 值
    for (let i = 0; i < n - 1; i++) {
        // 2.1）根据 pre 值，计算出 now 值
        const preLength = pre.length;
        let count = 1;
        for (let j = 0; j < preLength; j++) {
            if (pre[j] === pre[j + 1]) {
                count++;
            }
            else {
                now += count + '' + pre[j];
                count = 1;
            }
        }

        // 2.2）将 now值 赋值给 pre 值，now 置为 ''，接着进行下一次循环处理 ——> 根据 pre 值，计算出 now 值
        pre = now;
        now = '';
    }

    // 3）返回结果 pre值 
    return pre;
}
```

### 2 方案2
1)代码：
```js
// 方案2 “递归 - 普通法”
var countAndSay = function(n) {
    const dfs = (n) => {
        // 1）递归出口
        if (n === 1) {
            return '1';
        }

        // 2）递归主体
        return dfs(n-1).replace(/(\d)\1*/g, item =>`${item.length}${item[0]}`);
    };

    return dfs(n);
}
```

### 3 方案3
1)代码：
```js
// 方案3 “递归 - 简洁法”
var countAndSay = function(n) {
    if (n === 1) {
        return '1';
    }
    
    return countAndSay(n-1).replace(/(\d)\1*/g, item =>`${item.length}${item[0]}`);
}
```

### 4 方案4
1)代码：
```js
// 方案4 “正则 + 循环法”

// 思路：
// 1）状态初始化
// 2）循环处理：不断结合正则匹配情况，使用 replace 函数对 resStr 进行更新
// 2.1）注（核心）：'111221'.match(/(\d)\1*/g) ，输出 ['111', '22', '1'] 
// 这样看下面代码就容易很多了， item 依次为 '111', '22', '1' 。
// 3）返回结果 resStr 
var countAndSay = function(n) {
    // 1）状态初始化
    let resStr = '1';

    // 2）循环处理：不断结合正则匹配情况，使用 replace 函数对 resStr 进行更新
    for (let i = 1; i < n; i++){
        // 2.1）注（核心）：'111221'.match(/(\d)\1*/g) ，输出 ['111', '22', '1'] 
        // 这样看下面代码就容易很多了， item 依次为 '111', '22', '1' 。
        resStr = resStr.replace(/(\d)\1*/g, item =>`${item.length}${item[0]}`);
    }

    // 3）返回结果 resStr 
    return resStr;
};
```

### 5 方案5
1)代码：
```js
// 方案5 “JS装X法：正则 + 递归 --> 1行代码”

// 思路：
// countAndSay(3) = countAndSay(2).replace(...)
//     = countAndSay(1).replace(...).replace(...)
//     = 1.replace(...).replace(...).replace(...)
var countAndSay = function(n) {
    // 注：理解如下注释，代码就很容易了
    // countAndSay(3) = countAndSay(2).replace(...)
        // = countAndSay(1).replace(...).replace(...)
        // = 1.replace(...).replace(...).replace(...)
    return n == 1 ? '1' : countAndSay(n-1).replace(/(\d)\1*/g, item =>`${item.length}${item[0]}`);
};
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