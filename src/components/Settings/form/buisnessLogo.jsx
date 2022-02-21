import React ,{useEffect, useState}from 'react'

import {useDropzone} from 'react-dropzone';
import {Grid, LinearProgress} from '@mui/material';
import { useCallback } from 'react';
import './buisnessLogo.css'


// https://api.Cloudinary.com/v1_1/${cloud_name}/image/upload


export default function BuisnessLogo({form, setForm}) {
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0)

  const upload_preset = "ufz0uowv";
  const cloud_name = "dcfg8797j";

    useEffect(() => {
        setForm({...form, logo: file})
        // eslint-disable-next-line
    },[file])

  const onDrop = useCallback((acceptedFiles) => {
    const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    acceptedFiles.forEach(async (acceptedFile) => {


      const formData = new FormData();
      formData.append("file", acceptedFile);
      formData.append(
        "upload_preset",
        upload_preset
      );
      
      const response = await fetch(url, {
        method: "post",
        body: formData,
      });
      setProgress(100)
      const data = await response.json();
      
      setFile(data.secure_url)
      console.log(data)
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "image/*,application/pdf",
    multiple: false,
  });


  return (
    <>
        <div
          {...getRootProps()}
          className={"dropzone"}
        >
          <input {...getInputProps()} />
        Upload Logo
        </div>
        <Grid item style={{width: '100%'}}>
        <LinearProgress variant="determinate" value={progress} color='success' />
        </Grid>
      </>
  );
}
