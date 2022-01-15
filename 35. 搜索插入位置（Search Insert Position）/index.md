# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（35）搜索插入位置

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/79ce1262-6a0d-40b5-b5c2-328b8813ae62.png)
![题目描述](https://files.mdnice.com/user/6999/4adc4aaf-3e0e-41dc-a2c1-5a469497ea05.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/d5442119-ae21-4813-acfa-e8a4165efc45.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “无视要求，遍历法”

// 思路：
// 1）状态初始化
// 2）核心处理：遍历 nums ，若此时 nums[i] >= target ，则 直接return i;
// 3）边界：遍历结束，没找到 nums[i] >= target ，则 return l; （即插入 nums 末尾）。
var searchInsert = function(nums, target) {
    // 1）状态初始化
    const l = nums.length;

    // 2）核心处理：遍历 nums ，若此时 nums[i] >= target ，则 直接return i;
    for (let i = 0; i < l; i++) {
        if (nums[i] >= target) {
            return i;
        }
    }
    
    // 3）边界：遍历结束，没找到 nums[i] >= target ，则 return l; （即插入 nums 末尾）。
    return l;
};
```

### 2 方案2
1)代码：
```js
// 方案2 “二分法（开辟多余的空间 —— map，避免死循环）”。
// 技巧：善用利用提示 —— 1）nums 为无重复元素的升序排列数组。 2）时间复杂度为 O(log n) 的算法 —— “二分法”。

// 思路：
// 1）状态初始化
// 注：使用 map 进行“辅助性的判断、不然会陷入死循环” —— case：nums = [1,3,5,6], target = 2 。
// 2.1）边界：往 头、尾 插入
// 2.2）正常、进行二分法
var searchInsert = function(nums, target) {
    // 1）状态初始化
    // 注：使用 map 进行“辅助性的判断、不然会陷入死循环” —— case：nums = [1,3,5,6], target = 2 。
    const l = nums.length;
    let left = 0,
        right = l - 1,
        map = new Map();

    // 2.1）边界：往 头、尾 插入
    if (target <= nums[left]) {
        return 0;
    }
    else if (target === nums[right]){
        return l - 1;
    }
    else if (target > nums[right]){
        return l;
    }
    // 2.2）正常、进行二分法
    else {
        while (left <= right) {
            const tempStr = `${left}#${right}`;
            if (map.has(tempStr)) {
                return left + 1;
            }
            else {
                map.set(tempStr, 1)
            }

            let mid = parseInt((left + right) / 2);
            if (nums[mid] === target) {
                return mid;
            }
            else if (nums[mid] > target) {
                right = mid;
            }
            else {
                left = mid;
            }
        }
    }
}
```

### 3 方案3
1)代码：
```js
// 方案3 “二分法，不使用额外的空间 —— map”
// 技巧：若 nums[pos−1]<target≤nums[pos] ，则 pos 就是我们预期的下标。

// 思路：
// 1）状态初始化
// 2）核心处理：不断根据 nums[mid] 、 target 的大小关系，调整 left、right 值
// 3）返回结果 resIndex 
var searchInsert = function(nums, target) {
    // 1）状态初始化
    const l = nums.length;
    let left = 0,
        right = l - 1,
        resIndex = l;
    
    // 2）核心处理：不断根据 nums[mid] 、 target 的大小关系，调整 left、right 值
    while (left <= right) {
        // 注：等同于 const mid = ((right - left) >> 1) + left;
        const mid = parseInt((left + right) / 2);
        if (nums[mid] >= target) {
            resIndex = mid;
            right = mid - 1;
        }
        else {
            left = mid + 1;
        }
    }

    // 3）返回结果 resIndex 
    return resIndex;
}
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