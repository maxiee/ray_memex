// 电子书文件的数据模型。
enum EBookFileType {
    PDF = 'pdf',
    EPUB = 'epub',
    MOBI = 'mobi',
    AZW = 'azw',
    AZW3 = 'azw3',
    TXT = 'txt',
    DOC = 'doc',
    DOCX = 'docx',
    RTF = 'rtf',
    CHM = 'chm',
    DjVu = 'djvu',
    FB2 = 'fb2',
    CBR = 'cbr',
    CBZ = 'cbz',
}

// 书籍的基本信息
interface Book {
    id: string;
    title: string;
    authorIds: string[];        // 作者的 IDs
    publisher?: string;
    publishedDate?: Date;
    description?: string;
    isbn?: string;
    coverImageUrl?: string;
    language?: string;
    pageCount?: number;
    categories?: string[];
    format: 'physical' | 'electronic';
    // For electronic books
    fileUrl?: string;
    fileFormat?: string;
    // For physical books
    location?: string;
}

// 书籍的版次信息
interface Edition {
    id: string;
    bookId: string;
    version: string;
    publisher?: string;
    publishedDate?: Date;
    pageCount?: number;
    format: 'physical' | 'electronic';
    // For electronic books
    fileUrl?: string;
    fileFormat?: string;
    // For physical books
    location?: string;
}

// 电子书文件实体
interface EBookFile {
    id: string;                 // 电子书文件实体的唯一标识符。
    bookId: string;             // 关联的 `Book` 实体的 ID。
    editionId?: string;         // 关联的 `Edition` 实体的 ID。
    fileName: string;           // 电子书文件的原始文件名。
    fileSize: number;           // 电子书文件的大小。
    fileType: EBookFileType;    // 电子书文件的格式类型（如 PDF、EPUB 等）。
    md5: string;                // 电子书文件的 MD5 哈希值，用于唯一标识文件内容。
    corpusId?: string;          // 关联的语料库实体的 ID，用于未来可能的语料库关联。
}