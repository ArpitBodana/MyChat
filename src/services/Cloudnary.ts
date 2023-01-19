import axios from "axios";

export const cloudinaryUpload = async (img: any) => {
    const CLOUDINARY_URL = import.meta.env.VITE_CLOUDNARY_API_KEY;
    const imgdata = new FormData();
    imgdata.append("file", img);
    imgdata.append("upload_preset", "chatapp");
    return await axios
        .post(CLOUDINARY_URL, imgdata)
        .then((res) => res)
        .catch((err) => err);
};