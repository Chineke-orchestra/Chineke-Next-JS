import styles from './SubscribePopup.module.scss';
import { Modal } from 'components';
import { useRef, useState, useEffect } from 'react';
import subscribeImage from '../../assets/images/subscribe_Image.png';
import logoChineke from '../../assets/svg/chineke_logo_black.svg';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import jsonp from 'jsonp';

interface SubscribePopupProps {
  onClose: () => void;
}

const SubscribePopup = (props: SubscribePopupProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitedWithSuccess, setSubmitedWithSuccess] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const url = `https://chineke.us7.list-manage.com/subscribe/post?u=200247d8dd8ea28281c53a57d&id=cc6314200f&f_id=0015cfe4f0`;

    jsonp(
      `${url}&EMAIL=${encodeURIComponent(email)}`,
      { param: 'c' },
      (err: Error | null, data: any) => {
        if (err) {
          setError('An error occurred while connecting. Please try again.');
          setSubmitedWithSuccess(false);
        } else if (data.result === 'error') {
          setError(data.msg);
          setSubmitedWithSuccess(false);
          console.log(data.msg);
        } else if (data.result === 'success') {
          setSubmitedWithSuccess(true);
          setError('');
        }
      },
    );
  };

  return (
    <Modal
      onClose={props.onClose}
      modalRef={modalRef}
      additionalClass="subscribePopup"
    >
      <div className={styles.popup_container} ref={modalRef}>
        <button className={styles.close_button} onClick={props.onClose}>
          CLOSE
          <span className={styles.close_icon} />
        </button>
        <div className={styles.popup_left}>
          <Image src={subscribeImage.src} alt="subscribe image" fill loading="lazy"
              priority={false} />
        </div>

        <div className={styles.popup_right}>
          <div className={styles.right_content}>
            {!submitedWithSuccess && <ReactSVG src={logoChineke.src} />}

            <h5>
              {submitedWithSuccess
                ? 'Thanks for subscribing to Chineke!'
                : 'Your Gateway to Exclusive Updates'}
            </h5>

            <p style={submitedWithSuccess ? { fontSize: '18px' } : {}}>
              {submitedWithSuccess
                ? 'Get ready for exclusive updates straight to your inbox. Stay tuned!'
                : 'Get exclusive updates delivered to your inbox! Stay informed, inspired, and ahead of the curve with our newsletter subscription.'}
            </p>

            {!submitedWithSuccess && (
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                  Email Address <span>*</span>
                </label>
                <input
                  type="textEmailAddress"
                  name="EMAIL"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btn large orange">
                  Subscribe
                </button>
              </form>
            )}
            {error && <div className={styles.error}>{error}</div>}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SubscribePopup;
