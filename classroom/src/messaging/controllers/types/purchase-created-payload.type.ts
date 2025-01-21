export type PurchaseCreatedPayload = {
  customer: Customer;
  product: Product;
};

export type Customer = {
  authUserId: string;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
};
