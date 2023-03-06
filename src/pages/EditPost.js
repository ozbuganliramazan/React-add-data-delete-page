import React, { useState } from "react";

import Header from "../components/Header";
import { useParams } from "react-router-dom";

import { useSelector,useDispatch } from "react-redux";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

import actionTypes from "../redux/actions/actionTypes";

import urls from "../api/urls";

const EditPost = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
  const params = useParams();
  const { postsState } = useSelector((state) => state);
  const myPost = postsState.posts.find((item) => item.id == params.postsId);
  const [form, setForm] = useState(myPost);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.title === "" || form.body === "" || form.userId === "") {
      alert("Boş alanları lütfen doldurunuz");
      return;
    }
    api.put(`${urls.posts}/${params.postsId}`,form)
    .then((res)=>{
 dispatch({type:actionTypes.postsActions.EDIT_POSTS,payload:form})
 navigate("/")
    })
    .catch((err)=>{})
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center pt-40">
        <div className="w-full max-w-xs">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="title"
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="body"
              >
                Body
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="body"
                type="text"
                placeholder="body"
                value={form.body}
                onChange={(event) =>
                  setForm({ ...form, body: event.target.value })
                }
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="userId"
              >
                UserId
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="userId"
                type="number"
                placeholder="1"
                value={form.userId}
                onChange={(event) =>
                  setForm({ ...form, userId: event.target.value })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Güncelle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
