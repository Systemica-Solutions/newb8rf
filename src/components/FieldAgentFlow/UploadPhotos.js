import React, {
  Component,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";

import { Link } from "react-router-dom";
import UploadPhotoscss from "./UploadPhotos.css";
import axios from "axios";
import vector from "../Assets/Images/FieldAgent/vector.png";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import uploadImg from "../Assets/Images/FieldAgent/uploadImg.png";
import ExtraCommonButton from "../ExtraCommonButton";
import { RiImageAddFill } from "react-icons/ri";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import BackButton from "../CommonButtonBack";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import { useDropzone } from "react-dropzone";
import Footer from "../Footer";
import { FcImageFile } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadPhotos() {
  const queryParameters = new URLSearchParams(window.location.search);
  const propertyId = queryParameters.get("propertyId");
  console.log("PID-> " + propertyId);
  //Token
  const token = localStorage.getItem("token");
  // console.log(token);
  const uploadRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imgpreview, setImgpreview] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/react/16.4.2/umd/react.production.min.js";
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.4.2/umd/react-dom.production.min.js";
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.6.2/prop-types.min.js";
    script.src =
      "https://unpkg.com/react-dropzone-uploader/dist/react-dropzone-uploader.umd.js";
    script.src = "https://unpkg.com/react-dropzone-uploader/dist/styles.css";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  let axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  // Add this
  const [uploadStatus, setUploadStatus] = useState("");

  // const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
  //   acceptedFiles.forEach((file) => {
  //     setSelectedImages((prevState) => [...prevState, file]);
  //   });
  // }, []);

  const getUploadParams = ({ meta }) => {
    const url = "https://httpbin.org/post";
    return {
      url,
      meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` },
    };
  };

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };

  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  // const onDrop = useCallback((acceptedFiles) => {
  //   setSelectedImages((prevImages) => [...prevImages, ...acceptedFiles]);
  // }, []);

  // const {
  //   getRootProps,
  //   getInputProps,
  //   isDragActive,
  //   isDragAccept,
  //   isDragReject,
  // } = useDropzone({ onDrop });

  // Submit
  const onUpload = async () => {
    // console.log("function hit");
    // setUploadStatus("Uploading....");
    // console.log(uploadStatus);
    // console.log(selectedImages);
    // const formData = new FormData();

    // selectedImages.forEach((image) => {
    //   console.log("Image:", image);
    //   formData.append("images", image);
    //   formData.append("propertyId", propertyId);
    // });
    console.log(selectedImages);
    if (selectedImages.length !== 0) {
      var formData = new FormData();
      for (let i = 0; i < selectedImages.length; i++) {
        console.log(selectedImages[i]);
        formData.append("images", selectedImages[i]);
      }
      formData.append("propertyId", propertyId);
      console.log(formData);
      await axios
        .post("https://b8rliving.com/property/upload", formData, axiosConfig)
        .then((response) => {
          console.log(response.data);

          setUploadStatus("upload successful");
          toast.success("Images upload successful");
          window.location.href = `/VerificationComplete?propertyId=${propertyId}`;
          // window.location.href = `/CreateBoard?tenantId=${tenantId}&name=${name}`;
          // console.log(uploadStatus);
        })
        .catch((error) => {
          console.log(error);
          setUploadStatus("Upload failed..");
        });
    } else {
      toast.error("please select images to upload");
    }
  };

  // Add this
  // const styles = useMemo(
  //   () => ({
  //     ...(isDragAccept ? { borderColor: "#00e676" } : {}),
  //     ...(isDragReject ? { borderColor: "#ff1744" } : {}),
  //   }),
  //   [isDragAccept, isDragReject]
  // );

  const handleUploadImageClick = () => {
    uploadRef.current.click();
  };

  const handleImageChange = (event) => {
    var files = event.target.files;
    // console.log(files);
    setSelectedImages([...selectedImages, ...files]);
    // console.log(selectedImages);
    // var imgArr = [];
    // for (let i = 0; i < files.length; i++) {
    //   imgArr.push(URL.createObjectURL(files[i]));
    // }
    // setSelectedImages(imgArr);
  };
  // console.log(selectedImages);

  return (
    <>
      <ToastContainer
        className="my-[3rem] text-[1.1rem] font-bold"
        autoClose={1000}
        // hideProgressBar={true}
      />
      <CommonHeader title="Upload Photos" color="#52796F" />
      <div className="px-[1rem] py-[2rem]">
        <div
          className="p-[1rem] rounded-[2rem]"
          style={{
            background:
              "linear-gradient(180deg, #DAF0EE 0%, rgba(245, 245, 245, 0.00) 100%)",
            border: "1px solid #DAF0EE",
          }}
        >
          <p className="text-[#52796F] text-[1.3rem]">Upload from Gallery*</p>
          <div
            className="p-[1rem] mt-[2rem]"
            style={{
              border: "1px dashed #000000",
              borderRadius: "30px",
              background: "rgba(217, 217, 217, 0.47)",
            }}
          >
            <div
              className="flex justify-center items-center my-[2rem] flex-col"
              onClick={handleUploadImageClick}
            >
              <RiImageAddFill className="text-[4rem]" />
              <input
                type="file"
                accept="image/png, image/jpeg"
                multiple
                ref={uploadRef}
                onChange={handleImageChange}
                style={{
                  display: "none",
                }}
              />
            </div>
            <div className="flex justify-center items-center">
              <div
                className="flex justify-center items-center flex-col p-[0.5rem] px-[1rem] text-[#52796F]"
                style={{
                  border: "1px solid #52796F",
                }}
              >
                <p className="text-[3rem] font-bold text-center">
                  {selectedImages.length}
                </p>
                <p className="text-[1.5rem]">selected</p>
              </div>
            </div>
            {/* uploaded Images */}
            {/* {selectedImages.length &&
              selectedImages.map((imgUrl, index) => {
                <div className="py-[0.5rem] px-[1rem]" key={index}>
                  <div
                    className="p-[0.5rem] rounded-[0.5rem]"
                    style={{
                      border: "1px solid #52796F",
                    }}
                  >
                    <img
                      src={imgUrl}
                      style={{
                        width: "100px",
                        height: "100px",
                        marginRight: "5px",
                      }}
                    />
                    Hello
                  </div>
                </div>;
              })} */}
            {/* <div className="pb-[1rem]">
              <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                accept="image/*,audio/*,video/*"
                inputContent={(files, extra) =>
                  extra.reject
                    ? "Image, audio and video files only"
                    : "Drag or Browse Files"
                }
                styles={{
                  dropzoneReject: {
                    borderColor: "red",
                    backgroundColor: "#DAA",
                  },
                  inputLabel: (files, extra) =>
                    extra.reject ? { color: "red" } : {},
                }}
              />
            </div> */}
          </div>
        </div>
        <div className="px-[0.5rem] py-[0.5rem] text-[1.25rem]">
          <b>Note:</b> Only JPG, JPEG, and PNG. The larger image will be
          cropped.
        </div>
      </div>

      <div
        onClick={onUpload}
        // onClick={() => {
        //   window.location.href = `/VerificationComplete?propertyId=${propertyId}`;
        // }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CommonBtn title="Save & Upload" />
      </div>
      <Footer />
    </>
  );
}

export default UploadPhotos;
