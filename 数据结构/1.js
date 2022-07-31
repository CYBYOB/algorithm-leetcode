class Heap {
    constructor(compare) {
        this.arr = [0]; // 下标从1开始好算，下标0废弃
        this.compare = (typeof compare === 'function') ? compare : this._defaultCompare;
    }

    /**
     * 根据可迭代对象生成堆
     * @param {*} data iterable 对象
     * @param {*} compare
     */
    static heapify(data, compare = undefined) {
        let heap = new Heap(compare);
        for (let item of data) {
            heap.push(item);
        }
        return heap;
    }

    push(item) {
        let { arr } = this;
        arr.push(item);
        this._up(arr.length - 1);
        // console.log('push', item, arr.slice(1));
    }

    pop() {
        if (this.size === 0) return null; //行为同Java的PriorityQueue
        let { arr } = this;
        this._swap(1, arr.length - 1);// 末尾的换上来，堆顶放到最后等待返回
        let res = arr.pop();
        this._down(1);// 换上来的末尾尝试下沉
        // console.log('pop', arr.slice(1));
        return res;
    }

    /**
     * 堆中元素数量
     */
    get size() {
        return this.arr.length - 1;
    }

    /**
     * 返回堆顶元素
     */
    peek() {
        return this.arr[1];
    }

    /**
     * 上浮第k个元素
     * @param {int} k
     */
    _up(k) {
        let { arr, compare, _parent } = this;
        // k 比它的父节点更靠近堆顶，应该继续上浮（k=1 表示已经到达堆顶）
        while (k > 1 && compare(arr[k], arr[_parent(k)])) {
            this._swap(_parent(k), k);
            k = _parent(k);
        }
    }

    /**
     * 下沉第k个元素
     * @param {int} k
     */
    _down(k) {
        let { arr, compare, _left, _right } = this;
        let size = this.size;
        // 如果沉到堆底，就沉不下去了
        while (_left(k) <= size) {
            let child = _left(k);
            if (_right(k) <= size && compare(arr[_right(k)], arr[child])) {
                child = _right(k); // 选择左右子节点中更靠近堆顶的，这样能维持下沉后原本的 left与right 之间的顺序关系
            }
            // 如果当前的k比子节点更靠近堆顶，不用下沉了
            if (compare(arr[k], arr[child])) return;
            // 下沉
            this._swap(k, child);
            k = child;
        }
    }

    _left(k) { return k * 2; }
    _right(k) { return k * 2 + 1; }
    _parent(k) { return Math.floor(k / 2); }

    /**
     * 交换位置
     * @param {int} i
     * @param {int} j
     */
    _swap(i, j) {
        let arr = this.arr;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    /**
     * a是否比b更接近堆顶，默认为小顶堆
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    _defaultCompare(a, b) {
        return a < b;
    }
}


let heap = new Heap((a, b) => { return a > b }); //大顶堆
heap.push(3);
heap.push(1);
heap.push(2);

heap.size; //3

heap.pop(); //3
heap.pop(); //2
heap.pop(); //1
heap.pop(); //null
