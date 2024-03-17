const Form = () => {
  return (
    <form className="contact_form" action="#">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <p>Full Name : </p>
            {/* need to dynamically generate this */}
            <p>Number of VIP tickets : </p>
            <p>Number of General tickets : </p>
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <p>VIP ticket price (EUR) : </p>
            <p>General ticket price (EUR) : </p>
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <p>Total amount (EUR) : </p>
          </div>
        </div>

        <div className="col-sm-12">


          <div className="form-group mb0">
            <button type="submit" className="btn btn-lg btn-thm">
              Purchase
            </button>
          </div>
          {/* End button submit */}
        </div>
      </div>
    </form>
  );
};

export default Form;
