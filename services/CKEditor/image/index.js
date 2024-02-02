import axios from "axios";

export async function upload_image(files, setProgress) {
  try {
    const options = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    };
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files[]", files[i]);
    }
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/image/upload`,
      formData,
      options
    );
    const data = await res.data;

    return data;
  } catch (error) {
    console.log("error", error);
  }
}
