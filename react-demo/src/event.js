/*
 * @Author: your name
 * @Date: 2021-12-27 15:32:21
 * @LastEditTime: 2022-01-10 18:28:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /myReact/react-demo/src/event.js
 */
import {
  updateQueue
} from "./component";
export function addEvent(dom, eventType, handler) {
  //保证dom有store属性，值初始化是一个空对象
  let store;
  if (dom.store) {
    store = dom.store;
  } else {
    store = dom.store = {};
  }
  store[eventType] = handler;
  if (!document[eventType]) {
    document[eventType] = dispatchEvent;
  }
}

//合成事件的统一代理函数
function dispatchEvent(event) {
  let {
    target,
    type
  } = event;
  let eventType = `on${type}`;
  let syntheticEvent = createSynthetivEvent(event);
  updateQueue.isBatchingUpdate = true;
  while (target) {
    let {
      store
    } = target;
    let handler = store && store[eventType]
    handler && handler(syntheticEvent);
    target = target.parentNode;
  }
  updateQueue.isBatchingUpdate = false;
  updateQueue.batchUpdate()
}

function createSynthetivEvent(nativeEvent) {
  let syntheticEvent = {};
  for (let key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key]
  }
  syntheticEvent.nativeEvent = nativeEvent
}