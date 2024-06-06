![[MinIO 模块背景介绍]]

开源库选择：选择使用库为 aws-sdk-js，以 S3 兼容方式操作 MinIO。相较于 minio 自身 Node.js 来说，aws-sdk-js 具备更强大的能力，比如监听文件上传进度，这是 minio 所不具备的。

Ray Memex MinIO 模块的功能清单如下：

- 服务连接：连接 NAS MinIO 服务
- 连接状态查询