
import Login from "@/components/login";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Login || FindHouse - Real Estate React Template',
  description:
    'FindHouse - Real Estate React Template',
}

const LoginPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Login />
    </>
  );
};

export default LoginPage
