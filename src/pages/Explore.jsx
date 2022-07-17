import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { userErrorUnset } from "../redux/actions/userActions";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getListings } from "../redux/actions/listing";
import Spinner from "../components/Spinner";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Explore() {
  const { error } = useSelector((state) => state.userReducer);
  const [isLoading, setLoading] = useState(true);
  const { listing, loading } = useSelector((state) => state.listingReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getListings("all"));
    setLoading(loading);
  }, [dispatch, loading]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    toast.error(error);
    dispatch(userErrorUnset());
  }

  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>
      <main>
        <p className="exploreHeading">Recommended</p>
        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listing.map((list, index) => (
            <SwiperSlide key={index}>
              <img
                src={list.imageUrls[0]}
                alt={list.name}
                className="swiperSlideDiv"
                onClick={() => navigate(`/category/${list.type}/${list.id}`)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="exploreCategoryHeading">Categories</div>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img
              src={rentCategoryImage}
              alt="rent"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Places For Rent</p>
          </Link>
          <Link to="/category/sale">
            <img
              src={sellCategoryImage}
              alt="sell"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Places For Sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
