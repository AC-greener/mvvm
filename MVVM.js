class MVVM{
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    //如果有el，就编译
    if(this.$el) {
      new Compile(this.$el, this)
    }
  }
}