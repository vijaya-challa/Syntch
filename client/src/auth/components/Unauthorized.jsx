import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <section>
      <h1>Unauthorized</h1>
      <p>You do not have access to the required page.</p>
      <div>
        <button type="submit" onClick={goBack}>
          Go Back
        </button>
      </div>
    </section>
  );
}

export default Unauthorized;
