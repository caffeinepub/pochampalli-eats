# Pochampalli Eats

## Current State
New project. No existing application code.

## Requested Changes (Diff)

### Add
- Full food discovery app for Pochampalli district (Zomato-style)
- Location detection via browser Geolocation API
- Hero section with search bar and location chip
- Restaurant listings with cards showing name, rating, cuisine, delivery time, price for two
- Filter/search by cuisine, rating, area, popularity
- Popular local specialties chips (Pochampalli Biryani, Potharekulu, Telugu Meals, etc.)
- Services strip: Nearby Restaurants, Book Table, Events, Deliveries
- Favorite/heart toggle on restaurant cards
- Footer with branding and contact info
- Backend: restaurants data store with CRUD, favorites, and search/filter support

### Modify
N/A (new project)

### Remove
N/A (new project)

## Implementation Plan
1. Generate Motoko backend with restaurant data model, favorites, search/filter queries
2. Build React frontend with:
   - Sticky header with nav
   - Hero with location access and search
   - Services strip
   - Restaurant cards grid with filter chips
   - Local specialties section
   - Footer
3. Wire frontend to backend APIs
4. Seed sample Pochampalli restaurants with local cuisine data
