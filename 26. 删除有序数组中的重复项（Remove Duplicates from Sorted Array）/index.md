# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（26）删除有序数组中的重复项

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/0e66deef-ac87-414e-9862-d2a2df929bac.png)
![题目描述](https://files.mdnice.com/user/6999/e434b3bb-a7bb-4d6f-99c1-dada65ec7f6d.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/f5e17f79-aa49-4e4a-97fb-630c086b5f5f.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “Set集合去重法”。
// 技巧：涉及“映射、数量、重复性（即去重）、唯一性（即次数）等”可优先考虑hash（JS里对应的是 map数据结构）。

// 步骤：
// 1）状态初始化（使用 Map 数据结构辅助“去重”的实现）。
// 2）遍历 nums ，将未存放入 map 的数值存放入 map 中。
// 3）遍历 map（特性：遍历顺序就之前所存放的顺序） ，依次重置 nums[index] （index从0开始自增） 的值。
// 4）注意：需要删除后续多余的值。
// 5）返回结果 nums.length 。
var removeDuplicates = function(nums) {
    // 1）状态初始化（使用 Map 数据结构辅助“去重”的实现）。
    const l = nums.length;
    let index = 0,
        map = new Map();
        
    // 2）遍历 nums ，将未存放入 map 的数值存放入 map 中。
    while (index < l) {
        if (!map.has(nums[index])) {
            map.set(nums[index], 1);
        }
        index++;
    }

    // 3）遍历 map（特性：遍历顺序就之前所存放的顺序） ，依次重置 nums[index] （index从0开始自增） 的值。
    index = 0;
    for (const [key, val] of map) {
        nums[index] = key;
        index++;
    }

    // 4）注意：需要删除后续多余的值。
    nums.splice(index);

    // 5）返回结果 nums.length 。
    return nums.length;
}
```

### 2 方案2
1)代码：
```js
// 方案2 使用 JS 自带的数组元素删除函数 —— splice 。

// 思路：
// 1）循环、遍历处理。
// 注意：这里循环的条件是 i < nums.length （而且 nums.length 是不断变化的）。
// 2.1）deleteNum：从 下标i 开始需要删除多少个元素 —— nums.lastIndexOf(nums[i]) - nums.indexOf(nums[i])。
// 2.2）核心：循环体内调用 nums.splice(i, deleteNum) 。
// 3）返回结果 nums.length 。
var removeDuplicates = function(nums) {
    // 1）循环、遍历处理。
    // 注意：这里循环的条件是 i < nums.length （而且 nums.length 是不断变化的）。
    for(let i = 0; i < nums.length; i++){
        // 2.1）deleteNum：从 下标i 开始需要删除多少个元素 —— nums.lastIndexOf(nums[i]) - nums.indexOf(nums[i])。
        const deleteNum = nums.lastIndexOf(nums[i]) - nums.indexOf(nums[i]);
        // 2.2）核心：循环体内调用 nums.splice(i, deleteNum) 。
        nums.splice(i, deleteNum);
    }

    // 3）返回结果 nums.length 。
    return nums.length;
};
```

### 3 方案3
1)代码：
```js
// 方案3 “双指针”。

// 思路：
// 1）初始化：“快（fast）、慢（slow）” 2个指针均指向 下标0 。
// 2）当 “快指针” 没有走到尾时，根据不同情况进行处理。
// 2.1）若 当前 “快、慢”指针 所指向的数值一样（nums[slow] === nums[fast]），则 往后拉“快指针”（fast++） 即可。
// 2.2）若 当前 “快、慢”指针 所指向的数值 不一样，则 将当前的“快指针”值 赋给 slow往后一个位值的值 （nums[slow + 1] = nums[fast]）。
// “慢指针”往后一个位置（slow++）。
// 3）返回结果 slow + 1 （因为 slow指向下标，但这里返回数组长度，故需 加1 ）。
var removeDuplicates = function(nums) {
    // 1）初始化：“快（fast）、慢（slow）” 2个指针均指向 下标0 。
    const l = nums.length;
    let slow = fast = 0;

    // 2）当 “快指针” 没有走到尾时，根据不同情况进行处理。
    while (fast < l) {
        // 2.1）若 当前 “快、慢”指针 所指向的数值一样（nums[slow] === nums[fast]），则 往后拉“快指针”（fast++） 即可。
        if (nums[slow] === nums[fast]) {
            fast++;
        }
        // 2.2）若 当前 “快、慢”指针 所指向的数值 不一样，则 将当前的“快指针”值 赋给 slow往后一个位值的值 （nums[slow + 1] = nums[fast]）。
        // “慢指针”往后一个位置（slow++）。
        else {
            nums[slow + 1] = nums[fast];
            slow++;
        }
    }

    // 3）返回结果 slow + 1 （因为 slow指向下标，但这里返回数组长度，故需 加1 ）。
    return slow + 1;
}
```

### 4 方案4
1)代码：
```js
// 方案4 “LeetCode官方的题解”。
// 参考：
// 1）https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/solution/shan-chu-pai-xu-shu-zu-zhong-de-zhong-fu-tudo/

// 思路：
// 1）边界：入参为 [] 时。直接 return 0; 。
// 2）初始化：“快（fast）、慢（slow）” 2个指针均指向 下标1 。
// 3）核心处理：其实最关键的进行跟 nums[fast] 和 nums[fast - 1] 是否相等进行不同的处理！
// 4）返回结果 slow 。
var removeDuplicates = function(nums) {
    const l = nums.length;
    // 注意：下面3行可以去掉，当传入 [] ，此时返回 slow = 1 时也能通过。
    // 不过官方可能是为了编程的严谨性，然后给加上的。
    // 1）边界：入参为 [] 时。直接 return 0; 。
    if (l === 0) {
        return 0;
    }

    // 2）初始化：“快（fast）、慢（slow）” 2个指针均指向 下标1 。
    let fast = 1, slow = 1;
    // 3）核心处理：其实最关键的进行跟 nums[fast] 和 nums[fast - 1] 是否相等进行不同的处理！
    while (fast < l) {
        if (nums[fast] !== nums[fast - 1]) {
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }

    // 4）返回结果 slow 。
    return slow;
};
```

# 四 更多
### 1 刷题进度
```
1）LeetCode：307 / 2390 。

2）《剑指offer》：66 / 66 。

3）相关学习资料与笔记汇总： https://github.com/CYBYOB/algorithm-leetcode/tree/master/资料%26笔记 。

4）注：所有题目均有 2-5种 左右的解法，后续还将不断更新题目 & 题解。
敬请期待~
也欢迎大家进群一起 学习、交流、刷题&拿高薪~
```

![刷题进度](https://files.mdnice.com/user/6999/09201cae-28f0-4062-8a07-03d027f4fc0c.png)


### 2 GitHub - LeetCode项目仓库
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

### 3 作者标签
```
1）“BAT里1名小小的伪全栈工程师，主攻前端，偶尔写点后端”。

2）2019年的微信小程序应用开发赛 - 全国三等奖；
2019CODA比赛 - 前 17/211 强 且 荣获“优秀团队”称号 等。

3）“半自媒体人”，
在校期间、个人公众号（IT三少。新自媒体（公众号）号： 码农三少 ）
在半年内实现了0到5.8K+的粉丝增长等。
```