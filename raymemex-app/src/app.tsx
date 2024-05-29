import React, { useState, useRef } from 'react'; // Import React
import { createRoot } from 'react-dom/client';
import { Mosaic, MosaicContext, MosaicNode, MosaicWindow, MosaicWindowContext } from 'react-mosaic-component'; // Import Mosaic and MosaicNode
import { Button, ButtonProps, Collapse, CollapseProps, Dropdown, Flex, Layout, Menu } from 'antd';
import { MoreOutlined, SplitCellsOutlined, DeleteOutlined, ExpandOutlined } from '@ant-design/icons';

import WebView from './frontend/components/webview';
import { Provider, useDispatch } from 'react-redux';
import store, { AppDispatch } from './frontend/store/store';
import { startDragging, stopDragging } from './frontend/store/gestureSlice';
// import '@blueprintjs/core/lib/css/blueprint.css';
// import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import 'react-mosaic-component/react-mosaic-component.css';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import Title from 'antd/es/typography/Title';
import MenuItem from 'antd/es/menu/MenuItem';
import { MenuItemType } from 'antd/es/menu/interface';

export type ViewId = 'a' | 'b' | 'c' | 'new';

const TITLE_MAP: Record<ViewId, any> = {
    a: <WebView src='https://baidu.com' />,
    b: <WebView src='https://baidu.com' />,
    c: <WebView src='https://kimi.moonshot.cn/' />,
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

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
    {
        key: '1',
        label: '社交媒体',
        children: <p>{text}</p>,
    },
    {
        key: '2',
        label: 'AI 网站',
        children: <p>{text}</p>,
    },
    {
        key: '3',
        label: '常用网站',
        children: <p>{text}</p>,
    },
];
const root = createRoot(document.body);
root.render(<div id="app">
    <Provider store={store}>
        <Layout style={{ height: "100%" }}>
            <Sider collapsible theme='light' >
                <Collapse items={items} defaultActiveKey={['1']} />;
            </Sider>
            <Content>
                <Grid />
            </Content>
        </Layout>
    </Provider>
</div>);