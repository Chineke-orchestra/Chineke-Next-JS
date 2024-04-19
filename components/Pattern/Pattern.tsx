import React from 'react';
import { I_Media, I_Pattern } from 'types/index';
import { ReactSVG } from 'react-svg';
import styles from './Pattern.module.scss';

export interface PatternProps {
  patternBackground?: I_Pattern;
  patternImage: I_Media;
  patternColor?: I_Pattern;
}

const Pattern = ({
  patternBackground,
  patternImage,
  patternColor,
}: PatternProps) => {
  const containerStyle: React.CSSProperties = {
    backgroundColor: patternBackground?.color,
    opacity: patternBackground?.opacity,
  };

  return (
    <section className={styles.patternContainer}>
      <div className={styles.patternBackground} style={containerStyle} />

      {patternImage?.url && (
        <ReactSVG
          src={patternImage.url}
          title={patternImage.alt}
          wrapper="span"
          beforeInjection={(svg) => {
            svg.classList.add(styles.pattern);
            if (patternColor?.color) {
              svg.setAttribute('fill', patternColor.color);
            }
          }}
        />
      )}
    </section>
  );
};

export default Pattern;
