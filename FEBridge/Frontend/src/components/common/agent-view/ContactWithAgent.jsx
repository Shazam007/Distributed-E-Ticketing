import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { List } from 'react-content-loader'

const ContactWithAgent = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.itemdata;

  const [ticketDetails, setticketDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const [VIPCount, setVIPCount] = useState(0);
  const [generalCount, setGeneralCount] = useState(0);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        // console.log(item.id)
        console.log(`${import.meta.env.VITE_API_GATEWAY_URL}/ticketsAvailability`);

        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_GATEWAY_URL}/ticketsAvailability`,
          {
            params: { eventId: item.id },
            data: { eventId: item.id },
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(response);

        setticketDetails(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch events only once during initial component mounting
    if (loading) {
      fetchTicketDetails();
    }
  }, [loading]);

  //need to implement the logic for this with button click
  // TODO : need to send the ticket price data also to the payment page
  const handleClick = () => {
    const dataObject =
    {
      "tickets": [
        {
          "type": "General",
          "quantity": generalCount,
          "price": ticketDetails.ticketCounts.General.price
        },
        {
          "type": "VIP",
          "quantity": VIPCount,
          "price": ticketDetails.ticketCounts.VIP.price
        }
      ]
    };

    navigate("/payment",
      {
        state: { itemData: item, ticketData: dataObject }
      });
  };

  // get this object with fetch api
  // const incomingData = {
  //   "ticketCounts": {
  //     "VIP": {
  //       "totalTickets": 52,
  //       "reservedTickets": 11,
  //       "availableTickets": 5
  //     },
  //     "General": {
  //       "totalTickets": 39,
  //       "reservedTickets": 11,
  //       "availableTickets": 3
  //     }
  //   }
  // }

  const handleVIPIncrement = () => {
    if (VIPCount < ticketDetails.ticketCounts.VIP.availableTickets) {
      setVIPCount(VIPCount + 1);
    }
  };

  const handleVIPDecrement = () => {
    if (VIPCount > 0) {
      setVIPCount(VIPCount - 1);
    }
  };

  const handleGeneralIncrement = () => {
    if (generalCount < ticketDetails.ticketCounts.General.availableTickets) {
      setGeneralCount(generalCount + 1);
    }
  };

  const handleGeneralDecrement = () => {
    if (generalCount > 0) {
      setGeneralCount(generalCount - 1);
    }
  };

  return (loading ? <List /> :
    <ul className="sasw_list mb0">
      <li className="search_area">
        <div className="form-group mb-3">
          <p>Total Seats : </p>
          <div className="lsd_list">
            <ul className="mb0">
              {Object.entries(ticketDetails.ticketCounts).map(([ticketType, ticketInfo]) => (
                <li key={ticketType} className="list-inline-item">
                  <a href="">{ticketType} - {ticketInfo.totalTickets}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
      {/* End li */}
      <li className="search_area">
        <div className="form-group mb-3">
          <p>Available Seats : </p>
          <div className="lsd_list">
            <ul className="mb0">
              {Object.entries(ticketDetails.ticketCounts).map(([ticketType, ticketInfo]) => (
                <li key={ticketType} className="list-inline-item">
                  <a href="">{ticketType} - {ticketInfo.availableTickets}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
      {/* End li */}
      <li className="search_area">
        <div className="form-group mb-3">
          <p>Choose the VIP seats : </p>
          <div className="lsd_list">
            <div className="ticket-counter">
              <button className="count-button" onClick={handleVIPDecrement}>-</button>
              <span className="count">{VIPCount}</span>
              <button className="count-button" onClick={handleVIPIncrement}>+</button>
            </div>
          </div>
        </div>
        <div className="form-group mb-3">
          <p>Choose the General seats : </p>
          <div className="lsd_list">
            <div className="ticket-counter">
              <button className="count-button" onClick={handleGeneralDecrement}>-</button>
              <span className="count">{generalCount}</span>
              <button className="count-button" onClick={handleGeneralIncrement}>+</button>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div className="search_option_button">
          <button className="btn btn-block btn-thm w-100" onClick={handleClick}>
            Purchase Tickets
          </button>
        </div>
      </li>{" "}
    </ul>
  );
};

export default ContactWithAgent;
