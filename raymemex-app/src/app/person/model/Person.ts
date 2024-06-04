interface Person {
    id: string;                 // 每个实体都应该有一个唯一标识符。
    name: string;               // 人名。
    alternateNames?: string[];  // 人可能有多个名字,比如笔名、艺名、本名等。
    description?: string;       // 对这个人的简要描述。
    birthDate?: Date;           // 出生日期和死亡日期。
    deathDate?: Date;
    birthPlace?: string;        // 出生地。
    nationality?: string;       // 国籍。
    occupation?: string[];      // 职业,可能有多个。
    notableWorks?: string[];    // 主要作品,适用于作家、艺术家等。
    relatedPeople?: string[];   // 关联的其他人,使用 ID 引用,体现了实体之间的关系。 
    externalLinks?: {           // 外部链接,可以补充更多信息。
        wikipedia?: string;
        website?: string;
    };
}