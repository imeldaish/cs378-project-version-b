import { useNavigate } from "react-router-dom";

const YogaNavButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="button-group">
      <button className="back-button" onClick={() => navigate("/home")}>
        Home
      </button>
      <button className="back-button" onClick={() => navigate("/suggestions")}>
        Back to Suggestions
      </button>
    </div>
  );
};

export default YogaNavButtons;