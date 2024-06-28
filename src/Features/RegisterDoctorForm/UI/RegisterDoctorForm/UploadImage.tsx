/* eslint-disable i18next/no-literal-string */
/* eslint-disable react/display-name */
import { ElementRef, memo, useRef, useState } from "react";
import cls from "./UploadImage.module.scss";
import { useTranslation } from "react-i18next";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { Button } from "@/Shared/UI/Button";
import { AppImage } from "@/Shared/UI/AppImage";
import DefaultDoctorImage from "@/Shared/Assets/Images/DefaultDoctor.png"
interface UploadImageProps {
  className?: string;
}

export const UploadImage = memo((props: UploadImageProps) => {
  const {
    className,
  } = props;
    const { t } = useTranslation("")
    const imagePicker = useRef<ElementRef<"input">>(null);
    // выбранный файл
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // ответ от сервера
    const [uploaded, setUploaded] = useState<any>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files)
        if (event.target.files) {
            setSelectedFile(event.target.files[0])
        }
    }
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file")
        }
         if (selectedFile) {
    
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const result = await fetch("https://httpbin.org/post", {
          method: "POST",
          body: formData,
        });

        const data = await result.json();
          setUploaded(data);
        console.log(data);
       
      } catch (error) {
        console.error(error);
       
      }
    }
    }
    const handlePick = () => {
       
            imagePicker?.current?.click();
       
    }
    let filerea = new FileReader();
  
  return (
      <div className={classNames(cls.UploadImage, {}, [className])}>
             <AppImage
        src={uploaded?filerea.readAsDataURL(uploaded?.file):DefaultDoctorImage}
        width={"40%"}
        height={"40%"} 
        className={classNames(cls.registerContent)}
        />
          <Button onClick={handlePick}>Выьрать изображение</Button>
          <input
              ref={imagePicker}
              className={classNames(cls.hidden)}
              type="file" onChange={handleChange}
              accept="image/*, .jpg, .jpeg, .png"
          />
          
          {selectedFile && (
               <section>
          Информация об изображении:
          <ul>
            <li>Имя: {selectedFile.name}</li>
            <li>Тип: {selectedFile.type}</li>
            <li>Размер: {selectedFile.size} bytes</li>
                  </ul>
                  <Button onClick={handleUpload}>Загрузить изображение</Button>
        </section>
          )}
          {uploaded && <h2>{uploaded.fileName}</h2>}
          <img alt="" src={uploaded?.filePath } width={"200"}/>
    </div>
  );
});
