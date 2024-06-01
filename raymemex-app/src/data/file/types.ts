enum AbstractFileType {
    Image = 'Image',
    Video = 'Video',
    EBook = 'EBook',
    WebArchive = 'WebArchive',
    Corpus = 'Corpus',
    Audio = 'Audio',
    // ...
}

enum SyncStatus {
    Synced = 'synced', // 已同步
    Pending = 'pending', // 等待上传
    Failed = 'failed',  // 同步失败
}