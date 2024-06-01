Ray Memex 具备电子书管理的能力。因此需要对电子书这个实体进行建模。

在我的构想中，我想使用更加宽泛的 Book 书籍，进行领域建模。Book 即包含实体书，也包含电子书。

电子书模型定义在 `raymemex-app/src/app/book/model/Book.ts`，内容为：

```ts
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
```



