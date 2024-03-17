import { Link } from "react-router-dom";

const CopyrightFooter = () => {
  const menuItems = [
    { id: 1, name: "Home", routeLink: "/" },
    { id: 2, name: "Listing", routeLink: "/" },
    { id: 3, name: "Property", routeLink: "/" },
    { id: 4, name: "About Us", routeLink: "/" },
    { id: 5, name: "Blog", routeLink: "/" },
    { id: 6, name: "Contact", routeLink: "/" },
  ];

  return (
    <div className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="footer_menu_widget">

        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="copyright-widget text-end">
          <p>
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default CopyrightFooter;
