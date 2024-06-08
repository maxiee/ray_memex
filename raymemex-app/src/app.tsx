import React, { useState, useRef } from 'react'; // Import React
import { createRoot } from 'react-dom/client';
import { Mosaic, MosaicContext, MosaicNode, MosaicWindow, MosaicWindowContext } from 'react-mosaic-component'; // Import Mosaic and MosaicNode
import { Button, ButtonProps, Col, Collapse, CollapseProps, Dropdown, Flex, Layout, Menu, MenuProps, Row } from 'antd';
import { MoreOutlined, SplitCellsOutlined, DeleteOutlined, ExpandOutlined, WeiboOutlined, TwitterOutlined } from '@ant-design/icons';

import WebView from './frontend/components/webview';
import { Provider, useDispatch } from 'react-redux';
import store, { AppDispatch } from './frontend/store/store';
import { startDragging, stopDragging } from './frontend/store/gestureSlice';
// import '@blueprintjs/core/lib/css/blueprint.css';
// import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

import 'react-mosaic-component/react-mosaic-component.css';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import Title from 'antd/es/typography/Title';
import MenuItem from 'antd/es/menu/MenuItem';
import { MenuItemType } from 'antd/es/menu/interface';
import ServiceStatusDisplay from './frontend/components/ServiceStatusDisplay';
import { Desktop } from './frontend/components/wm/Desktop/Desktop';
import { MenuBar } from './frontend/components/wm/MenuBar/MenuBar';

export type ViewId = 'a' | 'b' | 'c' | 'new';

const TITLE_MAP: Record<ViewId, any> = {
    a: <WebView src='https://baidu.com' />,
    b: <WebView src='https://baidu.com' />,
    c: <ServiceStatusDisplay />,
    new: 'New Window',
};

const ToolbarButton = ({ onClick, icon }: ButtonProps) => (
    <Button type="text" icon={icon} onClick={onClick} />
);

const Toolbar = () => {
    const { mosaicActions } = React.useContext(MosaicContext);
    const { mosaicWindowActions } = React.useContext(MosaicWindowContext);
    const path = mosaicWindowActions.getPath();

    const split = () => mosaicWindowActions.split().catch(console.error);
    const replace = () => mosaicWindowActions.replaceWithNew().catch(console.error);
    const remove = () => mosaicActions.remove(path);
    const expand = () => mosaicActions.expand(path, 70);

    return (
        // 横向大小自适应
        <>
            <div style={{ flex: 1 }} />
            <ToolbarButton onClick={split} icon={<SplitCellsOutlined />} />
            <ToolbarButton onClick={replace} icon={<MoreOutlined />} />
            <ToolbarButton onClick={expand} icon={<ExpandOutlined />} />
            <ToolbarButton onClick={remove} icon={<DeleteOutlined />} />
        </>
    );
};

const Grid = () => {
    const dispatch = useDispatch<AppDispatch>();
    // 添加一个 windowMoving 的本地状态，表示窗口正在移动
    const windowMovingRef = useRef(false);

    const handleDragStart = () => {
        dispatch(startDragging());
    };

    const handleDragEnd = () => {
        dispatch(stopDragging());
    };

    return <Mosaic<ViewId>
        onChange={() => {
            console.log('changed');
            if (!windowMovingRef.current) handleDragStart();

        }}
        onRelease={() => {
            console.log('released');
            if (!windowMovingRef.current) handleDragEnd();
        }}
        renderTile={(id, path) => (
            <MosaicWindow<ViewId> path={path} createNode={() => 'new'} title={id}
                renderToolbar={() => <div style={{ display: 'flex', width: '100%' }}><Toolbar /></div>}
                onDragStart={() => {
                    console.log('drag start');
                    windowMovingRef.current = true;
                    handleDragStart();
                }}
                onDragEnd={() => {
                    console.log('drag end');
                    windowMovingRef.current = false;
                    handleDragEnd();
                }}
            >
                {TITLE_MAP[id]}
            </MosaicWindow>
        )}
        initialValue={{
            direction: 'row',
            first: 'a',
            second: {
                direction: 'column',
                first: 'b',
                second: 'c',
            },
        }}
    />;
}

const menuItems: MenuProps['items'] = [
    {
        key: '1', label: '社交网络', children: [
            { key: '1-1', label: '微博', icon: <WeiboOutlined /> },
            { key: '1-2', label: 'X', icon: <TwitterOutlined /> },
        ]
    },
    { key: '2', label: 'AI网站', children: [] },
];

const root = createRoot(document.body);
// root.render(<div id="app">
//     <Provider store={store}>
//         <Layout style={{ height: "100%" }} hasSider>
//             <Sider collapsible theme='light' >
//                 <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} items={menuItems} />
//             </Sider>
//             <Content>
//                 <Grid />
//             </Content>
//         </Layout>
//     </Provider>
// </div>);

root.render(<div id="app">
    <ThemeProvider theme={original}>
        <Provider store={store}>
            <Desktop />
            <MenuBar />
        </Provider>
    </ThemeProvider>
</div>);