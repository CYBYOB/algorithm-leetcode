# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（8）字符串转换整数 (atoi)

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-7/1628328547351-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-7/1628328635909-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-7/1628328845731-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-7/1628328966415-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-8/1628408331011-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%888%EF%BC%89%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%BD%AC%E6%8D%A2%E6%95%B4%E6%95%B0%20(atoi).png)


# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 
var myAtoi = function(s) {
    const l = s.length,
        numStrArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    let index = 0,
        // 正、负 情况
        sign = undefined,
        // 结果字符串
        resStr = '';

    // 1）不断去掉前面的 空格字符
    while (index < l && s[index] === ' ') {
        index++;
    }
    
    // 2）去完前面的空格字符后，后面的第一个字符必须是 "+"、"-" 或 数值字符
    // 不是的话直接返回 0 
    if (index < l) {
        if (s[index] === '-' || s[index] === '+' ) {
            sign = s[index];
            resStr += sign;
        } else {
            if (numStrArr.includes(s[index])) {
                resStr += s[index];
            } else {
                return 0;
            }
        }
    }

    // 3）+、- 号确定后，不断往后读取数值字符（若是遇到 非数值字符 就没必要往下读了） 并 不断存入resStr
    index += 1;
    while (index < l && numStrArr.includes(s[index])) {
        resStr += s[index];
        index++;
    }

    let resValue = parseInt(resStr);
    // 边界1："+-12" （核心：只有 +、- 字符等，此时 parseInt(resStr) 为 NaN，即Not A Number）
    resValue = Number.isNaN(resValue) ? 0 : resValue;
    // 边界2：范围的上下界处理
    resValue = resValue < Math.pow(-2, 31) ? Math.pow(-2, 31) : resValue;
    resValue = resValue > Math.pow(2, 31) - 1 ? Math.pow(2, 31) - 1 : resValue;

    // 4）返回最终的结果
    return resValue;
}
```

### 2 方案2
1)代码：
```js
// 方案2 方案1的”优化版“，其实没必要进行 去前面空格字符 等操作，直接使用 JS自带的 parseInt()
var myAtoi = function(str) {
    // 1）直接使用 parseInt() ，其帮我们少了不少“前置处理工作”
    let resValue = parseInt(str);

    // 2）边界处理
    // 边界1："+-12" （核心：只有 +、- 字符等，此时 parseInt(resStr) 为 NaN，即Not A Number）
    if (isNaN(resValue)) {
        return 0;
    } else {
        // 边界2：范围的上下界处理
        resValue = resValue < Math.pow(-2, 31) ? Math.pow(-2, 31) : resValue;
        resValue = resValue > Math.pow(2, 31) - 1 ? Math.pow(2, 31) - 1 : resValue;
    }

    // 3）返回最终的结果
    return resValue;
};
```

### 3 方案3
1)代码：
```js
// 方案3 状态机
var myAtoi = function(str) {
    // 根据当前 字符char，获取要变更为哪个 状态state
    const getStateIndex = char => {
        const numStrArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        // 初始化流转值为 'end' 状态，其实也可以有别的写法
        let resStateIndex = 3;

        if (char === ' ') {
            resStateIndex = 0;
        } else if (char === '+' || char === '-') {
            resStateIndex = 1;
        } else if (numStrArr.includes(char)){
            resStateIndex = 2;
        }

        return resStateIndex;
    };

    // 1）初始化各种值等，特别是 tableMap 的定义！！
    const l = str.length,
        // 状态机的表格形式
        tableMap = {
            'start': ['start', 'signed', 'in_number', 'end'],
            'signed': ['end', 'end', 'in_number', 'end'],
            'in_number': ['end', 'end', 'in_number', 'end'],
            'end': ['end', 'end', 'end', 'end'],
        };

    // state：当前的状态state值
    let state = 'start',
        sign = 1,
        index = 0,
        resValue = 0;

    // 2）不断向后遍历 字符串str ，根据当前遍历到的字符char去不断更新 state、resValue、sign 等值，
    // 当 index >=l || state === 'end' 时，退出遍历
    while (index < l) {
        const char = str[index];
        state = tableMap[state][getStateIndex(char)];
        if (state == 'in_number') {
            resValue = resValue * 10 + parseInt(char);
        } else if (state === 'signed') {
            // 因为 sign 初始化为 1，所以为 '-' 时才有必要处理
            if (char === '-') {
                sign = -1;
            }
        }
        
        index++;
        // 优化：当前state为'end'，就可以退出、不用再遍历
        if (state === 'end') {
            break;
        }
    }
    
    // 3）恢复符号
    resValue *= sign;

    // 4）边界处理
    // 边界1：范围的上下界处理
    resValue = resValue < Math.pow(-2, 31) ? Math.pow(-2, 31) : resValue;
    resValue = resValue > Math.pow(2, 31) - 1 ? Math.pow(2, 31) - 1 : resValue;

    // 5）返回结果
    return resValue;
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