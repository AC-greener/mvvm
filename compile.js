class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    if(this.el) {
      //先把dom放到fragment中
      //想要提取元素的v-model 和文本节点{{}}
      //最后把编译好的fragment中
      var fragment = this.nodeToFragment(this.el)
      this.compile(fragment)
    }
   

  }
   //辅助方法
  isElementNode(node) {
    return node.nodeType === 1
  }
  //核心方法
  compile(fragment) {
    //递归获取节点
    var childNodes = fragment.childNodes
    Array.from(childNodes).forEach(node => {
      if(this.isElementNodenode) {
        //编译元素
        console.log('element', node)
        this.compileElement()

        //递归调用
        this.compile(node)
      } else {
        //编译文本节点
        console.log('text', node)
      }
    })    
  }
  nodeToFragment(el) {
    let fragment = document.createDocumentFragment();
    let firstChild = el.firstChild
    while(el.firstChild) {
      fragment.appendChild(firstChild)
      firstChild = el.firstChild
    }

    //内存中的节点
    return fragment;
  }

  compileElement() {

  }
  compileText() {
    
  }
}