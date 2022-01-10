<!--
 * @Author: your name
 * @Date: 2021-12-01 16:58:36
 * @LastEditTime: 2022-01-07 15:00:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /myReact/react-demo/README.md
-->
## react 渲染总结
1、首先打包时通过babel编译，主要是将jsx编译成js的createElement函数
- 例如：类组件编译前
```
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

let element2 = <ClassComponent name="用例"/>

```
- 类组件编译后
```
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleClick", event => {
      this.setState({
        number: this.state.number + 1
      });
    });

    this.state = {
      number: 0
    };
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, this.state.number), /*#__PURE__*/React.createElement("button", {
      onClick: this.handleClick
    }, "+"));
  }

}

let element2 = /*#__PURE__*/React.createElement(ClassComponent, {
  name: "\u7528\u4F8B"
});
```
- 函数组件编译前
```
const FunctionComponent = (props)=>{
	  return(
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    ) 
}

let element3 = <FunctionComponent name="函数组件"/>

```
- 函数组件编译后
```
const FunctionComponent = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, this.state.number), /*#__PURE__*/React.createElement("button", {
    onClick: this.handleClick
  }, "+"));
};

let element3 = /*#__PURE__*/React.createElement(FunctionComponent, {
  name: "\u51FD\u6570\u7EC4\u4EF6"
});
```
2、编译成createElement函数后，通过react的createElement方法将内容转化成Vdom(虚拟dom)

3、调用ReactDOM.render方法渲染（主要将Vdom转化成真实dom，并插入页面）

## 组件更新（两种方式）

- 一个是来自父组件的属性，
- 组件的状态 state
- 不管是修改属性还是修改状态都会引起组件的重新刷新，让视图更新
- state的更新会被合并
- React会把多个setState合并为一次调用
- setState可能是异步也可能是同步，在React能够管理的范围内是异步，比如事件函数，生命周期函数（批量更新）。比如在setTimeout、原生事件里都是同步的

## 合成事件
在每个子dom加一个store属性，并把事件方法存入，但真正react只有在document上才会触发事件，当页面触发事件时，react会在对应的store里面找到对应事件并执行，同事还有包装一下传入的原始event
### 为什么React不会将原生事件对象直接传给事件处理函数：
- 1、为了兼容性