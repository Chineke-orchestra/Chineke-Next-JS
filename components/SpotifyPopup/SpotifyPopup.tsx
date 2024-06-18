import styles from './SpotifyPopup.module.scss';
import { Modal } from 'components';
import { useRef } from 'react';
import { useViewport } from 'utils/viewport';

const SpotifyPopup = (props: { onClose: Function; videoLink: string }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useViewport();

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

        <iframe
          src={props.videoLink?.replace(
            'https://open.spotify.com/',
            'https://open.spotify.com/embed/',
          )}
          width="100%"
          height={isMobile ? 534 : 578}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className={styles.test}
          title="Spotify iframe"
        ></iframe>
      </div>
    </Modal>
  );
};

export default SpotifyPopup;
