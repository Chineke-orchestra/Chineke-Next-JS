import CommonPageLayout from '../components/CommonPageLayout/CommonPageLayout';
import { fetchPageData } from '../utils/fetchPageData';

const BecomeFriendPage = ({
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
      iframeSrc="https://app.etapestry.com/onlineforms/CHINEKEFoundation/membership.html"
    />
  );
};

export default BecomeFriendPage;

export async function getServerSideProps(context) {
  try {
    const data = await fetchPageData(context, 'becomeafriend');
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
