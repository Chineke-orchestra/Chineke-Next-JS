import styles from './WatchAndListen.module.scss';

import Image from 'next/image';
import { I_Watch_And_Listen_Props } from './WatchAndListen';
import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

const WatchAndListenCard = (
  props: I_Watch_And_Listen_Props & {
    setActiveVideo: Function;
    setActiveAudio: Function;
  },
) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;

  return (
    <div
      className={classNames(styles.video_card, {
        [styles.playing]: props.videoUrl && isPlaying && !props.spotifyUrl,
      })}
      onClick={() => {
        props.spotifyUrl && !props.videoUrl
          ? props.setActiveAudio(props.spotifyUrl)
          : props.videoUrl && props.setActiveVideo(props?.videoUrl);
      }}
      onMouseOver={() => {
        props.videoUrl && setIsPlaying(true);
      }}
      onFocus={() => {
        props.videoUrl && setIsPlaying(true);
      }}
      aria-hidden="true"
      onMouseOut={() => setIsPlaying(false)}
      onBlur={() => setIsPlaying(false)}
    >
      {props.videoUrl ? (
        <ReactPlayer
          url={props.videoUrl}
          width="100%"
          height="100%"
          controls={false}
          // playing={isPlaying}
          muted
          config={{
            vimeo: {
              playerOptions: {
                controls: false,
              },
            },
          }}
          light={isPlaying ? undefined : props.image.url}
        />
      ) : (
        <Image src={props.image.url} alt={props.image.alt} fill />
      )}

      <div className={styles.text_container}>
        <div className={styles.tags}>
          {props.tags &&
            props.tags?.length > 0 &&
            props.tags?.map((item, index) => {
              return (
                <p className="tag light" key={index}>
                  {item}
                </p>
              );
            })}
        </div>

        {!isPlaying && <h6 className={styles.title}>{props.title}</h6>}
      </div>
    </div>
  );
};

export default WatchAndListenCard;
