import { Link } from "react-router-dom";
import Slider from "react-slick";
import React, { useState, useEffect } from 'react';
import imagePool from '../../data/imgList.json';
import orgImagePool from '../../data/organizersImgList.json';
import axios from 'axios';
import { List } from 'react-content-loader'

const FeaturedEvents = () => {

  const validEventID = 'fzGo69swUkbUvjSa5a76'

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_GATEWAY_URL}/viewEvents`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);

      }
    };

    // Fetch events only once during initial component mounting
    if (loading) {
      fetchEvents();
    }
  }, [loading]);

  const getRandomImages = () => {
    // Function to get random images from pool of images
    const randomImages = [];

    for (let i = 0; i < 1; i++) {
      const randomIndex = Math.floor(Math.random() * imagePool.length);
      randomImages.push(imagePool[randomIndex].url);
    }

    return randomImages;
  };

  const getRandomOrgImages = () => {
    // Function to get random images from pool of images
    const randomImages = [];

    for (let i = 0; i < 1; i++) {
      const randomIndex = Math.floor(Math.random() * orgImagePool.length);
      randomImages.push(orgImagePool[randomIndex].url);
    }

    return randomImages;
  };

  function calculateDaysSincePosted(postedDateString) {
    let postedDate = new Date(postedDateString);
    let today = new Date();
    let timeDifference = today.getTime() - postedDate.getTime();
    let daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  }

  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };

  let content = loading ? (
    // Render loading animation while data is being fetched
    <List />
  ) : (

    events?.slice(0, 8)?.map((item) => (

      <div className="item" key={item.id}>
        <div className="feat_property">
          <div className="thumb">
            {getRandomImages().map(imageUrl => (
              <img className="img-whp w-100 h-100 cover" key={imageUrl} src={imageUrl} alt="ThumbImage" />
            ))}
            <div className="thmb_cntnt">

              <ul className="icon mb0">
                <li className="list-inline-item">
                  <a href="#">
                    <span className="flaticon-heart"></span>
                  </a>
                </li>
              </ul>
              {/* End .icon */}

              <Link to={`/listing-details-v1/${item.id}`} className="fp_price">
                <small>Date: </small>
                {item.startDate.split('T')[0]}
              </Link>
            </div>
          </div>
          {/* End .thumb */}

          <div className="details">
            <div className="tc_content">
              {/* event type should be here */}
              <p className="text-thm">{item.eventType}</p>
              <h4>
                <Link to={`/event-details/${item.id}`} state={{ itemdata: item }}>{item.eventName}</Link>
              </h4>
              <p>
                <span className="flaticon-placeholder"></span>
                {item.location}
              </p>


            </div>
            {/* End .tc_content */}

            <div className="fp_footer">
              <ul className="fp_meta float-start mb0">
                <li className="list-inline-item">
                  <Link to="/agent-v2">
                    {getRandomOrgImages().map(imageUrl => (
                      <img key={imageUrl} src={imageUrl} alt="ThumbImage" />
                    ))}
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/agent-v2">{item.organizerName}</Link>
                </li>
              </ul>
              <div className="fp_pdate float-end">Posted {calculateDaysSincePosted(item.postedDate)} Days ago</div>
            </div>
            {/* End .fp_footer */}
          </div>
          {/* End .details */}
        </div>
      </div>
    ))
  );

  return (
    <>
      <Slider {...settings} arrows={false}>
        {content}
      </Slider>
    </>
  );
};

export default FeaturedEvents;
