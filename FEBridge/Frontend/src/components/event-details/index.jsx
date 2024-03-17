import CopyrightFooter from "../common/footer/CopyrightFooter";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import PropertyDescriptions from "../common/listing-details/PropertyDescriptions.jsx";
import Sidebar from "./Sidebar";
import SliderGalleryContent from "./SliderGalleryContent";
import { useLocation } from 'react-router-dom';

const index = () => {
  const location = useLocation();
  const item = location.state.itemdata;
  // TODO: need to fecth ticket details in a useEffect using the recieved eventId
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />


      {/* <!-- Listing Single Property --> */}
      <div className="home10-mainslider mt85 md-mt0">
        <div className="container-fluid p0">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-banner-wrapper listing-single-4 home10 banner-style-one arrow-style-2">
                <SliderGalleryContent images={location.state.itemdata.imgList} />
              </div>
            </div>
          </div>
        </div>
        {/* End .container-fluid */}

        <div className="position-relative">
          <div className="container">
            <div className="row listing_single_row style2">
              <div className="col-md-7 col-lg-7 col-xl-8">
                <div className="single_property_title multicolor_style mt30-767">
                  <h2>{item.eventName}</h2>
                  <p>{item.location}</p>
                </div>
              </div>
              <div className="col-md-5 col-lg-5 col-xl-4">
                <div className="multicolor_style text-end tal-767">
                  <div className="price">
                    <h2 className="text-white">
                      <small className="text-white"> Starts from</small> {item.startDate.split('T')[0]}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End .container-fluid */}
      </div>

      {/* <!-- Agent Single Grid View --> */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="listing_single_description" id="tab-1">
                {/* <div className="lsd_list">
          <PropertyItem />
        </div> */}

                <h4 className="mb30">Description</h4>
                <PropertyDescriptions />
              </div>
              {/* End .listing_single_description */}

              <div className="additional_details">
                <div className="row">
                  <div className="col-lg-12">
                    <h4 className="mb15">Event Details</h4>
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-4">
                    <ul className="list-inline-item">
                      <li>
                        <p>
                          Event ID : <span>{item.id}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          Event : <span>{item.eventName}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          Organizer : <span>{item.organizerName}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          Company : <span>{item.organizer}</span>
                        </p>
                      </li>
                    </ul>
                  </div>
                  {/* End .col */}

                  <div className="col-md-6 col-lg-6 col-xl-4">
                    <ul className="list-inline-item">
                      <li>
                        <p>
                          Start Date : <span>{item.startDate.split('T')[0]}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          End Date : <span>{item.endDate.split('T')[0]}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          Created Date : <span>{item.postedDate.split('T')[0]}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          Location  : <span>{item.location}</span>
                        </p>
                      </li>
                    </ul>
                  </div>
                  {/* End .col */}

                  <div className="col-md-6 col-lg-6 col-xl-4">
                    <ul className="list-inline-item">
                      <li>
                        <p>
                          Type : <span>{item.eventType}</span>
                        </p>
                      </li>
                      <li>
                        <p>
                          Property Status : <span>For Sale</span>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* End details content .col-lg-8 */}

            <div className="col-lg-4 col-xl-4">
              <Sidebar />
            </div>
            {/* End sidebar content .col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
      </section >


      {/* <!-- Our Footer Bottom Area --> */}
      < section className="footer_middle_area pt40 pb40" >
        <div className="container">
          <CopyrightFooter />
        </div>
      </section >
    </>
  );
};

export default index;
