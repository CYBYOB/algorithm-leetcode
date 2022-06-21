

// 顺丰03. 收件节节高
// 输入：[54,42,62,75,82,86,86]
// 输出：5
// 解释:
// 小哥A最近一周的收件数分别是：54,42,62,75,82,86,86，那么小哥A在这周的日收件最大连续增长天数是5
// - 小哥A在这周第2天开始到第6天的日收件数都是在增长
// - 第7天与第6天收件数一样，不算增长

const { deflateSync } = require("zlib");

// 方案1 “自己。滑动窗口法”。
// var findMaxCI = function(nums = []) {
//     const sameList = (listA = [], listB = []) => {
//         const l = listA.length;
//         let resFlag = true;

//         for (let i = 0; i < l; i++) {
//             if (listA[i] !== listB[i]) {
//                 resFlag = false;
//                 break;
//             }
//         }

//         return resFlag;
//     };

//     const l = nums.length;

//     for (let tempL = l; tempL >= 0; tempL--) {
//         for (let left = 0; left <= (l - tempL); left++) {
//             const right = (tempL - left + 2),
//                 subList = nums.slice(left, right),
//                 sortedSubList = [...new Set(nums.slice(left, right))].sort((a, b) => a - b);
//             if (sameList(subList, sortedSubList)) {
//                 return tempL;
//             }
//         }
//     }
// };


// 方案2 “动态规划”。
// 09：37 - 09：41
var findMaxCI = function(nums = []) {
    const l = nums.length;
    let dp = new Array(l).fill(1);

    for (let i = 1; i < l; i++) {
        const [preVal, curVal] = [nums[i - 1], nums[i]];
        if (preVal < curVal) {
            dp[i] = dp[i - 1] + 1;
        }
    }

    return Math.max(...dp);
}


// 顺丰01. 顺丰鄂州枢纽运转中心环线检测
// 输入：
// "1->4,2->5,3->6,3->7,4->8,5->8,5->9,6->9,6->11,7->11,8->12,9->12,9->13,10->6,10->13,10->14,11->10,11->14"

// 输出：
// true

// 解释:
// 存在环线:6->11,11->10,10->6

// 方案1 “自己。”。
var hasCycle = function(graph) {

};


// 顺丰02. 小哥派件装载问题
// 输入：N = [8, 1, 12, 7, 9, 7], V = 11
// 输出：1
// 解释：快递箱容量V为11，物品体积数组N为[8, 1, 12, 7, 9, 7],最优解为取体积为
// 1的快递和体积为9的快递,即快递箱剩余最小空间为 11-(1+9)=1

// 方案1 “自己。回溯法”。
// 09：45 - 09：51
var minRemainingSpace = function(N = [], V = 0) {
    const dfs = (curIndex = 0, curV = 0) => {
        // 
        if (curIndex >= l) {
            resMaxVal = Math.min(resMaxVal, curV);
            return;
        }

        // 
        for (let i = curIndex; i < l; i++) {
            const tempV = N[i];
            if (tempV <= curV) {
                dfs(i + 1, curV - tempV);
            }
            dfs(i + 1, curV);
        }
    };

    const l = N.length;
    let resMaxVal = Number.POSITIVE_INFINITY;

    dfs(0, V);

    return resMaxVal;
};

const N = [8, 19, 18,23,16,20],
    V = 5;
minRemainingSpace(N, V);


// 顺丰04. 顺丰中转场车辆入场识别-电子围栏


// 方案1 “自己。”
// 
var isPointInPolygon = function(x = 0, y=  0, coords = []) {
    
};