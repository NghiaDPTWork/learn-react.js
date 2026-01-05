import { useRouteError, Link } from "react-router-dom";
import "./error.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h1 className="error-title">Oops!</h1>
        <p className="error-message">Sorry, an unexpected error has occurred.</p>
        <p className="error-details">
          <i>{error.statusText || error.message}</i>
        </p>
        <Link to="/" className="btn-home">
          🏠 Back to Home Page
        </Link>
      </div>
    </div>
  );
}
