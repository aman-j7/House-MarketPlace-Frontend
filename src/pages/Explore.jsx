import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { userErrorUnset } from '../redux/actions/userActions';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';

function Explore() {
  const {error} = useSelector((state)=>state.userReducer);
  const dispatch = useDispatch()
  if(error){
    toast.error(error);
    dispatch(userErrorUnset());
  }
  return (
    <div className='explore'>
      <header>
        <p className="pageHeader">
          Explore
        </p>
      </header>
      <main>
        <div className="exploreCategoryHeading">
          Categories
        </div>
        <div className="exploreCategories">
          <Link to='/category/rent'>
            <img src={rentCategoryImage} alt="rent" className='exploreCategoryImg'/>
            <p className="exploreCategoryName">Places For Rent</p>
          </Link>
          <Link to='/category/sale'>
            <img src={sellCategoryImage} alt="sell" className='exploreCategoryImg'/>
            <p className="exploreCategoryName">Places For Sale</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore