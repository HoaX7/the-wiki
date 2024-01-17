export type WikiResultProps = {
    continue: {
        continue: string;
        offset: number;
    };
    query: {
        search: {
            pageid: number;
            snippet: string;
            timestamp: Date;
            title: string;
            wordcount: number;
            size: number;
        }[];
        searchinfo: {
            totalhits: number;
        }
    }
}