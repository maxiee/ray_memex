import { createStore } from 'redux';
import { UPDATE_LAYOUT } from './actions';

interface LayoutItem {
    i: string;  // 组件的唯一标识符
    x: number;  // 组件的水平位置（栅格单元）
    y: number;  // 组件的垂直位置（栅格单元）
    w: number;  // 组件的宽度（栅格单元）
    h: number;  // 组件的高度（栅格单元）
}

interface AppState {
    layouts: {
        [tabKey: string]: LayoutItem[]; // 每个标签页有其独立的布局数组
    };
}


// 定义初始状态
const initialState = {
    layouts: {}
};

// 定义 reducer 函数
function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_LAYOUT:
            const { tabKey, layout } = action.payload;
            return {
                ...state,
                layouts: {
                    ...state.layouts,
                    [tabKey]: layout // 更新特定标签页的布局
                }
            };
        default:
            return state;
    }
}

// 创建 Redux store
const store = createStore(reducer);

export default store;