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