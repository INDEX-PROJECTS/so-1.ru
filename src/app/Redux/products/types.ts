export interface IProduct {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
  vendor_code: string;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IProductsSliceState {
  status: Status;
  products: IProduct[][];
}
