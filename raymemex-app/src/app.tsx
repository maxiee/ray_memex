import React, { useState, useRef } from 'react'; // Import React
import { createRoot } from 'react-dom/client';
import { Mosaic, MosaicContext, MosaicNode, MosaicWindow, MosaicWindowContext } from 'react-mosaic-component'; // Import Mosaic and MosaicNode
import { Button, ButtonProps, Dropdown, Menu } from 'antd';
import { MoreOutlined, SplitCellsOutlined, DeleteOutlined, ExpandOutlined } from '@ant-design/icons';

import WebView from './frontend/components/webview';
import { Provider, useDispatch } from 'react-redux';
import store, { AppDispatch } from './frontend/store/store';
import { startDragging, stopDragging } from './frontend/store/gestureSlice';
// import '@blueprintjs/core/lib/css/blueprint.css';
// import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import 'react-mosaic-component/react-mosaic-component.css';

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
        <div>
            <ToolbarButton onClick={split} icon={<SplitCellsOutlined />} />
            <ToolbarButton onClick={replace} icon={<MoreOutlined />} />
            <ToolbarButton onClick={expand} icon={<ExpandOutlined />} />
            <ToolbarButton onClick={remove} icon={<DeleteOutlined />} />
        </div>
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
                renderToolbar={() => <div><Toolbar /></div>}
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

const root = createRoot(document.body);
root.render(<div id="app">
    <Provider store={store}>
        <Grid />
    </Provider>
</div>);