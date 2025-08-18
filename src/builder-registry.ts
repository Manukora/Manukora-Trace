import { Builder } from '@builder.io/react';
import { MgoCounter } from './components/mgo-counter';
import { PDFEmbed } from './components/pdf-embed';
import InfoModal from './components/info-modal';

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
    },
    {
      name: 'pdfUrl',
      type: 'string',
      defaultValue: ''
    },
    {
      name: 'pre_tick_consent',
      type: 'boolean',
      defaultValue: false
    },
    {
      name: 'defaultChecked',
      type: 'boolean',
      defaultValue: false
    },
    {
      name: 'isChecked',
      type: 'boolean',
      defaultValue: false
    },
    {
      name: 'show_email',
      type: 'boolean',
      defaultValue: true
    },
    {
      name: 'show_phone_number',
      type: 'boolean',
      defaultValue: false
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

// Register the PDF Embed component
Builder.registerComponent(PDFEmbed, {
  name: 'PDFEmbed',
  inputs: [
    {
      name: 'pdfUrl',
      type: 'string',
      required: true,
      defaultValue: '',
      helperText: 'URL of the PDF file to display'
    },
    {
      name: 'title',
      type: 'string',
      required: true,
      defaultValue: '',
      helperText: 'Title of the PDF file to display'
    }
  ],
  models: ['figma-imports'],
  canHaveChildren: false,
  defaultChildren: [],
  image: 'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
  description: 'PDF viewer component that displays a PDF file with navigation controls'
});

Builder.registerComponent(InfoModal, {
  name: 'InfoModal',
  inputs: [{
    name: 'title',
    type: 'string',
    defaultValue: ''
  },
  {
    name: 'description',
    type: 'string',
    defaultValue: ''
  }],
  models: ['figma-imports'],
  canHaveChildren: false,
  defaultChildren: [],
  image: 'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
  description: 'Info modal component'
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