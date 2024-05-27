import React from 'react';
import { Tab } from '../store/model'; // 假设实体类定义在此路径

export interface WebViewTab extends Tab {
    url: string;
    type: string;
}

const WebViewTabComp: React.FC<WebViewTab> = (props) => {
    return <webview src={props.url} style={{ width: props.width + "px", height: props.height + "px"}} />
};

export function createWebViewTab(id: string, windowId: string, title: string, url: string): WebViewTab {
    return {
        type: 'WebViewTab',
        id,
        windowId,
        title,
        url,
        active: true,
        height: 0,
        width: 0,
    };
}

export { WebViewTabComp };
