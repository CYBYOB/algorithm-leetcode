# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（16）最接近的三数之和

# 导读：
![我的解法很多 且 很 sao，你忍一下~](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-10/1628599234603-image.png)

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-27/1630079306135-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-28/1630119603443-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%8816%EF%BC%89%E6%9C%80%E6%8E%A5%E8%BF%91%E7%9A%84%E4%B8%89%E6%95%B0%E4%B9%8B%E5%92%8C.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “暴力 - 3层for循环”。
// 技巧：虽然穷举是笨方法，但在数据量不是很大的情况下是可以work的。
var threeSumClosest = function(nums, target) {
    const l = nums.length;

    // 1）状态初始化
    // minDiffValue：当前3个数之和 与 target 的差的绝对值。
    let minDiffValue = Number.POSITIVE_INFINITY,
        resSum;

    // 2）核心：3层for循环，穷举所有的可能。
    for (let i = 0; i < l-2; i++) {
        for (let j = i + 1; j < l - 1; j++) {
            for (let k = j + 1; k < l; k++) {
                // 2.1）根据 nums[i] + nums[j] + nums[k] 和 target 计算出 tempDiffValue ，
                // 若 tempDiffValue < minDiffValue
                // 更新 resSum 和 minDiffValue 。
                const tempSum = nums[i] + nums[j] + nums[k];
                const tempDiffValue = Math.abs(tempSum - target);
                if (tempDiffValue < minDiffValue) {
                    resSum = tempSum;
                    minDiffValue = tempDiffValue;
                }
            }
        }
    }

    // 3）返回结果 resSum 。
    return resSum;
};
```

### 2 方案2
1)代码：
```js
// 方案2 排序 + 双指针。
// 技巧：佛说：“有序胜过无序”。
// 通过sort方法（时间复杂度仅为 O(nlogn)）将无序的数组变有序是一件很划算的事情。
var threeSumClosest = function(nums, target) {
    const l = nums.length;

    // 1）状态初始化
    // minDiffValue：当前3个数之和 与 target 的差的绝对值。
    let minDiffValue = Number.POSITIVE_INFINITY,
        resSum;

    // 2）排序
    nums = nums.sort((a, b) => a - b);

    // 3）核心：遍历 + 双指针
    for (let i = 0; i < l - 2; i++) {
        let left = i + 1,
            right = l - 1;

        while (left < right) {
            const tempSum = nums[i] + nums[left] + nums[right];
            const tempDiffValue = Math.abs(tempSum - target);

            // 3.1）若 tempDiffValue < minDiffValue,
            // 则 更新 resSum 和 minDiffValue 值。
            if (tempDiffValue < minDiffValue) {
                resSum = tempSum;
                minDiffValue = tempDiffValue;
            }
            
            // 3.2）根据 当前3个数之和 与 target 的比较，
            // 决定让tempSum 变小（right--） 还是 变大（left--）。【注：因为nums已升序排序】
            if (tempSum < target) {
                left++;
            } else {
                right--;
            }
        }
    }

    // 4）返回结果 resSum 。
    return resSum;
}
```

### 3 方案3
1)代码：
```js
var threeSumClosest = function(nums, target) {
    const l = nums.length;

    // 1）状态初始化
    // minDiffValue：当前3个数之和 与 target 的差的绝对值。
    let minDiffValue = Number.POSITIVE_INFINITY,
        // 优化：多了map。作用：快速判断 “当前3数组合”是否存储过。
        map = new Map(),
        resSum;

    // 2）排序
    nums = nums.sort((a, b) => a - b);

    // 3）核心：遍历 + 双指针，结合 map 快速判断 “当前3数组合”是否存储过。
    for (let i = 0; i < l - 2; i++) {
        let left = i + 1,
            right = l - 1;

        // 优化：若“当前3数组合”已经存储过了，
        // 则 直接continue、进入下一次循环。
        // 若没有，则 map.set(tempStr, 1); 。
        const tempStr = [nums[i], nums[left], nums[right]].join('#');
        if (map.has(tempStr)) {
            continue;
        } else {
            map.set(tempStr, 1);
        }

        while (left < right) {
            const tempSum = nums[i] + nums[left] + nums[right];
            const tempDiffValue = Math.abs(tempSum - target);

            // 3.1）若 tempDiffValue < minDiffValue,
            // 则 更新 resSum 和 minDiffValue 值。
            if (tempDiffValue < minDiffValue) {
                resSum = tempSum;
                minDiffValue = tempDiffValue;
            }
            
            // 3.2）根据 当前3个数之和 与 target 的比较，
            // 决定让tempSum 变小（right--） 还是 变大（left--）。【注：因为nums已升序排序】
            if (tempSum < target) {
                left++;
            } else {
                right--;
            }
        }
    }

    // 4）返回结果 resSum 。
    return resSum;
}
```