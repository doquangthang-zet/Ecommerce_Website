import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneEnquiry, resetState, updateEnquiry } from '../features/enquiry/enquirySlice';

const ViewEnquiry = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const enquiryId = param.id;

  //Get created product
  const newEnquiry = useSelector((state) => {
    return state.enquiry;
  });

  const { isSuccess, isError, isLoading, createdEnquiry, updatedEnquiry, currentEnquiry } = newEnquiry;

  useEffect(() => {
    if(enquiryId) {
      dispatch(getOneEnquiry(enquiryId));
    } else {
      dispatch(resetState());
    }
  }, [enquiryId]);

  useEffect(() => {
    if(isSuccess && updatedEnquiry) {
      toast.success('Enquiry updated successfully!');
    }
    if(isError) {
      toast.error('Something went wrong!');
    }
  }, [isSuccess, isError, isLoading]);

  const setEnqStatus = (e, id) =>  {
    const enqData = {
        id: id,
        data: e,
    }

    dispatch(updateEnquiry(enqData));

    setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/enquiries");
    },1000);
  };

  const goback = () => {
    navigate(-1);
  };

  return (
    <div>
        <h3 className="mb-4 text-2xl font-bold">View Enquiry</h3>
        <button className='rounded-md text-black bg-purple-400 px-8 py-2 text-lg font-semibold hover:bg-purple-500 hover:text-white mt-5' onClick={goback}>Go back</button>

        <div className='bg-white mt-5 p-4 rounded-md'>
            <div className="flex items-center gap-3">
                <h5 className="mb-0 text-xl font-semibold">Name: </h5>
                <p>{currentEnquiry && currentEnquiry.name}</p>
            </div>

            <div className="flex items-center gap-3 mt-3">
                <h5 className="mb-0 text-xl font-semibold">Mobile: </h5>
                <p>
                    <a href={`tel:+84${currentEnquiry && currentEnquiry.mobile}`}>{currentEnquiry && currentEnquiry.mobile}</a>
                </p>
            </div>

            <div className="flex items-center gap-3 mt-3">
                <h5 className="mb-0 text-xl font-semibold">Email: </h5>
                <p>
                    <a href={`mail:${currentEnquiry && currentEnquiry.email}`}>{currentEnquiry && currentEnquiry.email}</a>
                </p>
            </div>

            <div className="flex items-center gap-3 mt-3">
                <h5 className="mb-0 text-xl font-semibold">Comment: </h5>
                <p>{currentEnquiry && currentEnquiry.comment}</p>
            </div>

            <div className="flex items-center gap-3 mt-3">
                <h5 className="mb-0 text-xl font-semibold">Status: </h5>
                <p>{currentEnquiry && currentEnquiry.status}</p>
            </div>

            <div className="flex items-center gap-3 mt-3">
                <h5 className="mb-0 text-xl font-semibold">Change Status: </h5>
                {/* Status */}
                <select 
                    name="status" 
                    id="status" 
                    className='py-3 pl-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                    onChange={(e) => setEnqStatus(e.target.value, enquiryId)}
                    value={currentEnquiry ? currentEnquiry.status : "Submitted"}
                >
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Submitted">Submitted</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default ViewEnquiry