import Layout from '../components/layout';
import styles from './404.module.scss';

export default function Custom404() {
  return (
    <Layout>
      <div className={`${styles.errorMessage} flex flex-col`}>
        <h1>404: Could not find the requested page</h1>
      </div>
    </Layout>
  );
}
