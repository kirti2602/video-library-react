import axios from "axios";

const signupService = ({email, password, firstName, lastName}) => {
  return axios.post("/api/auth/signup", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
};

export { signupService };
