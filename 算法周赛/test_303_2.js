
// 1
/**
 * @param {string} s
 * @return {character}
 */

// 输入：s = "abccbaacz"
// 输出："c"
// 解释：
// 字母 'a' 在下标 0 、5 和 6 处出现。
// 字母 'b' 在下标 1 和 4 处出现。
// 字母 'c' 在下标 2 、3 和 7 处出现。
// 字母 'z' 在下标 8 处出现。
// 字母 'c' 是第一个出现两次的字母，因为在所有字母中，'c' 第二次出现的下标是最小的。
var repeatedCharacter = function(s) {
    const map = s.split('').reduce((acc, cur, index) => {
        if (!acc.has(cur)) {
            acc.set(cur, []);
        }

        acc.get(cur).push(index);
        return acc;
    }, new Map());
    let resIndex = Number.POSITIVE_INFINITY,
        resChar = '';

    for (const [key, val] of map) {
        if (val.length >= 2) {
            if (val[1] <= resIndex) {
                resChar = key;
                resIndex = val[1];
            }
        }
    }

    return resChar;
};
const s = "aabbbbbccddeeffa",
    t_1 = repeatedCharacter(s);
// debugger

// 2
/**
 * @param {number[][]} grid
 * @return {number}
 */
// 输入：grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
// 输出：3
// 解释：存在三对相等行列对：
// - (第 0 行，第 0 列)：[3,1,2,2]
// - (第 2 行, 第 2 列)：[2,4,2,2]
// - (第 3 行, 第 2 列)：[2,4,2,2]
var equalPairs = function(grid) {
    const gridF = grid.flat();
    const n = grid.length,
        rowMap = grid.reduce((acc, cur, index) => {
            const tempStr = cur.join('#');
            if (!acc.has(tempStr)) {
                acc.set(tempStr, []);
            }
            acc.get(tempStr).push(index);
            return acc;
        }, new Map()),
        colMap = grid.reduce((acc, cur, index) => {
            const tempStr = gridF.filter((v, i) => i % n === index).join('#');
            // const tempStr = cur.join('#');
            if (!acc.has(tempStr)) {
                acc.set(tempStr, []);
            }
            acc.get(tempStr).push(index);
            return acc;
        }, new Map());

    // debugger
    let resCount = 0;

    for (const [key, val] of rowMap) {
        for (const [key_2, val_2] of colMap) {
            if (key === key_2) {
                resCount += (val.length * val_2.length);
            }
        }
    }

    return resCount;
};
const grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]],
    t_2 = equalPairs(grid);
// debugger


// 3
/**
 * @param {string[]} foods
 * @param {string[]} cuisines
 * @param {number[]} ratings
 */

// 输入
// ["FoodRatings", "highestRated", "highestRated", "changeRating", "highestRated", "changeRating", "highestRated"]
// [[["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"], ["korean", "japanese", "japanese", "greek", "japanese", "korean"], [9, 12, 8, 15, 14, 7]], ["korean"], ["japanese"], ["sushi", 16], ["japanese"], ["ramen", 16], ["japanese"]]
// 输出
// [null, "kimchi", "ramen", null, "sushi", null, "ramen"]

// 解释
// FoodRatings foodRatings = new FoodRatings(["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"], ["korean", "japanese", "japanese", "greek", "japanese", "korean"], [9, 12, 8, 15, 14, 7]);
// foodRatings.highestRated("korean"); // 返回 "kimchi"
//                                     // "kimchi" 是分数最高的韩式料理，评分为 9 。
// foodRatings.highestRated("japanese"); // 返回 "ramen"
//                                     // "ramen" 是分数最高的日式料理，评分为 14 。
// foodRatings.changeRating("sushi", 16); // "sushi" 现在评分变更为 16 。
// foodRatings.highestRated("japanese"); // 返回 "sushi"
//                                     // "sushi" 是分数最高的日式料理，评分为 16 。
// foodRatings.changeRating("ramen", 16); // "ramen" 现在评分变更为 16 。
// foodRatings.highestRated("japanese"); // 返回 "ramen"
//                                     // "sushi" 和 "ramen" 的评分都是 16 。
//                                     // 但是，"ramen" 的字典序比 "sushi" 更小。 
var FoodRatings = function(foods, cuisines, ratings) {
    const l = foods.length;
    this.map = new Map();
    this._map = new Map();
    const {map, _map} = this;

    for (let i = 0; i < l ;i++) {
        const [food, cuisine, rating] = [foods[i], cuisines[i], ratings[i]];
        // 
        _map.set(food, cuisine);

        if (!map.has(cuisine)) {
            map.set(cuisine, []);
        }
        // map.get(cuisine).push([rating, food]);
        const tempMap = map.get(cuisine);
        if (!tempMap.has(rating)) {
            // tempMap.set(rating, new Map());
            tempMap.set(rating, []);
        }
        tempMap.get(rating).push(food);
    }
};

/** 
 * @param {string} food 
 * @param {number} newRating
 * @return {void}
 */
FoodRatings.prototype.changeRating = function(food, newRating) {
    const {map, _map} = this,
        cuisine = _map.get(food),
        tempMap = map.get(cuisine);

    if (!tempMap.has(newRating)) {
        tempMap.set(newRating, []);
    }
};

/** 
 * @param {string} cuisine
 * @return {string}
 */
FoodRatings.prototype.highestRated = function(cuisine) {

};

// var obj = new FoodRatings(foods, cuisines, ratings);
// obj.changeRating(food,newRating);
// var param_2 = obj.highestRated(cuisine);
// debugger

/**
 * Your FoodRatings object will be instantiated and called as such:
 * var obj = new FoodRatings(foods, cuisines, ratings)
 * obj.changeRating(food,newRating)
 * var param_2 = obj.highestRated(cuisine)
 */




// 4
// 输入：nums = [1,2,3,1], k = 3
// 输出：5
// 解释：有如下几个优质数对：
// - (3, 3)：(3 AND 3) 和 (3 OR 3) 的二进制表示都等于 (11) 。值为 1 的位数和等于 2 + 2 = 4 ，大于等于 k = 3 。
// - (2, 3) 和 (3, 2)： (2 AND 3) 的二进制表示等于 (10) ，(2 OR 3) 的二进制表示等于 (11) 。值为 1 的位数和等于 1 + 2 = 3 。
// - (1, 3) 和 (3, 1)： (1 AND 3) 的二进制表示等于 (01) ，(1 OR 3) 的二进制表示等于 (11) 。值为 1 的位数和等于 1 + 2 = 3 。
// 所以优质数对的数目是 5 。
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countExcellentPairs = function(nums, k) {
    let map = new Map();
    const getOneCount = (val = 0) => {
        if (map.has(val)) {
            return map.get(val);
        }
        
        let count = 0;
        while (val !== 0) {
            val = ((val - 1) & val);
            count++;
        }
        map.set(val, count);

        return count;
    };

    // const numsSet = [...new Set(nums)],
    nums = [...new Set(nums)],
        l = nums.length;
    nums.sort((a, b) => b - a);
    let resCount = 0;
    
    for (let i = 0; i < l; i++) {
        for (let j = i; j < l; j++) {
            const [valI, valJ] = [nums[i], nums[j]];
            if (
                Math.floor(valI.toString(2).length)>= k
                // getOneCount(valI & valJ) >= k
                // || getOneCount(valI | valJ)  >= k
                // || getOneCount(valI & valJ) + getOneCount(valI | valJ) >= k
            ) {
                resCount += (valI === valJ ? 1 : 2);
            }
        }
    }

    return resCount;
};

const nums = [1,2,3,1], k = 3,
    t_4 = countExcellentPairs(nums, k);
// debugger




