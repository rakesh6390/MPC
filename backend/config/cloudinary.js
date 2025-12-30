import { v2 as cloudinary} from 'cloudinary'


const uploadOnCloudinary = async(filePath)=>{
cloudinary.config({ 
  cloud_name: 'my_cloud_name', 
  api_key: 'my_key', 
  api_secret: 'my_secret'
});

try {
    if(!filePath){
        return null
    }
    const uploadResult = await cloudinary.uploader.upload(filePath,{resource_type:'auto'})
    fs.unlinkSync(filePath)
    return uploadResult.secure_url
} catch (error) {
    fs.unlinkSync(fileaPath)
    console.log(error);
}
}

export default uploadOnCloudinary