interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  cartID: {
    items: {
      productId: string;
      quantity: number;
    }[];
  };

}

export { IUser }