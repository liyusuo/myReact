/*
 * @Author: your name
 * @Date: 2021-12-06 14:55:35
 * @LastEditTime: 2022-01-10 16:43:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /myReact/react-demo/src/react-dom.js
 */

import { REACT_TEXT , REACT_FORWARD_REF} from "./constants";
import {addEvent} from'./event'


function render(vdom,container){
  mount(vdom,container)
}

/**
 * 
 * @param {*} vdom 虚拟dom 也就是React元素
 * @param {*} container 真实DOM容器
 */
function mount(vdom,container){
  let newDOM = createDOM(vdom)
  container.appendChild(newDOM)

}

/**
 * 把虚拟dom转换成真实dom
 * @param {*} vdom 虚拟dom 
 * @return 真实dom
 */
function createDOM(vdom){
  console.log('vdom',vdom)
  let {type,props,ref} = vdom;
  let dom;//真实dom
  if(type && type.$$typeof === REACT_FORWARD_REF){
    return mountForwardComponent(vdom);
  }else if(type === REACT_TEXT){//创建文本节点
    dom = document.createTextNode(props.content);
  }else if(typeof type === 'function'){
    if(type.isReactComponent){
      return mountClassComponent(vdom)
    }else{
      return mountFunctionComponent(vdom)
    }
  } else if(typeof type === 'string'){
    dom = document.createElement(type)
  }
  if(props){
    updateProps(dom,{},props);
    let children = props.children;
    if(typeof children === 'object' && children.type){
      mount(children,dom)
    }else if(Array.isArray(children)){
      reconcileChildren(children,dom)
    }
  }
  vdom.dom = dom;
  if(ref)ref.current = dom;
  return dom
}


function mountForwardComponent(vdom){
  let {type,props,ref} = vdom;
  let renderVdom = type.render(props,ref)
  return createDOM(renderVdom);

}
function mountClassComponent(vdom) {
  let {type:ClassComponent,props,ref} = vdom
  //把类组件的属性传递给了类组件的构造函数
  let classInstance = new ClassComponent(props);//创建类组件的实例 
  if(ref)ref.current = classInstance;
  let renderVdom = classInstance.render();
  classInstance.oldRenderVdom = renderVdom
  return createDOM(renderVdom)
}



function mountFunctionComponent(vdom){
  let {type:functionComponent,props} = vdom
  let renderVdom = functionComponent(props)
  return createDOM(renderVdom)
}


function reconcileChildren(children,parentDom){
  children.forEach(children => mount(children,parentDom));
}



function updateProps(dom,oldProps,newProps){
  for(let key in newProps){
    if(key === 'children'){
      continue
    }else if(key === 'style'){
      let styleObj = newProps[key]
      for(let attr in styleObj){
        dom.style[attr]=styleObj[attr];
      }
    }else if(key.startsWith('on')){
      // dom[key.toLocaleLowerCase()] = newProps[key]
      //不会把事件函数绑定到DOM上，而是会进行事件委托，全部委托到ducument上
      addEvent(dom,key.toLowerCase(),newProps[key])
    }else{
      dom[key] = newProps[key];
    }
  }
  for(let key in oldProps){
    if(!newProps.hasOwnProperty(key)){
      dom[key]=null;
    }
  }
    
}

/**
 * 
 * @param {*} parentDOM 父真实dom
 * @param {*} oldVdom 老的虚拟dom
 * @param {*} newVdom 新的虚拟dom
 */
export function compareTwoVdom(parentDOM,oldVdom,newVdom) {
  let oldDOM = oldVdom.dom
  let newDOM = createDOM(newVdom)
  parentDOM.replaceChild(newDOM,oldDOM)
}
const ReactDOM = {
  render
}


export default ReactDOM