// 第296场

// 1
var minMaxGame = function(nums = []) {
    // const l = nums.length;
    
    while (nums.length > 1) {
        const l = nums.length;
        let tempList = [];

        for (let i = 0; i < Math.floor(l / 2); i++) {
            if (i % 2 === 0) {
                const tempVal = Math.min(nums[2 * i], nums[2 * i + 1]);
                tempList.push(tempVal);
            }
            else {
                const tempVal = Math.max(nums[2 * i], nums[2 * i + 1]);
                tempList.push(tempVal);
            }
        }
        
        nums = tempList;
    }

    return nums[0];
};


// 2
// 输入：nums = [2,2,4,5], k = 0
// 输出：3
// 解释：
// 可以将 nums 划分为三个子序列 [2,2]、[4] 和 [5] 。
// 第一个子序列中最大值和最小值的差值是 2 - 2 = 0 。
// 第二个子序列中最大值和最小值的差值是 4 - 4 = 0 。
// 第三个子序列中最大值和最小值的差值是 5 - 5 = 0 。
// 由于创建了三个子序列，返回 3 。可以证明需要划分的最少子序列数目就是 3 。

// 贪心
var partitionArray = function(nums = [], k = 0) {
    // 排序
    nums.sort((a, b) => a - b);

    const l = nums.length;
    let resMinVal = nums[0],
        // resMaxVal = nums[0],
        resCount  = 1;

    // 
    for (let i = 1; i < l; i++) {
        const tempDiffVal = nums[i] - resMinVal;

        if (tempDiffVal > k) {
            resMinVal = nums[i];
            resCount++;
        }
    }

    return resCount;
};


// 3
// 输入：nums = [1,2], operations = [[1,3],[2,1],[3,2]]
// 输出：[2,1]
// 解释：我们对 nums 执行以下操作：
// - 将数字 1 替换为 3 。nums 变为 [3,2] 。
// - 将数字 2 替换为 1 。nums 变为 [3,1] 。
// - 将数字 3 替换为 2 。nums 变为 [2,1] 。
// 返回最终数组 [2,1] 。
var arrayChange = function(nums = [], operations = []) {
    const getMapByList = (list = []) => {
        const l = list.length;
        let resMap = new Map();

        for (let i = 0; i < l; i++) {
            const tempVal = list[i];
            resMap.set(tempVal, i);
        }

        return resMap;
    };
    const getListByMap = (map = new Map()) => {
        let resList = [];

        for (const [key, val] of map) {
            resList.push([val, key]);
        }
        
        // 重排
        resList = resList.sort((a, b) => a[0] - b[0]).map(v => v[1]);

        return resList;
    };

    // 预处理
    const numsLength = nums.length,
        operationsLength = operations.length;
    let resMap = getMapByList(nums);

    for (let i = 0; i < operationsLength; i++) {
        const [deleteVal = 0, addVal = 0] = operations[i],
            deleteIndex = resMap.get(deleteVal);

        resMap.delete(deleteVal);
        resMap.set(addVal, deleteIndex)
    }
    const resList = getListByMap(resMap);

    return resList;
};


// 4
var TextEditor = function() {
    this.str = '';
    this.index = 0;

    // console.log(this)
};

/** 
 * @param {string} text
 * @return {void}
 */
TextEditor.prototype.addText = function(text) {
    // a | b
    const {str = '', index = 0} = this,
        textLength = text.length;

    this.str = (str.slice(0, index) + text + str.slice(index + 1));
    this.index = (index + textLength);

    // console.log(this)
};

/** 
 * @param {number} k
 * @return {number}
 */
TextEditor.prototype.deleteText = function(k) {
    const {str = '', index = 0} = this;
    let tempStr = '',
        tempIndex = 0,
        resCount = Math.min(k, index);

    // k = 10   { str: 'leetpractice', index: 4 }
    if (k <= index) {
        tempStr = str.slice(0, index - k) + str.slice(index);
        tempIndex = (index - k);
    }
    else {
        tempStr = str.slice(index);
        tempIndex = 0;
    }
    
    this.str = tempStr;
    this.index = tempIndex;
// console.log(this)
    return resCount;
};

/** 
 * @param {number} k
 * @return {string}
 */
TextEditor.prototype.cursorLeft = function(k) {
    const {str = '', index = 0} = this;
    let resStr = '',
        tempIndex = 0;

    // 够 左滑
    if (index >= k) {
        tempIndex = (index - k);
        // 边界：
        if (tempIndex >= 10) {
            resStr = str.slice(tempIndex - 9, tempIndex + 1);
        }
        else {
            resStr = str.slice(0, tempIndex);
        }
        // resStr = str.slice(Math.max(0, tempIndex - 10), Math.min(tempIndex, 10));
    }
    else {
        tempIndex = 0;
        resStr = '';
    }

    this.index = tempIndex;
// console.log(this)
    return resStr;
};

/** 
 * @param {number} k
 * @return {string}
 */
TextEditor.prototype.cursorRight = function(k) {
    const {str = '', index = 0} = this,
        l = str.length;
    let resStr = '',
        tempIndex = 0;

    // 够 右滑
    // a|b
    if ((l - index) >= k) {
        tempIndex = (index + k);
        // 边界：
        if (tempIndex >= 10) {
            resStr = str.slice(tempIndex - 9, tempIndex + 1);
        }
        else {
            resStr = str.slice(0, tempIndex);
        }
        // resStr = str.slice(0, Math.min(tempIndex, 10));
    }
    else {
        tempIndex = l;
        // 边界：
        if (tempIndex >= 10) {
            resStr = str.slice(tempIndex - 10, tempIndex + 1);
        }
        else {
            resStr = str.slice(0, tempIndex);
        }
        // resStr = str.slice(0, Math.min(tempIndex, 10));
    }
    
// console.log(this)

    return resStr;
};

// [null,null,4,null,"etpractice","leet",4,"","practi"]
// [null,null,4,null,"etpractice","leet",4,"","practi"]
