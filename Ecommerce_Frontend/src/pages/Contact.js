import React from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import { FaEye, FaHome, FaInfoCircle, FaMailBulk, FaMailchimp, FaPhone } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { getAllEnquiry, postEnquiry } from '../features/enquiry/enquirySlice';

const Contact = () => {
  const dispatch = useDispatch();

  let enquirySchema = Yup.object({
      name: Yup.string().required("Name is required!"),
      email: Yup.string().email("Invalid email address!").required("Email is required!"),
      mobile: Yup.number().required("Mobile is required!"),
      comment: Yup.string().required("Comment is required!").required("Comment is required!"),
  });


  const formik = useFormik({
      initialValues: {
        name: '',
        email: '',
        mobile: "",
        comment: "",
      },
      validationSchema: enquirySchema,
      onSubmit: values => {
        dispatch(postEnquiry(values));
      },
  });
  
  return (
    <>
      <Meta title="Contact Us" />
      <BreadCrum title="Contact Us" />

      <div className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
          <div className="container mx-auto">
              <div className="grid grid-cols-12">
                  {/* Map part */}
                  <div className="col-span-12">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0717237054464!2d106.69319177480412!3d10.728951489416929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fbea5fe3db1%3A0xfae94aca5709003f!2zxJDhuqFpIEjhu41jIFJNSVQgTmFtIFPDoGkgR8Oybg!5e0!3m2!1svi!2s!4v1709887726625!5m2!1svi!2s" width="600" height="450" className='border-0 w-full' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  </div>

                  {/* Contact part */}
                  <div className="col-span-12 mt-2 md:mt-5">
                      <div className="flex flex-col md:flex-row justify-between items-center md:items-start p-2 md:p-5 rounded-md bg-white gap-10">

                        {/* Form left */}
                        <div className='w-full md:w-1/2'>
                          <h3 className='text-2xl font-semibold text-center md:text-left mb-4'>Contact</h3>

                          <form action="" className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>
                            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                              <div className="col-span-full">
                                <div className="mt-3">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                      type="email"
                                      name="email"
                                      id="email"
                                      autoComplete="email"
                                      className="block flex-1 border-0 bg-gray-200 rounded-md py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="Email"
                                      onChange={formik.handleChange("email")}
                                      value={formik.values.email}
                                      onBlur={formik.handleBlur("email")}
                                    />
                                  </div>
                                  <div className="text-sm text-red-500 pt-2 italic">
                                      {formik.touched.email && formik.errors.email ? (
                                      <div>{formik.errors.email}</div>
                                      ) : null}
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-full">
                                <div className="mt-3">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                      type="tel"
                                      name="phone"
                                      id="phone"
                                      autoComplete="phone"
                                      className="block flex-1 border-0 bg-gray-200 rounded-md py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="Mobilephone"
                                      onChange={formik.handleChange("mobile")}
                                      value={formik.values.mobile}
                                      onBlur={formik.handleBlur("mobile")}
                                    />
                                  </div>

                                  <div className="text-sm text-red-500 pt-2 italic">
                                      {formik.touched.mobile && formik.errors.mobile ? (
                                      <div>{formik.errors.mobile}</div>
                                      ) : null}
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-full">
                                <div className="mt-3">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                    <input
                                      type="text"
                                      name="username"
                                      id="username"
                                      autoComplete="username"
                                      className="block flex-1 border-0 bg-gray-200 rounded-md py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="Name"
                                      onChange={formik.handleChange("name")}
                                      value={formik.values.name}
                                      onBlur={formik.handleBlur("name")}
                                    />
                                  </div>

                                  <div className="text-sm text-red-500 pt-2 italic">
                                      {formik.touched.name && formik.errors.name ? (
                                      <div>{formik.errors.name}</div>
                                      ) : null}
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-full">
                                <div className="mt-2">
                                  <textarea
                                    id="comment"
                                    name="comment"
                                    cols={30}
                                    rows={4}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2 bg-gray-200"
                                    placeholder='Comment'
                                    onChange={formik.handleChange("comment")}
                                    value={formik.values.comment}
                                    onBlur={formik.handleBlur("comment")}
                                  />
                                </div>
                                <div className="text-sm text-red-500 pt-2 italic">
                                    {formik.touched.comment && formik.errors.comment ? (
                                    <div>{formik.errors.comment}</div>
                                    ) : null}
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your comment.</p>
                              </div>

                              <div className="mt-3 col-span-full flex flex-col md:flex-row justify-center items-center gap-2">
                                <button
                                  type="submit"
                                  className="w-2/3 rounded-2xl text-sm ml-1 px-3 py-1 mt-2 md:rounded-3xl text-white bg-cyan-950 lg:px-8 lg:py-3 lg:text-lg hover:bg-orange-500 hover:text-black lg:ml-2 lg:mt-5"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>

                        {/* Get in touch right */}
                        <div className='w-full md:w-1/2'>
                          <h3 className='text-2xl font-semibold text-center md:text-left mb-4'>Get in touch with us</h3>

                          <div>
                            <ul className='list-none'>
                              <li className='mb-3 flex items-center gap-4 text-gray-500'>
                                <FaHome />
                                <address className='mb-0'>Hno: Binh Tan, Binh Hung Hoa B, Ho Chi Minh City</address>
                              </li>
                              <li className='mb-3 flex items-center gap-4 text-gray-500'>
                                <FaPhone />
                                <a href="tel: +84949375439" className='mt-3 block'>+84 23482842</a>
                              </li>
                              <li className='mb-3 flex items-center gap-4 text-gray-500'>
                                <FaMailchimp />
                                <a href="mailto: doquangthang.zet@gmail.com" className='mt-2 mb-3 block'>doquangthang.zet@gmail.com</a>
                              </li>
                              <li className='mb-3 flex items-center gap-4 text-gray-500'>
                                <FaInfoCircle />
                                <p>Monday - Friday, 10AM - 8PM</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default Contact