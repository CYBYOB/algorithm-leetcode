
// 1
/**
 * @param {number[]} nums
 * @return {number[]}
 */
//  输入：nums = [1,3,2,1,3,2,2]
//  输出：[3,1]
//  解释：
//  nums[0] 和 nums[3] 形成一个数对，并从 nums 中移除，nums = [3,2,3,2,2] 。
//  nums[0] 和 nums[2] 形成一个数对，并从 nums 中移除，nums = [2,2,2] 。
//  nums[0] 和 nums[1] 形成一个数对，并从 nums 中移除，nums = [2] 。
//  无法形成更多数对。总共形成 3 个数对，nums 中剩下 1 个数字。
var numberOfPairs = function(nums) {
    const getMapByList = (list = []) => {
        const l = list.length;
        let resMap = new Map();
        
        for (let i = 0; i < l; i++) {
            const tempVal = list[i];
            if (!resMap.has(tempVal)) {
                resMap.set(tempVal, 1);
            }
            else {
                resMap.set(tempVal, resMap.get(tempVal) + 1);
            }
        }

        return resMap;
    };

    const l = nums.length,
    resMap = getMapByList(nums);
    let pairCount = 0;

    for (const [key, val] of resMap) {
        pairCount += parseInt(val / 2);
    }
    
    return [pairCount, l - pairCount * 2];
};
const nums = [1,3,2,1,3,2,2],
    t_1 = numberOfPairs(nums);
// debugger



// 2
/**
 * @param {number[]} nums
 * @return {number}
 */

// 输入：nums = [18,43,36,13,7]
// 输出：54
// 解释：满足条件的数对 (i, j) 为：
// - (0, 2) ，两个数字的数位和都是 9 ，相加得到 18 + 36 = 54 。
// - (1, 4) ，两个数字的数位和都是 7 ，相加得到 43 + 7 = 50 。
// 所以可以获得的最大和是 54 。
var maximumSum = function(nums) {
    const getSumByNum = (num = 0) => {
        let resSum = 0;

        while (num) {
            resSum += num % 10;
            num = parseInt(num / 10);
        }

        return resSum;
    };
    const getMapByList = (list = []) => {
        const l = list.length;
        let resMap = new Map();

        for (let i = 0; i < l; i++) {
            const tempVal = list[i],
                tempSum = getSumByNum(tempVal);
            if (!resMap.has(tempSum)) {
                resMap.set(tempSum, []);
            }
            resMap.get(tempSum).push(tempVal);
        }

        return resMap;
    };

    const l = nums.length,
        resMap = getMapByList(nums);
    let resVal = -1;
debugger
    // 重排序 & 删除
    for (const [key, val] of resMap) {
        if (val.length >= 2) {
            resMap.set(key, val.sort((a, b) => b - a));
        }
        else {
            resMap.delete(key);
        }
    }

    // 
    for (const [key, val] of resMap) {
        resVal = Math.max(resVal, val[0] + val[1]);
    }

    return resVal;
};
const nums = [18,43,36,13,7],
    // 54
    t_2 = maximumSum(nums);
// debugger


// 3
/**
 * @param {string[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */

// 输入：nums = ["102","473","251","814"], queries = [[1,1],[2,3],[4,2],[1,2]]
// 输出：[2,2,1,0]
// 解释：
// 1. 裁剪到只剩 1 个数位后，nums = ["2","3","1","4"] 。最小的数字是 1 ，下标为 2 。
// 2. 裁剪到剩 3 个数位后，nums 没有变化。第 2 小的数字是 251 ，下标为 2 。
// 3. 裁剪到剩 2 个数位后，nums = ["02","73","51","14"] 。第 4 小的数字是 73 ，下标为 1 。
// 4. 裁剪到剩 2 个数位后，最小数字是 2 ，下标为 0 。
// 注意，裁剪后数字 "02" 值为 2 。

class Tree {
    constructor(list = []) {
        const l = list.length;
        this.children = new Map();
        let tempChildren = this.children;

        for (let i = 0; i < l; i++) {
            const tempStr = list[i],
                tempStrLength = tempStr.length;
            tempChildren = this.children;

            for (let j = tempStrLength - 1; j >=0; j--) {
                const tempChar = tempStr[j];
                if (!tempChildren.has(tempChar)) {
                    tempChildren.set(tempChar, new Map());
                }
                if (!tempChildren.has('#')) {
                    tempChildren.set('#', new Map());
                }
                tempChildren.get('#').set(i, 1);

                tempChildren = tempChildren.get(tempChar);
            }

            // tempChildren.set('#', i);
            if (!tempChildren.has('#')) {
                tempChildren.set('#', new Map());
            }
            tempChildren.get('#').set(i, 1);
        }
    }

    findIndexList(str = '') {
        const l = str.length;
        let tempChildren = this.children;
        console.log(this.children);
        let resList = [];
        
        for (let i = l - 1; i >=0; i--) {
            tempChildren = tempChildren.get(str[i]);
        }

        const map = tempChildren.get('#');
        console.log(map);
        for (const [key, val] of map) {
            resList.push(key);
        }

        return resList.sort((a, b) => a - b);
    }

    // findIndex(str = '') {
    //     const l = str.length;
    //     let tempChildren = this.children;
    //     console.log(this.children);
    //     let resList = [];
        
    //     for (let i = l - 1; i >=0; i--) {
    //         tempChildren = tempChildren.get(str[i]);
    //     }

    //     const map = tempChildren.get('#');
    //     console.log(map);
    //     for (const [key, val] of map) {
    //         resList.push(key);
    //     }

    //     // 取最小的下标
    //     return resList.sort((a, b) => a - b)[0];
    // }
}
var smallestTrimmedNumbers = function(nums, queries) {
    const numsLength = nums.length,
        numsItemLength = nums[0].length,
        queriesLength = queries.length,
        // 后缀树
        tree = new Tree(nums);
    let map = new Map(),
        resList = [];

    for (let i = 0; i < queriesLength; i++) {
        const [k, tempLen] = queries[i];
        // 升序
        if (!map.has(tempLen)) {
            const tempList = nums.map(v => v.slice(numsItemLength - tempLen)).sort((a, b) => a - b);
            map.set(tempLen, tempList);
        }
        
        // nums = ["4","7","6","4"]
        // k = 2
        // tempList = ["1", "4","7","6","4"]
        // targetIndexList = [0, 3]
        const tempList = map.get(tempLen),
            targetStr = tempList[k - 1],
            targetIndexList = tree.findIndexList(targetStr),
            tempIndex = tempList.indexOf(targetStr);
            // targetIndex = tree.findIndex(targetStr) || targetStr;
        
        resList.push(targetIndexList[k - tempIndex - 1])

        // 升序
        if (!map.has(tempLen)) {
            const tempList = nums.map(v => v.slice(numsItemLength - tempLen)).sort((a, b) => a - b);
            map.set(tempLen, tempList);
        }
        
        // const tempList = map.get(tempLen),
        //     targetStr = tempList[k - 1],
        //     targetIndex = tree.findIndex(targetStr);
        //     // targetIndex = tree.findIndex(targetStr) || targetStr;
        // resList.push(targetIndex);
        // console.log(targetStr);
    }

console.log(resList);

    return resList;
};
const nums = ["102","473","251","814"], queries = [[1,1],[2,3],[4,2],[1,2]],
    t_3 = smallestTrimmedNumbers(nums, queries);
// debugger


// 4
/**
 * @param {number[]} nums
 * @param {number[]} numsDivide
 * @return {number}
 */
// 输入：nums = [2,3,2,4,3], numsDivide = [9,6,9,3,15]
// 输出：2
// 解释：
// [2,3,2,4,3] 中最小元素是 2 ，它无法整除 numsDivide 中所有元素。
// 我们从 nums 中删除 2 个大小为 2 的元素，得到 nums = [3,4,3] 。
// [3,4,3] 中最小元素为 3 ，它可以整除 numsDivide 中所有元素。
// 可以证明 2 是最少删除次数。
var minOperations = function(nums, numsDivide) {
    const getMapByList = (list = []) => {
        const l = list.length;
        let resMap = new Map();

        for (let i = 0; i < l; i++) {
            const tempVal = nums[i];
            resMap.set(tempVal, (resMap.get(tempVal) || 0) + 1);
        }

        return resMap;
    };
    const isValid = (num = 1, list = []) => {
        const l = list.length;
        let resFlag = true;

        for (let i = 0; i < l; i++) {
            if (list[i] % num !== 0) {
                resFlag = false;
                break;
            }
        }

        return resFlag;
    };
    const isValidByMapJudge = (num = 1, invalidNumMap = new Map()) => {
        let resFlag = true;

        for (const [key] of invalidNumMap) {
            if (num % key === 0) {
                resFlag = false;
                break;
            }
        }

        return resFlag;
    };

    // 排序
    nums.sort((a, b) => a - b);
    const numsLength = nums.length,
        numsDivideLength = numsDivide.length;
    let map = getMapByList(nums),
        invalidNumMap = new Map(),
        resCount = 0;

    for (const [key, val] of map) {
        if (!isValidByMapJudge(key, invalidNumMap)) {
            resCount += val;
        }
        else if (isValid(key, numsDivide)) {
            break;
        }
        else {
            invalidNumMap.set(key, 1);
            resCount += val;
        }
    }

    return resCount === numsLength ? -1 : resCount;
};

const nums = [4,3,6], numsDivide = [8,2,6,10],
    t_4 = minOperations(nums, numsDivide);
debugger
