
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const index = () => {

  // incoming object would include event details, number of tickets user chosen and ticket prices
  const location = useLocation();
  const navigate = useNavigate();

  const ticketData = location.state.ticketData;
  const itemData = location.state.itemData;
  console.log('ticketData:', ticketData);
  console.log('itemData:', itemData);
  const userFirstName = localStorage.getItem('userFirstName');
  const userLastName = localStorage.getItem('userLastName');

  const handlePurchase = async () => {

    const dataObject =
    {
      "eventId": itemData.id,
      "tickets": [
        {
          "type": "General",
          "quantity": ticketData.tickets[0].quantity
        },
        {
          "type": "VIP",
          "quantity": ticketData.tickets[1].quantity
        }
      ],
      "paymentInfo":
      {
        "amount": total_amount,
        "currency": "EURO"
      }
    };

    try {
      const token = localStorage.getItem("token");
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      console.log('dataObject:', dataObject);

      const response = await axios.post(`${import.meta.env.VITE_API_GATEWAY_URL}/purchaseTicket`, dataObject, { headers });

      console.log('Purchase successful:', response.data);

      navigate("/payment/results",
        {
          state: { responseData: response.data, status: "success" }
        });

    } catch (error) {

      console.error(error);

      navigate("/payment/results",
        {
          state: { responseData: response.data, status: "failed" }
        });
    }
  };

  const total_amount = (ticketData.tickets[1].quantity * ticketData.tickets[1].price + ticketData.tickets[0].quantity * ticketData.tickets[0].price);

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Inner Page Breadcrumb --> */}
      {/* <BreadCrumbBanner /> */}

      {/* <!-- Our Contact --> */}
      <section className="our-contact pb0 bgc-f7 mt70">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-xl-8">
              <div className="form_grid">
                <h4 className="mb5">Payment Details</h4>
                <p>
                  Cost breakdown of the chosen tickets and the total amount to be paid.
                </p>
                <div className="contact_form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        {/* TODO : add or remove this field */}
                        <p>Full Name : {`${userFirstName} ${userLastName}`}</p>
                        {/* need to dynamically generate this */}
                        <p>Number of VIP tickets : {ticketData.tickets[1].quantity}</p>
                        <p>Number of General tickets : {ticketData.tickets[0].quantity}</p>
                      </div>
                    </div>
                    {/* End .col */}

                    <div className="col-md-6">
                      <div className="form-group">
                        <p>VIP ticket price (EUR) : {ticketData.tickets[1].price}</p>
                        <p>General ticket price (EUR) : {ticketData.tickets[0].price}</p>
                      </div>
                    </div>
                    {/* End .col */}

                    <div className="col-md-6">
                      <div className="form-group">
                        <p>Total amount (EUR) : {total_amount}</p>
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <div className="form-group mb0">
                        <button onClick={handlePurchase} className="btn btn-lg btn-thm">
                          Purchase
                        </button>
                      </div>
                      {/* End button submit */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-5 col-xl-4">
              <div className="contact_localtion">
                <h4>Ticket Purchasing Event Details</h4>
                <p>
                  {itemData.eventName}
                </p>
                <div className="content_list">
                  <h5>Address</h5>
                  <p>
                    {itemData.location}
                  </p>
                </div>
                <div className="content_list">
                  <h5>Event Date</h5>
                  <p>{itemData.startDate}</p>
                </div>
                <div className="content_list">
                  <h5>organizer Name</h5>
                  <p>{itemData.organizerName}</p>
                </div>
                <div className="content_list">
                  <h5>Contact</h5>
                  <p>(315) 905-2321</p>
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
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
