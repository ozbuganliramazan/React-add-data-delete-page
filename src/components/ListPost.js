import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import urls from "../api/urls";

const ListPost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api
      .get(urls.posts)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {});
  });
  const { postsState } = useSelector((state) => state);

  if (post === null) return null;
  return (
    <div className="container m-auto grid grid-cols-3 gap-0 pt-40">
      
        {postsState.posts.map((post) => (
          <div key={post.id} className=" ">
            <Link className="flex " key={post.id} to={`/detail-post/${post.id}`}>
          <div
       
            className="max-w-sm rounded shadow-lg p-1 flex my-4 mx-4"
          >
         
            <div className="px-6 py-4  ">
              <h1 className="font-bold text-xl mb-2">{post.title} </h1>
              <p className="text-gray-700 text-base">{post.body}</p>
            </div>
          </div>
          </Link>
          </div>
        ))}
     
    </div>
  );
};

export default ListPost;
