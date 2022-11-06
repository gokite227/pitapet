import Nweet from "components/Nweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import "resources/css/borad.css";
import "resources/css/button.css";
import { Link } from "react-router-dom";
import { Masonry } from 'dev-portfolio';


const Borad= ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    
    useEffect(()=> {
        //뉴윗 실시간 변동
        dbService.collection("mweet").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                
            }));
            setNweets(nweetArray);
        });
    },[]);
    return(
        <div style={{width: "99vw",
        height: "100vh", backgroundColor:"#EDE9DE", padding:"100px 0px 0px 0px"}}>
            <div class="button-4">
                <div class="eff-4"></div>
                <Link  to="/Boradwrite">Write</Link>
            </div>
            
            <Masonry id="Masonry Component" column={4} padding="1em 2em">
            
                    {nweets.map((nweet) => (
                        //뉴윗 리스트 반환, 포롭스 전달
                        <Nweet 
                            key={nweet.id} 
                            nweetObj={nweet} 
                            isOwner={nweet.creatorId === userObj.uid}
                        />
                    ))}
                
            
            </Masonry>
        </div>
    );
};
export default Borad;