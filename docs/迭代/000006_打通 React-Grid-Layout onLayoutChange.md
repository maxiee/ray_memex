我在开发一个基于 React + Redux 支持拖动的窗口管理器。前端拖动使用 React-Grid-Layout，Redux 部分还使用了 `@reduxjs/toolkit`。同时，我还使用 TypeScript 语言。

我通过领域实体建模，创建了一系列实体。其中包括 RMWindow 实体，与  React-Grid-Layout 的 GridItem 相对应。

我现在遇到的问题是，尽管我创建了 RMWindow 实体，但是并没有与 React-Grid-Layout 打通。并且我希望，React-Grid-Layout 的状态能放在 Redux 里管理，目前也是没有打通的。

我将为你提供相关的源代码，请你帮我进行重构，实现打通。具体实现目标：ReactGridLayout 的 Layout 状态要由 Redux 的 windowManager 管理，ReactGridLayout 的 onLayoutChange 回调要与 Redux 响应。

接下来，我将为你提供一系列参考资料：

我定义的实体类 `store/model.ts`：

```
!((/home/maxiee/Code/ray_memex_open_source/raymemex-app/renderer/store/model.ts))
```

我的页面 `home.tsx` 实现：

```
!((/home/maxiee/Code/ray_memex_open_source/raymemex-app/renderer/pages/home.tsx))
```

我的 Redux Store `store/index.ts`:

```
!((/home/maxiee/Code/ray_memex_open_source/raymemex-app/renderer/store/model.ts))
```

接下来，再附上我总结的 React-Grid-Layout onLayoutChange 笔记，供你参考：

<React-Grid-Layout onLayoutChange 笔记>
!((/home/maxiee/obsidian-notes-lfs/000.wiki/React-Grid-Layout onLayoutChange.md))
</React-Grid-Layout onLayoutChange 笔记>