'use client';  // since this component has events and useRef/useState can needs to be executed on the browser. 


import { useRef, useState } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
        // this state is for previeweing the uploaded image.
        const [pickedImage, setPickedImage] = useState();
        const imageInput = useRef();

        function handlePickClick() {
                imageInput.current.click();
        }

        function handleImageChange(event) {
                const file = event.target.files[0];

                if (!file) {
                        setPickedImage(null);
                        return;
                }

                const fileReader = new FileReader();

                // here we are passing fileReader.result to setPickedImage
                // but the fileReader.result will be the URL of the image once fileReader.readAsDataURL(file) is executed.
                fileReader.onload = () => {
                        setPickedImage(fileReader.result);
                };

                // readAsDataURL does not return anything.
                fileReader.readAsDataURL(file);
        }

        return (
                <div className={classes.picker}>
                        <label htmlFor={name}>{label}</label>
                        <div className={classes.controls}>
                                <div className={classes.preview}>
                                        {!pickedImage && <p>No image picked yet.</p>}
                                        {pickedImage && (
                                                <Image
                                                        src={pickedImage}
                                                        alt="The image selected by the user."
                                                        fill
                                                />
                                        )}
                                </div>
                                <input
                                        className={classes.input}
                                        type="file"
                                        id={name}
                                        accept="image/png, image/jpeg"
                                        name={name}
                                        ref={imageInput}
                                        onChange={handleImageChange}
                                        required
                                />
                                <button
                                        className={classes.button}
                                        type="button"
                                        onClick={handlePickClick}
                                >
                                        Pick an Image
                                </button>
                        </div>
                </div>
        );
}