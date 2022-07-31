
// 1
// 输入：ranks = [13,2,3,1,9], suits = ["a","a","a","a","a"]
// 输出："Flush"
// 解释：5 张扑克牌的花色相同，所以返回 "Flush" 。
/**
 * @param {number[]} ranks
 * @param {character[]} suits
 * @return {string}
 */

// "Flush"：同花，五张相同花色的扑克牌。
// "Three of a Kind"：三条，有 3 张大小相同的扑克牌。
// "Pair"：对子，两张大小一样的扑克牌。
// "High Card"：高牌，五张大小互不相同的扑克牌。
var bestHand = function(ranks, suits) {
    const suitsSet = [...new Set(suits)];

    if (suitsSet.length === 1) {
        return "Flush";
    }

    // 
    const map = ranks.reduce((acc, cur) => {
        acc.set(cur, (acc.get(cur) || 0) + 1);
        return acc;
    }, new Map());

    for (const [key, val] of map) {
        if (val >= 3) {
            return "Three of a Kind";
        }
    }

    for (const [key, val] of map) {
        if (val >= 2) {
            return "Pair";
        }
    }

    return "High Card";
};
const ranks = [13,2,3,1,9], suits = ["a","a","a","a","a"],
    t_1 = bestHand(ranks, suits);
// debugger

// 2
// 输入：nums = [1,3,0,0,2,0,0,4]
// 输出：6
// 解释：
// 子数组 [0] 出现了 4 次。
// 子数组 [0,0] 出现了 2 次。
// 不存在长度大于 2 的全 0 子数组，所以我们返回 6 。
/**
 * @param {number[]} nums
 * @return {number}
 */
var zeroFilledSubarray = function(nums) {
    const getCount = (n = 0) => {
        return n * (n + 1) / 2;
    };
    
    const l = nums.length;
    let resList = [];

    for (let i = 0; i < l; i++) {
        if (nums[i] === 0) {
            let j = i + 1;
            while (j < l && nums[j] === 0) {
                j++;
            }

            const tempL = (j - i);
            resList.push(tempL);
            i = j;
        }
    }

    // debugger
    return resList.reduce((acc, cur) => {
        acc += getCount(cur);
        return acc;
    }, 0);
};
// const nums = [1,3,0,0,2,0,0,4],
// const nums = [0,0,0,2,0,0],
const nums = [2,10,2019],
    t_2 = zeroFilledSubarray(nums);
// debugger



// 3
// 输入：
// ["NumberContainers", "find", "change", "change", "change", "change", "find", "change", "find"]
// [[], [10], [2, 10], [1, 10], [3, 10], [5, 10], [10], [1, 20], [10]]
// 输出：
// [null, -1, null, null, null, null, 1, null, 2]
var NumberContainers = function() {
    this.map = new Map();
    this._map = new Map();
};

/** 
 * @param {number} index 
 * @param {number} number
 * @return {void}
 */
NumberContainers.prototype.change = function(index, number) {
    const {map, _map} = this;
    // map.set
    if (!map.has(number)) {
        map.set(number, []);
    }
    
    const tempPreVal = _map.get(index);
    _map.set(tempPreVal, _map.get(tempPreVal).filter(v => v !== index));
    _map.set(index, number);

    map.get(number).push(index);
};

/** 
 * @param {number} number
 * @return {number}
 */
NumberContainers.prototype.find = function(number) {
    const {map, _map} = this;
    if (!map.has(number)) {
        return -1;
    }

    const resList = map.get(number);
    return resList.sort((a, b) => a - b)[0];
};
var obj = new NumberContainers();
obj.change(2, 10);
obj.change(1, 10);
var param_2 = obj.find(10);
debugger
/**
 * Your NumberContainers object will be instantiated and called as such:
 * var obj = new NumberContainers()
 * obj.change(index,number)
 * var param_2 = obj.find(number)
 */



// 4
// 输入：rolls = [4,2,1,2,3,3,2,4,1], k = 4
// 输出：3
// 解释：所有长度为 1 的骰子子序列 [1] ，[2] ，[3] ，[4] 都可以从原数组中得到。
// 所有长度为 2 的骰子子序列 [1, 1] ，[1, 2] ，... ，[4, 4] 都可以从原数组中得到。
// 子序列 [1, 4, 2] 无法从原数组中得到，所以我们返回 3 。
// 还有别的子序列也无法从原数组中得到。
/**
 * @param {number[]} rolls
 * @param {number} k
 * @return {number}
 */
var shortestSequence = function(rolls, k) {
    
};
const rolls = [4,2,1,2,3,3,2,4,1], k = 4,
    t_4 = shortestSequence(rolls, k);
debugger

