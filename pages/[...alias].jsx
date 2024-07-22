import { fetchPageData } from '../utils/fetchPageData';
import { NextSeo } from 'next-seo';
import Layout from '../components/layout';
import TitleCard from '../components/TitleCard/TitleCard';
import { ComponentsListing } from '../components';
import { fetchFooterData, fetchHeaderData } from '../utils/dataFetcher';
import { useHeaderHeight } from '../utils/useHeaderHeight';

const stripHtmlTags = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
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

  const getMetaDescription = () => {
    if (
      resourceName === 'node--news' ||
      resourceName === 'node--stories' ||
      resourceName === 'node--events'
    ) {
      return stripHtmlTags(pageData?.body?.summary || pageData?.body?.value);
    }
    return stripHtmlTags(pageData?.body?.summary || pageData?.body?.value);
  };

  return (
    <Layout preview={preview} footerMenu={footerMenu} headerMenu={headerMenu}>
      <NextSeo
        title={pageData?.title}
        description={getMetaDescription()}
        openGraph={{
          title: pageData?.title,
          description: getMetaDescription(),
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
