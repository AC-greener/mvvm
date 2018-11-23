//观察者的目的就是给需要变化的那个元素增加一个观察者，当数据变化后执行对应的方法

class Watcher {
  constructor(vm, expr, callback) {
    this.vm = vm
    this.expr = expr
    this.callback = callback
    this.oldValue = this.getOld()
  }
  //获取实例上的数据
  getVal(vm, expr) {
    console.log(expr)
    expr = expr.split('.')
    return expr.reduce((prev, next) => {
      return prev[next]
    }, vm.$data)
  }
  getOld() {
    //每次调用的时候把target放进去
    Dep.target = this
    let oldValue = this.getVal(this.vm, this.expr)
    Dep.target = null
    return oldValue
  }
  update() {
    let newValue = this.getVal(this.vm, this.expr)
    let oldValue = this.oldValue
    if(oldValue !== newValue) {
      this.callback(newValue)
    }
  }
}

//用新值和旧值对比 如果发生变化 就调用更新方法