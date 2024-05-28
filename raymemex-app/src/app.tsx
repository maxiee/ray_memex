import React from 'react'; // Import React
import { createRoot } from 'react-dom/client';
import { Mosaic, MosaicNode, MosaicWindow } from 'react-mosaic-component'; // Import Mosaic and MosaicNode


import 'react-mosaic-component/react-mosaic-component.css';
import WebView from './frontend/components/webview';
import { Provider, useDispatch } from 'react-redux';
import store, { AppDispatch } from './frontend/store/store';
import { startDragging, stopDragging } from './frontend/store/gestureSlice';
// import '@blueprintjs/core/lib/css/blueprint.css';
// import '@blueprintjs/icons/lib/css/blueprint-icons.css';

export type ViewId = 'a' | 'b' | 'c' | 'new';

const TITLE_MAP: Record<ViewId, any> = {
    a: <WebView src='https://weibo.com' />,
    b: <WebView src='https://baidu.com' />,
    c: <WebView src='https://kimi.moonshot.cn/' />,
    new: 'New Window',
};

const Grid = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleDragStart = () => {
        dispatch(startDragging());
    };

    const handleDragEnd = () => {
        dispatch(stopDragging());
    };

    return <Mosaic<ViewId>
        renderTile={(id, path) => (
            <MosaicWindow<ViewId> path={path} createNode={() => 'new'} title={id}
                onDragStart={handleDragStart} onDragEnd={handleDragEnd}
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