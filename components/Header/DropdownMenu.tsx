import React, { useMemo } from 'react';
import styles from './DropdownMenu.module.scss';
import classNames from 'classnames';
import DropdownList from './DropdownList';
import { motion } from 'framer-motion';
import UseAnimation from 'utils/UseAnimation';
import { HeaderProps } from './Header';

export interface LinkProps {
  title: string;
  url: string;
}

export interface DropdownMenuProps {
  title?: string;
  links: HeaderProps[];
  dropdownVisible: boolean;
  isSmallScreen: boolean;
  onLinkClickCloseDropdown: () => void;
}

const DropdownMenu = ({
  title,
  links,
  dropdownVisible,
  isSmallScreen,
  onLinkClickCloseDropdown,
}: DropdownMenuProps) => {
  const columns = useMemo(() => {
    const result: HeaderProps[][] = [];
    let currentColumn: HeaderProps[] = [];

    links.forEach((link) => {
      if (
        (link.children && link.children.length > 0) ||
        (link.isFeatured && link.imageUrl)
      ) {
        if (currentColumn.length > 0) {
          result.push(currentColumn);
          currentColumn = [];
        }
        result.push([link]);
      } else {
        if (currentColumn.length < 6) {
          currentColumn.push(link);
        } else {
          result.push(currentColumn);
          currentColumn = [link];
        }
      }
    });

    if (currentColumn.length > 0) {
      result.push(currentColumn);
    }

    return result;
  }, [links]);

  return (
    dropdownVisible && (
      <motion.div
        className={classNames(styles.dropdownMenu)}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={UseAnimation('down', {
          delay: 0.1,
          startY: -1500,
          endY: 0,
          duration: 0.5,
          stiffness: 100,
          transitionType: 'spring',
        })}
      >
        <div className={classNames(styles.dropdownMenuContainer, 'container')}>
          {title && !isSmallScreen && <h2>{title}</h2>}

          <DropdownList
            items={isSmallScreen ? links : columns}
            isSmallScreen={isSmallScreen}
            onLinkClickCloseDropdown={onLinkClickCloseDropdown}
          />

          {isSmallScreen && (
            <div className={styles.donateButton}>
              <button className="btn large yellow">Donate</button>
            </div>
          )}
        </div>
        <div className={styles.dropdownBottomPattern} />
      </motion.div>
    )
  );
};

export default DropdownMenu;
