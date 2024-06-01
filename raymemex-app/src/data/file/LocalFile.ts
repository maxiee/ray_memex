interface LocalFile {
    name: string; // 使用统一的命名规则
    path: string; // 本地文件路径
    size: number;
    lastModified: Date;
    type: AbstractFileType;
    syncStatus: SyncStatus; // 与云端的同步状态
}