# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（18）四数之和

# 导读：
![我的解法很多 且 很 sao，你忍一下~](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-10/1628599234603-image.png)

# 作者简介
### 1 作者简历
![作者简历](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630133245439-image.png)
![2019年的微信小程序应用开发赛-全国三等奖](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630133461339-image.png)

### 2 作者标签
```
1）“伪全栈工程师，主攻前端，偶尔写点后端”。

2）2019年的微信小程序应用开发赛 - 全国三等奖；
2019CODA比赛 - 前 17/211 强 且 荣获“优秀团队”称号 等。

3）“半自媒体人”，在校期间、个人公众号（IT三少。新自媒体（公众号）号： 码农三少 ）在半年内实现了0到5.8K+的粉丝增长等。
```
![自媒体-粉丝数据（半年内实现了0到5.8K+的粉丝增长）](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630134068710-%E7%B2%89%E4%B8%9D-%E6%95%B0%E6%8D%AE.jpg)

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630132357344-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-29/1630222548251-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%8818%EF%BC%89%E5%9B%9B%E6%95%B0%E4%B9%8B%E5%92%8C.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “暴力”。
// 先排序，再4层for循环、穷举所有的可能。
// 超时，通过 282 / 286 。
var fourSum = function(nums, target) {
    const l = nums.length;
    
    // 1）排序。
    nums = nums.sort((a, b) => a - b);

    // 2）状态初始化。
    let map = new Map(),
        resArr = [];

    // 3）核心：4层for循环、穷举所有的可能。
    for (let i = 0; i < l-3; i++) {
        for (let j = i + 1; j < l-2; j++) {
            for (let k = j + 1; k < l-1; k++) {
                for (let z = k + 1; z < l; z++) {
                    const tempSum = nums[i] + nums[j] + nums[k] + nums[z],
                        tempStr = [nums[i], nums[j], nums[k], nums[z]].join('#');
                    
                    // 3.1）判断“当前4个数组合的和” 是否等于 target 且 之前没有存储过。
                    if (tempSum === target && !map.has(tempStr)) {
                        resArr.push([nums[i], nums[j], nums[k], nums[z]]);
                        map.set(tempStr, 1);
                    }
                }
            }
        }
    }

    // 4）返回结果 resArr 。
    return resArr;
};
```

### 2 方案2
1)代码：
```js
// 方案2 “方案1的优化版”。
// 原先的4层for循环 --> 2层for循环 + 双指针 。
// 技巧：“有序胜过无序”。
// 通过sort方法（时间复杂度仅为 O(nlogn)）将无序的数组变有序是一件很划算的事情。
// 要想使用双指针等，必须先排序、使其变有序。
var fourSum = function(nums, target) {
    const l = nums.length;
    
    // 1）排序。
    nums = nums.sort((a, b) => a - b);

    // 2）状态初始化。
    let map = new Map(),
        resArr = [];

    // 3）核心：2层for循环 + 双指针 。
    for (let i = 0; i < l-3; i++) {
        for (let j = i + 1; j < l-2; j++) {
            let left = j + 1,
                right = l-1;
            
            while (left < right) {
                const tempSum = nums[i] + nums[j] + nums[left] + nums[right],
                    tempStr = [nums[i], nums[j], nums[left], nums[right]].join('#');

                // 3.1）判断“当前4个数组合的和” 是否等于 target 且 之前没有存储过。
                if (tempSum === target) {
                    if (!map.has(tempStr)) {
                        resArr.push([nums[i], nums[j], nums[left], nums[right]]);
                        map.set(tempStr, 1);
                    }

                    // 3.2）核心：若 tempSum === target ，
                    // 则下一次的可能结果必须得让 left、right 各往中间至少走一步，不然组合必重复！
                    left++;
                    right--;
                } else if (tempSum < target){
                    left++;
                } else {
                    right--;
                }
            }
        }
    }

    // 4）返回结果 resArr 。
    return resArr;
};
```

### 3 方案3
1)代码：
```js
// 方案3 回溯（说白了、说穿了，就是递归。因为一般用递归实现回溯）。
// 本质：跟4层for循环差不多，可能的区别会体现在代码的可读性上。
// 超时，通过 268 / 286 。
var fourSum = function(nums, target) {
    // 技巧：永远记住，递归 = 递归出口（为了不陷入无线递归的死循环） + 递归主体（一般会变更一些参数后，在调用函数本身）。
    // 一般 递归出口 放前面， 递归主体 放后面。
    // 1）递归
    const dfs = (index, l, curArr, resArr, nums, target) => {
        const curLength = curArr.length;
        // 1.1）递归出口。
        // 边界：是 index > l ，而不是 index >= l（这样会遗漏答案，case：[1,0,-1,0,-2,2] 0 ）。
        if (index > l || curLength > 4) {
            return;
        }

        // 1.2）递归主体
        if (curLength === 4) {
            const tempSum = curArr.reduce((acc, cur) => {
                acc += cur;
                return acc;
            }, 0),
                tempStr = curArr.join('#');
            
            // 判断“当前4个数组合的和” 是否等于 target 且 之前没有存储过。
            if (tempSum === target) {
                if (!map.has(tempStr)) {
                    resArr.push(curArr.slice());
                    map.set(tempStr, 1);
                }
            }
        } else if (curLength < 4) {
            // 技巧：回溯的核心 = 选 + 不选 。
            // 1.2.1）选
            curArr.push(nums[index]);
            dfs(index + 1, l, curArr, resArr, nums, target);
            // 1.2.1）不选
            curArr.pop();
            dfs(index + 1, l, curArr, resArr, nums, target);
        }
    };

    // 2）排序。
    nums = nums.sort((a, b) => a - b);

    // 3）状态初始化。
    const l = nums.length;
    let index = 0,
        map = new Map(),
        curArr = [],
        resArr = [];

    // 4）调用 回溯函数 —— dfs递归。
    dfs(index, l, curArr, resArr, nums, target);

    // 5）返回结果 resArr 。
    return resArr;
}
```

### 4 方案4
1)代码：
```js
// 方案4 “方案3（回溯）的优化版” —— 剪枝。
// TODO：暂时想不出，跳过。
// case：[-477,-476,-471,-462,-440,-400,-398,-394,-394,-393,-389,-386,-350,-346,-338,-315,-273,-249,-182,-172,-166,-161,-149,-116,-112,-109,-100,-73,-33,-26,-22,-11,6,8,13,19,56,78,101,102,111,140,155,158,181,205,211,225,232,242,254,265,281,308,310,320,320,364,366,381,385,387,443,496,496]
// 1236
var fourSum = function(nums, target) {
    // TODO：暂时想不出，跳过。
}
```