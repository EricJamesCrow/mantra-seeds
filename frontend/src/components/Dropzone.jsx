import React, {useMemo, useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';

import './Dropzone.css'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '60px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eaebf8',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

export default function StyledDropzone({ selectedImages, setSelectedImages }) {
  const [error, setError] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const files = acceptedFiles.map(file => 
        {if (!validFileTypes.find(type => type === file.type)) {
          setError('File must be in jpeg, jpg, or png format.');
          return;
        } else {
          return file;
        }});
      const newImages = [...selectedImages, ...files].slice(0, 5);
      setSelectedImages(newImages);
    }
  }, [selectedImages]);
  
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: {'image/*': []}, onDrop});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <div className="dropzone-container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drop your images here, or click to browse.</p>
      </div>
    </div>
  );
}