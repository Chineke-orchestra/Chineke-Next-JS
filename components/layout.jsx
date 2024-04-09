import { PreviewRibbon } from '@pantheon-systems/nextjs-kit';
import styles from './layout.module.css';

export default function Layout({ children, footerMenu, preview = false }) {
  return (
    <div className={`${styles.layout} flex flex-col`}>
      {preview && <PreviewRibbon />}

      <main>{children}</main>
    </div>
  );
}
