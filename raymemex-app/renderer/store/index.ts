import { createStore } from 'redux';
import { UPDATE_LAYOUT } from './actions';

// 定义初始状态
const initialState = {
    layouts: {
        lg: [/* ... */],
        md: [/* ... */],
        sm: [/* ... */],
        xs: [/* ... */],
        xxs: [/* ... */]
    }
};

// 定义 reducer 函数
function reducer(state = initialState, action) {
    console.log('reducer', action);
    switch (action.type) {
        case UPDATE_LAYOUT:
            return {
                ...state,
                layouts: action.payload
            };
        // 处理不同的 action 类型，返回新的状态
        default:
            return state;
    }
}

// 创建 Redux store
const store = createStore(reducer);

export default store;