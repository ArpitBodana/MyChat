import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { UserInfoType } from "../redux/user/types";
import { axiosFetch } from "../utils/axios-utils";
import Avatar from "../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { removeUserRequest } from "../redux/user/userSlice";

type propType = {
  id: string;
};

function RequestBlock({ id }: propType) {
  const [profileData, setProfileData] = useState<UserInfoType>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getInfo = async () => {
    try {
      const { data } = await axiosFetch({
        url: `/users/search/?userId=${id}`,
        method: "get",
      });
      setProfileData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptHandler = async () => {
    try {
      const { data } = await axiosFetch({
        url: `/users/request/accept`,
        method: "put",
        data: { id },
      });
      try {
        await axiosFetch({
          url: `/conversation/start`,
          method: "post",
          data: {
            reciverId: id,
          },
        });
      } catch (error) {
        console.log(error);
      }
      dispatch(removeUserRequest(id));
    } catch (error) {
      console.log(error);
    }
  };

  const rejectHandler = async () => {
    try {
      const { data } = await axiosFetch({
        url: `/users/request/reject`,
        method: "put",
        data: { id },
      });
      dispatch(removeUserRequest(id));
    } catch (error) {
      console.log(error);
    }
  };

  const gotoProfile = (id: string) => {
    navigate(`/profile/${id}`);
  };

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <Row className="d-flex flex-column align-items-center gap-4">
      <Col md={10} key={profileData?._id}>
        <div className="userChat">
          <div
            className="userChatInfo"
            //@ts-ignore
            onClick={() => gotoProfile(profileData?._id)}
          >
            <img
              src={
                profileData?.profileImageUrl
                  ? profileData.profileImageUrl
                  : Avatar
              }
              alt=""
            />
            <div>
              <span>{profileData?.name}</span>
            </div>
          </div>
        </div>
        <div className="d-flex gap-3 mx-5 mb-3">
          <Button variant="danger" size="sm" onClick={acceptHandler}>
            Accept
          </Button>
          <Button variant="info" size="sm" onClick={rejectHandler}>
            Reject
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default RequestBlock;
