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
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log('大傻逼！！')
        return value
      },
      set(newValue) {
        console.log('智障！！')
        that.observer(newValue)  //如果是对象就继续劫持
        if(newValue !== value) {
          value = newValue
        }
      }
    })
  }
}