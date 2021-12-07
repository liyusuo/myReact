/*
 * @Author: your name
 * @Date: 2021-12-01 17:37:29
 * @LastEditTime: 2021-12-07 15:55:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /myReact/react-demo/src/react.js
 */
import {REACT_ELEMENT} from './constants'
import {wrapToVdom} from './utils'
import {Component} from './component'
function createElement(type,config,chidren){
  let ref,key;
  if(config){
    ref = config.ref
    key = config.key
    delete config.ref
    delete config.key
  }
  let props = {...config}
  if(arguments.length > 3){//如果参数的长度大于3，说明有多个子节点
    props.children = Array.prototype.slice.call(arguments,2).map(wrapToVdom)
  }else if(arguments.length === 3){
    props.children = wrapToVdom(chidren);//字符串 数字转换成对象
  }

  return {
    $$typeof:REACT_ELEMENT,//元素的类型
    type,//dom标签的类型
    ref,//引用真是dom
    key,//进行dom-diff对比
    props// 属性  className  style  children
  }
}

const React = {
  createElement,
  Component
}

export default React