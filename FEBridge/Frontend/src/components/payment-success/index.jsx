import CopyrightFooter from "../common/footer/CopyrightFooter";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";

import { useLocation, useNavigate } from 'react-router-dom';

const index = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const orderID = location.state.responseData;
  const status = location.state.status;

  console.log('orderID:', orderID);
  console.log('status:', status);

  const whyCooseContent = [
    {
      id: 1,
      icon: "flaticon-tick",
      title: "Button click will redirect you to the All Events",
      descriptions: `Aliquam dictum elit vitae mauris facilisis at dictum urna
      dignissim donec vel lectus vel felis.`,
    },
  ];

  const handleClick = () => {

    navigate("/");
  };

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />


      {/* <!-- About Text Content --> */}
      <section className="about-section">
        <div className="container">

          {/* End .row */}

          <div className="row mt80">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Order ID : {orderID}</h2>
                <p>Payment Successful.</p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            {whyCooseContent.map((item) => (
              <div className="" key={item.id}>
                <div className={`why_chose_us`}>
                  <div className="icon">
                    <span className={item.icon}></span>
                  </div>
                  <div className="details">
                    <h4>{item.title}</h4>
                    <div className="search_option_button">
                      <button className="btn btn-block btn-thm w-5 mt20" onClick={handleClick}>
                        All Events
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default index;
