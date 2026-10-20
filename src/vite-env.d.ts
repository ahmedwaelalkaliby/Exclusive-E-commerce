/// <reference types="vite/client" />

declare module '*.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module 'react-slick' {
  import type { Component } from 'react';

  interface SliderSettings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
  }

  export default class Slider extends Component<SliderSettings> {}
}
