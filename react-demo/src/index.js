/*
 * @Author: your name
 * @Date: 2021-12-01 17:08:58
 * @LastEditTime: 2021-12-09 16:03:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /myReact/react-demo/src/index.js
 */
import React from './react'
import ReactDOM from './react-dom'

// let reactElement2 = React.createElement('h1',{
//   className:'title',
//   style:{
//     color:'red'
//   }
// },'hello',React.createElement('span',{
//   className:'title',
//   style:{
//     color:'blue'
//   }
// },'world',));

class ClassComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {number:0};
  }
  handleClick = (event)=>{
    this.setState({number:this.state.number+1});
  }
  render(){
    return(
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    ) 
  }
}

// function FunctionComponent(props) {
//   return <div style={{'color':'red'}}>函数组件{props.name}</div>
// }

let element2 = <ClassComponent name="用例"/>

ReactDOM.render(element2,document.getElementById('root'))