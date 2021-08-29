# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（11）盛最多水的容器

# 导读：
![我的解法很多 且 很 sao，你忍一下~](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-10/1628599234603-image.png)

# 一 题目描述
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-14/1628933655308-image.png)
![题目描述](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-14/1628933692526-image.png)

# 二 解法总览（思维导图）
![思维导图](https://cdn.jsdelivr.net/gh/CYBYOB/img/2021-8-14/1628933737153-%E7%AE%97%E6%B3%95%EF%BC%88leetode%EF%BC%8C%E9%99%84%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%20+%20%E5%85%A8%E9%83%A8%E8%A7%A3%E6%B3%95%EF%BC%89300%E9%A2%98%E4%B9%8B%EF%BC%8811%EF%BC%89%E7%9B%9B%E6%9C%80%E5%A4%9A%E6%B0%B4%E7%9A%84%E5%AE%B9%E5%99%A8.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
var maxArea = function(height) {
    const l = height.length;
    let resMax = Number.NEGATIVE_INFINITY;

    for (let left = 0; left < l-1; left++) {
        for (let right = left + 1; right < l; right++) {
            // 核心：能盛的水容量 = min(左边的高度, 右边的高度) * (左、右的间隔距离)
            const tempVal = Math.min(height[left], height[right]) * (right - left);
            resMax = Math.max(resMax, tempVal);
        }
    }

    return resMax;
}
```

### 2 方案2
1)代码：
```js
var maxArea = function(height) {
    const l = height.length;
    // 1）left = 0、right = l - 1 从2端开始（先保证 它们的间隔尽可能的大）往中间循环缩
    let left = 0,
        right = l - 1,
        resMax = Number.NEGATIVE_INFINITY;

    // 1.1）循环条件：left < right
    while (left < right) {
        // 2）然后 求得当前的面积 tempVal ，更新结果：resMax = Math.max(resMax, tempVal);
        const tempVal = Math.min(height[left], height[right]) * (right - left);
        resMax = Math.max(resMax, tempVal);

        // 3）核心：接着，若 height[left] <= height[right] 则 left++; 否则 right--;
        if (height[left] <= height[right]) {
            left++;
        } else {
            right--;
        }
    }

    // 4）最后返回结果
    return resMax;
}
```

### 3 方案3
1)代码：
```js
var maxArea = function(height) {
    const l = height.length;
    // 1）初始化，dp[i][j] = 0, if i范围在[0, l-1] && j范围在[0, l-1]
    const dp = Array(l).fill(0).map(item => Array(l).fill(0));

    // 1.1）初始化。dp[i][j] = min(height[i][j]) * 1, if j -i == 1（即i、j间隔距离为1）。
    for (let i = 0; i < l - 1; i++) {
        const j = i+1;
        dp[i][j] = Math.min(height[i], height[j]);
    }

    // 2）开始状态转移。需注意循环的边界~
    // 核心：
    // dp[i][j] = Math.max(
    //     Math.min(height[i], height[j]) * tempL,
    //     dp[i + 1][j],
    //     dp[i][j - 1]
    // );
    for (let tempL = 2; tempL < l; tempL++) {
        for (let i = 0; i < l - tempL; i++) {
            const j = i + tempL;

            dp[i][j] = Math.max(
                Math.min(height[i], height[j]) * tempL,
                dp[i + 1][j],
                dp[i][j - 1]
            );
        }
    }

    // 3）根据DP的 状态定义 和 状态转移方程，知 dp[0][l-1] 就是答案
    return dp[0][l-1];
}
```

### 4 方案4
1)代码：
```js
var maxArea = function(height) {
    const l = height.length;
    // 1）初始化，dp[i][j] = 0, if i范围在[0, l-1] && j范围在[0, l-1]
    const dp = Array(l).fill(0).map(item => Array(l).fill(0));

    // 1.1）初始化。dp[i][j] = min(height[i][j]) * 1, if j -i == 1（即i、j间隔距离为1）。
    for (let i = 0; i < l - 1; i++) {
        const j = i+1;
        dp[i][j] = Math.min(height[i], height[j]);
    }

    // 2）开始状态转移。需注意循环的边界~
    // 核心：
    // dp[i][j] = Math.max(
    //     Math.min(height[i], height[j]) * tempL,
    //     dp[i + 1][j],
    //     dp[i][j - 1]
    // );
    for (let tempL = 2; tempL < l; tempL++) {
        for (let i = 0; i < l - tempL; i++) {
            const j = i + tempL;
            // 2.1）优化：增加剪枝的处理
            const tempVal = (height[i] <= height[j]) ? (dp[i + 1][j]) : (dp[i][j - 1]);

            dp[i][j] = Math.max(
                Math.min(height[i], height[j]) * tempL,
                tempVal
            );
        }
    }

    // 3）根据DP的 状态定义 和 状态转移方程，知 dp[0][l-1] 就是答案
    return dp[0][l-1];
}
```

### 5 方案5
1)代码：
```js
var maxArea = function(height) {
    // 1）定义递归函数
    const dfs = (height, i, j) => {
        // 递归的2大部分 —— 递归出口 + 递归函数体
        // 1.1）递归出口。当i、j柱子间隔为1就是出口
        if (j - i === 1) {
            return Math.min(height[i], height[j]);
        }

        // 1.2）函数体。
        const tempVal1 = Math.min(height[i], height[j]) * (j - i);
        const tempVal2 = height[i] <= height[j]
            ? dfs(height, i + 1, j)  // 左边的柱子i 往右缩
            : dfs(height, i, j - 1); // 右边的柱子j 往左缩
        
        return Math.max(tempVal1, tempVal2);
    }

    // 2）调用递归函数并返回结果
    const l = height.length;
    return dfs(height, 0, l - 1);
}
```