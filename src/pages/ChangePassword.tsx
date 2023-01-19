import React, { useState } from "react";
import AppBar from "../components/AppBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { axiosFetch } from "../utils/axios-utils";
import { toast } from "react-toastify";

function ChangePassword() {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const mydata = {
    oldpassword: oldPwd,
    password: newPwd,
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axiosFetch({
        url: `/users/profile`,
        method: "put",
        data: mydata,
      });
      setNewPwd("");
      setOldPwd("");
      toast("Password Changed", {
        className: "text-info",
      });
    } catch (error: any) {
      console.log(error);
      setNewPwd("");
      setOldPwd("");
      toast(`Old Password not matched`, {
        className: "text-danger",
      });
    }
  };
  return (
    <div>
      <AppBar />
      <hr />
      <div className="d-flex align-items-center justify-content-center ">
        <div className="d-flex align-items-center justify-content-center flex-column mt-3 border border-1 border-dark border-opacity-25 bg-white changePassword">
          <span className=" display-6 text-bold">Change Password</span>
          <Form className="mt-2" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Old Password"
                value={oldPwd}
                onChange={(e) => setOldPwd(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New Password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
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

export default ChangePassword;
