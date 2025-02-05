import React, { useEffect, useRef, useState } from 'react';
import { I_Link } from 'types/index';
import styles from './Header.module.scss';
import { organizeLinks } from 'utils/organizeLinks';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';
import LogoChinekeWhite from 'assets/svg/chineke_logo_white.svg';
import LogoChinekeBlack from 'assets/svg/chineke_logo_black.svg';
import DropdownMenu from './DropdownMenu';
import { motion, AnimatePresence } from 'framer-motion';
import UseAnimation from 'utils/UseAnimation';
import useCustomCookieBanner from 'utils/useCustomCookieBanner';

export interface HeaderProps {
  id: string;
  parentId?: string;
  link: I_Link;
  description?: string;
  enabled: boolean;
  isFeatured: boolean;
  imageUrl?: string;
  imagePageUrl?: string;
  children?: HeaderProps[];
}

export interface HeadersComponentProps {
  headerMenu: HeaderProps[];
}

const Header = ({ headerMenu }: HeadersComponentProps) => {
  const router = useRouter();
  const organizedLinks = organizeLinks(headerMenu);
  const isHomePage = router.pathname === '/';
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [navbarActive, setNavbarActive] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  
  const isMultiUatDomain = typeof window !== 'undefined' && window.location.hostname.includes('multi-uat');
  
const scriptUrl = isMultiUatDomain
  ? 'https://cdn-cookieyes.com/client_data/15a2a458ddc6783740a46abe/script.js'
  : 'https://cdn-cookieyes.com/client_data/7d7a99a42b8b6e441a7c47dd/script.js';
  useCustomCookieBanner(scriptUrl, 'cookieyes');

  const groupLinksIntoRows = (links: HeaderProps[]): HeaderProps[][] => {
    const rows: HeaderProps[][] = [];
    for (let i = 0; i < links.length; i += 3) {
      rows.push(links.slice(i, i + 3));
    }
    return rows;
  };
  const linkRows = groupLinksIntoRows(organizedLinks);

  const handleLinkClick = (linkId: string) => {
    const isClosingDropdown = linkId === selectedLinkId && dropdownVisible;
    if (!isClosingDropdown) {
      setSelectedLinkId(linkId);
    } else {
      setSelectedLinkId(null);
    }
    setDropdownVisible(!isClosingDropdown);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 968);
    };

    handleResize();

    const changeNavbarActiveState = () => {
      setNavbarActive(window.scrollY >= 95);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownVisible &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
        setSelectedLinkId(null);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownVisible(false);
        setSelectedLinkId(null);
      }
    };

    if (dropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', changeNavbarActiveState);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('scroll', changeNavbarActiveState);
    };
  }, [dropdownVisible, isSmallScreen]);

  const lightOrDarkStyle =
    !isHomePage || navbarActive || dropdownVisible ? styles.light : styles.dark;

  const selectedLink = organizedLinks.find(
    (link) => link.id === selectedLinkId,
  );

  const handleDonate = () => {
    router.push(`/donate`);
  };

  const handleDropdownLinkClickClose = () => {
    setDropdownVisible(false);
    setSelectedLinkId(null);
  };

  return (

    <motion.nav
      id="headerContainer"
      className={classNames(
        styles.navbar,
        isSmallScreen && dropdownVisible && styles.smallScreen,
      )}
      ref={navbarRef}
      initial="initial"
      animate="animate"
      variants={UseAnimation('down', {
        delay: 0,
        initialY: 150,
        endY: 0,
        duration: 1,
        stiffness: 100,
        fromOpacity: 0,
        toOpacity: 1,
        transitionType: 'ease-in-out',
      })}
    >
      <div className={classNames(styles.headerContainer, lightOrDarkStyle)}>
        <div className={styles.headerTopPattern} />
        <div className={classNames(styles.headerContentContainer, 'container')}>
          <motion.div
            className={styles.logo}
            initial="initial"
            animate="animate"
            variants={UseAnimation('left', {
              delay: 0.8,
              initialX: 50,
              endX: 0,
              duration: 1,
              stiffness: 100,
              fromOpacity: 0,
              toOpacity: 1,
              transitionType: 'ease-in-out',
            })}
          >
            <Link href="/">
              <ReactSVG
                src={
                  isHomePage && !navbarActive && !dropdownVisible
                    ? LogoChinekeWhite.src
                    : LogoChinekeBlack.src
                }
                title="chineke logo"
                wrapper="span"
              />
            </Link>
          </motion.div>

          {!isSmallScreen && organizedLinks.length > 0 && (
            <motion.div
              className={styles.linksContainer}
              initial="initial"
              animate="animate"
              variants={UseAnimation('down', {
                delay: 0.8,
                initialY: 50,
                endY: 0,
                duration: 1,
                stiffness: 100,
                fromOpacity: 0,
                toOpacity: 1,
                transitionType: 'ease-in-out',
              })}
            >
              {linkRows.map((row, index) => (
                <ul
                  key={index}
                  className={classNames(styles.linksRow, lightOrDarkStyle)}
                >
                  {row.map((item, index) => (
                    <li key={index}>
                      {item?.children &&
                      item?.children?.length > 0 &&
                      item.enabled ? (
                        <div
                          className={classNames(
                            styles.link,
                            item.id === selectedLinkId && styles.active,
                          )}
                          onClick={() => handleLinkClick(item.id)}
                          aria-hidden="true"
                        >
                          {item.link.title}
                          <span
                            className={classNames(
                              styles.linkArrow,
                              lightOrDarkStyle,
                            )}
                          />
                        </div>
                      ) : (
                        item?.link?.url && (
                          <Link
                            href={item.link.url}
                            className={classNames(
                              styles.link,
                              item.id === selectedLinkId && styles.active,
                            )}
                          >
                            {item.link.title}
                          </Link>
                        )
                      )}
                    </li>
                  ))}
                </ul>
              ))}
            </motion.div>
          )}

          {isSmallScreen ? (
            <motion.div
              className={classNames(
                styles.hamburgerMenu,
                dropdownVisible && styles.active,
                lightOrDarkStyle,
              )}
              onClick={() => setDropdownVisible(!dropdownVisible)}
              aria-hidden="true"
              initial="initial"
              animate="animate"
              variants={UseAnimation('right', {
                delay: 0.8,
                initialX: 50,
                endX: 0,
                duration: 1,
                stiffness: 100,
                fromOpacity: 0,
                toOpacity: 1,
                transitionType: 'ease-in-out',
              })}
            >
              <span />
              <span />
              <span />
            </motion.div>
          ) : (
            <motion.div
              className={styles.donateButton}
              initial="initial"
              animate="animate"
              variants={UseAnimation('right', {
                delay: 0.8,
                initialX: 50,
                endX: 0,
                duration: 1,
                stiffness: 100,
                fromOpacity: 0,
                toOpacity: 1,
                transitionType: 'ease-in-out',
              })}
            >
              <button className="btn large yellow" onClick={handleDonate}>
                Donate
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {dropdownVisible && (
          <DropdownMenu
            title={selectedLink?.link?.title}
            links={
              isSmallScreen ? organizedLinks : selectedLink?.children || []
            }
            dropdownVisible={dropdownVisible}
            isSmallScreen={isSmallScreen}
            onLinkClickCloseDropdown={handleDropdownLinkClickClose}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Header;
