import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, userLogout } from "../redux/actions/userActions";
import { deleteUserListing, getUserListing, setLoading } from '../redux/actions/listing';
import { Link } from "react-router-dom";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import { toast } from "react-toastify";
import ListItem from '../components/ListItem';
import Spinner from '../components/Spinner';

function Profile() {
  const user = useSelector((state) => state.userReducer);
  const {listing, loading} = useSelector((state)=>state.listingReducer);
  const dispatch = useDispatch();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [curListing, setCurListing] = useState([]);

  useEffect(() => {
    dispatch(setLoading());
    setFormData({
      email: user.id,
      name: user.name,
    });
    dispatch(getUserListing(user.userRef));
  }, [user,dispatch]);

  useEffect(()=>{
    setCurListing(listing);
  },[listing]);

  const { name, email } = formData;
  const onLogout = () => {
    dispatch(userLogout());
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = () => {
    try {
      const data = { ...formData, curId: user.id };
      dispatch(updateUser(data));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onDelete=(id)=>{
    if(window.confirm('Are you sure you want to delete ?')){
      dispatch(deleteUserListing(id));
      const updatedListing = curListing.filter((list) => list.id!== id );
      setCurListing(updatedListing);
      toast.success('Deleted Successfully.');
    }
  }
 
  if(loading){
    return <Spinner />
  }
  
  return (
    <>
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">My Profile</p>
          <button type="button" className="logOut" onClick={onLogout}>
            Logout
          </button>
        </header>
        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Detials</p>
            <p
              className="changePersonalDetails"
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prev) => !prev);
              }}
            >
              {changeDetails ? "Done" : "Change"}
            </p>
          </div>
          <div className="profileCard">
            <form>
              <input
                type="text"
                id="name"
                className={!changeDetails ? "profileName" : "profileNameActive"}
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
              <input
                type="email"
                id="email"
                className={
                  !changeDetails ? "profileEmail" : "profileEmailActive"
                }
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
              />
            </form>
          </div>
          <Link to="/create-listing" className="createListing">
            <img src={homeIcon} alt="Home" />
            <p>Sell or Rent your Home</p>
            <img src={arrowRight} alt="arrow rigth" />
          </Link>
          <p className="listingText">
            Your Listings
          </p>
          <ul className="listingList">
            {curListing.map((list)=>(
              <ListItem key={list.id} listing={list} id={list.id} onDelete={onDelete} onEdit={true}/>
            ))}
          </ul>

        </main>
      </div>
    </>
  );
}

export default Profile;
