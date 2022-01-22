# 标题：算法（leetode，附思维导图 + 全部解法）300题之（1）两数之和

# 一 题目描述
![两数之和的题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-5-9/1620527340333-image.png)

# 二 解法总览（思维导图）

![算法（leetode）300题之（1）两数之和【解法思维导图】](https://files.mdnice.com/user/6999/33b3825c-b514-4752-acde-ec4891305ce5.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 不考虑任何复杂度的限制，2层for循环即可
var twoSum = function(nums, target) {
    let l = nums.length;

    // 因为要找2个数，所以 i值最多为 l-2
    for(let i=0; i<l-1; i++) {
        // 因为要找2个数，所以 j值最多为 l-1
        for(let j=i+1; j<l; j++) {
            // 若 当前2个i、j下标 对应的数值相加 正好等于 target，
            // 直接返回当前的 i、j 所组成的数组（因为题目限定必存在唯一答案）
            let sumTmp = nums[i] + nums[j];
            if(sumTmp === target) {
                return [i, j]
            }
        }
    }
};
```

### 2 方案2
1）代码：
```js
// hash法（JS使用 Map数据结构）。“记住，程序 = 数据结构 + 算法”
// 此时，Map是我们的数据结构，具体遍历、判断值等逻辑是我们的算法。
var twoSum = function(nums, target) {
    // 虽然选定了Map结构，但Map是有“key、value”组成
    // 此时我们还需考虑“key、value”的结构（类型值）。
    // 这里 key、value 分别为数组某个具体元素的值、下标
    let l = nums.length,
        m = new Map();

    for(let i=0; i<l; i++) {
        m.set(nums[i], i);
    }

    for(let i=0; i<l-1; i++) {
        let valTmp = target - nums[i],
            idxTmp = m.get(valTmp);
        // 边界：别忘了 2个index 不能相同！（具体为啥大家可以评论区讨论~）
        if(idxTmp !== undefined && i !== idxTmp) {
            return [i, idxTmp];
        }
    }
};
```

### 3 方案3（方案2的优化版）
1）代码：
```js
// 优化的核心：遍历次数从2降到1。

// hash法（JS使用 Map数据结构）。“记住，程序 = 数据结构 + 算法”
// 此时，Map是我们的数据结构，具体遍历、判断值等逻辑是我们的算法。
var twoSum = function(nums, target) {
    // 虽然选定了Map结构，但Map是有“key、value”组成
    // 此时我们还需考虑“key、value”的结构（类型值）。
    // 这里 key、value 分别为数组某个具体元素的值、下标
    let l = nums.length,
        m = new Map();

    for(let i=0; i<l; i++) {
        let valTmp = target - nums[i],
            idxTmp = m.get(valTmp);
        // 边界：别忘了 2个index 不能相同！（具体为啥大家可以评论区讨论~）
        if(idxTmp !== undefined && i !== idxTmp) {
            // 不同：因为1遍遍历，所以下标可能需要调整（因为可能i > idxTmp）
            // 但实际上，其实 [1, 2] 和 [2, 1] 都能通过
            return [i, idxTmp];
        }
        // 优化：下面一行代码不放最前面，因为若当前找到了，就不用再 m.set 了
        m.set(nums[i], i);
    }
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