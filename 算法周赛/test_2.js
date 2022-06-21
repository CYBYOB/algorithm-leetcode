

// 1
// 输入：words = ["abba","baba","bbaa","cd","cd"]
// 输出：["abba","cd"]
var removeAnagrams = function(words = []) {
    const getMapByStr = (str = '') => {
        const map = str.split('').reduce((acc, cur) => {
            if (acc.has(cur)) {
                acc.set(cur, acc.get(cur) + 1);
            }
            else {
                acc.set(cur, 1);
            }
            return acc;
        }, new Map());

        return map;
    };

    // const l = words.length;

    for (let i = 0; i < words.length - 1; i++) {
        const curStr = words[i],
            nextStr = words[i + 1];

        if (curStr.length !== nextStr.length) {
            continue;
        }
        else {
            const curMap = getMapByStr(curStr),
                nextMap = getMapByStr(nextStr);
            let flag = true;

            for (const [curKey, curVal] of curMap) {
                if (!nextMap.has(curKey)) {
                    flag = false;
                    break;
                }
                else {
                    if (nextMap.get(curKey) !== curVal) {
                        flag = false;
                        break;
                    }
                }
            }

            if (flag) {
                words.splice(i + 1, 1);
                i--;
            }
        }
    }

    return words;
};


// 2
// var maxConsecutive = function(bottom = 0, top = 0, special = []) {
//     const l = special.length,
//         specialMap = special.sort((a, b) => a - b).reduce((acc, cur) => {
//             acc.set(cur, 1);
//             return acc;
//         }, new Map());
//     let tempBottom = bottom,
//         resMaxVal = 0;

// // console.log(specialMap);

//     for (let i = bottom; i < top; i++) {
//         let tempI = i,
//             tempMaxVal = 0;

//         while (!specialMap.has(tempI) && tempI < top) {
//             tempMaxVal++;
//             tempI++;
//         }


//         specialMap.delete(tempI);

//         i = (tempI);
        
//         // console.log(resMaxVal, tempMaxVal);
//         resMaxVal = Math.max(resMaxVal, tempMaxVal);
//     }

//     return resMaxVal;
// };


// 双指针
var maxConsecutive = function(bottom = 0, top = 0, special = []) {
    // 其实 filter 可不要
    special.sort((a, b) => a - b)
        // .filter(v => v < bottom || v > top)
        ;
    const l = special.length;
    let i = 0,
        resMaxVal = 0;

    while (i < l) {
        const tempMaxVal = (special[i] - bottom);
        bottom = special[i] + 1;
        resMaxVal = Math.max(resMaxVal, tempMaxVal);
        i++;
    }

    // 边界
    resMaxVal = Math.max(resMaxVal, (top - bottom + 1));

    return resMaxVal;
};


// 3
var largestCombination = function(candidates) {

};


// 4
var CountIntervals = function() {
    this.list = [];
    this.count = 0;
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {void}
 */
CountIntervals.prototype.add = function(left, right) {
    let {list = [], count = 0} = this;
    
    list.push([left, right]);
    list.sort((a, b) => (a[0] === b[0]) ? (a[1] - b[1]) : (a[0] - b[0]));
    const tempList = list.reduce((acc, cur, index) => {
        if (index === 0) {
            const [left, right] = cur;
            count += ();
            acc.push(cur);
        }
        else {
            const l = acc.length,
                [l1, r1] = acc[l - 1],
                [l2, r2] = cur;

            if (l2 <= r1) {
                const l3 = Math.min(l1, l2),
                    r3 = Math.max(r1, r2);
                acc.splice(l - 1, 1, [l3, r3]);
            }
            else {
                acc.push(cur);
            }
        }

        return acc;
    }, []);

    this.list = tempList;
    this.count = count;
};

/**
 * @return {number}
 */
CountIntervals.prototype.count = function() {
    const {list = [], count = 0} = this,
        l = list.length;

    return count;
    // // let resCount = 0;

    // // for (let i = 0; i < l; i++) {
    // //     const [left, right] = list[i];
    // //     resCount += (right - left + 1);
    // // }

    // return resCount;
};



// var CountIntervals = function() {
//     // this.list = [];
//     this.map = new Map();
// };

// /** 
//  * @param {number} left 
//  * @param {number} right
//  * @return {void}
//  */
// CountIntervals.prototype.add = function(left, right) {
//     const {map = new Map()} = this;

//     for (let i = left; i <= right; i++) {
//         map.set(i, 1);
//     }

//     console.log(map);
// };

// /**
//  * @return {number}
//  */
// CountIntervals.prototype.count = function() {
//     const {map = new Map()} = this;
//     console.log(map.size);

//     return map.size;
// };
