export interface Article {
  id: string;
  amountRequired: number;
}

export interface ProductsInterface {
  id: string;
  name: string;
  articles: Article[];
}

