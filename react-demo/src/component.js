/*
 * @Author: your name
 * @Date: 2021-12-07 15:50:40
 * @LastEditTime: 2021-12-23 17:12:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /myReact/react-demo/src/component.js
 */
import {compareTwoVdom} from './react-dom'
class Updater{
  constructor(classInstance){
    this.classInstance = classInstance
    this.pendingStates = []
  }

  addState(partialState){
    this.pendingStates.push(partialState)
    this.emitUpdate();
  }
  emitUpdate(){
    this.updateComponent();
  }
  updateComponent(){
    let {classInstance,pendingStates} = this;
    if(pendingStates.length>0){
      shouldUpdate(classInstance,this.getState())
    }
  }
  getState(){
    let {classInstance,pendingStates} = this;
    let {state} = classInstance;//老状态
    pendingStates.forEach(nextState => {
      state = {...state,...nextState}
    });
    pendingStates.length = 0
    return state

  }
}
function shouldUpdate(classInstance,nextState) {
  classInstance.state = nextState
  classInstance.forceUpdate();
}

class Component {
  // 因为函数组件和类组件都会在编译后成为函数
  // 为了区分类组件和函数组件，给类组件的类型加一个静态属性isReactComponent
  static isReactComponent = true
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }

  setState(partialState){
    this.updater.addState(partialState)
  }
  forceUpdate(){
    let oldRenderVdom = this.oldRenderVdom
    let oldDOM = oldRenderVdom.dom;
    let newRenderVdom = this.render()
    compareTwoVdom(oldDOM.parentNode,oldRenderVdom,newRenderVdom)
    this.oldRenderVdom = newRenderVdom
  }
}

export {
  Component
}