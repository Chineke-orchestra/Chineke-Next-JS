/* eslint-disable @next/next/no-img-element */
import { I_Link, I_Media } from 'types/index';
import styles from './EventInfo.module.scss';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import mask from 'assets/svg/event-mask.svg';
import maskMobile from 'assets/svg/event-mask-mobile.svg';
import locationIcon from 'assets/svg/location.svg';
import clockIcon from 'assets/svg/clock.svg';
import calendarIcon from 'assets/svg/calendar.svg';
import shareIcon from 'assets/svg/share.svg';
import moment from 'moment-timezone';
import { LinkComponent, VideoPopup } from '..';
import classNames from 'classnames';
import { useViewport } from 'utils/viewport';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FRONTEND_URL } from 'utils/constants';

const EventInfo = (props: {
  image: I_Media;
  imageVideo: I_Media;
  backgroundColor: string;
  maskColor: string;
  imageMaskPosition: 'left_top' | 'bottom_right';
  startDate: string;
  endDate?: string;
  location: string;
  button: I_Link;
  amenities: I_Media[];
  title: string;
  videoUrl?: string;
  tags?: string[];
}) => {
  const currentDate = moment();
  const { asPath } = useRouter();
  const { isMobile } = useViewport();
  const shareUrl = `${FRONTEND_URL}${asPath}`;
  const handleBeforeInjection = (svg: SVGSVGElement) => {
    const paths = svg.querySelectorAll('path');
    paths.forEach((path) => {
      path.setAttribute('fill', props.maskColor);
    });
  };
  const [displayVideo, setDisplayVideo] = useState(false);

  const startDateLocal = moment(props.startDate).tz(moment.tz.guess());
  const endDateLocal = props.endDate
    ? moment(props.endDate).tz(moment.tz.guess())
    : null;

  const eventDetails = [
    {
      label: 'Date',
      icon: calendarIcon,
      alt: 'calendar icon',
      value: startDateLocal.format('D MMM YYYY'),
    },
    {
      label: 'Time',
      icon: clockIcon,
      alt: 'clock icon',
      value: `${startDateLocal.format('HH:mm')} - ${
        endDateLocal ? endDateLocal.format('HH:mm') : ''
      }`,
    },
    {
      label: 'Location',
      icon: locationIcon,
      alt: 'location icon',
      value: props.location,
    },
  ];

  const socialIcons = [
    {
      Component: (
        <TwitterShareButton url={shareUrl} title={props.title}>
          <div className={styles.icon}>
            <Image
              src="/images/x.svg"
              alt="x icon"
              width={24}
              height={24}
              loading="eager"
            />
          </div>
        </TwitterShareButton>
      ),
    },
    {
      Component: (
        <FacebookShareButton url={shareUrl}>
          <div className={styles.icon}>
            <Image
              src="/images/facebook.svg"
              alt="facebook icon"
              width={24}
              height={24}
              loading="eager"
            />
          </div>
        </FacebookShareButton>
      ),
    },
  ];

  const shareHandler = async () => {
    const shareData = {
      title: props.title,
      url: shareUrl,
    };
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section
      className={styles.event_info}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="container">
        <div
          className={classNames(styles.image_container, {
            [styles.has_video]: props.videoUrl,
          })}
          onClick={() => {
            props.videoUrl && setDisplayVideo(true);
          }}
          aria-hidden="true"
        >
          <Image
            src={props.image.url || props.imageVideo.url}
            alt={props.image.alt}
            fill
            loading="eager"
            priority
          />
          <ReactSVG
            src={isMobile ? maskMobile?.src : mask.src}
            className={classNames(styles.mask, styles[props.imageMaskPosition])}
            fill="#ff0000"
            beforeInjection={(svg) => {
              handleBeforeInjection(svg);
            }}
          />
          {props.videoUrl && (
            <div className={styles.text}>
              <div className={styles.tags}>
                {props?.tags?.map((tag, index) => {
                  return (
                    <p className="tag light" key={index}>
                      {tag}
                    </p>
                  );
                })}
              </div>
              <h6>{props.title}</h6>
            </div>
          )}
        </div>
        <div className={classNames(styles.details_section)}>
          <div className={classNames(styles.amenities, styles.mobile_section)}>
            {props.amenities?.map((item, index) => {
              return (
                item.url &&
                item.url.trim() !== '' && (
                  <Image
                    key={index}
                    src={item.url}
                    alt={item.alt}
                    width={24}
                    height={24}
                    loading="eager"
                    className={styles.icon}
                  />
                )
              );
            })}
          </div>
          <div className={styles.icons_section}>
            {eventDetails?.map((item, index) => {
              return item.value ? (
                <div key={index} className={styles.group}>
                  <div className={styles.header}>
                    <Image
                      src={item.icon}
                      alt={item.alt}
                      width={24}
                      height={24}
                      loading="eager"
                      className={styles.icon}
                    />
                    <p>{item.label}</p>
                  </div>
                  <h6>{item.value}</h6>
                </div>
              ) : (
                <></>
              );
            })}
          </div>
          <div className={styles.right_side}>
            <div className={styles.amenities_container}>
              <p>Amenities</p>
              <div className={styles.amenities}>
                {props.amenities?.map((item, index) => {
                  return (
                    <div key={index} className={styles.icon}>
                      <Image
                        src={item.url}
                        alt={item.alt}
                        width={24}
                        height={24}
                        loading="eager"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.social_icons_container}>
              <p>Share to Friends</p>
              <div className={styles.social_icons}>
                {socialIcons?.map(({ Component }) => {
                  return Component;
                })}
              </div>
            </div>

            <button className="btn large share" onClick={shareHandler}>
              Share to Friends <img src={shareIcon.src} alt="share-icon" />
            </button>

            {props.button &&
              moment(currentDate).isBefore(moment(props.startDate)) && (
                <LinkComponent link={props.button} className="btn large yellow">
                  {props.button.title}
                </LinkComponent>
              )}
          </div>
        </div>
      </div>
      {displayVideo && props.videoUrl && (
        <VideoPopup onClose={setDisplayVideo} videoLink={props.videoUrl} />
      )}
    </section>
  );
};

export default EventInfo;
