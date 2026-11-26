export type UserAddress = {
  _id: string;
  alias: string;
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
};

export type Address = {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  active: boolean;
  addresses: UserAddress[];
};

export type ProfileMessage = {
  message: string;
  success: boolean;
};
