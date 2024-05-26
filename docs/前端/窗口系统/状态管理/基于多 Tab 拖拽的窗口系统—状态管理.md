<基于多 Tab 拖拽的窗口系统—状态管理>
RayMemex 采用类似 VS Code 的多窗口、多 Tab 管理系统。

我使用 react-grid-layout 库进行前端展示，使用 Redux 进行状态管理。

## 实体建模

我使用 TypeScript 进行开发，初衷就是在类型上尽可能得严谨。

因此在本节中，我根据领域建模，设计需要用到的 Model：

- Frame：整个 Electron 窗口是一个 Frame，Frame 包括窗口属性，比如标题、坐标、大小等等。
- Window：Window 指一个  react-grid-layout 的 GridItem，在 RayMemex 中，它表示一个窗口。
- Tab：Tab 是位于 Window 中的标签，一个 Window 包含一个或多个 Tab，并且可以切换。同时，Tab 支持拖拽，可以拖到别的 Window 下。同时 Tab 还是有状态的，记录了其内部的 React 组件的实例。

基于如上声明，定义实体类如下：

![[窗口管理实体类]]

</基于多 Tab 拖拽的窗口系统—状态管理>