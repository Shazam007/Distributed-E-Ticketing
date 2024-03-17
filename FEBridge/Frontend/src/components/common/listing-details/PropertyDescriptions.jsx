

import { useState } from "react";

const PropertyDescriptions = () => {
    const [click, setClick] = useState(true);
    const handleClick = () => setClick(!click);

    return (
        <>
            <p className="mb25">
                Welcome to "Anarchy in the Desert" - an electrifying event set to shake the sands of Los Angeles! Get ready to experience the ultimate fusion of music, art, and rebellion in the heart of the desert landscape.

            </p>
            <p className={click ? "gpara second_para white_goverlay mt10 mb10" : ""}>
                Located at 1421 San Pedro St, Los Angeles, CA 900015, this event promises an immersive journey into the world of underground culture and alternative expression. From edgy live performances to mind-bending visual installations, "Anarchy in the Desert" is where boundaries are pushed and creativity knows no limits.

            </p>
            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    <p className="mt10 mb10">
                        Join us as we ignite the desert with a lineup of boundary-breaking artists and performers, guaranteed to leave you breathless and inspired. Whether you're a seasoned rebel or a curious soul ready to explore the unknown, this is an event you won't want to miss.

                    </p>
                    <p className="mt10 mb10">
                        Secure your tickets now and prepare to unleash your inner anarchist at "Anarchy in the Desert"!
                    </p>
                </div>
            </div>
            <p className="overlay_close">
                <a
                    className="text-thm fz14"
                    data-bs-toggle="collapse"
                    href="#collapseExample"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                    onClick={handleClick}
                >
                    Show More <span className="flaticon-download-1 fz12"></span>
                </a>
            </p>
        </>
    );
};

export default PropertyDescriptions;
