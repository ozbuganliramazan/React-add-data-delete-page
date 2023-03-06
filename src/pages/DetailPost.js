import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import { useParams, Link, useNavigate } from "react-router-dom";

import left from "../assets/imags/img/left.png";
import { useDispatch } from "react-redux";

import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
const DetailPost = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [myPost, setMyPost] = useState(null);
  useEffect(() => {
    api
      .get(`${urls.posts}/${params.postId}`)
      .then((res) => {
        setMyPost(res.data);
      })
      .catch((err) => {});
  }, []);

  const deletBtn = (id) => {
    dispatch({ type: actionTypes.postsActions.DELETE_POSTS_START });
    api
      .delete(`${urls.posts}/${id}`)
      .then((rese) => {
        dispatch({
          type: actionTypes.postsActions.DELETE_POSTS_SUCCESS,
          payload: id,
        });
        navigate("/")
      })
      .catch((errr) => {
        dispatch({
          type: actionTypes.postsActions.GET_POSTS_FAIL,
          payload: "silme işleminde bir hata olu",
        });
      });
  };

  if (myPost === null) return null;
  return (
    <div className="container">
      <Header />

      <div className="flex pt-40 justify-center items-center  ">
        <div className="grid grid-rows-6  grid-flow-col gap-1 ">
          <div className="max-w-sm rounded shadow-lg p-1 flex my-4 mx-4">
            <div className="px-6 py-4 justify-center text-center  ">
              <h1 className="font-bold text-xl mb-2">{myPost.title} </h1>
              <p className="text-gray-700 text-base">{myPost.body}</p>
            </div>
          </div>
          <div className="flex p-5 gap-5 justify-center items-center  ">
            <button
              className="bg-red-500 w-28 rounded-md text-center"
              onClick={() => deletBtn(myPost.id)}
            >
              Delete
            </button>
            <Link to={`/edit-post/${myPost.id}`} className="bg-sky-500 w-28 rounded-md text-center">Update</Link>
            <Link to={"/add-post"} className="bg-sky-300 w-28 rounded-md text-cente"><span>+</span>New Post</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
