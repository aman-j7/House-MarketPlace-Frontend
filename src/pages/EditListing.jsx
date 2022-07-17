import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateListing } from "../redux/actions/listing";
import Spinner from "../components/Spinner";

function EditLisitng() {
  const { listing } = useSelector((state) => state.listingReducer);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const listingId = params.listingId;
  const curListing = listing.filter((list)=> list.id === listingId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: curListing[0].id,
    name: curListing[0].name,
    type: curListing[0].type,
    userRef: curListing[0].userRef,
    bedrooms: curListing[0].bedrooms,
    bathrooms: curListing[0].bathrooms,
    parking: curListing[0].parking,
    furnished: curListing[0].furnished,
    offer: curListing[0].offer,
    regularPrice: curListing[0].regularPrice,
    discountedPrice: curListing[0].discountedPrice,
    location: curListing[0].location,
    latitude: curListing[0].geoLocation.lat,
    longitude: curListing[0].geoLocation.lng,
    imageUrls: curListing[0].imageUrls,
  });
 
  const handleImages = async () => {
    var urls = [];
    const data = new FormData();
    const images = [...formData.imageUrls];
    for (const image of images) {
      data.append("file", image);
      data.append("upload_preset", "zhtzatxk");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dch73khsd/image/upload",
        data
      );
      urls.push(response.data.url);
    }
    return urls;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const urls = await handleImages();
    const data = {
      id: formData.id,
      name: formData.name,
      type: formData.type,
      userRef: formData.userRef,
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      parking: formData.parking,
      furnished: formData.furnished,
      offer: formData.offer,
      regularPrice: parseInt(formData.regularPrice),
      discountedPrice: parseInt(formData.discountedPrice),
      location: formData.location,
      geoLocation: {
        lat: parseFloat(formData.latitude),
        lng: parseFloat(formData.longitude),
      },
      imageUrls: urls,
    };
    dispatch(updateListing(listingId,data));
    setLoading(false);
    navigate(`/profile`);
  };
  const onMutate = (e) => {
    let boolean = null;
    if (e.target.value === "true") boolean = true;
    if (e.target.value === "false") boolean = false;
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        imageUrls: e.target.files,
      }));
    }
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Edit Listing</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <label className="formLabel">Sell / Rent</label>
          <div className="formButtons">
            <button
              type="button"
              className={
                formData.type === "sale" ? "formButtonActive" : "formButton"
              }
              id="type"
              value="sale"
              onClick={onMutate}
            >
              Sell
            </button>
            <button
              type="button"
              className={
                formData.type === "rent" ? "formButtonActive" : "formButton"
              }
              id="type"
              value="rent"
              onClick={onMutate}
            >
              Rent
            </button>
          </div>

          <label className="formLabel">Name</label>
          <input
            className="formInputName"
            type="text"
            id="name"
            value={formData.name}
            onChange={onMutate}
            maxLength="32"
            minLength="10"
            required
          />

          <div className="formRooms flex">
            <div>
              <label className="formLabel">Bedrooms</label>
              <input
                className="formInputSmall"
                type="number"
                id="bedrooms"
                value={formData.bedrooms}
                onChange={onMutate}
                min="1"
                max="50"
                required
              />
            </div>
            <div>
              <label className="formLabel">Bathrooms</label>
              <input
                className="formInputSmall"
                type="number"
                id="bathrooms"
                value={formData.bathrooms}
                onChange={onMutate}
                min="1"
                max="50"
                required
              />
            </div>
          </div>

          <label className="formLabel">Parking spot</label>
          <div className="formButtons">
            <button
              className={formData.parking ? "formButtonActive" : "formButton"}
              type="button"
              id="parking"
              value={true}
              onClick={onMutate}
              min="1"
              max="50"
            >
              Yes
            </button>
            <button
              className={
                !formData.parking && formData.parking !== null
                  ? "formButtonActive"
                  : "formButton"
              }
              type="button"
              id="parking"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className="formLabel">Furnished</label>
          <div className="formButtons">
            <button
              className={formData.furnished ? "formButtonActive" : "formButton"}
              type="button"
              id="furnished"
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !formData.furnished && formData.furnished !== null
                  ? "formButtonActive"
                  : "formButton"
              }
              type="button"
              id="furnished"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <label className="formLabel">Address</label>
          <textarea
            className="formInputAddress"
            type="text"
            id="location"
            value={formData.location}
            onChange={onMutate}
            required
          />
          <div className="formLatLng flex">
            <div>
              <label className="formLabel">Latitude</label>
              <input
                className="formInputSmall"
                type="number"
                id="latitude"
                value={formData.latitude}
                onChange={onMutate}
                required
              />
            </div>
            <div>
              <label className="formLabel">Longitude</label>
              <input
                className="formInputSmall"
                type="number"
                id="longitude"
                value={formData.longitude}
                onChange={onMutate}
                required
              />
            </div>
          </div>

          <label className="formLabel">Offer</label>
          <div className="formButtons">
            <button
              className={formData.offer ? "formButtonActive" : "formButton"}
              type="button"
              id="offer"
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !formData.offer && formData.offer !== null
                  ? "formButtonActive"
                  : "formButton"
              }
              type="button"
              id="offer"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className="formLabel">Regular Price</label>
          <div className="formPriceDiv">
            <input
              className="formInputSmall"
              type="number"
              id="regularPrice"
              value={formData.regularPrice}
              onChange={onMutate}
              min="50"
              max="750000000"
              required
            />
            {formData.type === "rent" && (
              <p className="formPriceText">$ / Month</p>
            )}
          </div>

          {formData.offer && (
            <>
              <label className="formLabel">Discounted Price</label>
              <input
                className="formInputSmall"
                type="number"
                id="discountedPrice"
                value={formData.discountedPrice}
                onChange={onMutate}
                min="50"
                max="750000000"
                required={formData.offer}
              />
            </>
          )}
          <label className="formLabel">Images</label>
          <p className="imagesInfo">
            The first image will be the cover (max 6).
          </p>
          <input
            className="formInputFile"
            type="file"
            id="images"
            onChange={onMutate}
            max="6"
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />
          <button type="submit" className="primaryButton createListingButton">
            Update Listing
          </button>
        </form>
      </main>
    </div>
  );
}

export default EditLisitng;
