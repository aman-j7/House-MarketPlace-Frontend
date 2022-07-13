import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import shareIcon from "../assets/svg/shareIcon.svg";
function Listing() {
  const { listing } = useSelector((state) => state.listingReducer);
  const params = useParams();
  const navigate = useNavigate();
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const id = params.listingId;
  const type = params.categoryName;
  let curListing = null;

  for (let i = 0; i < listing.length; i++) {
    if (listing[i].id === id) {
      curListing = listing[i];
    }
  }
  useEffect(() => {
    if (curListing === null) {
      navigate(`/category/${type}`);
    }
  }, [navigate, curListing, type]);

  return (
    <main>
      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="share" />
      </div>
      {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}
      <div className="listingDetails">
        <p className="listingName">
          {curListing.name} - $
          {curListing.offer
            ? curListing.discountedPrice
            : curListing.regularPrice}
        </p>
        <p className="listingLocation">{curListing.location}</p>
        <p className="listingType">
          For {curListing.type === "rent" ? "Rent" : "Sale"}
        </p>
        {curListing.offer && (
          <div className="discountPrice">
            ${curListing.regularPrice - curListing.discountedPrice} discount
          </div>
        )}
        <ul className="listingDetailsList">
          <li>
            {curListing.bedrooms > 1
              ? `${curListing.bedrooms} Bedrooms`
              : "1 Bedroom"}
          </li>
          <li>
            {curListing.bathrooms > 1
              ? `${curListing.bathrooms} Bathrooms`
              : "1 Bathroom"}
          </li>
          <li>{curListing.parking && "Parking Spot Available"}</li>
          <li>{curListing.furnished && "Furnished"}</li>
        </ul>
        <p className="listingLocationTitle">Location</p>
        <Link
          to={`/contact/${curListing.userRef}?listingName=${curListing.name}`}
          className="primaryButton"
        >
          Contact Landlord
        </Link>
      </div>
    </main>
  );
}

export default Listing;
