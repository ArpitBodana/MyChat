import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosFetch } from "../utils/axios-utils";
import { UserInfoType } from "../redux/user/types";
import { Button, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Avatar from "../assets/avatar.png";
import { format } from "timeago.js";
import AppBar from "../components/AppBar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUserInfo } from "../redux/user/userSlice";
import { removeFriend } from "../redux/allChat/allChatSlice";
import Loading from "../components/Loading";

function Profile() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState<UserInfoType>();
  const [loading, setLoading] = useState(false);
  const { info, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const getInfo = async () => {
    try {
      const { data } = await axiosFetch({
        url: `/users/search/?userId=${id}`,
        method: "get",
      });
      setProfileData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const getMyInfo = async () => {
    try {
      const { data } = await axiosFetch({
        url: `/users/search/?userId=${user._id}`,
        method: "get",
      });
      dispatch(getUserInfo(data));
    } catch (error) {
      console.log(error);
    }
  };
  const followHandler = async () => {
    try {
      //@ts-ignore
      const { data } = await axiosFetch({
        url: `/users/${id}/follow`,
        method: "put",
      });
      getMyInfo();
      getInfo();
    } catch (error) {
      console.log(error);
    }
  };
  const unFollowHandler = async () => {
    try {
      const { data } = await axiosFetch({
        url: `/users/${id}/unfollow`,
        method: "put",
      });
      try {
        const { data } = await axiosFetch({
          url: `/conversation/unfollow/delete`,
          method: "delete",
          data: { reciverId: id },
        });
        dispatch(removeFriend(id));
      } catch (error) {
        console.log(error);
      }
      //window.location.reload();
      getMyInfo();
      getInfo();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getMyInfo();
    getInfo();
  }, [id, user]);

  return (
    <>
      <AppBar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            className="container-fluid bg-dark text-light border-bottom border-1"
            style={{
              background: `url(${profileData?.coverImageUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              objectFit: "cover",
              minHeight: "100%",
              minWidth: "100%",
              aspectRatio: "revert",
            }}
          >
            <div className="container w-auto p-2">
              <Row>
                <Col
                  className="d-flex gap-4 mb-3 align-content-center justify-content-center mt-5 "
                  md={4}
                >
                  <img
                    src={
                      profileData?.profileImageUrl
                        ? profileData.profileImageUrl
                        : Avatar
                    }
                    alt="profile"
                    style={{
                      width: "250px",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "400px",
                    }}
                    className="img-fluid border-1 border border-dark border-opacity-25"
                  />
                </Col>
                <Col className="d-flex flex-column gap-1 justify-content-center align-items-center bg-opacity-50 bg-dark w-auto  rounded-end border-1 border border-dark border-opacity-25 mt-3">
                  <span className="display-1  fw-bold text-white">
                    {profileData?.name}{" "}
                    {profileData?.name === info.name ? (
                      ""
                    ) : //@ts-ignore
                    !info?.followings.includes(id) ? (
                      <Button size="sm" onClick={followHandler}>
                        Follow
                      </Button>
                    ) : (
                      <Button size="sm" onClick={unFollowHandler}>
                        Unfollow
                      </Button>
                    )}
                  </span>
                  <span className=" fs-4 text-center text-capitalize">
                    {profileData?.desc}
                  </span>
                </Col>
              </Row>
            </div>
          </div>
          <div className="d-flex  p-2 pt-4 flex-column  bg-dark text-light fs-3 text-center profile-bottom">
            <div className="">
              <span>Followers : {profileData?.followers.length} </span>
              <span className="">
                Following : {profileData?.followings.length}
              </span>
            </div>
            <span className="">
              {profileData?.city &&
                `Location: ${profileData?.city} ${profileData?.country}`}
            </span>
            <span className="">
              Joined :{" "}
              {profileData?.createdAt && format(profileData?.createdAt)}
            </span>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
