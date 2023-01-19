import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import RequestBlock from "../components/RequestBlock";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { UserInfoType } from "../redux/user/types";
import { getUserInfo } from "../redux/user/userSlice";
import { axiosFetch } from "../utils/axios-utils";

function Requests() {
  const { info } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const getInfo = async () => {
    try {
      const { data } = await axiosFetch({
        url: `/users/search/?userId=${info._id}`,
        method: "get",
      });
      dispatch(getUserInfo(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <>
      <AppBar />
      <hr />
      <h1 className="mx-1">Requests</h1>
      <div>
        {info?.requests?.length === 0 && (
          <h3 className="mx-1">You have no request .</h3>
        )}
        {info?.requests?.map((item) => (
          <RequestBlock id={item} key={item} />
        ))}
      </div>
    </>
  );
}

export default Requests;
