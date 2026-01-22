# Tajbite Backend API

This is the backend for Tajbite, a food ordering application. Built with Node.js, Express, and MongoDB.

## What I Built

I created a RESTful API that handles dish management, search functionality, and filtering. The backend is designed to work seamlessly with the existing React frontend without breaking any UI components.

## Tech Stack

- **Node.js** + **Express.js** - Server and routing
- **MongoDB** + **Mongoose** - Database and ORM
- **Swagger UI** - API documentation
- **Express Validator** - Input validation

## Getting Started

### Installation

```bash
cd backend
npm install
```


### Run the Server

```bash
npm run dev  # Development (with nodemon)
npm start    # Production
```

The server will run on `http://localhost:5000`

### View API Documentation

Once the server is running, visit:
```
http://localhost:5000/api-docs
```

```

## API Endpoints

### Dishes

- `GET /api/dishes` - Get all dishes (supports filtering and sorting)
- `GET /api/dishes/autocomplete?q=query` - Get search suggestions
- `GET /api/dishes/search?q=query` - Search dishes (full results)
- `GET /api/dishes/:id` - Get a specific dish
- `POST /api/dishes` - Create a new dish
- `PUT /api/dishes/:id` - Update a dish
- `DELETE /api/dishes/:id` - Delete a dish

### Query Parameters

**Filtering:**
- `ratingMin=4.0` - Filter by minimum rating
- `cuisine=Biryani` - Filter by cuisine type

**Sorting:**
- `sort=rating` - Sort by rating (high to low)
- `sort=cost_low` - Sort by price (low to high)
- `sort=cost_high` - Sort by price (high to low)

**Examples:**
```
GET /api/dishes?sort=rating&ratingMin=4.0
GET /api/dishes?cuisine=North Indian&sort=cost_low
```

## Key Features & Design Decisions

### 1. Frontend-Compatible Response Format

The frontend expects a specific nested structure (`card.card.info`), so I made sure all responses match this format exactly. This way, the backend can be integrated without changing any frontend code.

### 2. Performance Optimizations

- **`.lean()` queries** - Used Mongoose's `.lean()` method to skip hydration and get plain JavaScript objects. This improves query performance by 5-10x, especially important for search and filtering operations.

- **Query projection** - Only fetch required fields from the database to reduce payload size.

- **Debouncing handled on frontend** - The autocomplete endpoint is designed to work with the frontend's 200ms debounce, preventing unnecessary database calls.

### 3. Search Implementation

I built two separate endpoints for search:

- **Autocomplete** (`/autocomplete`) - Returns just dish names for quick suggestions as you type
- **Full Search** (`/search`) - Returns complete dish details with nested structure

Both use case-insensitive regex matching (`$regex` with `$options: 'i'`) to handle partial matches.

### 4. Error Handling

Implemented centralized error handling middleware instead of try-catch blocks everywhere. All errors go through one place, making debugging easier and responses consistent.

### 5. Input Validation

Used `express-validator` on POST routes to validate incoming data before it hits the database. This prevents bad data from entering the system.

### 6. CORS Configuration

Set up environment-specific CORS:
- Development: Allows `localhost:5173` (Vite default)
- Production: Allows the deployed frontend domain

### 7. Controller-Based Architecture

Separated business logic into controllers instead of putting everything in route files. This makes the code cleaner and easier to test.

## Problems I Solved

### Problem 1: Frontend Expects Swiggy API Format

**Issue:** The frontend was built to work with Swiggy's API structure, which has deeply nested objects.

**Solution:** Created a transformation layer in the controller that takes our clean MongoDB data and wraps it in the exact nested format the frontend expects. This way, I could keep a simple database schema while maintaining frontend compatibility.

### Problem 2: MongoDB Connection Timeout

**Issue:** The seed script was trying to insert data before the database connection was established, causing timeout errors.

**Solution:** Made the database connection async and added `await connectDB()` before any database operations. Also added proper error handling for connection failures.

### Problem 3: Route Ordering Issues

**Issue:** Routes like `/search` weren't working because Express was treating "search" as an ID parameter in `/:id`.

**Solution:** Put specific routes (`/autocomplete`, `/search`) before parameterized routes (`/:id`). Order matters in Express routing!

### Problem 4: Query Performance

**Issue:** Fetching all dishes was slow because Mongoose was hydrating full documents even though we just needed to send JSON.

**Solution:** Added `.lean()` to all read queries. This bypasses Mongoose's document creation and returns plain objects, which are much faster for API responses.

## Best Practices Implemented

✅ **Environment variables** - Sensitive data like MongoDB URI stored in `.env`  
✅ **MVC pattern** - Controllers separate from routes  
✅ **Error handling middleware** - Centralized error management  
✅ **Input validation** - Data validated before database operations  
✅ **API documentation** - Swagger UI for easy testing  
✅ **Clean code structure** - Organized into logical folders  
✅ **Async/await** - Modern promise handling throughout  
✅ **Lean queries** - Performance optimization for read operations  

## Database Seeding

To populate the database with sample dishes:

```bash
node seed.js
```

This will:
1. Clear existing dishes
2. Insert 14 sample dishes with different cuisines, prices, and ratings
3. Exit automatically

Current seed data includes Indian, Italian, Chinese, and Middle Eastern dishes.

## What Could Be Added Later

- **Authentication** - JWT-based user authentication
- **Pagination** - For large datasets (currently returns all results)
- **Rate limiting** - Prevent API abuse
- **Caching** - Redis for frequently accessed data
- **Image upload** - Cloudinary integration for dish images
- **Reviews** - User reviews and ratings system

## Notes

The backend is designed to be stateless and RESTful. All endpoints return JSON and use standard HTTP status codes. The error responses are consistent across all endpoints.

I chose MongoDB because the data structure (dishes with nested restaurant info) fits well with NoSQL's flexibility. If I were to scale this, I'd consider separating Restaurants into their own collection with references.
