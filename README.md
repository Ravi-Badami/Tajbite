# TajBite

TajBite is a React-based web application that restaurant chains in goa of Tajbite, offering a seamless food ordering experience. This project demonstrates the implementation of various features and best practices in web development.

## Demo

Check out the live demo of TajBite: [TajBite Demo](https://tajbite.vercel.app/)

## Features

### Frontend
- **Add to Cart**: Users can easily add items to their cart for a convenient ordering process.
- **Filtering System**: Efficiently filter food items based on categories or other criteria.
- **Search Feature**: Users can search for specific food items for a quick and easy navigation.
- **Swiggy Real-time API Integration**: Integration with Swiggy's real-time API for live updates and data.

### Backend
- **RESTful API**: Built with Node.js and Express.js for scalable server-side operations.
- **MongoDB Database**: NoSQL database for flexible and efficient data storage.
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality for dishes.
- **Query Optimization**: Performance-tuned database queries for fast response times.

## Best Practices Followed

### Frontend Best Practices
- **React Hooks and Custom Hooks**: Leveraging React Hooks and creating custom hooks for a modular and clean code structure.
- **Error Handling**: Implementation of error handling strategies to enhance user experience.
- **Performance Optimization**: Utilizing lazy loading and infinite scroll for optimized page performance.
- **Reusable Components**: Building components that are reusable across different parts of the application.
- **Props and State Management**: Proper management of component props and state for a robust architecture.
- **Code Splitting**: Employing code splitting techniques for efficient loading of application resources.
- **Conditional Rendering**: Using conditional rendering for a dynamic user interface based on various conditions.
- **Live API Integration**: Integrating live APIs for real-time data updates and a dynamic user experience.
- **Shimmer UI**: Incorporating shimmer UI effects to enhance the visual appeal of loading states.
- **Filtering and Searching with Debouncing**: Implementing efficient filtering and searching with debouncing for a smooth user interaction.

### Backend Best Practices
- **Controller-Based Architecture**: Separation of business logic into controllers for maintainable code.
- **MongoDB Query Optimization**: Used `.lean()` queries to improve performance by 5-10x, bypassing Mongoose document hydration and returning plain JavaScript objects for faster data retrieval.
- **Error Handling Middleware**: Centralized error handling for consistent API responses.
- **Environment Variables**: Secure configuration management using `.env` files.

## Installation

1. Clone the repository: `git clone https://github.com/Ravi-Badami/Swiggy-clone.git`
2. Install dependencies: `npm install`

## Usage

1. Start the development server: `npm run dev`

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).
