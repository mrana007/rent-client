// This page make by Roknuzzaman sajib
// all fixed & full page created been responsive

import {
  FaComment,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaRegCalendarAlt,
  FaTag,
  FaTwitter,
} from "react-icons/fa";
import { NavLink, useLoaderData, useParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useBlogsComment from "../../../Hooks/useBlogsComment";
import CommentForm from "./CommentForm";

const Blogdetails = () => {
  // const { user } = useAuth();
  // const axiosPublic = useAxiosPublic();
  const blogs = useLoaderData();
  const [comments, refetch] = useBlogsComment();
  const { id } = useParams();
  const blog = blogs.find((item) => item._id == id);
  const newComments = comments.filter((item) => item.blogId == blog._id);

  // const { register, handleSubmit, reset } = useForm();

  //condition of user needed to comment

  const onSubmit = (data) => {
    if (user) {
      const newComment = {
        name: data.name,
        email: data.email,
        img: user?.photoURL,
        blogTitle: blog?.title,
        subject: data.subject,
        message: data.message,
        blogId: blog._id,
        date: new Date().toLocaleDateString("en-GB"),
      };
      console.log(newComment);
      axiosPublic.post("/comments", newComment).then((res) => {
        console.log(res.data);
        if (res.data) {
          Swal.fire(`Hey ${user?.displayName} your comment Successfully send`);
          reset();
        }
      });
    } else {
      // this login will allow user to add booking for their desired property only if they are user.
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Looks like you're not logged in!",
        footer: `<a href='/login' className='font-bold underline'>Please Log In</a>`,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      {/* banner section */}
      <div className="gridbgimg">
        <div className=" bg-[#000000B2]">
          <div className=" max-w-screen-2xl mx-auto py-24">
            <h2 className="text-6xl font-bold text-white font-serif">
              Blog
            </h2>
            <div className="mt-2">
              <NavLink
                to="/"
                className="navAfter relative font-medium text-base text-white mx-3"
              >
                Home
              </NavLink>
              <NavLink
                to="/blogs"
                className="navAfter relative font-medium text-base text-white mx-3"
              >
                Blogs
              </NavLink>
              <NavLink
                to={`/blogs/${blog._id}`}
                className="navAfter relative font-medium text-base text-white mx-3 "
              >
                Blogs details no slider
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto">
        <div className=" w-[80%] mx-auto my-28">
          {/* Detais part */}
          <img
            className="w-full md:h-[600px] h-[400px]"
            src={blog?.img}
            alt=""
          />
          <div>
            <div className=" flex items-center justify-start gap-7 mt-7">
              <p className=" text-xl flex items-center justify-center gap-2">
                <FaRegCalendarAlt className=" text-red-500"></FaRegCalendarAlt>
                <span className=" hover:text-red-500">{blog?.date}</span>
              </p>
              <p className=" text-xl flex justify-center items-center gap-2">
                <FaComment className=" text-red-500"></FaComment>
                <span className=" hover:text-red-500">
                  {blog?.comment} Comment
                </span>
              </p>
            </div>
            <h2 className=" text-3xl font-extrabold mt-4">{blog?.title}</h2>
            <p className="my-3 space-y-2">{blog.details}</p>
            <div className=" border flex md:flex-row flex-col items-center gap-8 py-10 px-7">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <path
                    d="M34.615 46.1542L21.1533 46.1542C19.5506 46.1542 18.1881 45.5935 17.0662 44.4716C15.9449 43.3497 15.3835 41.9876 15.3835 40.3845V38.4623C15.3835 34.2152 16.8862 30.5897 19.8914 27.5846C22.8963 24.5805 26.5225 23.0778 30.7691 23.0778H34.615C35.6565 23.0778 36.5576 22.697 37.3191 21.9361C38.0803 21.1747 38.4608 20.2736 38.4608 19.2319V11.5389C38.4608 10.4974 38.0801 9.59543 37.3191 8.83408C36.5578 8.07379 35.6567 7.69238 34.615 7.69238L30.7691 7.69238C26.602 7.69238 22.6265 8.50446 18.84 10.1263C15.0539 11.7492 11.7791 13.9429 9.01428 16.7077C6.2497 19.4712 4.0566 22.7462 2.43393 26.5328C0.811258 30.3188 -0.000183105 34.2954 -0.000183105 38.4621L-0.000183105 80.7688C-0.000183105 83.9756 1.1211 86.6985 3.36472 88.9429C5.60854 91.1861 8.33355 92.3076 11.5385 92.3076H34.6164C37.8212 92.3076 40.5453 91.1861 42.7894 88.9429C45.0326 86.6985 46.1545 83.9756 46.1545 80.7688V57.6929C46.1545 54.4867 45.0326 51.7638 42.7879 49.5191C40.5449 47.2762 37.8197 46.1542 34.615 46.1542Z"
                    fill="#151515"
                  />
                  <path
                    d="M96.6366 49.5191C94.3936 47.2762 91.6692 46.1542 88.4637 46.1542L75.0022 46.1542C73.4004 46.1542 72.0366 45.5935 70.9166 44.4716C69.7942 43.3497 69.2339 41.9876 69.2339 40.3845V38.4623C69.2339 34.2152 70.7366 30.5897 73.7403 27.5846C76.7442 24.5805 80.3701 23.0778 84.6189 23.0778H88.4639C89.5056 23.0778 90.4074 22.697 91.1683 21.9361C91.9288 21.1747 92.3108 20.2736 92.3108 19.2319V11.5389C92.3108 10.4974 91.929 9.59543 91.1683 8.83408C90.4076 8.07379 89.5058 7.69238 88.4639 7.69238L84.6189 7.69238C80.4495 7.69238 76.4748 8.50446 72.6872 10.1263C68.9018 11.7492 65.628 13.9429 62.8632 16.7077C60.0984 19.4712 57.9043 22.7462 56.2822 26.5328C54.66 30.3188 53.8475 34.2954 53.8475 38.4621V80.7688C53.8475 83.9756 54.9698 86.6985 57.2128 88.9429C59.456 91.1861 62.1804 92.3076 65.3857 92.3076H88.4624C91.668 92.3076 94.3921 91.1861 96.6351 88.9429C98.8798 86.6985 99.9998 83.9756 99.9998 80.7688V57.6929C100 54.4865 98.8798 51.7638 96.6366 49.5191Z"
                    fill="#151515"
                  />
                </svg>
              </button>
              <p className="mt-3 space-y-2">{blog?.description}</p>
            </div>
            <h2 className=" text-3xl font-extrabold my-3">
              Commodo Viverra Manas Accumsan Sit
            </h2>
            <p>
              {blog?.commodoviverra.map((item, index) => (
                <p key={index}>
                  <div className=" flex items-center space-y-2 gap-2">
                    <p className="text-orange-400 mr-2">{index + 1}</p>
                    <p>{item}</p>
                  </div>
                </p>
              ))}
            </p>
            <h2 className=" text-3xl font-extrabold my-3">
              5 Major Facility That We Offer
            </h2>
            <p>
              {blog?.majorFacility.map((item) => (
                <p key={item}>
                  <div className=" flex items-center gap-2 space-y-2">
                    <IoIosArrowForward className=" text-orange-400 mr-2"></IoIosArrowForward>
                    <p>{item}</p>
                  </div>
                </p>
              ))}
            </p>
            <div className=" border flex md:flex-row flex-col justify-between items-center gap-8 py-6 px-5 mt-7">
              <div className=" flex items-center gap-1 text-xl">
                <FaTag></FaTag>
                <h4>
                  <span className=" font-bold">Tags: </span>Apartment,Villa
                </h4>
              </div>
              <div className=" flex items-center gap-5 text-xl">
                <p>Share:</p>
                <a
                  target="blank"
                  href="https://www.facebook.com/roknujjamansajib"
                  className=" hover:bg-orange-700  rounded-full hover:text-white p-2"
                >
                  <FaFacebook></FaFacebook>
                </a>
                <a
                  target="blank"
                  href="https://twitter.com/Roknuzzaman5546"
                  className="hover:bg-orange-700  rounded-full hover:text-white p-2"
                >
                  <FaTwitter></FaTwitter>
                </a>
                <a
                  target="blank"
                  href="https://www.linkedin.com/in/roknuzzaman-sojib-b794552a3/"
                  className="hover:bg-orange-700  rounded-full hover:text-white p-2"
                >
                  <FaLinkedin></FaLinkedin>
                </a>
                <a
                  target="blank"
                  href="https://www.instagram.com/roknujjamansajib/"
                  className="hover:bg-orange-700  rounded-full hover:text-white p-2"
                >
                  <FaInstagram></FaInstagram>
                </a>
              </div>
            </div>
          </div>
          {/* Blogger & Comment section */}
          {/* DO: this time i created just design so i would used direct picture.after when we work backend then used dynamic and who add the blog we see his details */}
          {/* blogger section */}
          <div className="border flex md:flex-row flex-col justify-start items-center gap-8 py-6 px-5 my-7">
            <img
              className="h-40 w-40 rounded-full"
              src={blog?.bloggerInfo.bloggerImg}
              alt=""
            />
            <div>
              <h2 className=" text-3xl font-bold ">
                {blog?.bloggerInfo.bloggerName}
              </h2>
              <p className=" leading-8 text-xl text-gray-400">
                {blog?.bloggerInfo.bloggerDetails}
              </p>
              <div className=" flex items-center gap-5 text-xl">
                <a
                  target="blank"
                  href="https://www.facebook.com/roknujjamansajib"
                  className=" hover:bg-orange-700  rounded-full hover:text-white p-2"
                >
                  <FaFacebook></FaFacebook>
                </a>
                <a
                  target="blank"
                  href="https://twitter.com/Roknuzzaman5546"
                  className="hover:bg-orange-700  rounded-full hover:text-white p-2"
                >
                  <FaTwitter></FaTwitter>
                </a>
                <a
                  target="blank"
                  href="https://www.linkedin.com/in/roknuzzaman-sojib-b794552a3/"
                  className="hover:bg-orange-700  rounded-full hover:text-white p-2"
                >
                  <FaLinkedin></FaLinkedin>
                </a>
              </div>
            </div>
          </div>
          {/* comment part */}
          <div className="border items-center gap-8 px-5 my-7">
            <h2 className=" text-3xl font-bold mt-2">
              {newComments.length} comment
            </h2>
            {/* Comment */}
            {newComments.map((comment) => (
              <div
                key={comment._id}
                className="border-b flex md:flex-row flex-col justify-start items-center gap-8 py-6 px-5 my-7"
              >
                <img
                  className="h-28 w-28 rounded-full"
                  src={comment?.img}
                  alt=""
                />
                <div>
                  <div className=" flex justify-between">
                    <div>
                      <h2 className=" text-3xl font-bold mb-1">
                        {comment?.name}
                      </h2>
                      <p className=" text-gray-400 mb-3">{comment?.date}</p>
                    </div>
                    <div>
                      <button className=" rounded px-7 py-2 mt-3 bg-[#EC3323] hover:bg-[#002172] text-white">
                        Reply
                      </button>
                    </div>
                  </div>
                  <p className=" leading-8 text-xl text-gray-400">
                    {comment?.message}
                  </p>
                </div>
              </div>
            ))}
            {/* Form section */}
            <div>
              <h2 className=" text-3xl font-bold my-3">Leave A Comment</h2>
              {/* <p className=" text-xl text-gray-400">
                Your email address will not be published. Required fields are
                marked.
              </p> */}
              {/* comment form */}
              <CommentForm blog={blog} refetch={refetch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogdetails;
