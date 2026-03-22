import Text "mo:core/Text";
import Float "mo:core/Float";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Order "mo:core/Order";

actor {
  let restaurantStore = Map.empty<Nat, Restaurant>();
  let userFavorites = Map.empty<Principal, Set.Set<Nat>>();
  var nextId = 9;

  type Restaurant = {
    id : Nat;
    name : Text;
    cuisines : [Text];
    area : Text;
    rating : Float;
    deliveryTime : Text;
    priceForTwo : Nat;
    imageUrl : Text;
    description : Text;
  };

  let sampleRestaurants = [
    {
      id = 1;
      name = "Andhra Spice";
      cuisines = ["South Indian", "Telugu"];
      area = "Pochampalli Town";
      rating = 4.5;
      deliveryTime = "30-40 mins";
      priceForTwo = 250;
      imageUrl = "https://example.com/andhra_spice.jpg";
      description = "Authentic Andhra meals, biryanis & tiffins";
    },
    {
      id = 2;
      name = "Biryani Point";
      cuisines = ["Biryani", "Hyderabadi"];
      area = "Chintalapalli";
      rating = 4.3;
      deliveryTime = "25-35 mins";
      priceForTwo = 300;
      imageUrl = "https://example.com/biryani_point.jpg";
      description = "Ambur, Dum, Hyderabad styles of biryani";
    },
    {
      id = 3;
      name = "Idli Magic";
      cuisines = ["South Indian", "Veg"];
      area = "Hogarampa";
      rating = 4.7;
      deliveryTime = "20-30 mins";
      priceForTwo = 150;
      imageUrl = "https://example.com/idli_magic.jpg";
      description = "Soft idlis with chutneys, sambhar";
    },
    {
      id = 4;
      name = "Fast Food Xpress";
      cuisines = ["Fast Food", "Burgers"];
      area = "Pochampalli Town";
      rating = 4.1;
      deliveryTime = "30-40 mins";
      priceForTwo = 200;
      imageUrl = "https://example.com/fast_food_xpress.jpg";
      description = "Burgers, sandwiches, fries, rolls";
    },
    {
      id = 5;
      name = "Veggie Delight";
      cuisines = ["Vegetarian", "North Indian"];
      area = "Psapele";
      rating = 4.4;
      deliveryTime = "25-35 mins";
      priceForTwo = 180;
      imageUrl = "https://example.com/veggie_delight.jpg";
      description = "Roti, curries, thali & more";
    },
    {
      id = 6;
      name = "Dosa Factory";
      cuisines = ["South Indian", "Dosa"];
      area = "Kadapa";
      rating = 4.6;
      deliveryTime = "20-30 mins";
      priceForTwo = 160;
      imageUrl = "https://example.com/dosa_factory.jpg";
      description = "Crispy dosas, masala dosa, paper dosa";
    },
    {
      id = 7;
      name = "Chutney House";
      cuisines = ["Telugu", "Andhra"];
      area = "Pochampalli Town";
      rating = 4.2;
      deliveryTime = "25-35 mins";
      priceForTwo = 170;
      imageUrl = "https://example.com/chutney_house.jpg";
      description = "Variety of chutneys, breakfast items";
    },
    {
      id = 8;
      name = "Spice Kitchen";
      cuisines = ["Multi-cuisine"];
      area = "Chintalapalli";
      rating = 4.0;
      deliveryTime = "30-40 mins";
      priceForTwo = 220;
      imageUrl = "https://example.com/spice_kitchen.jpg";
      description = "Chinese, North & South Indian mix";
    },
  ];

  module Restaurant {
    public func compareByRating(restaurant1 : Restaurant, restaurant2 : Restaurant) : Order.Order {
      Float.compare(restaurant2.rating, restaurant1.rating);
    };
  };

  for (restaurant in sampleRestaurants.values()) {
    restaurantStore.add(restaurant.id, restaurant);
  };

  public query ({ caller }) func getAllRestaurants() : async [Restaurant] {
    restaurantStore.values().toArray();
  };

  public query ({ caller }) func searchRestaurants(searchText : Text) : async [Restaurant] {
    let lowerSearchText = searchText.toLower();
    restaurantStore.values().toArray().filter(
      func(restaurant) {
        restaurant.name.toLower().contains(#text lowerSearchText) or searchCuisines(restaurant.cuisines, lowerSearchText);
      }
    );
  };

  func searchCuisines(cuisines : [Text], searchText : Text) : Bool {
    cuisines.any(
      func(cuisine) {
        cuisine.toLower().contains(#text searchText);
      }
    );
  };

  public query ({ caller }) func filterRestaurants(area : Text, minRating : Float) : async [Restaurant] {
    restaurantStore.values().toArray().filter(
      func(restaurant) {
        restaurant.area == area and restaurant.rating >= minRating;
      }
    ).sort(Restaurant.compareByRating);
  };

  public shared ({ caller }) func toggleFavorite(restaurantId : Nat) : async () {
    if (restaurantId >= nextId) {
      Runtime.trap("Restaurant not found");
    };
    let favorites = switch (userFavorites.get(caller)) {
      case (null) {
        let newSet = Set.empty<Nat>();
        newSet.add(restaurantId);
        userFavorites.add(caller, newSet);
        return ();
      };
      case (?existing) { existing };
    };

    if (favorites.contains(restaurantId)) {
      favorites.remove(restaurantId);
      if (favorites.isEmpty()) {
        userFavorites.remove(caller);
      };
    } else {
      favorites.add(restaurantId);
    };
  };

  public query ({ caller }) func getFavoriteRestaurants() : async [Restaurant] {
    switch (userFavorites.get(caller)) {
      case (null) { [] };
      case (?favorites) {
        favorites.toArray().map(
          func(id) {
            switch (restaurantStore.get(id)) {
              case (null) { Runtime.trap("Restaurant data corrupted") };
              case (?restaurant) { restaurant };
            };
          }
        );
      };
    };
  };
};
