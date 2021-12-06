/*
 * @Author: your name
 * @Date: 2021-12-04 14:31:42
 * @LastEditTime: 2021-12-04 14:58:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /myReact/react-demo/src/utils.js
 */

import { REACT_TEXT } from "./constants";

/**
 * 为了更方便的进行虚拟DOM的对比，我们把虚拟DOM进行一下包装
 * 需要把字符串或者数字也变成一个对象
 */
export function wrapToVdom(element){

  return typeof element === 'string' || typeof element === 'number'?{type:REACT_TEXT,props:{content:element}}:element

}