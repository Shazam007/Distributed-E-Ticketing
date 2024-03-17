



import NotFound from "@/components/404";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: '404 Not Found || FindHouse - Real Estate React Template',
  description:
    'FindHouse - Real Estate React Template',
}

const NotFoundPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <NotFound />
    </>
  );
};

export default NotFoundPage;
