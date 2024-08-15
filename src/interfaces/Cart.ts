import { Product } from "./Product";

export interface Cart {
	id?: number | string;
	userID: number | string;
	products: Product[];
}
