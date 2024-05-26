// `Frame` 实体表示整个 Electron 窗口
interface Frame {
    id: string;         // Frame 的唯一标识符。
    title: string;      // Frame 的标题。
    x: number;          // Frame 的坐标。
    y: number;
    width: number;
    height: number;     // Frame 的大小。
    windows: Window[];  // Frame 包含的 Window 实例数组。
}

// `Window` 实体表示一个 react-grid-layout 的 GridItem，即一个窗口
interface Window {
    id: string;         // Window 的唯一标识符。
    frameId: string;    // Window 所属的 Frame 的标识符。
    x: number;          // Window 在 Frame 中的坐标。
    y: number;
    width: number;      // Window 的大小。
    height: number;
    tabs: Tab[];        // Window 包含的 Tab 实例数组
}

// `Tab` 实体表示位于 Window 中的标签
interface Tab {
    id: string;         // Tab 的唯一标识符。
    windowId: string;   // Tab 所属的 Window 的标识符。
    title: string;      // Tab 的标题。
    active: boolean;    // 表示 Tab 是否为当前激活的标签。
    componentInstance: React.ReactNode; // Tab 内部的 React 组件实例。
}

// 应用程序状态，用于表示整个应用程序的状态，其中包含一个 `frames` 数组，用于存储所有的 Frame 实例。
interface AppState {
    app: {
        frames: Frame[];
    }
}