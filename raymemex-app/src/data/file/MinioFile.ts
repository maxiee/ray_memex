interface MinIOFile {
    bucket: string;
    name: string;
    size: number;
    etag: string;
    lastModified: Date;
}

