import { Builder } from '@builder.io/react';

if (!process.env.NEXT_PUBLIC_BUILDER_API_KEY) {
  throw new Error('NEXT_PUBLIC_BUILDER_API_KEY is not defined');
}

// Initialize builder with API key
const builder = new Builder(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

// Register components
Builder.register('figma-imports', {
  inputs: [
    {
      name: 'name',
      type: 'string',
      defaultValue: ''
    },
    {
      name: 'bio',
      type: 'string',
      defaultValue: ''
    },
    {
      name: 'mgo_level',
      type: 'number',
      defaultValue: 0
    }
  ]
});

Builder.register('ProductCard', {
  inputs: [
    {
      name: 'name',
      type: 'string',
      defaultValue: ''
    },
    {
      name: 'mgo_level',
      type: 'number',
      defaultValue: 0
    },
    {
      name: 'size',
      type: 'string',
      defaultValue: ''
    },
    {
      name: 'title',
      type: 'string',
      defaultValue: ''
    },
    {
      name: 'title_arabic',
      type: 'string',
      defaultValue: ''
    },
    {
      name: 'image_url',
      type: 'string',
      defaultValue: ''
    }
  ]
});

export { builder }; 