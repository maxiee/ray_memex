import React from 'react'; // Import React
import { createRoot } from 'react-dom/client';
import { Mosaic, MosaicNode, MosaicWindow } from 'react-mosaic-component'; // Import Mosaic and MosaicNode


import 'react-mosaic-component/react-mosaic-component.css';
import WebView from './frontend/components/webview';
// import '@blueprintjs/core/lib/css/blueprint.css';
// import '@blueprintjs/icons/lib/css/blueprint-icons.css';

export type ViewId = 'a' | 'b' | 'c' | 'new';

const TITLE_MAP: Record<ViewId, any> = {
    a: <WebView src='https://baidu.com' />,
    b: 'Top Right Window',
    c: 'Bottom Right Window',
    new: 'New Window',
};

const Grid = () =>
    <Mosaic<ViewId>
        renderTile={(id, path) => (
            <MosaicWindow<ViewId> path={path} createNode={() => 'new'} title={id}>
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

const root = createRoot(document.body);
root.render(<div id="app">
    <Grid />
</div>);