import imagePool from '../../data/imgList.json';
import Slider from "react-slick";

const SliderGalleryContent = ({ images }) => {
  const settings = {
    dots: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 2000,
  };

  const getRandomImages = () => {
    // Function to get random images from pool of images
    const randomImages = [];
    const availableImages = [...imagePool]; // Create a copy of the image pool

    for (let i = 0; i < 5 && availableImages.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      randomImages.push(availableImages[randomIndex].url);
      availableImages.splice(randomIndex, 1); // Remove the selected image from the available images
    }

    return randomImages;
  };

  // console.log(images);

  return (
    <>
      <Slider {...settings} arrows={true}>
        {getRandomImages().map((imageUrl, index) => (
          <div key={index} className={`slide slide-one`}>
            <img src={imageUrl} alt="event image" />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default SliderGalleryContent;
