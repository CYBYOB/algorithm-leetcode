
// 1
// 它有至少 8 个字符。
// 至少包含 一个小写英文 字母。
// 至少包含 一个大写英文 字母。
// 至少包含 一个数字 。
// 至少包含 一个特殊字符 。特殊字符为："!@#$%^&*()-+" 中的一个。
// 它 不 包含 2 个连续相同的字符（比方说 "aab" 不符合该条件，但是 "aba" 符合该条件）。
var strongPasswordCheckerII = function(password = '') {
    const getIsNotSameContinue = (str = '') => {
        const l = str.length;
        let resFlag=  true;

        for (let i = 0; i < l - 1; i++) {
            const [left, right] = [str[i], str[i + 1]]
            if (left === right) {
                resFlag = false;
                break;
            }
        }

        return resFlag;
    };

    const l = password.length,
        specMap = new Map([
            ['!', 1],
            ['@', 1],
            ['#', 1],
            ['$', 1],
            ['%', 1],
            ['^', 1],
            ['&', 1],
            ['*', 1],
            ['(', 1],
            [')', 1],
            ['-', 1],
            ['+', 1],
        ]);
    let hasLowwer = false,
        hasUpper = false,
        hasNumber = false,
        hasSpec = false,
        isNotSameContinue = getIsNotSameContinue(password);
    
    for (let i = 0; i < l; i++) {
        const tempVal = password[i];
        if (tempVal >= 'a' && tempVal <= 'z') {
            hasLowwer = true;
        }
        if (tempVal >= 'A' && tempVal <= 'Z') {
            hasUpper = true;
        }
        if (parseInt(tempVal) + '' === tempVal) {
            hasNumber = true;
        }
        if (specMap.has(tempVal)) {
            hasSpec = true;
        }
    }

    console.log((l >= 8) ,hasLowwer , hasUpper , hasNumber , hasSpec , isNotSameContinue);

    return (l >= 8) && hasLowwer && hasUpper && hasNumber && hasSpec && isNotSameContinue;
};


// 2
// 输入：spells = [5,1,3], potions = [1,2,3,4,5], success = 7
// 输出：[4,0,3]
// 解释：
// - 第 0 个咒语：5 * [1,2,3,4,5] = [5,10,15,20,25] 。总共 4 个成功组合。
// - 第 1 个咒语：1 * [1,2,3,4,5] = [1,2,3,4,5] 。总共 0 个成功组合。
// - 第 2 个咒语：3 * [1,2,3,4,5] = [3,6,9,12,15] 。总共 3 个成功组合。
// 所以返回 [4,0,3] 。
var successfulPairs = function(spells = [], potions = [], success = 0) {
    const spellsLength = spells.length,
        potionsLength = potions.length;
    let resList = [];

    // 排序
    potions.sort((a, b) => a - b);
// console.log(potions);

    for (let i = 0; i < spellsLength; i++) {
        // 二分
        const target = (success / spells[i]);
        let left = 0,
            right = potionsLength - 1,
            tempCount = 0;
        
        while (left <= right) {
            const mid = Math.floor((right + left) / 2),
                midVal = potions[mid];
            
            if (midVal === target) {
                left = mid;
                // 边界
                while (left - 1 >= 0 && potions[left - 1] === target) {
                    left--;
                }
                break;
            }
            else if (midVal < target) {
                left = mid + 1;
            }
            else {
                right = mid - 1;
            }
        }

        tempCount = (potionsLength - left);
        
        resList.push(tempCount);
    }
    
    return resList;
};

// var successfulPairs = function(spells = [], potions = [], success = 0) {
//     const spellsLength = spells.length,
//         potionsLength = potions.length;
//     let resList = [];

//     for (let i = 0; i < spellsLength; i++) {
//         let tempCount = 0;
//         for (let j = 0; j < potionsLength; j++) {
//             const tempVal = spells[i] * potions[j];
//             if (tempVal >= success) {
//                 tempCount++;
//             }
//         }
//         resList.push(tempCount);
//     }

//     return resList;
// };


// 3 
// 输入：s = "fool3e7bar", sub = "leet", mappings = [["e","3"],["t","7"],["t","8"]]
// 输出：true
// 解释：将 sub 中第一个 'e' 用 '3' 替换，将 't' 用 '7' 替换。
// 现在 sub = "l3e7" ，它是 s 的子字符串，所以我们返回 true 。
var matchReplacement = function(s = '', sub = '', mappings = []) {

};
const s = "fool3e7bar",
    sub = "leet",
    mappings = [["e","3"],["t","7"],["t","8"]];

matchReplacement(s, sub, mappings)


// 4
// 输入：nums = [2,1,4,3,5], k = 10
// 输出：6
// 解释：
// 有 6 个子数组的分数小于 10 ：
// - [2] 分数为 2 * 1 = 2 。
// - [1] 分数为 1 * 1 = 1 。
// - [4] 分数为 4 * 1 = 4 。
// - [3] 分数为 3 * 1 = 3 。 
// - [5] 分数为 5 * 1 = 5 。
// - [2,1] 分数为 (2 + 1) * 2 = 6 。
// 注意，子数组 [1,4] 和 [4,3,5] 不符合要求，因为它们的分数分别为 10 和 36，但我们要求子数组的分数严格小于 10 。
// “前缀和”

// [2,1,3]
// (2) * (1) = 2 * 1
// (2 + 1) * (2) = 2 * 1 +    1 * (1 + 1)
// (2 + 1 + 3) * (3) = (2 + 1) * (2) * 3/2 + 

// 二分查找？？
var countSubarrays = function(nums = [], k = 0) {
    const l = nums.length;
    let resCount = 0,
        tempList = [];

    // 
    for (let i = 0; i < l; i++) {
        let tempSum = nums[i] * 1;
        if (tempSum >= k) {
            continue;
        }
        else {
            resCount++;
            // console.log(tempList = nums.slice(i, i + 1))
            // debugger

            for (let j = i + 1; j < l; j++) {
                let tempVal = nums[j];
                tempSum += (tempSum / (j - i) + tempVal * (j - i + 1));
                
                // if (nums[i] === 2) {
                //     console.log(tempSum);
                //     debugger
                // }
                if (tempSum >= k) {
                    break;
                }
                else {
                    resCount++;
                    // console.log(tempList = nums.slice(i, j + 1))
                    // debugger
                }
            }
        }
    }

    return resCount;
};


// // 注：通过 153 / 167 ，会超时！！
// var countSubarrays = function(nums = [], k = 0) {
//     const l = nums.length;
//     let resCount = 0,
//         tempList = [];

//     // 
//     for (let i = 0; i < l; i++) {
//         let tempSum = nums[i] * 1;
//         if (tempSum >= k) {
//             continue;
//         }
//         else {
//             resCount++;
//             // console.log(tempList = nums.slice(i, i + 1))
//             // debugger

//             for (let j = i + 1; j < l; j++) {
//                 let tempVal = nums[j];
//                 tempSum += (tempSum / (j - i) + tempVal * (j - i + 1));
                
//                 // if (nums[i] === 2) {
//                 //     console.log(tempSum);
//                 //     debugger
//                 // }
//                 if (tempSum >= k) {
//                     break;
//                 }
//                 else {
//                     resCount++;
//                     // console.log(tempList = nums.slice(i, j + 1))
//                     // debugger
//                 }
//             }
//         }
//     }

//     return resCount;
// };

const nums = [5,2,6,8,9,7],
    k = 50;
countSubarrays(nums, k)