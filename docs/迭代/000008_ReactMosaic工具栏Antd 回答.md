根据你提供的代码和 react-mosaic 的文档，我尝试使用 Antd 组件库来实现 react-mosaic 的工具栏功能。以下是修改后的代码：

```tsx
import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Mosaic, MosaicWindow, MosaicContext } from 'react-mosaic-component';
import { Button, Dropdown, Menu } from 'antd';
import { MoreOutlined, SplitCellsOutlined, DeleteOutlined, ExpandOutlined } from '@ant-design/icons';

import 'react-mosaic-component/react-mosaic-component.css';
import 'antd/dist/antd.css';
import WebView from './frontend/components/webview';
import { Provider, useDispatch } from 'react-redux';
import store, { AppDispatch } from './frontend/store/store';
import { startDragging, stopDragging } from './frontend/store/gestureSlice';

export type ViewId = 'a' | 'b' | 'c' | 'new';

const TITLE_MAP: Record<ViewId, any> = {
    a: <WebView src='https://baidu.com' />,
    b: <WebView src='https://baidu.com' />,
    c: <WebView src='https://kimi.moonshot.cn/' />,
    new: 'New Window',
};

const ToolbarButton = ({ onClick, icon }) => (
  <Button type="text" icon={icon} onClick={onClick} />  
);

const Toolbar = () => {
  const { mosaicActions, mosaicWindowActions } = React.useContext(MosaicContext);
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
            <MosaicWindow<ViewId> 
              path={path} 
              createNode={() => 'new'} 
              title={id}
              renderToolbar={() => <Toolbar />}
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
```

主要的修改如下：

1. 引入了需要的 Antd 组件和图标。

2. 定义了一个 `ToolbarButton` 组件，用于渲染工具栏上的按钮。

3. 定义了 `Toolbar` 组件，使用 `MosaicContext` 获取 `mosaicActions` 和 `mosaicWindowActions`，实现了分割、替换、删除和扩展窗口的功能。

4. 在 `MosaicWindow` 组件中，通过 `renderToolbar` 属性指定使用 `Toolbar` 组件来渲染工具栏。

这样就使用 Antd 组件库实现了 react-mosaic 的工具栏功能。你可以进一步调整 `Toolbar` 组件的样式和布局，以满足你的设计需求。同时注意引入必要的 CSS 文件以正确显示 Antd 组件的样式。

希望这个示例对你有所帮助！如有任何其他问题，欢迎随时提出。

---

## 报错

```
报错了：Uncaught Error: Only native element nodes can now be passed to React DnD connectors.You can either wrap Toolbar into a <div>, or turn it into a drag source or a drop target itself.

    at throwIfCompositeComponentElement (wrapConnectorHooks.js:16:11)

    at eval (wrapConnectorHooks.js:32:9)

    at InternalMosaicWindow.renderToolbar (MosaicWindow.js:173:36)

    at InternalMosaicWindow.render (MosaicWindow.js:143:18)

    at finishClassComponent (react-dom.development.js:19776:31)

    at updateClassComponent (react-dom.development.js:19722:24)

    at beginWork (react-dom.development.js:21645:16)

    at HTMLUnknownElement.callCallback (react-dom.development.js:4164:14)

    at Object.invokeGuardedCallbackDev (react-dom.development.js:4213:16)

    at invokeGuardedCallback (react-dom.development.js:4277:31)
```

这个错误提示表明，在使用 React DnD（拖放库）时，只能将原生的 HTML 元素节点传递给 connector。而在你的代码中，你直接将 `Toolbar` 组件传递给了 `renderToolbar` 属性，这会导致错误。

为了解决这个问题，你可以将 `Toolbar` 组件包装在一个 `<div>` 中，或者将 `Toolbar` 本身转换为一个拖放源（drag source）或拖放目标（drop target）。

这里我们将 `Toolbar` 包装在一个 `<div>` 中来解决这个问题。修改后的代码如下：

```tsx
const Toolbar = () => {
  const { mosaicActions, mosaicWindowActions } = React.useContext(MosaicContext);
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
    // ...

    return <Mosaic<ViewId>
        // ...
        renderTile={(id, path) => (
            <MosaicWindow<ViewId> 
              // ...
              renderToolbar={() => <div><Toolbar /></div>}
              // ...
            >
                {TITLE_MAP[id]}
            </MosaicWindow>
        )}
        // ...
    />;
}
```

主要的修改是在 `renderToolbar` 属性中，将 `Toolbar` 组件包装在一个 `<div>` 中：

```tsx
renderToolbar={() => <div><Toolbar /></div>}
```

这样应该就可以解决报错的问题了。React DnD 期望传递给 connector 的是原生的 HTML 元素节点，而不是 React 组件。通过将 `Toolbar` 包装在 `<div>` 中，我们满足了这个要求。

如果问题仍然存在，请检查确保你正确地导入了所有必需的组件和样式文件。如有任何其他问题，欢迎随时提出。