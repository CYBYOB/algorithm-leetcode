

// 1
// "aabcba", target = "aabc"
// 2
var rearrangeCharacters = function(s = '', target = '') {
    const isEnough = (sMap = new Map(), targetMap = new Map()) => {
        let resFlag = true;

        for (const [targetKey, targetVal] of targetMap) {
            if (!sMap.has(targetKey) || sMap.get(targetKey) < targetVal) {
                resFlag = false;
            }
        }

        return resFlag;
    };

    const getMapByStr = (str = '') => {
        const l = str.length;
        let resMap = new Map();
        
        for (let i = 0; i < l; i++) {
            const tempVal = str[i];
            if (!resMap.has(tempVal)) {
                resMap.set(tempVal, 1);
            }
            else {
                resMap.set(tempVal, resMap.get(tempVal) + 1);
            }
        }

        return resMap;
    };

    const l = s.length,
        targetMap = getMapByStr(target),
        sMap = getMapByStr(s);
    let resList = [];

    // 边界：
    if (!isEnough(sMap, targetMap)) {
        return 0;
    }
    
    for (const [sKey, sVal] of sMap) {
        if (targetMap.has(sKey)) {
            const tempCount = Math.floor(sVal / targetMap.get(sKey));
            resList.push(tempCount);
            // resCount = Math.max(resCount, tempCount)
        }
    }

    const resCount = Math.min(...resList);

    return resCount;
};


// 输入：sentence = "there are $1 $2 and 5$ candies in the shop", discount = 50
// 输出："there are $0.50 $1.00 and 5$ candies in the shop"
// 解释：
// 表示价格的单词是 "$1" 和 "$2" 。 
// - "$1" 减免 50% 为 "$0.50" ，所以 "$1" 替换为 "$0.50" 。
// - "$2" 减免 50% 为 "$1" ，所以 "$1" 替换为 "$1.00" 。

// 2
var discountPrices = function(sentence = '', discount = 0) {
    const isValidPrice = (price = '') => {
        const l = price.length;
        let resFlag = true;

        if (l <= 1) {
            resFlag = false;
        }
        else {
            if (price[0] !== '$') {
                resFlag = false;
            }
            else {
                const tempVal = price.slice(1);
                if (parseInt(tempVal) + '' !== tempVal) {
                    resFlag = false;
                }
            }
        }

        return resFlag;
    }
    const resStr = sentence.split(' ').map(v => {
        if (isValidPrice(v)) {
            v = v[0] + (parseInt(v.slice(1)) / 100 * (100 - discount)).toFixed(2);
        }
        return v;
    }).join(' ');

    return resStr;
};


// 输入：nums = [5,3,4,4,7,3,6,11,8,5,11]
// 输出：3
// 解释：执行下述几个步骤：
// - 步骤 1 ：[5,3,4,4,7,3,6,11,8,5,11] 变为 [5,4,4,7,6,11,11]
// - 步骤 2 ：[5,4,4,7,6,11,11] 变为 [5,4,7,11,11]
// - 步骤 3 ：[5,4,7,11,11] 变为 [5,7,11,11]
// [5,7,11,11] 是一个非递减数组，因此，返回 3 。

// 3
var totalSteps = function(nums = []) {
    const l = nums.length;
    
}


// // 注：通过 79 / 86 ，会超时！！
var totalSteps = function(nums = []) {
    let l = nums.length;
    let removeIndexMap = new Map(),
        resCount = 0;

    do {
        l -= removeIndexMap.size;
        removeIndexMap.clear();
        for (let i = 1; i < l; i++) {
            const [left, right] = [nums[i - 1], nums[i]];
            if (left > right) {
                // removeIndexMap.set(i, 1);
                let rightNextIndex = right + 1;
            }
        }
        resCount++;
        nums = nums.filter((v, i) => !removeIndexMap.has(i));
    } while (removeIndexMap.size !== 0);

    return resCount - 1;
};




// 4
var minimumObstacles = function(grid) {

};

