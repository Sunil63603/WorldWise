import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();
  
  return (
  <Button
    type="back"
    onClick={(e) => {
      e.preventDefault();
      navigate("/appLayout/cities"); //orelse useNavigate(-1) one step backward
      }
    }
  >
    &larr; Back
  </Button>
  )
}

export default BackButton