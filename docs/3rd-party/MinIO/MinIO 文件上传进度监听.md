关于在 Node.js 中使用 MinIO SDK 来实现文件上传进度的监听，目前的确没有直接的 API 或事件支持这个功能。MinIO JavaScript Client SDK 通常用于对象存储的简单操作，如上传、下载、列出对象等，但它不提供内建的上传进度跟踪功能。

如果你需要在 Electron 应用中实现这样的功能，你可以考虑以下几个方案：

1. **使用 AWS SDK**: 由于 MinIO 是与 Amazon S3 兼容的，你可以使用 AWS SDK for JavaScript，它支持上传进度的监听。在 Electron 主进程中使用 AWS SDK 来上传文件，并使用事件监听器来跟踪上传进度，然后通过 Electron 的 IPC 机制发送进度信息到渲染进程。

2. **手动计算进度**: 如果你仍想使用 MinIO JavaScript SDK，可以尝试在上传文件时手动计算和更新进度。例如，通过将文件分块上传，并在每个块上传成功后更新进度。这需要在你的应用逻辑中手动处理文件分割和进度计算。

3. **使用预签名 URL**: 另一个选择是使用 MinIO 的预签名 URL 功能。你可以创建一个预签名的 URL，客户端可以直接向这个 URL 上传文件。虽然这种方法本身不提供进度跟踪，但你可以在客户端实现进度跟踪，例如使用 XMLHttpRequest 或 Fetch API，并在上传时监听进度事件。

由于 MinIO 官方的 SDK 文档中没有直接提供上传进度的相关功能，这些方法提供了可能的替代方案来实现你的需求。如果使用 AWS SDK 或其他方法实现进度跟踪，确保适当地测试和调整以适应你的具体应用场景。

更多关于 MinIO 的使用和配置可以参考官方文档和 GitHub 页面。

---

## 网络资源 1

[multipart upload and presigned urls · Issue #772 · minio/minio-js](https://github.com/minio/minio-js/issues/772)

[aws/aws-sdk-js: AWS SDK for JavaScript in the browser and Node.js](https://github.com/aws/aws-sdk-js)：这个库能具备长传进度。


---

## aws-sdk-js 与 minio 兼容性

aws-sdk-js 和 minio 是兼容的。MinIO JavaScript 客户端 SDK 提供了高级 API，可以访问任何与 Amazon S3 兼容的对象存储服务器¹。你可以通过 MinIO SDK 或 AWS SDK 使用 Node.js 与它进行交互³。

如果你想使用 AWS SDK 连接到本地的 MinIO 服务器，你需要将 `s3ForcePathStyle` 配置选项设置为 `true`⁴。这是一个示例代码：

```javascript
const awsConfig: S3.Types.ClientConfiguration = { 
    s3ForcePathStyle: true 
};
```

此外，MinIO 还提供了一些示例程序，指导你如何安装客户端 SDK 并执行 JavaScript 程序¹²。希望这些信息对你有所帮助！

Source: Conversation with Copilot, 6/4/2024
(1) MinIO JavaScript Library for Amazon S3 Compatible Cloud Storage. https://min.io/docs/minio/linux/developers/javascript/quickstart.html.
(2) Connect Node.js to MinIO with TLS using AWS S3 — Northflank. https://northflank.com/guides/connect-nodejs-to-minio-with-tls-using-aws-s3.
(3) AWS SDK S3 node.js connect to local MinIO server. https://stackoverflow.com/questions/74732461/aws-sdk-s3-node-js-connect-to-local-minio-server.
(4) GitHub - minio/minio-js: MinIO Client SDK for Javascript. https://github.com/minio/minio-js.
(5) undefined. https://play.min.io.