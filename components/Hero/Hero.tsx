import styles from './Hero.module.scss';
import classNames from 'classnames';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import UseAnimation from '../../utils/UseAnimation';
import { I_Link, I_Media } from 'types/index';

export interface HeroProps {
  title: string;
  links: I_Link[];
  video: I_Media;
}

const Hero: NextPage<HeroProps> = ({ title, links, video }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hoverStates, setHoverStates] = useState(
    new Array(links.length).fill(false),
  );
  const [isMounted, setIsMounted] = useState(false);

  console.log(video);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleHover = (index: number, isHovering: boolean) => {
    setHoverStates((currentHoverStates) =>
      currentHoverStates.map((state, i) => (i === index ? isHovering : state)),
    );
  };

  const videoSource = video;

  return (
    <section className={styles.hero}>
      <div className={styles.videoContainer}>
        {isMounted && videoSource && (
          <ReactPlayer
            ref={videoRef}
            url={video.url}
            controls={false}
            loop={true}
            playing={isPlaying}
            muted={isMuted}
          />
        )}
        <div className={styles.controlsContainer}>
          <span
            onClick={togglePlayPause}
            className={classNames(styles.play, { [styles.pause]: !isPlaying })}
          />
          <span
            onClick={toggleMute}
            className={classNames(styles.mute, { [styles.sound]: !isMuted })}
          />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={classNames(styles.textContainer, 'container')}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.linksContainer}>
            {links.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                onMouseEnter={() => handleHover(index, true)}
                onMouseLeave={() => handleHover(index, false)}
              >
                <h5>
                  {item.title}
                  <motion.span
                    className={styles.underline}
                    initial={{ scaleX: 0 }}
                    animate={hoverStates[index] ? 'animate' : 'initial'}
                    variants={UseAnimation('right', 0, {
                      duration: 0.5,
                      distance: 0,
                      startScaleX: 0,
                      endScaleX: 1,
                    })}
                    style={{
                      originX: 0,
                    }}
                  />
                </h5>
                <motion.span
                  className={styles.arrow}
                  animate={hoverStates[index] ? 'animate' : 'initial'}
                  variants={UseAnimation('right', 0, {
                    distance: -10,
                    duration: 0.5,
                    fromOpacity: 1,
                  })}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
