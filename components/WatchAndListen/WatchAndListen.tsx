import styles from './WatchAndListen.module.scss';
import { I_Media } from 'types/index';
import { VideoPopup } from 'components';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useViewport } from 'utils/viewport';
import WatchAndListenCard from './WatchAndListenCard';
import SpotifyPopup from 'components/SpotifyPopup/SpotifyPopup';

export interface I_Watch_And_Listen_Props {
  tags?: string[];
  title: string;
  image: I_Media;
  spotifyUrl?: string;
  videoUrl?: string;
}

const WatchAndListen = (props: { data: I_Watch_And_Listen_Props[] }) => {
  const animationRef = useRef<any>();
  const { isMobile } = useViewport();

  const [showButton, setShowButton] = useState(true);
  const [slicedData, setSlicedData] = useState<
    { grid: I_Watch_And_Listen_Props[]; flex: I_Watch_And_Listen_Props[] }[]
  >([
    {
      grid: props.data?.slice(0, isMobile ? 3 : 4),
      flex: isMobile ? [] : props.data?.slice(4, 7),
    },
  ]);

  const loadMoreHandler = () => {
    setSlicedData([
      {
        grid: props.data?.slice(0, 3),
        flex: props.data?.slice(3, 7),
      },
    ]);
    setShowButton(false);
  };

  useEffect(() => {
    setSlicedData([
      {
        grid: props.data?.slice(0, isMobile ? 3 : 4),
        flex: isMobile ? [] : props.data?.slice(4, 7),
      },
    ]);
    setShowButton(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const [activeVideo, setActiveVideo] = useState<null | string>(null);
  const [activeAudio, setActiveAudio] = useState<null | string>(null);

  return (
    <section className={styles.watch_and_listen} ref={animationRef}>
      <div className={classNames('container')}>
        <div className={styles.wrapper}>
          {slicedData?.map((slicedItem, index) => {
            return (
              <div key={index} className={styles.row}>
                <div className={styles.grid}>
                  {slicedItem?.grid?.map(
                    (item: I_Watch_And_Listen_Props, ind: number) => {
                      return (
                        <WatchAndListenCard
                          {...item}
                          setActiveVideo={setActiveVideo}
                          setActiveAudio={setActiveAudio}
                          key={ind}
                        />
                      );
                    },
                  )}
                </div>
                {slicedItem?.flex?.length > 0 && (
                  <div className={styles.flex}>
                    {slicedItem?.flex?.map(
                      (item: I_Watch_And_Listen_Props, ind: number) => {
                        return (
                          <WatchAndListenCard
                            {...item}
                            setActiveVideo={setActiveVideo}
                            setActiveAudio={setActiveAudio}
                            key={ind}
                          />
                        );
                      },
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {showButton && isMobile && (
            <button className="btn large yellow" onClick={loadMoreHandler}>
              Load more
            </button>
          )}
        </div>
      </div>

      {activeVideo && (
        <VideoPopup onClose={setActiveVideo} videoLink={activeVideo} />
      )}
      {activeAudio && (
        <SpotifyPopup onClose={setActiveAudio} videoLink={activeAudio} />
      )}
    </section>
  );
};

export default WatchAndListen;
