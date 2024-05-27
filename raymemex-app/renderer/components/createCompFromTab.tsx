import React from 'react';
import { WebViewTab, WebViewTabComp} from './WebViewTab';
import { Tab } from '../store/model';

export default function createCompFromTab(tab: Tab) {
    // 如果 tab 是 WebViewTab 类型，则返回 WebViewTabComp 组件
    if (tab.type === 'WebViewTab') {
        console.log('createCompFromTab: WebViewTab');
        return <WebViewTabComp {...tab as WebViewTab} />;
    }
}