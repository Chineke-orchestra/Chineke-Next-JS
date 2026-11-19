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
  const animationRef = useRef<any>(undefined);
  const { isMobile } = useViewport();

  const [showButton, setShowButton] = useState(true);
  const [slicedData, setSlicedData] = useState<
    { grid: I_Watch_And_Listen_Props[]; flex: I_Watch_And_Listen_Props[]; additional: I_Watch_And_Listen_Props[] }[]
  >([
    {
      grid: props.data?.slice(0, isMobile ? 3 : 4),
      flex: isMobile ? [] : props.data?.slice(4, 7),
      additional: [],
    },
  ]);

  const loadMoreHandler = () => {
    const allData = [...slicedData];
    const remainingData = props.data.slice(isMobile ? 3 : 7);
    allData[0].additional = remainingData;
    setSlicedData(allData);
    setShowButton(false);
  };

  useEffect(() => {
    setSlicedData([
      {
        grid: props.data?.slice(0, isMobile ? 3 : 4),
        flex: isMobile ? [] : props.data?.slice(4, 7),
        additional: [],
      },
    ]);
    setShowButton(true);
  }, [isMobile, props.data]);

  const [activeVideo, setActiveVideo] = useState<null | string>(null);
  const [activeAudio, setActiveAudio] = useState<null | string>(null);

  return (
    <section className={styles.watch_and_listen} ref={animationRef}>
      <div className={classNames('container')}>
        <div className={styles.wrapper}>
          {slicedData.map((slicedItem, index) => {
            return (
              <div key={index} className={styles.row}>
                <div className={styles.grid}>
                  {slicedItem.grid.map((item, ind) => {
                    return (
                      <WatchAndListenCard
                        {...item}
                        setActiveVideo={setActiveVideo}
                        setActiveAudio={setActiveAudio}
                        key={ind}
                      />
                    );
                  })}
                </div>
                {slicedItem.flex.length > 0 && (
                  <div className={styles.flex}>
                    {slicedItem.flex.map((item, ind) => {
                      return (
                        <WatchAndListenCard
                          {...item}
                          setActiveVideo={setActiveVideo}
                          setActiveAudio={setActiveAudio}
                          key={ind}
                        />
                      );
                    })}
                  </div>
                )}
                {slicedItem.additional && slicedItem.additional.length > 0 && (
                  <div className={`${styles.flex} ${styles.additional}`}>
                    {slicedItem.additional.map((item, ind) => {
                      return (
                        <WatchAndListenCard
                          {...item}
                          setActiveVideo={setActiveVideo}
                          setActiveAudio={setActiveAudio}
                          key={ind + (isMobile ? 3 : 7)}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          {showButton && props.data.length > (isMobile ? 3 : 7) && (
            <button className="btn large yellow" onClick={loadMoreHandler}>
              Load more
            </button>
          )}
        </div>
      </div>

      {activeVideo && (
        <VideoPopup onClose={() => setActiveVideo(null)} videoLink={activeVideo} />
      )}
      {activeAudio && (
        <SpotifyPopup onClose={() => setActiveAudio(null)} videoLink={activeAudio} />
      )}
    </section>
  );
};

export default WatchAndListen;
