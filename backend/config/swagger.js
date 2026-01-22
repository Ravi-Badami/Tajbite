const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Tajbite API',
    version: '1.0.0',
    description: 'API documentation for Tajbite restaurant application',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
  paths: {
    '/': {
      get: {
        tags: ['Dishes'],
        summary: 'Get all dishes',
        description: 'Returns a list of all dishes',
        responses: {
          '200': {
            description: 'Successful response',
          },
        },
      },
      post: {
        tags: ['Dishes'],
        summary: 'Create a new dish',
        description: 'Add a new dish to the menu',
        responses: {
          '201': {
            description: 'Dish created successfully',
          },
        },
      },
    },
    '/{id}': {
      get: {
        tags: ['Dishes'],
        summary: 'Get a dish by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Dish ID',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Successful response',
          },
          '404': {
            description: 'Dish not found',
          },
        },
      },
    },
    '/autocomplete': {
      get: {
        tags: ['Dishes'],
        summary: 'Autocomplete dish names',
        responses: {
          '200': {
            description: 'Successful response',
          },
        },
      },
    },
    '/search': {
      get: {
        tags: ['Dishes'],
        summary: 'Search dishes',
        responses: {
          '200': {
            description: 'Successful response',
          },
        },
      },
    },
  },
};

module.exports = swaggerDocument;