import Nweet from "components/Nweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import "resources/css/borad.css";
import { Link } from "react-router-dom";
import ClaValue from "./ClaValue";
import ClaInput from "./ClaInput";




const ClaValues = ({ClaObj, name}) => {
  const [value, setValue] = useState();
  console.log(ClaObj);
  
  
  return (
    <div>
      <div>
        {ClaObj.weight}
        </div>
    </div>
  );
}


export default ClaValues;
