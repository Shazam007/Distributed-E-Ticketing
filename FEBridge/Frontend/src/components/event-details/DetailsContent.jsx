
import PropertyDescriptions from "../common/listing-details/PropertyDescriptions.jsx";
import PropertyDetails from "../common/listing-details/PropertyDetails";

const DetailsContent = () => {
  return (
    <>
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
            <h4 className="mb15">Property Details</h4>
          </div>
          <PropertyDetails />
        </div>
      </div>
    </>
  );
};

export default DetailsContent;
