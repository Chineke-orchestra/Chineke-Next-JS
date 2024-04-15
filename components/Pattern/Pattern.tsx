import React from 'react';
import { I_Media, I_Pattern } from 'types/index';

export interface PatternProps {
  patternBackground: I_Pattern;
  patternImage: I_Media;
  patternColor: I_Pattern;
}

const Pattern = ({
  patternBackground,
  patternImage,
  patternColor,
}: PatternProps) => {
  console.log(patternBackground);
  console.log(patternImage);
  console.log(patternColor);

  return <div>Pattern</div>;
};

export default Pattern;
