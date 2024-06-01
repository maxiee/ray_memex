interface Book {
    id: string;
    title: string;
    authors: string[];
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