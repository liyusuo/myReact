/*
 * @Author: your name
 * @Date: 2021-12-01 17:08:58
 * @LastEditTime: 2021-12-07 15:37:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /myReact/react-demo/src/index.js
 */
import React from './react'
import ReactDOM from './react-dom'

let reactElement2 = React.createElement('h1',{
  className:'title',
  style:{
    color:'red'
  }
},'hello',React.createElement('span',{
  className:'title',
  style:{
    color:'blue'
  }
},'world',));

function FunctionComponent(props) {
  return <div style={{'color':'red'}}>测试{props.name}</div>
}
console.log(JSON.stringify(reactElement2,null,2))
let element2 = <FunctionComponent name="用例"/>

ReactDOM.render(element2,document.getElementById('root'))