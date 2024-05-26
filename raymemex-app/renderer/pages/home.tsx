import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactGridLayout from 'react-grid-layout';
import { Tabs, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addWindow, updateLayout, setActiveTab, addTab, removeTab } from '../store';

const { TabPane } = Tabs;

const App = () => {
  const frames = useSelector((state: AppState) => state.windowManager.frames);
  const dispatch = useDispatch();

  const handleLayoutChange = (frameId: string, newLayout: Layout[]) => {
    dispatch(updateLayout({
      frameId,
      layout: newLayout,
    }));
  };

  const handleTabChange = (frameId: string, windowId: string, tabId: string) => {
    dispatch(setActiveTab({
      frameId,
      windowId,
      tabId,
    }));
  };

  const handleAddTab = (frameId: string, windowId: string, tab: Tab) => {
    dispatch(addTab({
      frameId,
      windowId,
      tab,
    }));
  };

  const handleRemoveTab = (frameId: string, windowId: string, tabId: string) => {
    dispatch(removeTab({
      frameId,
      windowId,
      tabId,
    }));
  };

  const handleAddWindow = (frameId: string) => {
    const newWindow: RMWindow = {
      id: `window-${Date.now()}`,
      frameId,
      x: 0,
      y: 0,
      width: 400,
      height: 300,
      tabs: [],
    };
    dispatch(addWindow({
      frameId,
      window: newWindow,
    }));

    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      windowId: newWindow.id,
      title: 'New Tab',
      active: true,
      componentInstance: null,
    };
    dispatch(addTab({
      frameId,
      windowId: newWindow.id,
      tab: newTab,
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {frames.map((frame) => (
        <div key={frame.id}>
          <h2>{frame.title}</h2>
          <Button onClick={() => handleAddWindow(frame.id)}>Add Window</Button>
          <ReactGridLayout
            className="layout"
            cols={12}
            rowHeight={30}
            width={frame.width}
            onLayoutChange={(layout) => handleLayoutChange(frame.id, layout)}
          >
            {frame.windows.map((window) => (
              <div key={window.id}>
                <Tabs
                  type="editable-card"
                  activeKey={window.tabs.find((tab) => tab.active)?.id}
                  onChange={(tabId) => handleTabChange(frame.id, window.id, tabId)}
                  onEdit={(targetKey, action) => {
                    if (action === 'add') {
                      handleAddTab(frame.id, window.id, {
                        id: `tab-${Date.now()}`,
                        windowId: window.id,
                        title: 'New Tab',
                        active: true,
                        componentInstance: null,
                      });
                    } else {
                      handleRemoveTab(frame.id, window.id, targetKey as string);
                    }
                  }}
                >
                  {window.tabs.map((tab) => (
                    <TabPane tab={tab.title} key={tab.id}>
                      {tab.componentInstance}
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            ))}
          </ReactGridLayout>
        </div>
      ))}
    </DndProvider>
  );
};

export default App;