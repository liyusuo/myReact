/*
 * @Author: your name
 * @Date: 2021-12-07 15:50:40
 * @LastEditTime: 2021-12-07 16:06:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /myReact/react-demo/src/component.js
 */
class Component {
  // 因为函数组件和类组件都会在编译后成为函数
  // 为了区分类组件和函数组件，给类组件的类型加一个静态属性isReactComponent
  static isReactComponent = true
  constructor(props) {
    this.props = props
  }
}

export {
  Component
}