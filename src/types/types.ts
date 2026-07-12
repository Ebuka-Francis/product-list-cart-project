export interface Product {
  id: string;
  name: string;
  price: number;
  place:string;
  quantity: number;
  imageUrl?: string;
  description?: string;
  category: string;
  completed?: boolean;
}

export interface CartProduct extends Product {
  product?: Product; // Specific quantity for cart usage
}

export type Gender = "male" | "female" | "other";
export type SubscriptionPlan = "Starter" | "Business" | "Premium";
export type SubscriptionStatus = "active" | "expired" | "cancelled";

export interface Address {
  id: string;
  label: string; // e.g. "Home", "Work"
  street: string;
  city: string;
  country: string;
}

export interface AppUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
  dateOfBirth?: string; // ISO date string, e.g. "1998-04-12"
  gender?: Gender;
  role: "customer" | "vendor";
  address: Address[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  plan: SubscriptionPlan;
  startDate: Date;
  endDate: Date;
  status: SubscriptionStatus;
  paymentReference: string;
}

export interface Vendor {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phoneNumber: string;
  logo?: string;
  description?: string;
  address: Address;
  subscription?: Subscription;
  createdAt: Date;
  updatedAt: Date;
}

export type Products = Product[];
