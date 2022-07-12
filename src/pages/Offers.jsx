import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListingsOffers } from "../redux/actions/listing";
import ListItem from "../components/ListItem";
import Spinner from "../components/Spinner";

function Offers() {
  const dispatch = useDispatch();
  const { loading, listing } = useSelector((state) => state.listingReducer);
  
  useEffect(() => {
    dispatch(getListingsOffers());
  }, [dispatch]);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          Places with Offers
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
        <p>There are no current offers</p>
      )}
    </div>
  );
}

export default Offers;
