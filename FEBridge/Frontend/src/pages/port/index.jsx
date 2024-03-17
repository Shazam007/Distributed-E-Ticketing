
import Port from "@/components/port";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'About Us || FindHouse - Real Estate React Template',
  description:
    'FindHouse - Real Estate React Template',
}

const properties = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Port />
    </>
  );
};

export default Port
