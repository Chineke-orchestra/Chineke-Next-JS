import image1 from 'assets/svg/logo.svg';
import image3 from 'assets/images/circles.svg';
import bluePattern from 'assets/svg/blue-pattern.svg';
import redPattern from 'assets/svg/red-pattern.svg';

export const layers = [
  {
    url: redPattern.src,
    alt: 'shapes',
    animated: true,
    variation: 'top',
  },
  {
    url: image1.src,
    alt: 'shapes',
    animated: false,
  },
  {
    url: image3.src,
    alt: 'shapes',
    animated: false,
  },
  {
    url: bluePattern.src,
    alt: 'shapes',
    animated: true,
    variation: 'bottom',
  },
  {
    url: redPattern.src,
    alt: 'shapes',
    animated: true,
    variation: 'top',
  },
  {
    url: image1.src,
    alt: 'shapes',
    animated: false,
  },
  {
    url: image3.src,
    alt: 'shapes',
    animated: false,
  },
];

export const mobileLayers = [
  ...layers,
  {
    url: bluePattern.src,
    alt: 'shapes',
    animated: true,
    variation: 'bottom',
  },
  {
    url: redPattern.src,
    alt: 'shapes',
    animated: true,
    variation: 'top',
  },
  {
    url: image1.src,
    alt: 'shapes',
    animated: false,
  },
  {
    url: image3.src,
    alt: 'shapes',
    animated: false,
  },
  {
    url: redPattern.src,
    alt: 'shapes',
    animated: true,
    variation: 'top',
  },
  {
    url: image1.src,
    alt: 'shapes',
    animated: false,
  },
  {
    url: image3.src,
    alt: 'shapes',
    animated: false,
  },
];
