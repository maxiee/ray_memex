import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactGridLayout from 'react-grid-layout';
import { Tabs, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addWindow, updateLayout, setActiveTab, addTab, removeTab } from '../store';

const { TabPane } = Tabs;

const App = () => {
  const windowManager = useSelector((state: AppState) => state.windowManager);
  const dispatch = useDispatch();

  const handleLayoutChange = (newLayout: Layout[]) => {
    dispatch(updateLayout({
      layout: newLayout,
    }));
  };

  const handleTabChange = (windowId: string, tabId: string) => {
    dispatch(setActiveTab({
      windowId,
      tabId,
    }));
  };

  const handleAddTab = (windowId: string, tab: Tab) => {
    dispatch(addTab({
      windowId,
      tab,
    }));
  };

  const handleRemoveTab = (windowId: string, tabId: string) => {
    dispatch(removeTab({
      windowId,
      tabId,
    }));
  };

  const handleAddWindow = () => {
    const newWindow: RMWindow = {
      id: `window-${Date.now()}`,
      x: 0,
      y: 0,
      width: 400,
      height: 300,
      tabs: [],
    };
    dispatch(addWindow({
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
      windowId: newWindow.id,
      tab: newTab,
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div key="frame">
        <Button onClick={() => handleAddWindow()}>Add Window</Button>
          <ReactGridLayout
            className="layout"
            cols={12}
            rowHeight={30}
          onLayoutChange={(layout) => handleLayoutChange(layout)}
          >
          {windowManager.windows.map((window) => (
              <div key={window.id}>
                <Tabs
                  type="editable-card"
                  activeKey={window.tabs.find((tab) => tab.active)?.id}
                onChange={(tabId) => handleTabChange(window.id, tabId)}
                  onEdit={(targetKey, action) => {
                    if (action === 'add') {
                      handleAddTab(window.id, {
                        id: `tab-${Date.now()}`,
                        windowId: window.id,
                        title: 'New Tab',
                        active: true,
                        componentInstance: null,
                      });
                    } else {
                      handleRemoveTab(window.id, targetKey as string);
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

    </DndProvider>
  );
};

export default App;