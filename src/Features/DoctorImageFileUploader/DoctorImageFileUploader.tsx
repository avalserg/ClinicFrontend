/* eslint-disable no-else-return */
/* eslint-disable i18next/no-literal-string */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ElementRef, useRef, useState } from "react";
import cls from "./DoctorImageFileUploader.module.scss";
import { Button } from "@/Shared/UI/Button";
import { AppImage } from "@/Shared/UI/AppImage";
import DefaultDoctorImage from "@/Shared/Assets/Images/DefaultDoctor.png"
import { VStack } from "@/Shared/UI/Stack";
import { Card } from "@/Shared/UI/Card";


const Result = ({ status }: { status: string|null }) => {
  if (status === "success") {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === "fail") {
    return <p>❌ File upload failed!</p>;
  } else if (status === "uploading") {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};
const DoctorImageFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  
  const [fileUrl, setFileUrl] = useState<string|ArrayBuffer|null>();
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"|null
    >("initial");
  const imagePicker = useRef<ElementRef<"input">>(null);
  const filerea = new FileReader();
  filerea.onloadend = () => {
    if (file?.type && !file?.type.startsWith('image/')) {
    console.log('File is not an image.', file.type, file);
    return;
  }
    setFileUrl(filerea.result)
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files&&e.target.files.length) {
      setStatus("initial");
      const file = e.target.files[0];
      setFile(file);
      filerea.readAsDataURL(file);
    }
  };
  const handleDeleted = () => {
    setFileUrl(null);
    setFile(null);
    setStatus(null);
}
  
  const handleUpload = async () => {
    if (file) {
      setStatus("uploading");
      const FileName = file.name;
      const formData = new FormData();
      formData.append("File", file);
      formData.append("FileName", FileName);

      try {
        const result = await fetch("http://localhost:5015/UploaderImages/UploadDoctorImageFile", {
          
          method: "POST",
          body:  formData,
        });
      

        const data = await result.json();

        console.log(data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };
  const handleDrop = (event: React.DragEvent)=> {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files&&event.dataTransfer.files.length) {
      setFile(event.dataTransfer.files[0]);
      filerea.readAsDataURL(event.dataTransfer.files[0]);
    }

  }
  const handleDragEmpty = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }
    const handlePick = () => {
       
            imagePicker?.current?.click();
       
    }
// function readImage(file:File) {
//   // Check if the file is an image.
//   if (file.type && !file.type.startsWith('image/')) {
//     console.log('File is not an image.', file.type, file);
//     return;
//   }

//   const reader = new FileReader();
//   reader.addEventListener('load', (event) => {
//     img.src = event.target.result;
//   });
//   reader.readAsDataURL(file);
// }
  return (
    <>
      <VStack gap={"8"} align={"center"}>
         <AppImage
        src={fileUrl || DefaultDoctorImage}
          width={"100%"}
          height={"200px"}
        
        onDrop={handleDrop}
        onDragEnter={handleDragEmpty}
        onDragOver={handleDragEmpty}
        />
        {!file && (
          <Button color={"success"} onClick={handlePick}>
         
          Выбрать изображение
        
          </Button>
        )}
        
        <input id="file" ref={imagePicker}
          type="file" accept=".jpg, .jpeg, .png"
          onChange={handleFileChange}
          className={cls.customFileInput} />
      
     

        {file && (
          <>
             <Card variant={"light"}>
          Информация об изображении:
          <ul>
            <li>Имя: {file.name}</li>
            <li>Тип: {file.type}</li>
            <li>Размер: {file.size} bytes</li>
          </ul>
        </Card>
            <Button  color={"update"} onClick={handlePick}  className={cls.submit}>
         
          Изменить изображение
          
        </Button>
            <Button  color={"error"} onClick={handleDeleted}  className={cls.submit}>
          Удалить изображение
        </Button>
        <Button onClick={handleUpload} className={cls.submit}>
          Загрузить изображение
        </Button>
          </>
        
       
      )}

        <Result status={status} />
        </VStack>
    </>
  );
};



export default DoctorImageFileUploader;