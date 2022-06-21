
// 1
var percentageLetter = function(s = '', letter = '') {
    const l = s.length;
    let resCount = 0;

    for (let i = 0; i < l; i++) {
        const tempVal = s[i];
        if (tempVal === letter) {
            resCount++;
        }
    }

    return Math.floor(100 * resCount / l);
};


// 2
var maximumBags = function(capacity, rocks, additionalRocks) {
    const l = capacity.length;
    let resCapacityList = [],
        resCount = 0;

    for (let i = 0; i < l; i++) {
        const tempVal = capacity[i] - rocks[i];
        resCapacityList.push(tempVal);
    }

    // 过滤、升序排序
    resCount += resCapacityList.filter(v => v === 0).length;
    resCapacityList = resCapacityList.filter(v => v > 0).sort((a, b) => a - b);
    const resCapacityListLength = resCapacityList.length;
    let index = 0;

    while (additionalRocks > 0 && index < resCapacityListLength) {
        const tempVal = resCapacityList[index];
        if (additionalRocks >= tempVal) {
            additionalRocks -= tempVal;
            resCount++;
            index++;
        }
        else {
            break;
        }
    }

    return resCount;
};


// 3 
// 注：通过：78 / 79 
var minimumLines = function(stockPrices = []) {
    const l = stockPrices.length;

    // 排序
    stockPrices.sort((a, b) => a[0] - b[0]);
    // 边界：
    if (l <= 1) {
        return 0;
    }
    if (l === 2) {
        return 1;
    }
    
    // 求斜率
    let [x1, y1] = stockPrices[0],
        [x2, y2] = stockPrices[1],
        k = (y2 - y1) / (x2 - x1),
        resCount = 1;

    for (let i = 2; i < l; i++) {
        const [x3, y3] = stockPrices[i];
        if (Math.abs((y3 - y2) - (k * (x3 - x2))) >= Math.pow(10, -64)) {
        // if (tempY - BigInt(y3) >= Math.pow(10, -6) || BigInt(y3) - tempY >= Math.pow(10, -6)) {
            const tempK = (y3 - y2) / (x3 - x2);
            resCount++;
            [x2, y2, k] = [x3, y3, tempK];
        }
        else {
            [x2, y2] = [x3, y3];
        }
    }

    return resCount;
};


// 4
// 动态规划？0：最小值
var totalStrength = function(strength = []) {
    const l = strength.length;
    let resCount = 0;

    for (let i = 0; i < l; i++) {
        let min = strength[i],
            sum = strength[i];
            resCount += (min * sum);
        for (let j = i + 1; j < l; j++) {
            const tempVal = strength[j];
            if (tempVal < min) {
                min = tempVal;
            }

            sum += tempVal;
            resCount += (min * sum);
        }
    }

    return resCount % (Math.pow(10, 9) + 7);
};





var totalStrength = function(strength = []) {
    const l = strength.length;
    let dp = new Array(l).fill([]).map(v => new Array(l).fill([])),
        resCount = 0;

    // 初始化
    for (let i = 0; i < l; i++) {
        const tempVal = strength[i],
            tempCount = (tempVal * tempVal);
        dp[i][i][0] = tempVal;
        dp[i][i][1] = tempVal;
        if (resCount + tempCount)
        resCount += ;
    }

    for (let tempL = 2; tempL <= l; tempL++) {
        for (let left = 0; left <= (l - tempL); left++) {
            
        }
    }
    // for (let i = 0; i < l; i++) {
    //     for (let j = i + 1; j < l; j++) {
            
    //     }
    // }

    return resCount % (Math.pow(10, 9) + 7);
};