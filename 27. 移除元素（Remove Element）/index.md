# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（27）移除元素

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/83dc828e-a148-4189-bde0-73a1356bb154.png)
![题目描述](https://files.mdnice.com/user/6999/0b510a83-2c9e-4a9c-9162-ea489c4be3cf.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/9ee7550f-21d2-442d-b0b0-ba6e02c884ad.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “无视题目要求，使用新数组 resList 作为空间存储（非 O(1) 的额外空间）”。

// 思路：
// 1）遍历 nums ，将值为 val 的元素过滤掉，然后没过滤的依次存放在 数组 resList 里。
// 2）遍历 resList ，依次执行 nums[i] = resList[i] （0 <= i < resList.length）。
// 3）返回结果 resLength 。
var removeElement = function(nums, val) {
    // 1）遍历 nums ，将值为 val 的元素过滤掉，然后没过滤的依次存放在 数组 resList 里。
    const resList = nums.filter(item => item !== val),
        resLength = resList.length;
    
    // 2）遍历 resList ，依次执行 nums[i] = resList[i] （0 <= i < resList.length）。
    for (let i = 0; i < resLength; i++) {
        nums[i] = resList[i];
    }

    // 3）返回结果 resLength 。
    return resLength;
}
```

### 2 方案2
1)代码：
```js
// 方案2 “遍历数组 + 使用JS数组自带的 splice 方法进行元素的删除”。

// 思路：
// 1）遍历 nums 。
// 1.1）若 当前下标的指向的值 为 val，则 删除（使用JS数组自带的 splice 方法）该数 。
// 注意：此时需要将 i 进行 减1 操作！！
// 2）返回结果 nums.length; 。
var removeElement = function(nums, val) {
    let l = nums.length;
    // 1）遍历 nums 。
    for (let i = 0; i < l; i++) {
        // 1.1）若 当前下标的指向的值 为 val，则 删除（使用JS数组自带的 splice 方法）该数 。
        // 注意：此时需要将 i 进行 减1 操作！！
        if (val === nums[i]) {
            nums.splice(i, 1);
            i--;
        }
    }

    // 2）返回结果 nums.length; 。
    return nums.length;
};
```

### 3 方案3
1)代码：
```js
// 方案3 “双指针 - 1”。

// 思路：
// 1）初始化：left = 0, right = l-1 。
// 2）循环处理：left <= right 时。
// 2.1）若 左指针指向的值不为 val 时，则 left++（“为了寻到下一个可以存放 不为val值的 nums[right] ”）
// 2.2）若 右指针指向的值为 val 时，则 right--（“舍弃”）。
// 2.3）当 左指针的值为 val && 右指针的值为 不为 val ，则 “互换” 。
// 3）返回结果 left 。
var removeElement = function(nums, val) {
    // 1）初始化：left = 0, right = l-1 。
    const l = nums.length;
    let left = 0,
        right = l-1;

    // 2）循环处理：left <= right 时。
    while (left <= right) {
        // 2.1）若 左指针指向的值不为 val 时，则 left++（“为了寻到下一个可以存放 不为val值的 nums[right] ”）
        if (nums[left] !== val) {
            left++
        }
        // 2.2）若 右指针指向的值为 val 时，则 right--（“舍弃”）。
        else if (nums[right] === val) {
            right--;
        }
        // 2.3）当 左指针的值为 val && 右指针的值为 不为 val ，则 “互换” 。
        else if ((nums[left] === val) && (nums[right] !== val)) {
            // 注意：JS的“特殊语法糖”，交换2个数。
            [nums[right], nums[left]] = [nums[left], nums[right]];
            left++;
            right--;
        }
    }

    // 3）返回结果 left 。
    return left;
}
```

### 4 方案4
1)代码：
```js
// 方案4 “双指针 - 2”

// 思路：
// 1）初始化：left = 0, right = 0 。
// 2）循环处理：当 right < l 时。
// 2.1）若 nums[left] !== val && nums[right] !== val ，则 left++; right++; 
// 2.2）若 nums[left] === val，则 “不断将 right 往后拉”，找到可以换 nums[left] 的 nums[right] 。
// 3）返回结果 left 。
var removeElement = function(nums, val) {
    // 1）初始化：left = 0, right = 0 。
    const l = nums.length;
    let left = 0,
        right = 0;
    
    // 2）循环处理：当 right < l 时。
    while (right < l) {
        // 2.1）若 nums[left] !== val && nums[right] !== val ，则 left++; right++; 
        if (nums[left] !== val && nums[right] !== val) {
            left++;
            right++;
        }
        // 2.2）若 nums[left] === val，则 “不断将 right 往后拉”，找到可以换 nums[left] 的 nums[right] 。
        else if (nums[left] === val) {
            while ((right < l) && nums[right] === val) {
                right++;
            }
            if (right < l) {
                [nums[right], nums[left]] = [nums[left], nums[right]];
                left++;
                right++;
            }
        }
    }

    // 3）返回结果 left 。
    return left;
}
```

# 四 更多
### 1 GitHub - LeetCode项目仓库
```
0）本项目地址： https://github.com/CYBYOB/algorithm-leetcode 。
目标、愿景：
让每个人都能拥有一定的算法能力、以应对面试中（会举一反三的同学还可以将其融入自己的肌肉和血液，甚至能够赋能于公司的业务和技术）的算法。

1）项目的根目录下的 README.md 文件，
可以帮您快速查阅每1道题的来源、难度、所有的题解方案等。

2）而每个题解（即 index.md 文件）中，
还将附带题目描述、所有的题解方案的思维导图（ .xmind 文件）、思路和技巧等。

3）每种题解方案都有详细的注释，
通过“数字步骤”将抽象的算法逻辑、
清晰和有层次的展示于您的面前。
可以说是，
开箱即用~

4）所有的题解方案都是经过作者1人之手，
故代码风格及其统一。
一旦阅读达到一定量后，
后续将大大提升您的阅读速度 —— “正所谓、量变引起质变”。

5）本人每周仍在不断的更新 —— 保证每周都有新的题目、题解方案刺激着您的神经 和 刷题欲望。
欢迎对算法感兴趣的同学加入我们的社群。
QQ群： 933919972 ；
作者QQ： 1520112971 ；
作者VX： c13227839870（可拉您进群、一起学习与交流~） 。
```

![GitHub：algorithm-leetcode - 项目亮点](https://files.mdnice.com/user/6999/772fafdd-76ab-4e0c-a1f9-34e65ac63fad.png)

![GitHub：algorithm-leetcode - 题目总览](https://files.mdnice.com/user/6999/7b92db4c-d5d3-4558-8003-284d3e24b86b.png)

### 2 作者标签
```
1）“伪全栈工程师，主攻前端，偶尔写点后端”。

2）2019年的微信小程序应用开发赛 - 全国三等奖；
2019CODA比赛 - 前 17/211 强 且 荣获“优秀团队”称号 等。

3）“半自媒体人”，
在校期间、个人公众号（IT三少。新自媒体（公众号）号： 码农三少 ）
在半年内实现了0到5.8K+的粉丝增长等。
```