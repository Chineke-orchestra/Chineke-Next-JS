import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';

import { drupal, localeOptions } from '../../lib/drupal';
import styles from './preview-error.module.css';

export default function PreviewError({ footerMenu, preview }) {
	const {
		query: { error, message },
	} = useRouter();
	return (
		<Layout footerMenu={footerMenu} preview={true}>
			<div className={`${styles.container} flex flex-col mb-0 mx-auto mt-20`}>
				<h2>🛑 {error ? error : 'There was an error on the server'} 🛑</h2>
				{message ? <p>{message}</p> : null}
				<Link href="/" className="underline">
					Go Home
				</Link>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const footerMenu = await drupal.getResourceCollection('menu_items--main', {
		withAuth: false,
		...localeOptions(context),
	});

	return {
		props: {
			footerMenu,
		},
	};
}
