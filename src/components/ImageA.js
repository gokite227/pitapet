import { Image } from 'dev-portfolio';
import { dbService } from "fbase";
import React, { useState } from "react";

const ImageA = ({nweetObj, src}) => {
  const url = `/${nweetObj.Id}`;
  return (
    <Image
      src={src}
      head={nweetObj.text}
      subhead=""
      redirectURL="/"
      noShowHead={false}
      zoomWhenHover={true}
      headSize="20px"
      headColor="black"
      headWeight="bold"
      subheadSize="14px"
      subheadColor="gray"
    />
  );
};

export default ImageA;