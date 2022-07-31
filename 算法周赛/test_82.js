
// 1
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var evaluateTree = function(root) {
    if (root === null) {
        return true;
    }

    const {val, left, right} = root;
    if (val === 0) {
        return false;
    }
    else if (val === 1) {
        return true;
    }
    else if (val === 2) {
        return evaluateTree(left) || evaluateTree(right);
    }
    else {
        return evaluateTree(left) && evaluateTree(right);
    }
};


// 2
/**
 * @param {number[]} buses
 * @param {number[]} passengers
 * @param {number} capacity
 * @return {number}
 */

//  输入：buses = [20,30,10], passengers = [19,13,26,4,25,11,21], capacity = 2
//  输出：20
//  解释：
//  第 1 辆公交车载着第 4 位乘客。
//  第 2 辆公交车载着第 6 位和第 2 位乘客。
//  第 3 辆公交车载着第 1 位乘客和你。
var latestTimeCatchTheBus = function(buses, passengers, capacity) {
    const busesLength = buses.length,
        passengersLength = passengers.length;
    let passengersIndex = 0;
    // 
    buses.sort((a, b) => a - b);
    passengers.sort((a, b) => a - b);

    for (var i = 0; i < busesLength - 1; i++) {
        const busArriveTime = buses[i];
        let tempCapacity = 0;
        while (busArriveTime >= passengers[passengersIndex] && tempCapacity < capacity) {
            tempCapacity++;
            passengersIndex++;
        }
    }

    console.log(buses.slice(i), passengers.slice(passengersIndex));
    // debugger

    // 
    if (passengersIndex === passengersLength) {
        return buses[busesLength - 1];
    }
    // 
    const map = passengers.slice(passengersIndex).reduce((acc, cur) => {
        acc.set(cur, 1);
        return acc;
    }, new Map());
    let left = passengers[passengersIndex],
        right = passengers[passengersIndex + capacity - 1],
        passengersCount = 1;
        resFlag = true;
        resVal = passengers[passengersIndex] - 1;
    
    // 
    if (buses[busesLength - 1] >= passengers[passengersIndex]) {
        return passengers[passengersIndex] - 1;
    }
    for (i = left + 1; i <= right; i++) {
        if (map.has(i)) {
            passengersCount++;
        }
        else if (passengersCount < capacity) {
            return i;
            // resFlag = false;
            // break;
        }
        if (passengersCount >= capacity) {
            resFlag = false;
            break;
        }
    }

    if (!resFlag) {
        return resVal;
    }
    else {
        return i;
    }
    // 二分？
    // let left = passengers[passengersIndex] + 1,
    //     right = Math.min(
    //         buses[busesLength - 1],
    //         (passengers[passengersIndex + capacity - 1] || Number.POSITIVE_INFINITY) - 1
    //     );

    // return right;
};
// const buses = [20,30,10], passengers = [19,13,26,4,25,11,21], capacity = 2,
// const buses = [10,20], passengers = [2,17,18,19], capacity = 2,
const buses = [2], passengers = [2], capacity = 1,
// const buses = [3], passengers = [2], capacity = 2,
    r_2 = latestTimeCatchTheBus(buses, passengers, capacity);
debugger



// 3
// 输入：nums1 = [1,4,10,12], nums2 = [5,8,6,9], k1 = 1, k2 = 1
// 输出：43
// 解释：一种得到最小差值平方和的方式为：
// - 将 nums1[0] 增加一次。
// - 将 nums2[2] 增加一次。
// 最小差值平方和为：
// (2 - 5)2 + (4 - 8)2 + (10 - 7)2 + (12 - 9)2 = 43 。
// 注意，也有其他方式可以得到最小差值平方和，但没有得到比 43 更小答案的方案。

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k1
 * @param {number} k2
 * @return {number}
 */

class MaxHeap{
    constructor(data){
        // 存储data数据
        this.data = [...data];
        // 新增和删除不重新生成堆，根据二叉树快速的遍历新节点所在的树路径，需要源数据是已经初始化好的大顶堆结构
        this.isTopLargeHeap = false;
    }
    _swap(a, b){
        // 交换数据
        let tmp = this.data[a];
        this.data[a] = this.data[b];
        this.data[b] = tmp;
    }
    _heapDown(i, n){
        // i为当前父节点的下标，n为参与最大子节点的限制
        // 小顶堆只需修改下下方数值判断表达式 // 
        let data = this.data;
        // 父节点的值>左子节点的值
        if (2*i+1 < n && data[i] < data[2*i+1]) {
            this._swap(i,2*i+1);
            // 左子树遍历生成序列化
            this._heapDown(2*i+1, n);
        }
        // 父节点的值>右子节点的值
        if (2*i+2 < n && data[i] < data[2*i+2]) {
            this._swap(i,2*i+2);
            // 右子树遍历生成序列化
            this._heapDown(2*i+2, n);
        }
    }
    _heap(n){
        // n为限制当前最大参与序列化的值，主要为堆排序使用
        for (let i = Math.floor(n/2)-1; i >= 0; i--) {
            this._heapDown(i, n);
        }
    }
    createHeap(){
        // 创建当前数据的大顶堆
        this._heap(this.data.length);
        this.isTopLargeHeap = true;
        return this.data;
    }
    sort(){
        // 利用大顶堆升序排序，如是小顶堆可用来降序排序
        let i = this.data.length;
        while(i){
            this._heap(i);
            this._swap(0,i-1);
            i--;
        }
        this.isTopLargeHeap = false;
        return this.data;
    }
    getData(){
        return this.data;
    }
    insert(item){
        // 插入数据并保持大顶堆结构
        if (!this.isTopLargeHeap) throw 'please do createHeap first';
        this.data.push(item);
        let len = this.data.length,
            index = Math.floor(len/2)-1;
        while(index >= 0){
            console.log(index);
            this._heapDown(index, len);
            // 向上找父节点
            index = Math.floor((index+1)/2-1);
        }
    }
    delete(){
        if (!this.isTopLargeHeap) throw 'please do createHeap first';
        this.data[0] = this.data[this.data.length -1];
        this.data.splice(this.data.length -1,1);
        // 删除最顶部节点，此时把最后一个子节点放到根节点，只需处理根节点“下沉”
        this._heapDown(0, this.data.length);
        return this.data[0];
    }
}

var minSumSquareDiff = function(nums1, nums2, k1, k2) {
    const nums1Length = nums1.length,
        nums2Length = nums2.length;
    let absDiffList = [],
        k = k1 + k2;
    
    for (let i = 0; i < nums1Length; i++) {
        absDiffList.push(Math.abs(nums1[i] - nums2[i]));
    }
    // 
    // absDiffList.sort((a, b) => b - a);

    // 优先队列
    let maxHeap = new MaxHeap(absDiffList);
    maxHeap.createHeap();
    while (k > 0) {
        const tempAbsDiff = maxHeap.delete();
        maxHeap.insert(tempAbsDiff - 1);
        k--;
    }

    absDiffList = maxHeap.getData();

    return absDiffList.reduce((acc, cur) => {
        return acc += Math.pow(cur, 2);
    }, 0);
};


const nums1 = [1,4,10,12], nums2 = [5,8,6,9], k1 = 1, k2 = 1,
    r_3 = minSumSquareDiff(nums1, nums2, k1, k2);
debugger

// 4




