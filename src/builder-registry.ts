import { Builder } from '@builder.io/react';
import { MgoCounter } from './components/mgo-counter';

if (!process.env.NEXT_PUBLIC_BUILDER_API_KEY) {
  throw new Error('NEXT_PUBLIC_BUILDER_API_KEY is not defined');
}

const builder = new Builder(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

// Register the model
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
    },
    {
      name: 'mgo_rating',
      type: 'number',
      defaultValue: 0
    }
  ]
});

// Register the MGO Counter component
Builder.registerComponent(MgoCounter, {
  name: 'MGOCounter2',
  inputs: [
    { 
      name: 'mgo_rating', 
      type: 'number',
      defaultValue: 0
    },
    { 
      name: 'mgo_level', 
      type: 'number',
      defaultValue: 0
    }
  ],
  models: ['figma-imports'],
  canHaveChildren: false,
  defaultChildren: [],
  image: 'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
  description: 'Animated MGO counter component that displays the MGO rating with a counting animation'
});
/*
Builder.registerComponent(FullReview, {
  name: 'FullReview',
  inputs: [],
  models: ['figma-imports'],
  canHaveChildren: false,
  defaultChildren: [],
  image: 'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
  description: 'Full review component that displays the full review of the product'
});

Builder.registerComponent(TextReview, {
  name: 'TextReview',
  inputs: [],
  models: ['figma-imports'],
  canHaveChildren: false,
  defaultChildren: [],
  image: 'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
  description: 'Text review component that displays the text review of the product'
});
*/
export { builder }; 