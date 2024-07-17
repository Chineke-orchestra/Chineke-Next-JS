import React, { useState } from 'react';
import Link from 'next/link';
import styles from './DropdownList.module.scss';
import classNames from 'classnames';
import { HeaderProps } from './Header';
import Image from 'next/image';
import missingImage from 'assets/images/missing_image.png';

export interface DropdownListProps {
  items: HeaderProps[] | HeaderProps[][];
  isSmallScreen: boolean;
  onLinkClickCloseDropdown: () => void;
}

const DropdownList = ({
  items,
  isSmallScreen,
  onLinkClickCloseDropdown,
}: DropdownListProps) => {
  const [selectedLink, setSelectedLink] = useState<HeaderProps | null>(null);

  const handleLinkClick = (link: HeaderProps) => {
    setSelectedLink(link);
  };

  const handleBackClick = () => {
    setSelectedLink(null);
  };

  const listItem = (item: HeaderProps, itemIndex: number) => {
    const imageSrc = item.imagePageUrl || item.imageUrl || missingImage.src;

    if (isSmallScreen) {
      return (
        <li key={itemIndex} className={styles.dropdownItem}>
          {item.children && item.children.length > 0 ? (
            <div className={styles.parentLink}>
              {item.parentId ? (
                <h6 className={styles.noLink}>{item.link.title}</h6>
              ) : (
                <h6
                  onClick={() =>
                    item.children &&
                    item.children.length > 0 &&
                    !item.parentId &&
                    handleLinkClick(item)
                  }
                  aria-hidden="true"
                >
                  {item.link.title} <span className={styles.linkArrow} />
                </h6>
              )}

              {selectedLink && (
                <ul>
                  {item.children.map((child, index) => (
                    <li key={index}>
                      <Link
                        href={child.link.url}
                        onClick={onLinkClickCloseDropdown}
                        aria-hidden="true"
                      >
                        {child.link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link
                href={item.link.url}
                onClick={onLinkClickCloseDropdown}
                aria-hidden="true"
              >
                <h6>{item.link.title}</h6>
              </Link>
              {item.isFeatured && item.imageUrl && (
                <div className={styles.imageContainer}>
                  <Image src={imageSrc} alt="feature image" sizes="100%" fill />
                </div>
              )}
            </>
          )}
        </li>
      );
    } else {
      return (
        <li className={styles.dropdownItem} aria-hidden="true" key={itemIndex}>
          {item.children && item.children.length > 0 ? (
            <>
              <h6 className={styles.noLink}>{item.link.title}</h6>

              {item.description && <p>{item.description}</p>}
              <ul>
                {item.children.map((child, index) => (
                  <li key={index}>
                    <Link href={child.link.url}>{child.link.title}</Link>
                    {child.description && <p>{child.description}</p>}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <Link
                href={item.link.url}
                onClick={onLinkClickCloseDropdown}
                aria-hidden="true"
              >
                <h6>{item.link.title}</h6>
              </Link>
              {item.description && <p>{item.description}</p>}
              {item.isFeatured && item.imageUrl && (
                <div className={styles.imageContainer}>
                  <Image src={imageSrc} alt="feature image" sizes="100%" fill />
                </div>
              )}
            </>
          )}
        </li>
      );
    }
  };

  const hasFeaturedChild = (children: HeaderProps[]) => {
    return children.some((child) => child.isFeatured);
  };

  const hasFeaturedInColumn = (column: HeaderProps[]) => {
    return column.some((item) => item.isFeatured);
  };

  return (
    <div
      className={classNames(
        styles.linksContainer,
        isSmallScreen && styles.smallScreen,
      )}
    >
      {selectedLink ? (
        <div
          className={classNames(
            styles.dropdownColumn,
            isSmallScreen && styles.smallScreen,

            {
              [styles.isFeatured]:
                selectedLink.children &&
                hasFeaturedChild(selectedLink.children),
            },
          )}
        >
          <h6
            className={classNames(styles.parentLink, styles.backButton)}
            onClick={handleBackClick}
            aria-hidden="true"
          >
            {selectedLink.link.title}
          </h6>
          {selectedLink.children?.map((item, index) => listItem(item, index))}
        </div>
      ) : Array.isArray(items[0]) ? (
        (items as HeaderProps[][]).map((column, index) => (
          <div
            key={index}
            className={classNames(styles.dropdownColumn, {
              [styles.isFeatured]: hasFeaturedInColumn(column),
            })}
          >
            <ul
              className={styles.dropdownItem}
              onClick={onLinkClickCloseDropdown}
              aria-hidden="true"
            >
              {column.map(listItem)}
            </ul>
          </div>
        ))
      ) : (
        (items as HeaderProps[]).map((item, index) => (
          <div
            key={index}
            className={classNames(styles.dropdownColumn, styles.bottomLine)}
          >
            <ul className={styles.dropdownItem}>{listItem(item, index)}</ul>
          </div>
        ))
      )}
    </div>
  );
};

export default DropdownList;
