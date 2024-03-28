import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

// Upload images to cloud
const uploadImg = async (data) => {
    const response = await axios.post(`${baseUrl}upload`, data, config);
    return response.data;
};

const deleteImg = async (id) => {
    const response = await axios.delete(
      `${baseUrl}upload/deleteImage/${id}`,
      config
    );
    return response.data;
  };

const uploadService = {
    uploadImg,
    deleteImg,
};

export default uploadService;