import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppBar from "../components/AppBar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { failToFetch, fetch, successFetch } from "../redux/search/searchSlice";
import { UserInfoType } from "../redux/user/types";
import { axiosFetch } from "../utils/axios-utils";
import Avatar from "../assets/avatar.png";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Loading from "../components/Loading";

function Search() {
  const { name } = useParams();
  const { error, loading, searchInfo } = useAppSelector(
    (state) => state.search
  );
  const searchKey = name?.trim();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getInfo = async () => {
      dispatch(fetch());
      try {
        const { data } = await axiosFetch({
          url: `/users/search/?userName=${searchKey}`,
          method: "get",
        });
        dispatch(successFetch(data));
      } catch (error: any) {
        dispatch(
          failToFetch(
            error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
      }
    };
    getInfo();
  }, [name]);

  const gotoProfile = (id: string) => {
    navigate(`/profile/${id}`);
  };
  return (
    <>
      <AppBar />
      {loading ? (
        <Loading />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <h5 className="mb-3 p-2">Searching for {name}</h5>
          <Row className="d-flex  align-items-center gap-3">
            {searchInfo.length > 0 ? (
              searchInfo.map((data: UserInfoType) => (
                <Col md={5} key={data._id}>
                  <div
                    className="userChat"
                    onClick={() => gotoProfile(data._id)}
                  >
                    <div className="userChatInfo">
                      <img
                        src={
                          data?.profileImageUrl ? data.profileImageUrl : Avatar
                        }
                        alt=""
                      />
                      <div>
                        <span>{data?.name}</span>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <h2 className=" text-capitalize text-secondary text-center">
                no user found with this usename
              </h2>
            )}
          </Row>
        </>
      )}
    </>
  );
}

export default Search;
