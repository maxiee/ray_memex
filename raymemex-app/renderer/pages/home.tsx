import React, { useState } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactGridLayout from 'react-grid-layout';
import { Tabs } from 'antd';
import Head from 'next/head'
import Link from 'next/link'
import {
  Layout,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { updateLayout } from '../store/actions';

const { TabPane } = Tabs;

const { Header, Content } = Layout
const { Item: FormItem } = Form
const { Option } = Select

const App = () => {
  const layouts = useSelector(state => state.layouts);
  const dispatch = useDispatch();

  // 添加状态以跟踪当前激活的标签页的 key
  const [currentTabKey, setCurrentTabKey] = useState('1');

  // 示例：在某个事件处理函数中触发状态更新
  const handleLayoutChange = (newLayout) => {
    dispatch(updateLayout(currentTabKey, newLayout));
  };

  // 更新 handleTabChange 以在标签切换时设置 currentTabKey
  const handleTabChange = (key) => {
    setCurrentTabKey(key);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ReactGridLayout className="layout" cols={12} rowHeight={30}
        onLayoutChange={layout => handleLayoutChange(layout)}>
        <div key="a">
          <Tabs defaultActiveKey="1" type="editable-card" onChange={handleTabChange}>
            <TabPane tab="Tab 1" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </div>
        <div key="b">
          <Tabs defaultActiveKey="1" type="editable-card" onChange={handleTabChange}>
            <TabPane tab="Tab 1" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </div>
        <div key="c">
          <Tabs defaultActiveKey="1" type="editable-card" onChange={handleTabChange}>
            <TabPane tab="Tab 1" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </div>
      </ReactGridLayout>
    </DndProvider>
  );
};

export default App;

// export default function HomePage() {
//   return (
//     <React.Fragment>
//       <Head>
//         <title>Home - Nextron (with-ant-design)</title>
//       </Head>

//       <Header>
//         <Link href="/next">Go to next page</Link>
//       </Header>

//       <Content style={{ padding: 48 }}>
//         <Form layout="horizontal">
//           <FormItem
//             label="Input Number"
//             labelCol={{ span: 8 }}
//             wrapperCol={{ span: 8 }}
//           >
//             <InputNumber
//               size="large"
//               min={1}
//               max={10}
//               style={{ width: 100 }}
//               defaultValue={3}
//               name="inputNumber"
//             />
//             <a href="#">Link</a>
//           </FormItem>

//           <FormItem
//             label="Switch"
//             labelCol={{ span: 8 }}
//             wrapperCol={{ span: 8 }}
//           >
//             <Switch defaultChecked />
//           </FormItem>

//           <FormItem
//             label="Slider"
//             labelCol={{ span: 8 }}
//             wrapperCol={{ span: 8 }}
//           >
//             <Slider defaultValue={70} />
//           </FormItem>

//           <FormItem
//             label="Select"
//             labelCol={{ span: 8 }}
//             wrapperCol={{ span: 8 }}
//           >
//             <Select size="large" defaultValue="lucy" style={{ width: 192 }}>
//               <Option value="jack">jack</Option>
//               <Option value="lucy">lucy</Option>
//               <Option value="disabled" disabled>
//                 disabled
//               </Option>
//               <Option value="yiminghe">yiminghe</Option>
//             </Select>
//           </FormItem>

//           <FormItem
//             label="DatePicker"
//             labelCol={{ span: 8 }}
//             wrapperCol={{ span: 8 }}
//           >
//             <DatePicker name="startDate" />
//           </FormItem>
//           <FormItem
//             style={{ marginTop: 48 }}
//             wrapperCol={{ span: 8, offset: 8 }}
//           >
//             <Button size="large" type="primary" htmlType="submit">
//               OK
//             </Button>
//             <Button size="large" style={{ marginLeft: 8 }}>
//               Cancel
//             </Button>
//           </FormItem>
//         </Form>
//       </Content>
//     </React.Fragment>
//   )
// }
