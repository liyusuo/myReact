/*
 * @Author: your name
 * @Date: 2021-12-06 14:55:35
 * @LastEditTime: 2021-12-09 16:49:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /myReact/react-demo/src/react-dom.js
 */

import { REACT_TEXT } from "./constants";


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
  let {type,props} = vdom;
  console.log('createDOM',vdom)
  let dom;//真实dom
  if(type === REACT_TEXT){//创建文本节点
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
  return dom
}



function mountClassComponent(vdom) {
  console.log('mountClassComponent',vdom)
  let {type:ClassComponent,props} = vdom
  let classInstance = new ClassComponent(props); 
  let renderVdom = classInstance.render();
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
const ReactDOM = {
  render
}


export default ReactDOM