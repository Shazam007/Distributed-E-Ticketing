
import HomeMain from "@/components/home";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'EasyPass || Reserve your tickers easily with EasyPass',
  description:
    'EasyPass - Ticket booking made easy. Reserve your tickets with EasyPass and enjoy the best experience. Reserve your tickets now.',
}

const HomePage1 = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <HomeMain />
    </>
  );
};

export default HomePage1
