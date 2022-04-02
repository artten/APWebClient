import { Button } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const navigate = useNavigate();

  function checkIfUserExist(name) {
    props.setUsers([...props.users, { tal: ["tal123", "ta"] }]);
    var temp = [...props.users];
    console.log(temp);
  }

  return (
    <div className="Register">
      <h1>Register Page</h1>
      <form>
        <div className="form-group">
          <label>User Name</label>
          <br />
          <input
            type="text"
            className="form-control-sm"
            placeholder="User Name"
          />
        </div>
        <div className="form-group">
          <label>Nickname</label>
          <br />
          <input
            type="text"
            className="form-control-sm"
            placeholder="Nickname"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <br />
          <input
            type="password"
            className="form-control-sm"
            placeholder="Enter password"
          />
        </div>
        <br />
        {/* <button
          type="submit"
          className="btn btn-primary btn-block"
          onClick={checkIfUserExist()}
        >
          Sign Up
        </button> */}
        <Button variant="primary" onClick={checkIfUserExist}>
          Sign Up
        </Button>
        <p className="forgot-password text-right">
          Already registered <a href="/">sign in?</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
