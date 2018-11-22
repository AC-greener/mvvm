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
      this.el.appendChild(fragment)
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
      if(this.isElementNode(node)) {
        //编译元素
        this.compileElement(node)

        //递归调用
        this.compile(node)
      } else {
        //编译文本节点
        this.compileText(node)
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

  compileElement(node) {
    //编译v-model元素
    var attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      var attrName = attr.name
      if(this.isDirective(attrName)) {
        //比如v-model='message'  expr就是message
        let expr = attr.value    
        //node this.vm.$data expr 
        let type = attrName.slice(2)
        CompileUtil[type](node, this.vm, expr)
      }
    })
  }
  compileText(node) {
    //编译{{}}文本
    var expr = node.textContent
    var reg = /\{\{([^}]+)\}\}/g
    if(reg.test(expr)) {
      //node this.vm.$data text
      CompileUtil['text'](node, this.vm, expr)
    }
  }

  isDirective(name) {
    return name.includes('v-')
  }
}

CompileUtil = {
  //获取实例上的数据
  getVal(vm, expr) {
    console.log(expr)
    expr = expr.split('.')
    return expr.reduce((prev, next) => {
      return prev[next]
    }, vm.$data)
  },
  //处理文本
  text(node, vm, expr) {
    console.log('处理{{}}语法')
    let updateFn = this.updater['textUpdater']
    let value = expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      return this.getVal(vm, arguments[1])
    })
    console.log("94", value)
    updateFn && updateFn(node, value)
  },
  //处理v-model指令
  model(node, vm, expr) {
    console.log('处理v-model指令')
    let updateFn = this.updater['modelUpdater']
    updateFn && updateFn(node, this.getVal(vm, expr))
  },
  updater: {
    //文本更新
    textUpdater(node, value) {
      node.textContent = value
    },
    //输入框更新
    modelUpdater(node, value) {
      console.log(value)
      node.value = value
    }
  }
}