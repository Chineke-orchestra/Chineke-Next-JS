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
    backgroundColor: patternBackground?.color || 'transparent',
    opacity: patternBackground?.opacity !== null && patternBackground?.opacity !== undefined ? patternBackground.opacity : 1,
  };

  return (
    <section className={styles.patternContainer}>
      <div className={styles.patternBackground} style={containerStyle} />

      {patternImage?.url && (
        <ReactSVG
          src={patternImage.url}
          title={patternImage.alt}
          wrapper="span"
          className={styles.pattern}
          beforeInjection={(svg) => {
            svg.classList.add(styles.pattern);

            svg.querySelectorAll('[style]').forEach((element) => {
              element.removeAttribute('style');
            });
            svg.querySelectorAll('[fill]').forEach((element) => {
              element.removeAttribute('fill');
            });

            svg.querySelectorAll('*').forEach((element) => {
              if (patternColor?.color) {
                (element as HTMLElement).style.fill = patternColor.color!;
              }
              if (patternColor?.opacity !== null && patternColor?.opacity !== undefined) {
                (element as HTMLElement).style.opacity = patternColor.opacity!.toString();
              }
            });
          }}
        />
      )}
    </section>
  );
};

export default Pattern;
