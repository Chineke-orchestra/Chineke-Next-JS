import { PreviewRibbon } from '@pantheon-systems/nextjs-kit';
import styles from './layout.module.css';
import Footer from './Footer/Footer';
import Header from './Header/Header'

export default function Layout({ children, footerMenu, headerMenu, preview = false }) {
 
  return (
    <div className={`${styles.layout} flex flex-col`}>
      {preview && <PreviewRibbon />}
      <Header {...headerMenu} />
      <main>{children}</main>
      <Footer {...footerMenu} />
    </div>
  );
}
