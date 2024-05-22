我正在开发一个 RayMemex 的项目，关于它的介绍如下：

![[intro]]

目前我进行到第一步：初始化 Nextron 工程。

Nextron 的官方文档位于：https://github.com/saltyshiomix/nextron

请指导我如何创建工程。

---

创建一个基于 Nextron 的工程是一个很好的开始，Nextron 是一个为 Electron 和 Next.js 设计的脚手架，非常适合构建跨平台的桌面应用。接下来我会一步步指导你如何初始化一个 Nextron 工程。

## 创建工程

按照官网文档：https://github.com/saltyshiomix/nextron

nextron 提供了多套初始模板，[examples/with-ant-design](https://github.com/saltyshiomix/nextron/blob/main/examples/with-ant-design) 这一套符合我的需求。

我使用 pnpm，因此命令为：

```
# with npx
$ npx create-nextron-app raymemex-app --example with-ant-design
```


进入工程目录，安装依赖：

```
$ cd my-app

# using yarn or npm
$ yarn (or `npm install`)

# using pnpm
$ pnpm install --shamefully-hoist
```

构建运行：

```
# development mode
$ yarn dev (or `npm run dev` or `pnpm run dev`)

# production build
$ yarn build (or `npm run build` or `pnpm run build`)
```

在 npm install 时，下载 electron 网络报错。

根据 [Electron学习笔记 | Mor | void](https://www.morlvoid.pro/2023/08/03/Electron%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/) 文章中所说，将 npm 替换为国内源下载。

阿里的源显示证书过期了，根据《[npm使用国内镜像加速的几种方法-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/1372949)》换成腾讯源：

```
npm config set registry http://mirrors.cloud.tencent.com/npm/
```

Electron 依赖下下来之后，它还有一个 postinstall，又被卡住了。参见《[安装electron postinstall$ node install.js 安装失败 - 知乎](https://zhuanlan.zhihu.com/p/670248977)》。《[Electron 常见错误和解决方案 | 李钟意讲前端](https://docs.ffffee.com/electron/faq.html)》

---

## 问题：run dev 遇到权限问题

```
[maxiee@archlinux raymemex-app]$ npm run dev

> my-nextron-app@1.0.0 dev
> nextron

sh: line 1: /home/maxiee/Code/ray_memex/raymemex-app/node_modules/.bin/nextron: Permission denied
```

确保nextron脚本有执行权限：打开终端，切换到你的项目目录，然后使用以下命令给nextron脚本添加执行权限：

```
chmod +x /home/maxiee/Code/ray_memex/raymemex-app/node_modules/.bin/nextron
```

---

## 总结

至此，磕磕绊绊把项目跑起来了。

《[Electron 常见错误和解决方案 | 李钟意讲前端](https://docs.ffffee.com/electron/faq.html)》这篇讲得好，Electron 安装网络问题多。这个网站里有一个 `.npmrc`，拷贝到工程中就生效了。其他的文章也值得阅读。
