import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// Upload images to cloud
const uploadImg = async (data) => {
    const response = await axios.post(`${baseUrl}upload`, data, {
      headers: {
        Authorization: `Bearer ${
          getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
      },
    });
    return response.data;
};

const deleteImg = async (id) => {
    const response = await axios.delete(
      `${baseUrl}upload/deleteImage/${id}`,
      {
        headers: {
          Authorization: `Bearer ${
            getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
          }`,
        },
      }
    );
    return response.data;
  };

const uploadService = {
    uploadImg,
    deleteImg,
};

export default uploadService;