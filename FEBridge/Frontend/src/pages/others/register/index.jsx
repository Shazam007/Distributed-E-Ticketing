
import SignUp from "@/components/register";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'SignUp || FindHouse - Real Estate React Template',
  description:
    'FindHouse - Real Estate React Template',
}

const RegisterPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <SignUp />
    </>
  );
};

export default RegisterPage
