# 零 标题：算法（leetode，附思维导图 + 全部解法）300题之（29）两数相除

# 一 题目描述
![题目描述](https://files.mdnice.com/user/6999/daf7803a-9d9e-4b25-b41d-0b4926430bf4.png)
![题目描述](https://files.mdnice.com/user/6999/cdaa2679-39a7-4623-a9f3-1e23ea30f4a4.png)

# 二 解法总览（思维导图）
![思维导图](https://files.mdnice.com/user/6999/a7e43538-53bc-41c6-a9e5-61c1b1222296.png)

# 三 全部解法
### 1 方案1
1)代码：
```js
// 方案1 “无视要求：使用乘、除等”。

// 思路：
// 1）初始化：直接使用 除法 resValue = parseInt(dividend / divisor) 。
// 2）溢出判断：若 resValue 不在 范围 [−231,  231 − 1] 中，则 resValue = Math.pow(2, 31) - 1 。
// 3）返回结果 resValue 。
var divide = function(dividend, divisor) {
    // 1）初始化：直接使用 除法 resValue = parseInt(dividend / divisor) 。
    let resValue = parseInt(dividend / divisor);
    
    // 2）边界：若 resValue 不在 范围 [−231,  231 − 1] 中，则 resValue = Math.pow(2, 31) - 1 。
    if (resValue < (Math.pow(-2, 31)) || resValue > (Math.pow(2, 31) - 1)) {
        resValue = Math.pow(2, 31) - 1;
    }
    
    // 3）返回结果 resValue 。
    return resValue;
};
```

### 2 方案2
1)代码：
```js
// 方案2 “减法”

// 技巧：用不了乘、除、mod，就考虑减法（“在一定程度上，除法也是一种减法”）。

// 思路：
// 1）初始化：resValue = 0; 。
// 2）核心：根据4种情况，分别进行处理 —— dividend -= divisor; resValue++;
// 3）边界：结果溢出 —— 如 -2147483648、-1 组合。
// 4）返回结果 resValue 。
var divide = function(dividend, divisor) {
    // 1）初始化：resValue = 0; 。
    const MAX = Math.pow(2, 31) -1;
    let resValue = 0;

    // 2）核心：根据4种情况，分别进行处理 —— dividend -= divisor; resValue++;
    if (dividend > 0 && divisor > 0) {
        // 边界：4个while里的条件是 含有= 的，别忘了！
        while(dividend >= divisor) {
            dividend -= divisor;
            resValue++;
        }
    }
    else if (dividend < 0 && divisor < 0) {
        while(dividend <= divisor) {
            dividend -= divisor;
            resValue++;
        }
    }
    else if (dividend > 0 && divisor < 0) {
        divisor = Math.abs(divisor);
        while(dividend >= divisor) {
            dividend -= divisor;
            resValue--;
        }
    }
    else if (dividend < 0 && divisor > 0) {
        dividend = Math.abs(dividend);
        while(dividend >= divisor) {
            dividend -= divisor;
            resValue--;
        }
    }

    // 3）边界：结果溢出 —— 如 -2147483648、-1 组合。
    if (resValue > MAX) {
        resValue = MAX;
    }

    // 4）返回结果 resValue 。
    return resValue;
}
```

### 3 方案3
1)代码：
```js
// 方案3 “官方的二分查找”。

// 参考：
// 1）https://leetcode-cn.com/problems/divide-two-integers/solution/liang-shu-xiang-chu-by-leetcode-solution-5hic/
// TODO：待加详细注释~
var divide = function(dividend, divisor) {
    // 快速乘
    const quickAdd = (y, z, x) => {
        // x 和 y 是负数，z 是正数
        // 需要判断 z * y >= x 是否成立
        let result = 0, add = y;
        while (z !== 0) {
            if ((z & 1) !== 0) {
                // 需要保证 result + add >= x
                if (result < x - add) {
                    return false;
                }
                result += add;
            }
            if (z !== 1) {
                // 需要保证 add + add >= x
                if (add < x - add) {
                    return false;
                }
                add += add;
            }
            // 不能使用除法
            z >>= 1;
        }
        return true;
    };

    const MAX_VALUE = 2 ** 31 - 1, MIN_VALUE = -(2 ** 31);
    // 考虑被除数为最小值的情况
    if (dividend === MIN_VALUE) {
        if (divisor === 1) {
            return MIN_VALUE;
        }
        if (divisor === -1) {
            return MAX_VALUE;
        }
    }
    // 考虑除数为最小值的情况
    if (divisor === MIN_VALUE) {
        return dividend === MIN_VALUE ? 1 : 0;
    }
    // 考虑被除数为 0 的情况
    if (dividend === 0) {
        return 0;
    }
    
    // 一般情况，使用二分查找
    // 将所有的正数取相反数，这样就只需要考虑一种情况
    let rev = false;
    if (dividend > 0) {
        dividend = -dividend;
        rev = !rev;
    }
    if (divisor > 0) {
        divisor = -divisor;
        rev = !rev;
    }
    
    let left = 1, right = MAX_VALUE, ans = 0;
    while (left <= right) {
        // 注意溢出，并且不能使用除法
        const mid = left + ((right - left) >> 1);
        const check = quickAdd(divisor, mid, dividend);
        if (check) {
            ans = mid;
            // 注意溢出
            if (mid === MAX_VALUE) {
                break;
            }
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return rev ? -ans : ans;
}
```

### 4 方案4
1)代码：
```js
// 方案4 “官方的类二分查找”。

// 参考：
// 1）https://leetcode-cn.com/problems/divide-two-integers/solution/liang-shu-xiang-chu-by-leetcode-solution-5hic/
// TODO：待加详细注释~
var divide = function(dividend, divisor) {
    const MAX_VALUE = 2 ** 31 - 1, MIN_VALUE = -(2 ** 31);
    // 考虑被除数为最小值的情况
    if (dividend === MIN_VALUE) {
        if (divisor === 1) {
            return MIN_VALUE;
        }
        if (divisor === -1) {
            return MAX_VALUE;
        }
    }
    // 考虑除数为最小值的情况
    if (divisor === MIN_VALUE) {
        return dividend === MIN_VALUE ? 1 : 0;
    }
    // 考虑被除数为 0 的情况
    if (dividend === 0) {
        return 0;
    }
    
    // 一般情况，使用类二分查找
    // 将所有的正数取相反数，这样就只需要考虑一种情况
    let rev = false;
    if (dividend > 0) {
        dividend = -dividend;
        rev = !rev;
    }
    if (divisor > 0) {
        divisor = -divisor;
        rev = !rev;
    }

    const candidates = [divisor];
    let index = 0;
    // 注意溢出
    while (candidates[index] >= dividend - candidates[index]) {
        candidates.push(candidates[index] + candidates[index]);
        ++index;
    }
    let ans = 0;
    for (let i = candidates.length - 1; i >= 0; --i) {
        if (candidates[i] >= dividend) {
            ans += 1 << i;
            dividend -= candidates[i];
        }
    }

    return rev ? -ans : ans;
};
```