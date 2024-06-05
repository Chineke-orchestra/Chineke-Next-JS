import image1 from 'assets/svg/logo.svg';
import image3 from 'assets/images/circles.svg';
import bluePattern from 'assets/svg/blue-pattern.svg';
import redPattern from 'assets/svg/red-pattern.svg';

const redPatternObj = {
  url: redPattern.src,
  alt: 'shapes',
  animated: true,
  variation: 'top',
};

const bluePatternObj = {
  url: bluePattern.src,
  alt: 'shapes',
  animated: true,
  variation: 'bottom',
};

const image1Obj = {
  url: image1.src,
  alt: 'shapes',
  animated: false,
};

const image3Obj = {
  url: image3.src,
  alt: 'shapes',
  animated: false,
};

export const layers = [
  redPatternObj,
  image1Obj,
  image3Obj,
  bluePatternObj,
  redPatternObj,
  image1Obj,
  image3Obj,
];

export const mobileLayers = [
  redPatternObj,
  image1Obj,
  bluePatternObj,
  image1Obj,
  redPatternObj,
  image1Obj,
  image3Obj,
  image1Obj,
  redPatternObj,
  image1Obj,
  image3Obj,
  image1Obj,
  redPatternObj,
  image1Obj,
];
