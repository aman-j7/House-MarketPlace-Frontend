import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import shareIcon from "../assets/svg/shareIcon.svg";
import Spinner from "../components/Spinner";
import { setLoading, getListings } from "../redux/actions/listing";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Listing() {
  const { listing, loading } = useSelector((state) => state.listingReducer);
  const dispatch = useDispatch();
  const params = useParams();
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const id = params.listingId;
  const type = params.categoryName;
  let curListing = null;

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getListings(type));
  }, [dispatch, type]);

  for (let i = 0; i < listing.length; i++) {
    if (listing[i].id === id) {
      curListing = listing[i];
    }
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {curListing.imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <img src={url} alt={index} className="swiperSlideDiv" />
          </SwiperSlide>
        ))}
      </Swiper>
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
        <div className="leafletContainer">
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={[curListing.geoLocation.lat, curListing.geoLocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />
            <Marker
              position={[
                curListing.geoLocation.lat,
                curListing.geoLocation.lng,
              ]}
            >
              <Popup>{curListing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>
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
