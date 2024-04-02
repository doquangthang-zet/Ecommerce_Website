import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

// Get all enquiries of the web
const getEnquiries = async () => {
    const response = await axios.get(`${baseUrl}enquiry`);

    return response.data;
};

// Get one enquiry of the web
const getOneEnquiry = async (id) => {
    const response = await axios.get(`${baseUrl}enquiry/${id}`, config);

    return response.data;
};

//Update enquiry
const updateEnquiry = async (enquiry) => {
    const response = await axios.put(`${baseUrl}enquiry/${enquiry.id}`, {status: enquiry.data}, config);
  
    return response.data;
};

//Delete enquiry
const deleteEnquiry = async (id) => {
    const response = await axios.delete(`${baseUrl}enquiry/${id}`, config);
  
    return response.data;
};

const enquiryService = {
    getEnquiries,
    deleteEnquiry,
    getOneEnquiry,
    updateEnquiry,
};

export default enquiryService;