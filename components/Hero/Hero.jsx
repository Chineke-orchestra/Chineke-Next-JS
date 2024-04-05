import styles from './Hero.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import ReactPlayer from 'react-player';

const heroData = {
  title: 'Championing change in classical music',
  videoFile: '/videos/video.MOV',
  videoUrl: 'https://example.com/video.mp4',
  links: [
    { label: 'Chineke!’s story & mission', url: 'https://www.google.com/' },
    { label: 'Inspiring the next generation', url: 'https://www.google.com/' },
    { label: 'Chineke! at the BRIT Awards', url: 'https://www.google.com/' },
  ],
};

const Hero = () => {
  const videoSource = heroData.videoFile || heroData.videoUrl;

  return (
    <section className={styles.hero}>
      <div className={styles.videoContainer}>
        {videoSource && (
          <ReactPlayer
            url={videoSource}
            controls={false}
            loop={true}
            playing={true}
            muted={true}
          />
        )}
      </div>
      <div className={styles.bottomContainer}>
        <div className={classNames(styles.textContainer, 'container')}>
          <h1 className={styles.title}>{heroData.title}</h1>
          <div className={styles.linksContainer}>
            {heroData.links.map((item, index) => (
              <Link key={index} href={item.url}>
                <h5>{item.label}</h5>
                <span className={styles.arrow} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
