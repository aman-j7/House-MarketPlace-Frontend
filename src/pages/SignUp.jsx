import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { addUser } from "../redux/actions/userActions";

function SignUp() {
  const disptach = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name : "",
    email: "",
    password: "",
    userRef: v4(),
  });
  const {name, email, password} = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id] : e.target.value
    }))
  }
  const onSubmit = (e) =>{
    e.preventDefault()
    disptach(addUser(formData))
    navigate('/sign-in');
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back !</p>
        </header>
        <form onSubmit={onSubmit}>
        <input
            type="text"
            className="nameInput"
            id="name"
            placeholder="Name"
            value={name}
            onChange={onChange}
          />
          <input
            type="email"
            className="emailInput"
            id="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              value={password}
              placeholder="Password"
              id="password"
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              alt="Show Password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password ?
          </Link>
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
          <Link to='/sign-in' className="registerLink">
            Sign In Instead
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignUp;
