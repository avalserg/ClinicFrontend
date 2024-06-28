/* eslint-disable no-else-return */
/* eslint-disable i18next/no-literal-string */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ElementRef, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import cls from './ImageFileUploader.module.scss';
import { Button } from '@/Shared/UI/Button';
import DefaultAvatar from '@/Shared/Assets/Icons/defaultUser.png';
import { VStack } from '@/Shared/UI/Stack';
import { Card } from '@/Shared/UI/Card';
import { Avatar } from '@/Shared/UI/Avatar';
import { Text } from '@/Shared/UI/Text';
import { isUserDoctor, isUserPatient } from '@/Entities/ApplicationUser';
import { AppImage } from '@/Shared/UI/AppImage';

const Result = ({ status }: { status: string | null }) => {
    if (status === 'success') {
        return <p>✅ File uploaded successfully!</p>;
    } else if (status === 'fail') {
        return <p>❌ File upload failed!</p>;
    } else if (status === 'uploading') {
        return <p>⏳ Uploading selected file...</p>;
    } else if (status === 'large file size') {
        return <p>❌ File size more than 2 megabytes!</p>;
    } else {
        return null;
    }
};

interface PatientAvatarFileUploaderProps {
    id?: string | undefined;
    readonly?: boolean | undefined;
    avatar?: string | undefined;
}

export const ImageFileUploader = (props: PatientAvatarFileUploaderProps) => {
    const { id, avatar, readonly } = props;
    const [file, setFile] = useState<File | null>(null);

    const [fileUrl, setFileUrl] = useState<string | ArrayBuffer | null>();
    const [status, setStatus] = useState<
        'initial' | 'uploading' | 'success' | 'fail' | 'large file size' | null
    >('initial');

    const isPatient = useSelector(isUserPatient);
    const isDoctor = useSelector(isUserDoctor);

    const imagePicker = useRef<ElementRef<'input'>>(null);
    const filerea = new FileReader();
    filerea.onloadend = () => {
        if (file?.type && !file?.type.startsWith('image/')) {
            console.log('File is not an image.', file.type, file);
            return;
        }
        setFileUrl(filerea.result);
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length) {
            setStatus('initial');
            const file = e.target.files[0];
            setFile(file);
            filerea.readAsDataURL(file);
        }
    };
    const handleDeleted = () => {
        setFileUrl(null);
        setFile(null);
        setStatus(null);
    };

    let uploadSuccess = false;
    const handleUpload = async () => {
        if (file) {
            setStatus('uploading');
            const FileName = file.name;
            const formData = new FormData();
            formData.append('File', file);
            formData.append('FileName', FileName);
            if (file.size > 2097152) {
                setStatus('large file size');
                return;
            }
            try {
                if (isPatient) {
                    const result = await fetch(
                        `http://localhost:5015/UploaderImages/UploadPatientAvatarFile/${id}`,
                        {
                            method: 'POST',
                            body: formData,
                        },
                    );
                    if (result.status === 200) {
                        uploadSuccess = true;
                        setStatus('success');

                        return;
                    }
                }
                if (isDoctor) {
                    const result = await fetch(
                        `http://localhost:5015/UploaderImages/UploadDoctorImageFile/${id}`,
                        {
                            method: 'POST',
                            body: formData,
                        },
                    );
                    if (result.status === 200) {
                        uploadSuccess = true;
                        setStatus('success');
                        return;
                    }
                }

                setStatus('fail');
            } catch (error) {
                setStatus('fail');
            }
        }
    };
    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files && event.dataTransfer.files.length) {
            setFile(event.dataTransfer.files[0]);
            filerea.readAsDataURL(event.dataTransfer.files[0]);
        }
    };
    const handleDragEmpty = (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
    };
    const handlePick = () => {
        imagePicker?.current?.click();
    };

    return (
        <>
            <VStack gap={'8'} align={'center'}>
                {isPatient && (
                    <Avatar
                        size={100}
                        src={
                            fileUrl ||
                            `http://localhost:5015/avatars/${avatar}` ||
                            DefaultAvatar
                        }
                        width={'100px'}
                        height={'100px'}
                        onDrop={handleDrop}
                        onDragEnter={handleDragEmpty}
                        onDragOver={handleDragEmpty}
                    />
                )}
                {isDoctor && (
                    <AppImage
                        src={
                            fileUrl ||
                            `http://localhost:5015/images/${avatar}` ||
                            DefaultAvatar
                        }
                        width={'130px'}
                        height={'200px'}
                        onDrop={handleDrop}
                        onDragEnter={handleDragEmpty}
                        onDragOver={handleDragEmpty}
                    />
                )}

                {readonly && (
                    <>
                        <Text
                            text="Размер файла должен быть до 2 мегабайт"
                            variant={'accent'}
                        />
                        {!file && (
                            <Button color={'success'} onClick={handlePick}>
                                Выбрать изображение
                            </Button>
                        )}
                        <input
                            id="file"
                            ref={imagePicker}
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleFileChange}
                            className={cls.customFileInput}
                        />

                        {file && (
                            <>
                                <Card variant={'light'}>
                                    <ul>
                                        <li>Размер: {file.size} bytes</li>
                                    </ul>
                                </Card>
                                <Button
                                    color={'update'}
                                    onClick={handlePick}
                                    className={cls.submit}
                                >
                                    Изменить изображение
                                </Button>
                                {uploadSuccess && (
                                    <Button
                                        color={'error'}
                                        onClick={handleDeleted}
                                        className={cls.submit}
                                    >
                                        Удалить изображение
                                    </Button>
                                )}
                                <Button
                                    onClick={handleUpload}
                                    className={cls.submit}
                                >
                                    Загрузить изображение
                                </Button>
                            </>
                        )}
                        <Result status={status} />
                    </>
                )}
            </VStack>
        </>
    );
};
