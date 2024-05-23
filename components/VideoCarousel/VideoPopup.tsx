import styles from './VideoPopup.module.scss';
import { Modal } from 'components';
import { useRef } from 'react';
import ReactPlayer from 'react-player';

const VideoPopup = (props: { onClose: Function; videoLink: string }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  return (
    <Modal
      onClose={() => {
        props.onClose(null);
      }}
      modalRef={modalRef}
    >
      <div className={styles.popup_container} ref={modalRef}>
        <div className={styles.popup_header}>
          <button
            className="btn large yellow"
            onClick={() => {
              props.onClose(null);
            }}
          >
            CLOSE <span className={styles.close_icon} />
          </button>
        </div>

        <div className={styles.player}>
          <ReactPlayer
            url={props.videoLink}
            width="100%"
            height="100%"
            controls
            playing
          />
        </div>
      </div>
    </Modal>
  );
};

export default VideoPopup;
