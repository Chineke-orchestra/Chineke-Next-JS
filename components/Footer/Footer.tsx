import classNames from 'classnames';
import styles from './Footer.module.scss';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';
import UseAnimation from 'utils/UseAnimation';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { I_Media, I_Link } from 'types/index';
import { SubscribePopup } from 'components';

export interface FeaturedLinkProps {
  title?: string;
  tagline?: string;
  description?: string;
  link?: I_Link;
  ctaTitle?: string;
}
export interface MenuLinkProps {
  link: I_Link;
}

export interface SocialLinkProps {
  icon?: I_Media;
  link: I_Link;
}

export interface BasicBlockItemProps {
  title?: string;
}

export interface MenuTitleProps {
  title?: string;
}
export interface FooterMenuProps {
  featuredLinks: FeaturedLinkProps[];
  menuLinks: MenuLinkProps[];
  socialLinks: SocialLinkProps[];
  basicBlock: BasicBlockItemProps[];
  menuTitle?: MenuTitleProps;
}

const Footer = ({
  featuredLinks,
  menuLinks,
  socialLinks,
  basicBlock,
  menuTitle,
}: FooterMenuProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [subscribeModal, setSubscribeModal] = useState<boolean>(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.footerContainer} ref={ref}>
      <motion.div
        className={classNames(styles.topContainer, 'container')}
        initial={{ opacity: 0 }}
        animate={isInView ? 'animate' : 'initial'}
        variants={UseAnimation('up', {
          delay: 2,
          initialY: 150,
          endY: 0,
          duration: 2.5,
          stiffness: 100,
          fromOpacity: 0,
          toOpacity: 1,
        })}
      >
        {featuredLinks &&
          featuredLinks.length > 0 &&
          featuredLinks.map((item, index) => (
            <div className={styles.leftAndCenterColumns} key={index}>
              <div className={styles.textContainer}>
                {item?.tagline && <h6>{item.tagline}</h6>}

                {item?.title && <h3>{item.title}</h3>}

                {item?.description && <p>{item.description}</p>}
              </div>

              {item?.link?.url ? (
                <Link
                  href={item.link.url}
                  target={item.link.target}
                  rel={item.link.rel}
                  className={classNames('btn large yellow')}
                >
                  {item.link.title}
                </Link>
              ) : (
                <button
                  className={classNames('btn large yellow')}
                  onClick={() => setSubscribeModal(!subscribeModal)}
                >
                  {item.ctaTitle}
                </button>
              )}
            </div>
          ))}

        <div className={styles.rightColumn}>
          <div className={styles.menuLinksContainer}>
            {menuLinks &&
              menuLinks.length > 0 &&
              menuLinks.map(
                (item, index) =>
                  item?.link && (
                    <Link
                      key={index}
                      href={item.link.url}
                      target={item.link.target}
                      rel={item.link.rel}
                    >
                      {item.link.title}
                    </Link>
                  ),
              )}
          </div>
          <div className={styles.socialLinksContainer}>
            {menuTitle?.title && <span>{menuTitle.title}</span>}
            <div className={styles.linksIconsContainer}>
              {socialLinks?.length > 0 &&
                socialLinks.map(
                  (item, index) =>
                    item?.link && (
                      <Link
                        key={index}
                        href={item.link.url}
                        target={item.link.target}
                        rel={item.link.rel}
                      >
                        {item?.icon && (
                          <ReactSVG
                            src={item.icon.url}
                            title={item.icon.alt}
                            wrapper="span"
                          />
                        )}
                      </Link>
                    ),
                )}
            </div>
          </div>
        </div>

        {basicBlock?.[0]?.title && (
          <div className={styles.textCopyRight}>
            {parse(basicBlock[0].title)}
          </div>
        )}
      </motion.div>

      <button
        onClick={scrollToTop}
        className={classNames(styles.scrollToTopBtn, 'btnCircle up red')}
      />
      <div className={styles.pattern} />

      {subscribeModal && (
        <SubscribePopup onClose={() => setSubscribeModal(false)} />
      )}
    </section>
  );
};

export default Footer;
