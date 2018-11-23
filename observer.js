class Observer {
  constructor(data) {
    this.observer(data)
  }

  observer(data) {
    //将原有的属性改成set get的形式
    if(!data || typeof data !== 'object') {
      return
    }
    console.log(Object.keys(data))
    Object.keys(data).forEach(key => {
      //劫持
      this.defineReactive(data, key, data[key])
      this.observer(data[key])
    })
  }

  defineReactive(obj, key, value) {
    var that = this

    //每个变化的数据 都会对应一个数组，数组存放所有的更新操作
    var dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        
        Dep.target && dep.addSub(Dep.target)
        console.log('大傻逼！！')
        return value
      },
      set(newValue) {
        if(newValue !== value) {
          console.log('智障！！')
          that.observer(newValue)  //如果是对象就继续劫持
          value = newValue
          //通知所有人数据更新了
          dep.notify()
        }
      }
    })
  }
}

class Dep {
  constructor() {
    this.subs = []
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}