import axios from "axios";
import { baseUrl } from '../../utils/baseUrl';
import { config } from '../../utils/axiosconfig';

//Get all enquiry
const getEnquirys = async () => {
    const response = await axios.get(`${baseUrl}enquiry`);

    if(response.data) {
        return response.data;
    }
}

//GET ONE product cate
const getOneEnquiry = async (enquiryId) => {
    const response = await axios.get(`${baseUrl}enquiry/${enquiryId}`);

    if(response.data) {
        return response.data;
    }
}

//Post enquiry
const sendEnquiry = async (data) => {
    const response = await axios.post(`${baseUrl}enquiry`, data);

    if(response.data) {
        return response.data;
    }
}

export const enquiryService = {
    getEnquirys,
    getOneEnquiry,
    sendEnquiry,
}