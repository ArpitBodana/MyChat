import React from "react";
import { Col} from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import AppBar from "../components/AppBar";
import changePassword from "../assets/chagePassword.png";
import editProfile from "../assets/editProfile.png";
import deleteAccount from "../assets/deleteAccount.png";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  return (
    <>
      <AppBar />
      <hr />
      <Container>
        <Row className="mt-2 d-flex gap-4">
          <Col
            md={3}
            className="options p-1 ms-2"
            onClick={() => navigate("/editprofile")}
          >
            <img className="icons" src={editProfile} /> Update Profile
          </Col>
          <Col
            md={3}
            className="options p-1 ms-2"
            onClick={() => navigate("/changepassword")}
          >
            <img className="icons" src={changePassword} /> Change Password
          </Col>
          <Col
            md={3}
            className="options p-1 ms-2"
            onClick={() => navigate("/deleteaccount")}
          >
            <img className="icons" src={deleteAccount} /> Delete Account
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Settings;
