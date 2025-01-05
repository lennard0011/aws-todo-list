export type Article = {
    url: string;
    title: string;
    releaseDate: Date;
    content: () => JSX.Element;
}