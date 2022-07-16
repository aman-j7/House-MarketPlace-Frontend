import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { v4 } from "uuid";
import { addListings } from '../redux/actions/listing'
import Spinner from '../components/Spinner';


function CreateLisitng() {
  const { loggedIn, userRef } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
    useEffect(() => {
      if (!loggedIn) {
        navigate("/sign-in");
      }
    }, [navigate, loggedIn]);

  const [formData, setFormData] = useState({
    id: v4(),
    name: "",
    type: "rent",
    userRef: userRef,
    bedrooms: 0,
    bathrooms: 0,
    parking: false,
    furnished: false,
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    location: "",
    latitude: 0,
    longitude: 0,
    imageUrls: [],
  });
  const handleImages =  async () => {
    var urls =[];
    const data = new FormData();
    const  images = [...formData.imageUrls];
    for(const image of images){
      data.append("file", image);
      data.append("upload_preset", "zhtzatxk");
      const response = await axios
        .post(
          "https://api.cloudinary.com/v1_1/dch73khsd/image/upload",
          data,
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
      offer: (parseInt(formData.discountedPrice)===parseInt(formData.regularPrice) )? false : true,
      regularPrice: parseInt(formData.regularPrice),
      discountedPrice: (parseInt(formData.discountedPrice)===parseInt(formData.regularPrice) )? 0 : parseInt(formData.discountedPrice),
      location: formData.location,
      geoLocation: {
        lat: parseFloat(formData.latitude),
        lng: parseFloat(formData.longitude),
      },
      imageUrls: urls,
    };
    dispatch(addListings(data));
    setLoading(false);
    navigate(`/category/${formData.type}`);
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

  if(loading)
    return <Spinner />
  
  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create a Listing</p>
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
            Create Listing
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateLisitng;
