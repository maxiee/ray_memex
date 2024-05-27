import React from 'react'; // Import React
import { createRoot } from 'react-dom/client';
import { Mosaic, MosaicNode, MosaicWindow } from 'react-mosaic-component'; // Import Mosaic and MosaicNode


import 'react-mosaic-component/react-mosaic-component.css';
// import '@blueprintjs/core/lib/css/blueprint.css';
// import '@blueprintjs/icons/lib/css/blueprint-icons.css';

export type ViewId = 'a' | 'b' | 'c' | 'new';

const TITLE_MAP: Record<ViewId, string> = {
    a: 'Left Window',
    b: 'Top Right Window',
    c: 'Bottom Right Window',
    new: 'New Window',
};

const Grid = () =>
    <Mosaic<ViewId>
        renderTile={(id, path) => (
            <MosaicWindow<ViewId> path={path} createNode={() => 'new'} title={TITLE_MAP[id]}>
                <h1>{TITLE_MAP[id]}</h1>
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