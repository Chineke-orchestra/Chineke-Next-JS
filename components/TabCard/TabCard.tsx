import UseAnimation from 'utils/UseAnimation';
import styles from './TabCard.module.scss';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { I_Link, I_Media } from 'types/index';
import parse from 'html-react-parser';
import Image from 'next/image';
import classNames from 'classnames';

export interface CardProps {
  link?: I_Link;
  text?: string;
  icon?: I_Media;
  withParse?: boolean;
  motionProps?: object;
  hoverState?: boolean;
  handleHover: (index: number, isHovering: boolean) => void;
  index: number;
  isInView?: boolean;
  colorTheme: 'colorInvert' | 'colorNormal';
}

const TabCard = ({
  link,
  text,
  icon,
  withParse,
  motionProps,
  hoverState = false,
  handleHover,
  index,
  isInView = false,
  colorTheme
}: CardProps) => {
  const defaultMotionProps = {
    initial: { opacity: 0 },
    animate: isInView ? 'animate' : 'initial',
    variants: UseAnimation('up', {
      delay: index * 0.8,
      initialY: index * 150,
      endY: 0,
      duration: 1,
      stiffness: 70,
      fromOpacity: 0,
      toOpacity: 1,
    }),
    ...motionProps,
  };
  function parseBasicHtml(text: string | undefined) { 
    if (!text) { 
      return null; 
    }

    const parsedText = text.replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>');
    
    return <div dangerouslySetInnerHTML={{ __html: parsedText }} />;
  }
  return (
    <motion.div className={styles.card} {...defaultMotionProps}>
      {link?.url ? (
        <Link
          href={link.url}
          onMouseEnter={() => handleHover(index, true)}
          onMouseLeave={() => handleHover(index, false)}
        >
          {link.title && (
            <h4 className={classNames(styles.h4, styles[colorTheme])}>
              {link.title}
              <motion.span
                className={styles.underline}
                initial={{ scaleX: 0 }}
                animate={hoverState ? 'animate' : 'initial'}
                variants={UseAnimation('right', {
                  duration: 0.5,
                  distance: 0,
                  startScaleX: 0,
                  endScaleX: 1,
                })}
                style={{
                  originX: 0,
                }}
              />
            </h4>
          )}

          {text && <p>{parse(text)}</p>}

          {icon && (
            <motion.div
              className={styles.iconContainer}
              animate={hoverState ? 'animate' : 'initial'}
              variants={UseAnimation('right', {
                distance: 0,
                startX: 0,
                endX: 10,
                duration: 0.5,
                fromOpacity: 1,
              })}
            >
              <Image src={icon.url} alt={icon.alt} sizes="100%" fill  loading="lazy"
              priority={false}/>
            </motion.div>
          )}
        </Link>
      ) : withParse && text ? (
        <>{parse(text)}</>
      ) : (
        <div>{parseBasicHtml(text)}</div>
      )}
    </motion.div>
  );
};

export default TabCard;
