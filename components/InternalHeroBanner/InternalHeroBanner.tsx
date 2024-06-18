import { I_Media } from 'types/index';
import styles from './InternalHeroBanner.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import Corner from '../../assets/svg/hero_corner.svg';
import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';
import VideoPopup from 'components/VideoPopup/VideoPopup';

export interface InternalHeroBannerProps {
  maskColor: string;
  maskPosition?: 'left_top' | 'right_bottom';
  image: I_Media;
  externalVideo?: string;
  externalVideoTitle?: string;
  externalVideoTags?: string[];
}

const InternalHeroBanner = ({
  maskColor,
  maskPosition,
  image,
  externalVideo,
  externalVideoTitle,
  externalVideoTags,
}: InternalHeroBannerProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeVideo, setActiveVideo] = useState<null | string>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleVideoClick = () => {
    setActiveVideo(externalVideo || null);
    setIsPlaying(true);
  };

  const handleClosePopup = () => {
    setActiveVideo(null);
    setIsPlaying(false);
  };

  return (
    <section
      className={classNames(styles.internalHeroBannerContainer, 'container')}
    >
      <div
        className={styles.mediaContainer}
        onClick={handleVideoClick}
        aria-hidden="true"
      >
        {externalVideo && isMounted ? (
          <ReactPlayer
            height="600px"
            width="100%"
            url={externalVideo}
            playing={false}
            light={!isPlaying}
            playIcon={<button className={styles.playButton} />}
            config={{
              youtube: {
                playerVars: {
                  controls: 0,
                  modestbranding: 1,
                  rel: 0,
                },
              },
              vimeo: {
                playerOptions: {
                  autopause: true,
                  autoplay: true,
                  byline: false,
                  title: false,
                  portrait: false,
                  background: true,
                },
              },
            }}
          />
        ) : (
          <Image
            src={image.url}
            alt={image.alt}
            layout="responsive"
            width={100}
            height={100}
          />
        )}

        {maskPosition && (
          <ReactSVG
            src={Corner.src}
            title="corner"
            wrapper="span"
            beforeInjection={(svg) => {
              svg.classList.add(
                styles[
                  maskPosition === 'left_top' ? 'leftCorner' : 'rightCorner'
                ],
              );

              svg.setAttribute('fill', maskColor);
            }}
          />
        )}
        <div className={styles.infoContainer}>
          {externalVideoTags && (
            <div className={styles.tagsContainer}>
              {externalVideoTags.map((tag, index) => (
                <div key={index} className={styles.tag}>
                  {tag}
                </div>
              ))}
            </div>
          )}
          {externalVideoTitle && <h6>{externalVideoTitle}</h6>}
        </div>
      </div>
      {activeVideo && (
        <VideoPopup onClose={handleClosePopup} videoLink={activeVideo} />
      )}
    </section>
  );
};

export default InternalHeroBanner;
