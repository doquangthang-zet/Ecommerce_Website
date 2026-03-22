import axios from "axios";
import {baseUrl} from "../../utils/baseUrl";
import api from "../../utils/axiosconfig";

// Get all enquiries of the web
const getEnquiries = async () => {
    const response = await axios.get(`${baseUrl}enquiry`);

    return response.data;
};

// Get one enquiry of the web
const getOneEnquiry = async (id) => {
    const response = await api.get(`enquiry/${id}`);

    return response.data;
};

//Update enquiry
const updateEnquiry = async (enquiry) => {
    const response = await api.put(`enquiry/${enquiry.id}`, {status: enquiry.data});
  
    return response.data;
};

//Delete enquiry
const deleteEnquiry = async (id) => {
    const response = await api.delete(`enquiry/${id}`);
  
    return response.data;
};

const enquiryService = {
    getEnquiries,
    deleteEnquiry,
    getOneEnquiry,
    updateEnquiry,
};

export default enquiryService;