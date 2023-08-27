import { Category } from "./category";

export class Product {
    id?: number;
    name?: string;
    price?: string;
    description?: string;
    richDescription?: string;
    brand?: string;
    countInStock?: number;
    rating?: number;
    numReviews?: number;
    isFeatured?: boolean;
    productCategory?: Category;
    image?: string;
    dataCreated?: string;
    images?: string[]
}
