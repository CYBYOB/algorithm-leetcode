# 标题：算法（leetode，附思维导图 + 全部解法）300题之（1）两数之和

# 一 题目描述
![两数之和的题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-5-9/1620527340333-image.png)

# 二 解法总览（思维导图）
![算法（leetode）300题之（1）两数之和【解法思维导图】](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-5-9/1620535666765-算法（leetode）300题之（1）两数之和.svg)

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