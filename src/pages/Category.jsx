import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getListings } from "../redux/actions/listing";
import ListItem from "../components/ListItem";
import Spinner from "../components/Spinner";

function Category() {
  const dispatch = useDispatch();
  const { loading, listing } = useSelector((state) => state.listingReducer);
  const params = useParams();
  const type = params.categoryName;

  useEffect(() => {
    dispatch(getListings(type));
  }, [dispatch, type]);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {type === "rent" ? "Places for rent" : "Places for sale"}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listing && listing.length > 0 ? (
        <>
        <main>
          <ul className="categoryListings">
            {listing.map((list)=>(
              <ListItem key={list.id} listing={list} id={list.id} />
            ))}
          </ul>
        </main>
        </>
      ) : (
        <p>No listings available for {type}</p>
      )}
    </div>
  );
}

export default Category;
