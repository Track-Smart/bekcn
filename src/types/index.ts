

export type Context = {
  domain: string;
  country: string;
  city: string;
  action: string;
  core_version: string;
  bap_id: string;
  bap_uri: string;
  bpp_id: string;
  bpp_uri: string;
  transaction_id: string;
  message_id: string;
  timestamp: Date;
};

export type Provider = {
  id: string;
  name: string;
  bpp_id: string;
  bpp_uri: string;
  categories: CategoryType[];
  items: Item[];
};

export type Location = {
  id: string;
  gps: string;
  items?: Item[];          // as origin
  destinations?: Item[];   // as destination
};

export enum CategoryType {
  fresh_fruits = "fresh_fruits",
  vegetables = "vegetables",
  dairy = "dairy",
  bakery = "bakery",
  beverages = "beverages",
  snacks = "snacks",
  staples = "staples",
  personal_care = "personal_care",
  household = "household",
  gourmet = "gourmet",
  baby_care = "baby_care",
  cleaning_supplies = "cleaning_supplies",
  pet_supplies = "pet_supplies",
  meat_fish = "meat_fish",
  ready_to_eat = "ready_to_eat",
  beverages_alcoholic = "beverages_alcoholic",
  electronics = "electronics",
  home_decor = "home_decor",
  fashion = "fashion",
  footwear = "footwear",
  books = "books",
  pharmacy = "pharmacy",
  health_care = "health_care",
  logistics_parcel = "logistics_parcel",
  logistics_movers = "logistics_movers"
}

export type Item = {
  id: string;
  name: string;
  image: string;
  priceValue: number;
  currency: string;
  matched?: boolean;
  related?: boolean;
  category: CategoryType;
  originId: string;
  destinationId: string;
  origin: Location;
  destination: Location;
  providerId: string;
  provider: Provider;
};

export type Fulfillment = {
  id: string;
  type: string;
};
