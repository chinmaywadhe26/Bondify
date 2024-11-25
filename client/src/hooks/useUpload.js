import axios from 'axios'
export const useUpload = async ({image}) => {
    const upload = async () => {
        try{
            const formData = new FormData()
            formData.append("file", image)
            formData.append("upload_preset", "bondify")
            formData.append("api_key", "275999598926592")
            
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: false,

            }

            const res = await axios.post("https://api.cloudinary.com/v1_1/dvzbr7vo9/image/upload", formData, config)
            const data = await res.data
            if(!data) throw new Error("error uploading the image")
            return{
                public_id: data.public_id,
                url: data.secure_url,
            }    
        }catch(error){
            return error.message
        }
    }

    const {public_id, url} = await upload()
    return {public_id, url}
} 