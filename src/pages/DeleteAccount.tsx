import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppBar from "../components/AppBar";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/user/userSlice";
import { axiosFetch } from "../utils/axios-utils";

function DeleteAccount() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [oldPwd, setOldPwd] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axiosFetch({
        url: `/users/profile`,
        method: "delete",
        data: { oldpassword: oldPwd },
      });
      setOldPwd("");
      toast("Account deleted", {
        className: "text-info",
      });
      dispatch(logout());
      navigate("/login");
    } catch (error: any) {
      console.log(error);
      setOldPwd("");
      toast.error(`Wrong Password `, {
        className: "text-danger",
      });
    }
  };

  return (
    <div>
      <AppBar />
      <div className="d-flex align-items-center justify-content-center ">
        <div className="d-flex align-items-center justify-content-center flex-column mt-3 border border-1 border-dark border-opacity-25 bg-white changePassword">
          <span className=" display-4  text-bold">Delete Account</span>
          <span className="mt-4 mb-3 fs-2">
            Deleting your account will delete your access and all your
            information on this site. Are you sure you want to continue?
          </span>
          <Form className="mt-2" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Password"
                value={oldPwd}
                onChange={(e) => setOldPwd(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="danger" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccount;
