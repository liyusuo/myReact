/*
 * @Author: your name
 * @Date: 2021-12-01 17:08:58
 * @LastEditTime: 2022-01-10 18:04:12
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

// class ClassComponent extends React.Component{
//   constructor(props){
//     super(props);
//     this.state = {number:0};
//   }
//   handleClick = (event)=>{
//     this.setState({number:this.state.number+1});
//     console.log(this.state.number)
//     this.setState({number:this.state.number+1});
//     console.log(this.state.number)
//     setTimeout(()=>{
//       this.setState({number:this.state.number+1});
//       console.log(this.state.number)
//       this.setState({number:this.state.number+1});
//       console.log(this.state.number)
//     })
//   }
//   render(){
//     return(
//       <div>
//         <p>{this.state.number}</p>
//         <button onClick={this.handleClick}>+</button>
//       </div>
//     ) 
//   }
// }

// function FunctionComponent(props) {
//   return <div style={{'color':'red'}}>函数组件{props.name}</div>
// }

// class Sum extends React.Component{
//   constructor(props){
//     super(props);
//     this.a = React.createRef();
//     this.b = React.createRef();
//     this.result = React.createRef();
    
//   }
//   handleAdd =()=>{
//     let valueA = this.a.current.value
//     let valueB = this.b.current.value
//     this.result.current.value  = valueA + valueB
//   }

//   render(){
//     return (
//       <div>
//         <input ref={this.a}/>+<input ref={this.b}/><button onClick={this.handleAdd}>=</button><input ref={this.result}/>
//       </div>
//     )
//   }
// }

// let element2 = <Sum name="Ref"/>

// function FunctionComponent(props) {
//   return <div style={{'color':'red'}}>函数组件{props.name}</div>
// }


// class TextInput extends React.Component{
//   constructor(props){
//     super(props)
//     this.input = React.createRef();
//   }
//   getFocus = ()=>{
//     this.input.current.focus()
//   }
//   render(){
//     return <input ref={this.input}/>
//   }
// }

function TextInput(props,ref){
  return <input ref={ref}/>
}

const ForwardedTextInput = React.forwardRef(TextInput)
class Form extends React.Component{
  constructor(props){
    super(props);
    this.input = React.createRef();
    
  }
  
  getFocus = ()=>{
    this.input.current.focus()
  }

  render(){
    return (
      <div>
        <ForwardedTextInput ref={this.input}/>
        <div onClick={this.getFocus}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          {this.a}
          {this.b}
        </div>
      </div>
    )
  }
}

let element2 = <Form name="Ref"/>

ReactDOM.render(element2,document.getElementById('root'))