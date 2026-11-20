import { NextSeo } from 'next-seo';
import Layout from '../components/layout';
import { ComponentsListing } from '../components';
import { fetchPageData } from '../utils/fetchPageData';
import { setCacheHeaders } from 'utils/setCacheHeaders';

const stripHtmlTags = (html) => {
  if (!html) {
    return '';
  }
  return html.replace(
    /<\/?[a-z][\w.-]*(?:\s+[a-z][\w.-]*(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s]+))?)*\s*\/?>/gi,
    '',
  );
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
          title: pageData?.metatag?.[0]?.attributes?.content,
          description: pageData?.metatag?.[1]?.attributes?.content,
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
    setCacheHeaders(context);
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
