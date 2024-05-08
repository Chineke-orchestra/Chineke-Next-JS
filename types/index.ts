/* eslint-disable no-unused-vars */
export interface I_Media {
  url: string;
  alt: string;
}

export interface I_Link {
  url: string;
  title: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
}

export interface I_Card {
  title: string;
  body: string;
  link: I_Link;
}

export interface I_Pattern {
  color?: string;
  opacity?: number;
}

export enum Colors {
  '#ED5500' = '#ED5500',
  '#FCDD00' = '#FCDD00',
  '#1E1E4C' = '#1E1E4C',
  '#0341F2' = '#0341F2',
  '#FFFFFF' = '#FFFFFF',
  '#00C900' = '#00C900',
  '#181818' = '#181818',
}
