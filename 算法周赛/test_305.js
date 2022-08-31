
// 1
// 输入：nums = [0,1,4,6,7,10], diff = 3
// 输出：2
// 解释：
// (1, 2, 4) 是算术三元组：7 - 4 == 3 且 4 - 1 == 3 。
// (2, 4, 5) 是算术三元组：10 - 7 == 3 且 7 - 4 == 3 。
/**
 * @param {number[]} nums
 * @param {number} diff
 * @return {number}
 */
var arithmeticTriplets = function(nums, diff) {
    const l = nums.length;
    let n = 1;

    for (let i = 0; i < l - 2; i++) {
        for (let j = i + 1; i < l - 1; j++) {
            for (let k = j + 1; k < l; k++) {
                const [a, b, c] = [nums[i], nums[j], nums[k]];
                if ((c - b === diff) && (b - a === diff)) {
                    n++;
                }
            }
        }
    }

    return n;
};
const nums = [0,1,4,6,7,10], diff = 3,
    t_1 = arithmeticTriplets(nums, diff);
debugger




// 2




// 3
// 输入：nums = [4,4,4,5,6]
// 输出：true
// 解释：数组可以划分成子数组 [4,4] 和 [4,5,6] 。
// 这是一种有效划分，所以返回 true 。




// 4
// 输入：s = "acfgbd", k = 2
// 输出：4
// 解释：最长理想字符串是 "acbd" 。该字符串长度为 4 ，所以返回 4 。
// 注意 "acfgbd" 不是理想字符串，因为 'c' 和 'f' 的字母表位次差值为 3 。
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestIdealString = function(s, k) {
    const l = s.length;
    let dp = [[1, s[0]]];

    for (let i = 1; i < l; i++) {
        const tempC = s[i];
        dp[i] = [1, tempC]
        for (let j = 0; j < i; j++) {
            const [preL, preC] = dp[j],
                [curL, curC] = dp[i];

            if (Math.abs(curC.charCodeAt() - preC.charCodeAt()) <= k) {
                if (curL < preL + 1) {
                    dp[i] = [preL + 1, curC];
                }
            }
        }
    }

    console.log(dp);

    return Math.max(...dp.map(v => v[0]));
};
const s = "acfgbd", k = 2,
    t_2 = longestIdealString(s, k);
debugger


