import CommonPageLayout from '../components/CommonPageLayout/CommonPageLayout';
import { fetchPageData } from '../utils/fetchPageData';
import { setCacheHeaders } from 'utils/setCacheHeaders';

const DonatePage = ({
  pageData,
  hrefLang,
  footerMenu,
  headerMenu,
  preview,
  resourceName,
}) => {
  return (
    <CommonPageLayout
      pageData={pageData}
      hrefLang={hrefLang}
      footerMenu={footerMenu}
      headerMenu={headerMenu}
      preview={preview}
      resourceName={resourceName}
      iframeSrc="https://app.etapestry.com/onlineforms/CHINEKEFoundation/donate.html"
    />
  );
};

export default DonatePage;

export async function getServerSideProps(context) {
  try {
    const data = await fetchPageData(context, 'donate');
    if (data.redirect) {
      return data;
    }
    setCacheHeaders(context);
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
