class MVVM{
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    //如果有el，就编译
    if(this.$el) {
      
      //数据劫持，就是把对象的属性改成get和setter方法
      new Observer(this.$data)
      this.proxyData(this.$data)
      //用元素和数据进行编译
      new Compile(this.$el, this)
    }
  }

  proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set(newValue) {
          data[key] = newValue
        }
      })
    })
  }
}