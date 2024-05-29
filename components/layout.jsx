import { PreviewRibbon } from '@pantheon-systems/nextjs-kit';
import styles from './layout.module.css';
import Footer from './Footer/Footer';
import Header from './Header/Header';

export default function Layout({
  children,
  footerMenu,
  headerMenu,
  preview = false,
}) {
  return (
    <div className={`${styles.layout} flex flex-col justify-between `}>
      {preview && <PreviewRibbon />}
      <Header {...headerMenu} />
      <main className="flex-1">{children}</main>
      <Footer {...footerMenu} />
    </div>
  );
}
