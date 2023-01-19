import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  userRequest,
  signInFail,
  signInSuccess,
} from "../redux/user/userSlice";
import { axiosFetch } from "../utils/axios-utils";
function Login() {
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(userRequest());
    try {
      const { data } = await axiosFetch({
        url: "/signin",
        method: "post",
        data: { email, password },
      });
      dispatch(signInSuccess(data));
      navigate("/");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      dispatch(signInFail(error.message));
      setEmail("");
      setPassword("");
    }
  };
  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      {loading && <Loading />}
      {!loading && (
        <div className="form-div">
          <div className="from-wrap">
            <span className="logo">MyChat</span>
            <span className="title">Login</span>
            <form onSubmit={handleSubmit}>
              <input
                type={"email"}
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type={"password"}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Sign In</button>
              {error && <p className="error">Invalid Credentials</p>}
              <p>
                Don't have an account? <Link to="/register">Register</Link>{" "}
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
