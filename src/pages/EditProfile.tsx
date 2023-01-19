import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { UserInfoType } from "../redux/user/types";
import { EditProfileDiv } from "../styled/EditProfile";
import { axiosFetch } from "../utils/axios-utils";
import Image from "../assets/editpic.png";
import Avatar from "../assets/avatar.png";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Button } from "react-bootstrap";
import { cloudinaryUpload } from "../services/Cloudnary";
import { getUserInfo } from "../redux/user/userSlice";
import { toast } from "react-toastify";

function EditProfile() {
  const { user, info } = useAppSelector((state) => state.user);
  const [mydata, setMyData] = useState<UserInfoType>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    //@ts-ignore
    setMyData(info);
  }, [info]);

  const handleImage = async (e: any) => {
    //@ts-ignore
    setMyData({ ...mydata, profileImageUrl: "" });
    const res = await cloudinaryUpload(e.target.files[0]);
    //@ts-ignore
    setMyData({ ...mydata, profileImageUrl: res.data.url });
  };
  const handleCover = async (e: any) => {
    //@ts-ignore
    setMyData({ ...mydata, coverImageUrl: "" });
    const res = await cloudinaryUpload(e.target.files[0]);
    //@ts-ignore
    setMyData({ ...mydata, coverImageUrl: res.data.url });
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (JSON.stringify(mydata) !== JSON.stringify(info)) {
      try {
        const { data } = await axiosFetch({
          url: `/users/profile`,
          method: "put",
          data: mydata,
        });
        dispatch(getUserInfo(mydata));
        toast("Profile Updated", {
          className: "text-info",
        });
      } catch (error) {
        console.log(error);
        toast("Something Went Wrong!!", {
          className: "text-danger",
        });
      }
    }
  };

  return (
    <EditProfileDiv>
      <AppBar />
      <hr />
      <div
        className="container-fluid p-3 d-flex flex-column gap-2 align-items-center justify-content-center coverPic "
        style={{
          backgroundImage: `url(${mydata?.coverImageUrl})`,
        }}
      >
        <img
          src={mydata?.profileImageUrl ? mydata?.profileImageUrl : Avatar}
          alt=""
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
          }}
          className="rounded-3 img-fluid border-1 border border-dark border-opacity-25 rounded-pill"
        />
        <input
          type={"file"}
          style={{ display: "none" }}
          id="sendFile"
          accept="image/png, image/jpeg"
          //@ts-ignore
          onChange={(e) => handleImage(e)}
        />
        <label
          htmlFor="sendFile"
          className=" ms-2 bg-white  text-black p-1 mylabel rounded-2"
        >
          Profile <img src={Image} alt="" className="editLabel" />
        </label>
      </div>
      <div className="d-flex justify-content-lg-center justify-content-end p-3">
        <input
          type={"file"}
          style={{ display: "none" }}
          id="sendFile2"
          accept="image/png, image/jpeg"
          //@ts-ignore
          onChange={(e) => handleCover(e)}
        />
        <label
          htmlFor="sendFile2"
          className=" ms-2 bg-white  text-black p-1 mylabel rounded-2"
        >
          Cover <img src={Image} alt="" className="editLabel" />
        </label>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-3 ">
        <div className="d-flex align-content-center flex-column">
          <form
            className=" d-flex  flex-column pb-3 editprofileform"
            onSubmit={updateProfile}
          >
            <FloatingLabel
              controlId="floatingTextarea"
              label="UserName"
              className="mb-3"
            >
              <Form.Control
                aria-label="UserName"
                aria-describedby="inputGroup-sizing-sm"
                defaultValue={mydata?.name}
                //@ts-ignore
                onChange={(e) => setMyData({ ...mydata, name: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                aria-label="Email "
                aria-describedby="inputGroup-sizing-sm"
                defaultValue={mydata?.email}
                onChange={(e) =>
                  //@ts-ignore
                  setMyData({ ...mydata, email: e.target.value })
                }
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Bio"
              className="mb-3"
            >
              <Form.Control
                aria-label="description"
                aria-describedby="inputGroup-sizing-sm"
                defaultValue={mydata?.desc}
                as="textarea"
                style={{ height: "15vh" }}
                //@ts-ignore
                onChange={(e) => setMyData({ ...mydata, desc: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingTextarea"
              label="City"
              className="mb-3"
            >
              <Form.Control
                aria-label="City "
                aria-describedby="inputGroup-sizing-sm"
                defaultValue={mydata?.city}
                //@ts-ignore
                onChange={(e) => setMyData({ ...mydata, city: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Country"
              className="mb-3"
            >
              <Form.Control
                aria-label="Country "
                aria-describedby="inputGroup-sizing-sm"
                defaultValue={mydata?.country}
                onChange={(e) =>
                  //@ts-ignore
                  setMyData({ ...mydata, country: e.target.value })
                }
              />
            </FloatingLabel>
            <Button
              type="submit"
              disabled={JSON.stringify(mydata) === JSON.stringify(info)}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </EditProfileDiv>
  );
}

export default EditProfile;
