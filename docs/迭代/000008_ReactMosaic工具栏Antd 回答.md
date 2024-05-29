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

---

## 手势没了

替换完之后，展示是正常的，但是我发现手势没了。之前，在没指定 Toolbar 之前，会展示一个 react-mosaic 默认标题栏，是能够拖动标题栏进行窗口以东的。换上我们的 Antd 标题栏之后，拖动窗口不会动了。

这个问题可能是因为我们自定义的 `Toolbar` 组件没有正确处理拖动事件。在 `MosaicWindow` 组件中，默认的标题栏已经设置了拖动处理程序，但是当我们使用自定义的 `Toolbar` 时，这些处理程序就没有生效。

为了恢复窗口拖动功能，我们需要在自定义的 `Toolbar` 组件中正确处理拖动事件。我们可以使用 `react-mosaic` 提供的 `connectDragSource` 函数来实现这一点。

以下是修改后的代码：

```tsx
const Toolbar = ({ connectDragSource }) => {
  const { mosaicActions, mosaicWindowActions } = React.useContext(MosaicContext);
  const path = mosaicWindowActions.getPath();
  
  const split = () => mosaicWindowActions.split().catch(console.error);
  const replace = () => mosaicWindowActions.replaceWithNew().catch(console.error);
  const remove = () => mosaicActions.remove(path);
  const expand = () => mosaicActions.expand(path, 70); 

  return connectDragSource(
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
              renderToolbar={(props, connectDragSource) => (
                <div>
                  <Toolbar {...props} connectDragSource={connectDragSource} />
                </div>
              )}
              // ...
            >
                {TITLE_MAP[id]}
            </MosaicWindow>
        )}
        // ...
    />;
}
```

主要的修改如下：

1. 在 `Toolbar` 组件中，接收 `connectDragSource` 作为属性，并用它包裹整个 `<div>` 元素。

2. 在 `renderToolbar` 属性中，将 `connectDragSource` 传递给 `Toolbar` 组件。

通过这些修改，我们将自定义的 `Toolbar` 组件连接到了 `react-mosaic` 的拖动处理程序。现在，你应该可以通过拖动 `Toolbar` 来移动窗口了。

如果问题仍然存在，请仔细检查代码，确保正确地传递了 `connectDragSource` 函数，并且在 `Toolbar` 组件中正确地使用了它。

希望这可以帮助你解决窗口拖动的问题。如有任何其他问题，欢迎随时提出。

---

我知道为什么无法拖动了，我们的 Toolbar 只有 4 个按钮，导致 Toolbar 只有 4 个按钮那么长，在这个长度内是可以拖动的，超出之后就不能拖动了。因此，我们的 Toolbar 需要一种方法，能充满横向剩余空间，放置手势透到底层元素。

明白了，这是一个很好的观察。为了让 `Toolbar` 充满横向剩余空间并阻止手势穿透，我们可以对 `Toolbar` 组件进行一些调整。

我们可以使用 CSS flexbox 布局来实现这一点。具体来说，我们将创建一个充满剩余空间的 `<div>`，并将其放置在按钮的前面。这个 `<div>` 将用于处理拖动事件。

以下是修改后的代码：

```tsx
const Toolbar = ({ connectDragSource }) => {
  const { mosaicActions, mosaicWindowActions } = React.useContext(MosaicContext);
  const path = mosaicWindowActions.getPath();
  
  const split = () => mosaicWindowActions.split().catch(console.error);
  const replace = () => mosaicWindowActions.replaceWithNew().catch(console.error);
  const remove = () => mosaicActions.remove(path);
  const expand = () => mosaicActions.expand(path, 70); 

  return connectDragSource(
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flex: 1 }} /> {/* 这个 div 将占据剩余空间 */}
      <ToolbarButton onClick={split} icon={<SplitCellsOutlined />} />
      <ToolbarButton onClick={replace} icon={<MoreOutlined />} />
      <ToolbarButton onClick={expand} icon={<ExpandOutlined />} />
      <ToolbarButton onClick={remove} icon={<DeleteOutlined />} />
    </div>
  );
};

// Grid 组件保持不变
```

主要的修改是在 `Toolbar` 组件中：

1. 将整个工具栏包装在一个 `<div>` 中，并设置其样式为 `display: 'flex'` 和 `width: '100%'`。这将使工具栏成为一个 flexbox 容器，并占据其父元素的全部宽度。

2. 在按钮前添加一个空的 `<div>`，并设置其样式为 `flex: 1`。这将使该 `<div>` 占据工具栏中的所有剩余空间。

通过这些修改，`Toolbar` 将占据其父元素的全部宽度，并且空的 `<div>` 将占据按钮左侧的所有剩余空间。当你在这个空白区域上拖动时，拖动事件将被 `Toolbar` 捕获，而不会透过到底层元素。

请尝试这个解决方案，看看它是否解决了你的问题。如果还有任何问题，欢迎随时提出。