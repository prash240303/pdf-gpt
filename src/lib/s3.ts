import AWS from 'aws-sdk';
import toast from 'react-hot-toast';

export async function uploadToS3(file: File) {
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,

    });
    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      },
      region: 'ap-south-1',
    })

    // "/uploads/1633661231231-File.pdf"
    const file_key = '/uploads' + Date.now().toString() + file.name.replace(' ', '_')

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
      Body: file,
    }
    const upload = s3.putObject(params).on('httpUploadProgress', event => {
      console.log("uploadin to s3 bucket...", parseInt(((event.loaded * 100) / event.total).toString()) + "%")
    }).promise()

    await upload.then(data => {
      console.log("upload success", file_key)
      toast.success("File uploaded successfully")
      // add a settimeout of 3 secnds for waiting for the file upload toast to disapper 
      setTimeout(() => {
        toast.success("Creating Chat")
      }, 3000)
    }
    )


    return Promise.resolve({
      file_name: file.name,
      file_key,
    })

  } catch (error) { }
}


export function getS3Url(FileKey: string) {
  console.log("hamari url hogi :", `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${FileKey}`)
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${FileKey}`
  return url;
}