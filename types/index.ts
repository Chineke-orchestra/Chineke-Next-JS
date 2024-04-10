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
