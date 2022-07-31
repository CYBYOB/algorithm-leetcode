

// 1
// 输入：amount = [1,4,2]
// 输出：4
// 解释：下面给出一种方案：
// 第 1 秒：装满一杯冷水和一杯温水。
// 第 2 秒：装满一杯温水和一杯热水。
// 第 3 秒：装满一杯温水和一杯热水。
// 第 4 秒：装满一杯温水。
// 可以证明最少需要 4 秒才能装满所有杯子。
/**
 * @param {number[]} amount
 * @return {number}
 */
var fillCups = function(amount) {
    amount.sort((a, b) => b - a);
    const l = amount.length,
        [c_1, c_2, c_3] = amount,
        sum = c_1 + c_2 + c_3;
    let resCount = 0;
    
    while (sum > 0) {
        if (c_1 > 0) {
            if (c_2 > 0) {
                c_1--;
                c_2--;
                resCount++;
            } else {
                if (c_3 > 0) {
                    c_1--;
                    c_3--;
                    resCount++;
                }
            }
        }
        // else {
        //     if (c_2 > 0) {

        //     }
        // }

        amount.sort((a, b) => b - a);
    }

    return resCount;
    
    // if (c_1 + c_2 >= c_3) {
    //     return c_3 + (c_1 + c_2 - c_3);
    // }
    // else {
    //     return c_1 + c_2 + (c_3 - (c_1 + c_2));
    // }
};


// 1 2 4
// 


// 2
// 输入
// ["SmallestInfiniteSet", "addBack", "popSmallest", "popSmallest", "popSmallest", "addBack", "popSmallest", "popSmallest", "popSmallest"]
// [[], [2], [], [], [], [1], [], [], []]
// 输出
// [null, null, 1, 2, 3, null, 1, 4, 5]

// 解释
// SmallestInfiniteSet smallestInfiniteSet = new SmallestInfiniteSet();
// smallestInfiniteSet.addBack(2);    // 2 已经在集合中，所以不做任何变更。
// smallestInfiniteSet.popSmallest(); // 返回 1 ，因为 1 是最小的整数，并将其从集合中移除。
// smallestInfiniteSet.popSmallest(); // 返回 2 ，并将其从集合中移除。
// smallestInfiniteSet.popSmallest(); // 返回 3 ，并将其从集合中移除。
// smallestInfiniteSet.addBack(1);    // 将 1 添加到该集合中。
// smallestInfiniteSet.popSmallest(); // 返回 1 ，因为 1 在上一步中被添加到集合中，
//                                    // 且 1 是最小的整数，并将其从集合中移除。
// smallestInfiniteSet.popSmallest(); // 返回 4 ，并将其从集合中移除。
// smallestInfiniteSet.popSmallest(); // 返回 5 ，并将其从集合中移除。

const C = Math.pow(10, 3);
var SmallestInfiniteSet = function() {
    this.map = new Array(C).map((v, i) => i + 1).reduce((acc, cur) => {
        acc.set(cur, 1);
        return acc;
    }, new Map());
};

/**
 * @return {number}
 */
SmallestInfiniteSet.prototype.popSmallest = function() {
    const {map} = this;
    for (const [k, v] of map) {
        map.delete(k);
        return k;
    }
};

/** 
 * @param {number} num
 * @return {void}
 */
SmallestInfiniteSet.prototype.addBack = function(num) {
    const {map} = this;
    if (!map.has(num)) {
        map.set(num, 1);
    }
};

/**
 * Your SmallestInfiniteSet object will be instantiated and called as such:
 * var obj = new SmallestInfiniteSet()
 * var param_1 = obj.popSmallest()
 * obj.addBack(num)
 */


// 3



// 4



