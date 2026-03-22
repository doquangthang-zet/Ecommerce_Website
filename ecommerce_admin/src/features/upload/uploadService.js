import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import api from "../../utils/axiosconfig";

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// Upload images to cloud
const uploadImg = async (data) => {
    const response = await api.post("upload", data);
    return response.data;
};

const deleteImg = async (id) => {
    const response = await api.delete(`upload/deleteImage/${id}`);
    return response.data;
  };

const uploadService = {
    uploadImg,
    deleteImg,
};

export default uploadService;