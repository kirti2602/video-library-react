import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "contexts";
import { useToast } from "custom-hooks";
import { loginService } from "utilities";
import "./auth.css";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setAuth } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || -1;
  const [loginError, setLoginError] = useState("");

  const testLogin = {
    email: "guest@gmail.com",
    password: "Guest123",
  };

  const loginSubmitHandler = async (user) => {
    try {
      const {
        data: {
          encodedToken,
          foundUser: { ...userDetails },
        },
      } = await loginService(user);
      if (encodedToken) {
        localStorage.setItem("AUTH_TOKEN", encodedToken);
        localStorage.setItem("user", JSON.stringify(userDetails));
        setAuth({
          isAuth: true,
          token: encodedToken,
          user: { ...userDetails },
        });
        showToast("success", "Logged in successfully.");
        navigate(from, { replace: true });
      } else {
        throw new Error("Login failed. Refresh and try again.");
      }
    } catch (error) {
      showToast("error", "Can't login. Recheck details and try again.");
      setLoginError("Login failed.");
    }
  };

  const testLoginHandler = async (user) => {
    setUser(testLogin);
    loginSubmitHandler(user);
  };

  return (
    <main className="form-container">
      <h4 className="h4">LOGIN</h4>
      <form
        className="flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          loginSubmitHandler(user);
        }}
      >
        <input
          type="email"
          className="input-field my-5"
          placeholder="Enter your email here"
          required
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <div className="my-5 hide-pswrd">
          <input
            type={`${passwordVisible ? "text" : "password"}`}
            className="input-field"
            placeholder="Enter password"
            required
            maxLength="20"
            minLength="6"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            className="hide-pass-btn"
            onClick={(e) => {
              e.preventDefault();
              setPasswordVisible(!passwordVisible);
            }}
          >
            {passwordVisible ? (
              <i className="fa fa-eye-slash"></i>
            ) : (
              <i className="fa fa-eye"></i>
            )}
          </button>
        </div>
        <button
          type="submit"
          className="button button-primary btn-solid login-btn reset-btn-hover"
        >
          Login
        </button>
        <button
          type="button"
          className="button button-primary btn-solid login-btn reset-btn-hover"
          onClick={(e) => {
            e.preventDefault();
            testLoginHandler(testLogin);
          }}
        >
          Login as Guest
        </button>
        {loginError !== "" && <p className="pswrd-match">{loginError}</p>}
        <div className="signup-msg my-5">
          Not a user yet?{" "}
          <Link
            to="/signup"
            href=""
            className="button button-primary button-link create-acc-btn"
          >
            Create an account here
          </Link>
          .
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
