// 定义 action 类型
export const UPDATE_LAYOUT = 'UPDATE_LAYOUT';

// 定义 action creator
export function updateLayout(layout) {
    return {
        type: UPDATE_LAYOUT,
        payload: layout
    };
}