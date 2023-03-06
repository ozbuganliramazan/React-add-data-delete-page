import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";

import api from "./api/api";

import urls from "./api/urls";

import actionTypes from "./redux/actions/actionTypes";

import DetailPost from "./pages/DetailPost";
import EditPost from "./pages/EditPost";

import AddPost from "./pages/AddPost";

function App() {
  const { postsState } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: actionTypes.postsActions.GET_POSTS_START });
    api
      .get(urls.posts)
      .then((res) => {
        dispatch({
          type: actionTypes.postsActions.GET_POSTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.postsActions.GET_POSTS_FAIL,
          payload: "Serverda Bir Hata Oluştu",
        });
      });
  }, []);

  if (postsState.success === false) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail-post/:postId" element={<DetailPost/>} />
        <Route path="/edit-post/:postsId" element={<EditPost/>} />
        <Route path="/add-post" element={<AddPost/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
