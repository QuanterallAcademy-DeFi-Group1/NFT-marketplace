import axios from 'axios';
import React, { useState } from 'react';

function UploadImage() {
    const [image, setImage] = useState(null);

    const handleClick = () => {
        axios
            .post('http://localhost:1337/image-upload', image)
            .then(res => {
                console.log('Axios response: ', res)
            });
    }
    const handleFileInput = (e) => {
        console.log('handleFileInput working!')
        console.log(e.target.files[0]);
        const formData = new FormData();
        formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
        setImage(formData);
    }
    return (
        <div>
            <h1>Image Upload Tutorial</h1>
            <button onClick={handleClick}>Upload!</button>
            <input type="file" onChange={handleFileInput} />
        </div>
    );
}

export default UploadImage;