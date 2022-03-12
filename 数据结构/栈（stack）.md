
```js
class Stack {

    constructor() {
        this.items = []
    }

    // 入栈
    push(element) {
         this.items.push(element)
    }

    // 出栈
    pop() {
        return this.items.pop()
    }

    // 末位
    get peek() {
        return this.items[this.items.length - 1]
    }

    // 是否为空栈
    get isEmpty() {
        return !this.items.length
    }

    // 尺寸
    get size() {
        return this.items.length
    }

    // 清空栈
    clear() {
        this.items = []
    }

    // 打印栈数据
    print() {
        console.log(this.items.toString())
    }
}
```
