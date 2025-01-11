export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  progress: number;
}

export interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
}

export interface Stats {
  pageViews: number;
  monthlyUsers: number;
  newSignUps: number;
  subscriptions: number;
}

export interface ChartData {
  name: string;
  revenue: number;
  expenses: number;
}