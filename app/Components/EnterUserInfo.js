import React, { useState, useEffect } from 'react'
import DotLoader from 'react-spinners/DotLoader'
import { Input, Box, Button } from 'theme-ui'
import { useForm } from 'react-hook-form'
import { hash } from 'bcryptjs'
import AWSS3UploadAsh from 'aws-s3-upload-ash'


function EnterUserInfo(props) {
  const camera = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-50">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
  const user = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-50">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
  const danger = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
  const check = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-green-500">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  const close = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-50 cursor-pointer">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>


  const [word, setWord] = useState(null)

  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isRegister, setRegister] = useState(false)
  const [uploadedPhotoLocation, setUploadPhotoLocation] = useState(null)

  const [file, setFile] = useState(null)
  const [fileDataURL, setFileDataURL] = useState(null);

  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  /* const onSubmit = (data)=>{
    alert(data)
  } */
  const onSubmit = async (data) => {
    const character = firstName.substring(0, 1).toUpperCase()
    if (file) {
      setLoading(true);
 
      const config = {
        bucketName: 'quarter-app',
        dirName: 'profilePics',
        region: 'eu-central-1',
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
        s3Url: 'https://quarter-app.s3.amazonaws.com/'
      }
      const S3CustomClient = new AWSS3UploadAsh(config);
      const upload = await S3CustomClient.uploadFile(file, file.type, undefined, file.name, "public-read")
 

      console.log(uploadedPhotoLocation)
      console.log(upload)
      const register = await fetch('/api/registerUser', {
        method: 'POST', body: JSON.stringify({
          email: props.tempUser.email,
          password: await hash(props.tempUser.password, 10),
          firstName: firstName,
          lastName: lastName,
          profilePic: upload.location? upload.location :  character,
          address: {
            province: props.address.province,
            district: props.address.district,
            neighborhood: props.address.neighborhood
          }

        })
      }).then(res => {
        setLoading(false);
        //signIn()
        setRegister(true)

      }).catch(error => {
        alert(error);
        setLoading(false)
      })
    }
    else {
      setLoading(true);
      
      await fetch('/api/registerUser', {
        method: 'POST', body: JSON.stringify({
          email: props.tempUser.email,
          password: await hash(props.tempUser.password, 10),
          firstName: firstName,
          lastName: lastName,
          profilePic: character,
          address: {
            province: props.address.province,
            district: props.address.district,
            neighborhood: props.address.neighborhood
          }

        })
      }).then(res => {
        setLoading(false);
        setRegister(true)

      }).catch(error => {
        alert(error);
        setLoading(false)
      })
    }



  }


  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  }
  useEffect(() => {
    let fileReader, isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }

  }, [file]);


  return (
    <Box>
      {!loading ? !isRegister ? <Box>
        <Box sx={{ fontWeight: '700', fontStyle: 'italic', fontSize: '22px' }}>LET'S GET TO KNOW YOU</Box>
        <br />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ position: 'relative' }}>
            <Box sx={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'gray', position: 'absolute', bottom: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{camera}</Box>
            {fileDataURL ?
              <p className="img-preview-wrapper">
                {
                  <Box>
                    <Box style={{ position: 'absolute', width: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '22px', zIndex: 10, backgroundColor: 'gray', borderRadius: '50%' }} onClick={() => setFileDataURL(null)}>{close}</Box>
                    <img src={fileDataURL} alt="preview" style={{ width: '88px', height: '88px', borderRadius: '50%', display: 'flex', position: 'absolute', zIndex: 1, ':hover': { cursor: 'pointer' } }} />
                  </Box>
                }
              </p> : <Box sx={{ width: '88px', height: '88px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 1, ':hover': { cursor: 'pointer' } }} className="bg-gradient-to-r from-teal-400 to-cyan-500">
                {<Box sx={{ fontWeight: '700', color: 'white', fontSize: '42px' }}>{word ? word : user}</Box>}
              </Box>}

            <Input sx={{ width: '88px', height: '88px', borderRadius: '50%', backgroundColor: 'red', opacity: 0, zIndex: 2, position: 'relative', ':hover': { cursor: 'pointer' } }}
              type="file"
              id='image'
              accept='.png, .jpg, .jpeg'
              onChange={changeHandler}
            />

          </Box>
        </Box>

        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("firstName", {

            pattern: {
              value: /^[a-zA-Z]/,
              message: 'Please enter a valid email',
            }
          })} sx={styles.textArea} placeholder='First Name' name='first name' className='placeholder:text-black h-12 ' onChange={(e) => { setFirstName(e.target.value); setWord(e.target.value.substring(0, 1).toUpperCase()) }}></Input>
          <br />
          <Input {...register("lastName", {

            pattern: {
              value: /^[a-zA-Z]/,
              message: 'Please enter a valid email',
            }
          })} sx={styles.textArea} name='last name' placeholder='Last Name' className='placeholder:text-black h-12' onChange={(e) => { setLastName(e.target.value) }}></Input>

          {errors?.firstName?.type === "required" && (
            <p style={{ fontSize: '14px', color: 'red' }}><div style={{ display: 'flex' }}><div style={{ display: 'flex' }}>{danger} First Name is required</div></div></p>
          )}
          {errors?.lastName?.type === "required" && (
            <p style={{ fontSize: '14px', color: 'red' }}><div style={{ display: 'flex' }}><div style={{ display: 'flex' }}>{danger} Last Name is required</div></div></p>
          )}
          <br />
          <Button sx={{ float: 'right' }} type='submit' className="bg-gradient-to-r from-teal-400 to-cyan-500" onClick={() => handleSubmit()}>Continue</Button>
        </form>
      </Box> : <Box sx={{ mt: 4 }}><Box sx={{ fontStyle: 'italic', fontWeight: '600', textAlign: 'center', fontSize: '20px' }}><Box sx={{ display: 'flex', justifyContent: 'center' }}>{check}</Box><Box sx={{ mt: 3 }}>SUCCESSFULLY REGISTERED</Box><Box sx={{ fontSize: '16px', fontWeight: '500', fontStyle: 'normal' }}>Please log in</Box></Box></Box> : <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}><DotLoader color='#14B8A6' size={30} /></Box>
      }
    </Box>
  )
}
const styles = {
  textArea: {
    width: '100%',
    backgroundColor: 'rgb(229, 229, 229)',
    border: 'none',
    color: 'black',

  },
}
export default EnterUserInfo