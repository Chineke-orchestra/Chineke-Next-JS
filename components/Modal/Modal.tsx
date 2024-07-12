import React, { FC, ReactNode, useEffect } from 'react';
import styles from './Modal.module.scss';
import classNames from 'classnames';

interface ModalProps {
  children: ReactNode;
  onClose: Function;
  modalRef: React.RefObject<HTMLDivElement>;
  additionalClass?: string;
}

const Modal: FC<ModalProps> = ({
  children,
  onClose,
  modalRef,
  additionalClass,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, onClose]);

  useEffect(() => {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    const header = document.getElementById('headerContainer');
    if (header) {
      header.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      if (header) {
        header.style.paddingRight = '';
      }
    };
  }, []);

  return (
    <div
      className={classNames(
        styles.modal,
        additionalClass ? styles[additionalClass] : '',
      )}
    >
      <div className={styles.modal_content}>
        <div className={classNames('container')}>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
