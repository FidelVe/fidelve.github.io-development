/*
 * */
import React from 'react';
import style from './image-link.module.css';

const ImageLink = ({imageFile, alt, link}) => {
  return (
    <div className={style.container}>
      <a
        className={style.link}
        href={link}
        target="_blank"
        rel="noopener noreferrer">
        <img className={style.img} src={imageFile} alt={alt} />
      </a>
    </div>
  );
};

export default ImageLink;
