import { fetchPageData } from '../utils/fetchPageData';
import { NextSeo } from 'next-seo';
import Layout from '../components/layout';
import TitleCard from '../components/TitleCard/TitleCard';
import { ComponentsListing } from '../components';
import { useHeaderHeight } from '../utils/useHeaderHeight';

const stripHtmlTags = (html) => {
  if (!html) {
    return '';
  }
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

const getMetaDescription = (pageData, resourceName) => {
  let description = '';

  if (
    resourceName === 'node--news' ||
    resourceName === 'node--stories' ||
    resourceName === 'node--events'
  ) {
    description = pageData?.body?.summary || pageData?.body?.value;
  } else {
    description = pageData?.body?.summary || pageData?.body?.value;
  }

  const strippedDescription = stripHtmlTags(description);
  return strippedDescription || 'No description available';
};

export default function CatchAllRoute({
  pageData,
  hrefLang,
  footerMenu,
  headerMenu,
  preview,
  resourceName,
}) {
  const headerHeight = useHeaderHeight();

  const metaDescription = getMetaDescription(pageData, resourceName);

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
      <div style={{ height: headerHeight }}></div>

      {pageData.field_display_title_card && (
        <TitleCard
          title={pageData?.title}
          text={
            resourceName === 'node--news' ||
            resourceName === 'node--stories' ||
            resourceName === 'node--events'
              ? null
              : pageData?.body?.value
          }
          backgroundColor={pageData?.field_title_card_bg_color?.color}
          path={pageData.path.alias}
          headerMenu={headerMenu}
          type={
            resourceName === 'node--news' ||
            resourceName === 'node--stories' ||
            resourceName === 'node--events'
              ? pageData?.type
              : null
          }
          date={
            resourceName === 'node--news' ||
            resourceName === 'node--stories' ||
            resourceName === 'node--events'
              ? pageData?.created
              : null
          }
        />
      )}

      <ComponentsListing components={pageData?.field_reusable_components} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const {
      params: { alias },
    } = context;
    const path = Array.isArray(alias) ? alias.join('/') : alias;

    const data = await fetchPageData(context, path);

    if (data.redirect) {
      return data;
    }

    return {
      props: data,
    };
  } catch (error) {
    console.error(`There was an error while fetching data: `, error);
    return {
      notFound: true,
    };
  }
}
