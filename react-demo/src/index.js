/*
 * @Author: your name
 * @Date: 2021-12-01 17:08:58
 * @LastEditTime: 2021-12-04 14:55:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /myReact/react-demo/src/index.js
 */
import React from './react'
import ReactDOM from 'react-dom'

let reactElement2 = React.createElement('h1',{
  className:'title',
  style:{
    color:'red'
  }
},'hello',React.createElement('span',null,'world'));
console.log(JSON.stringify(reactElement2,null,2))

ReactDOM.render(<h1>hello</h1>,document.getElementById('root'))