// 文件抽象基类
abstract class AbstractFile {
    protected name: string;
    protected createdAt: Date;
    protected tags: string[];
    protected proxy: FileProxy;

    constructor(name: string, createdAt: Date, tags: string[], proxy: FileProxy) {
        this.name = name;
        this.createdAt = createdAt;
        this.tags = tags;
        this.proxy = proxy;
    }

    // 通用方法，用于读取文件内容
    abstract read(): Promise<ArrayBuffer>;

    // 通用方法，用于写入文件内容
    abstract write(content: ArrayBuffer): Promise<void>;

    // getter 和 setter 方法
    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getTags(): string[] {
        return this.tags;
    }

    addTag(tag: string): void {
        this.tags.push(tag);
    }

    removeTag(tag: string): void {
        this.tags = this.tags.filter(t => t !== tag);
    }
}

// 文件代理接口
interface FileProxy {
    read(): Promise<ArrayBuffer>;
    write(content: ArrayBuffer): Promise<void>;
}

// 本地文件系统代理实现
// class LocalFileProxy implements FileProxy {
//     private path: string;

//     constructor(path: string) {
//         this.path = path;
//     }

//     // async read(): Promise<ArrayBuffer> {
//     //     // 从本地文件系统读取文件内容的逻辑
//     //     // ...
//     // }

//     async write(content: ArrayBuffer): Promise<void> {
//         // 将内容写入本地文件系统的逻辑
//         // ...
//     }
// }

// 网页文件类
class WebpageFile extends AbstractFile {
    private url: string;

    constructor(name: string, createdAt: Date, tags: string[], proxy: FileProxy, url: string) {
        super(name, createdAt, tags, proxy);
        this.url = url;
    }

    async read(): Promise<ArrayBuffer> {
        return this.proxy.read();
    }

    async write(content: ArrayBuffer): Promise<void> {
        return this.proxy.write(content);
    }

    getUrl(): string {
        return this.url;
    }
}

// 视频文件类
class VideoFile extends AbstractFile {
    private duration: number;

    constructor(name: string, createdAt: Date, tags: string[], proxy: FileProxy, duration: number) {
        super(name, createdAt, tags, proxy);
        this.duration = duration;
    }

    async read(): Promise<ArrayBuffer> {
        return this.proxy.read();
    }

    async write(content: ArrayBuffer): Promise<void> {
        return this.proxy.write(content);
    }

    getDuration(): number {
        return this.duration;
    }
}

// 电影文件类
class MovieFile extends VideoFile {
    private director: string;
    private cast: string[];

    constructor(
        name: string,
        createdAt: Date,
        tags: string[],
        proxy: FileProxy,
        duration: number,
        director: string,
        cast: string[]
    ) {
        super(name, createdAt, tags, proxy, duration);
        this.director = director;
        this.cast = cast;
    }

    getDirector(): string {
        return this.director;
    }

    getCast(): string[] {
        return this.cast;
    }
}

// 电子书文件类
class EbookFile extends AbstractFile {
    private pageCount: number;

    constructor(name: string, createdAt: Date, tags: string[], proxy: FileProxy, pageCount: number) {
        super(name, createdAt, tags, proxy);
        this.pageCount = pageCount;
    }

    async read(): Promise<ArrayBuffer> {
        return this.proxy.read();
    }

    async write(content: ArrayBuffer): Promise<void> {
        return this.proxy.write(content);
    }

    getPageCount(): number {
        return this.pageCount;
    }
}

// 音乐文件类
class MusicFile extends AbstractFile {
    private artist: string;
    private album: string;

    constructor(
        name: string,
        createdAt: Date,
        tags: string[],
        proxy: FileProxy,
        artist: string,
        album: string
    ) {
        super(name, createdAt, tags, proxy);
        this.artist = artist;
        this.album = album;
    }

    async read(): Promise<ArrayBuffer> {
        return this.proxy.read();
    }

    async write(content: ArrayBuffer): Promise<void> {
        return this.proxy.write(content);
    }

    getArtist(): string {
        return this.artist;
    }

    getAlbum(): string {
        return this.album;
    }
}