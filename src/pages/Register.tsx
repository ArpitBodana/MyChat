import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Add from "../assets/addImage.png";
import Loading from "../components/Loading";
import { useAppDispatch } from "../redux/hooks";
import { signInFail, signInSuccess } from "../redux/user/userSlice";
import { cloudinaryUpload } from "../services/Cloudnary";
import { axiosFetch } from "../utils/axios-utils";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [conPwd, setConPwd] = useState("");
  const [pic, setPic] = useState<any>();
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("Something went wrong!!");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let profileImageUrl;
    if (pic) {
      const res = await cloudinaryUpload(pic);
      profileImageUrl = res.data.url;
    }
    try {
      if (password !== conPwd) {
        console.log("working");
        setLoading(false);
        setErr(true);
        setErrMessage("Password not matched !!");
      } else {
        await axiosFetch({
          url: "/register",
          method: "post",
          data: {
            name,
            email,
            password,
            ...(profileImageUrl && { profileImageUrl }),
          },
        });
        const { data } = await axiosFetch({
          url: "/signin",
          method: "post",
          data: { email, password },
        });
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error: any) {
      setLoading(false);
      setErr(true);
      const errormessage = error.response.data.message;
      setErrMessage(errormessage ? errormessage : error.message);
      dispatch(signInFail(error.message));
    }
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      {loading && <Loading />}
      {!loading && (
        <div className="form-div">
          <div className="from-wrap">
            <span className="logo">MyChat</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
              <input
                type={"text"}
                placeholder="display name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type={"email"}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type={"password"}
                placeholder="password"
                onChange={(e) => setPwd(e.target.value)}
                required
              />
              <input
                type={"password"}
                placeholder="confirm password"
                onChange={(e) => setConPwd(e.target.value)}
                required
              />
              <input
                type={"file"}
                style={{ display: "none" }}
                id="avatar"
                accept="image/png, image/jpeg"
                //@ts-ignore
                onChange={(e) => setPic(e.target.files[0])}
              />
              <label htmlFor="avatar">
                <img src={Add} alt="addImgPng" />
                <span>Add Profile Image</span>
              </label>
              <button>Sign Up</button>
              {err && <span className="error">{errMessage}</span>}
              <p>
                Already have an account? <Link to="/login">Login</Link>{" "}
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
