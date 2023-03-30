import React , {useState} from 'react';
// import { uploadFile } from 'react-s3';
import AWS from 'aws-sdk'


const S3_BUCKET ='g-1234';
const REGION ='us-east-1';
const ACCESS_KEY ='AKIA35NI2H34EF3JLCG4';
const SECRET_ACCESS_KEY ='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';

// const config = {
//     bucketName: S3_BUCKET,
//     region: REGION,
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
// }


AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadToS3WithNativeSdk = () => {

  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
    const [messege,setMessege]=useState("")


  const handleFileInput = (e) => {
      setSelectedFile(e.target.files[0]);
  }

  const uploadFile = (file) => {
       console.log(file.name)
       console.log(file)

      const params = {
          ACL: 'public-read',
          Body: file,
          Bucket: S3_BUCKET,
          Key: file.name
      };

      myBucket.putObject(params)
          .on('httpUploadProgress', (evt) => {
              setProgress(Math.round((evt.loaded / evt.total) * 100))
              setMessege("Successfully Uploaded")
          }).then(()=>{
            setMessege("Successfully Uploaded")
          })
          .send((err) => {
              if (err) console.log(err)
          })
  }

  return( <div>
      <div>File Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput}/>
      <button onClick={() => uploadFile(selectedFile)}> Upload</button>
      <div>hi{messege}</div>

  </div>)

}

export default UploadToS3WithNativeSdk;
