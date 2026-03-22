import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Restaurant {
    id: bigint;
    priceForTwo: bigint;
    area: string;
    name: string;
    description: string;
    deliveryTime: string;
    imageUrl: string;
    cuisines: Array<string>;
    rating: number;
}
export interface backendInterface {
    filterRestaurants(area: string, minRating: number): Promise<Array<Restaurant>>;
    getAllRestaurants(): Promise<Array<Restaurant>>;
    getFavoriteRestaurants(): Promise<Array<Restaurant>>;
    searchRestaurants(searchText: string): Promise<Array<Restaurant>>;
    toggleFavorite(restaurantId: bigint): Promise<void>;
}
