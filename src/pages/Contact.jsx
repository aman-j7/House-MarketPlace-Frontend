import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from '../components/Spinner';

function Contact() {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState(null);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const userRef = params.landlordId;
  useEffect(() => {
    const getLandlord = async () => {
      setLoading(true);
      const url = "http://localhost:9012/getUser/" + userRef;
      await axios
        .get(url)
        .then((response) => {
          setLandlord(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
        setLoading(false);
    };
    getLandlord();
  }, [userRef]);

  const onChange = (e) => {
    setMessage(e.terget.value);
  };
  if(loading){
    return <Spinner />
  }
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlord</p>
      </header>
      {landlord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {landlord?.name}</p>
          </div>
          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                value={message}
                onChange={onChange}
              ></textarea>
            </div>
            <a
              href={`mailto:${landlord.id}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
