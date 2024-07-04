import { PreviewRibbon } from '@pantheon-systems/nextjs-kit';
import styles from './layout.module.css';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import { useEffect } from 'react';

export default function Layout({
  children,
  footerMenu,
  headerMenu,
  preview = false,
  showFooter = true,
}) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className={`${styles.layout} flex flex-col justify-between `}>
      {preview && <PreviewRibbon />}
      <Header {...headerMenu} />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer {...footerMenu} />}
    </div>
  );
}
