import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();
    return (
      <div style={{ padding: "12px 12px" }}>
        <button className="back-button" variant="primary" onClick={() => navigate("/suggestions")}>
          Back to Suggestions
        </button>
      </div>
    );
  };

  export default BackButton;