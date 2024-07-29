import { NextSeo } from 'next-seo';
import Layout from '../components/layout';
import { ComponentsListing } from '../components';
import { fetchPageData } from '../utils/fetchPageData';

const stripHtmlTags = (html) => {
  if (!html) {
    return '';
  }
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

const getMetaDescription = (pageData) => {
  const description = pageData?.body?.summary || pageData?.body?.value || '';
  const strippedDescription = stripHtmlTags(description);
  return strippedDescription || 'No description available';
};

export default function LandingPage({
  pageData,
  hrefLang,
  footerMenu,
  headerMenu,
  preview,
}) {
  const metaDescription = getMetaDescription(pageData);

  return (
    <Layout preview={preview} footerMenu={footerMenu} headerMenu={headerMenu}>
      <NextSeo
        title={pageData?.title}
        description={metaDescription}
        openGraph={{
          title: pageData?.title,
          description: metaDescription,
        }}
        languageAlternates={hrefLang}
      />
      <ComponentsListing components={pageData?.field_reusable_components} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const data = await fetchPageData(context, 'homepage');
    if (data.redirect) {
      return data;
    }
    return {
      props: { ...data },
    };
  } catch (error) {
    console.error(`There was an error while fetching data: `, error);
    return {
      notFound: true,
    };
  }
}
