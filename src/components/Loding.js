import React, { useEffect, useState } from "react";
import "resources/css/heartbeatBnt.css";

const Loding = () => {
    const [alert, setAlert] = useState(false);
    useEffect(() => {
        const show = setTimeout(() => { setAlert(true) }, 10000);
    });

    return (
        <div style={{ padding: "0px 0px 0px 0px" }}>
            <img src={require("resources/imgs/heart-beat.gif")} style={{ width: "100vw", height: "90vh" }} />
            {
                alert === false ?
                    null
                    :
                    <div className="outer-div">
                        <a href="http://172.20.10.2:8080/" ><button class="w-btn w-btn-green" type="button">결과확인</button></a>
                    </div>
            }
        </div>
    )
}




export default Loding;