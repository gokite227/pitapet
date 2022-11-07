import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "resources/css/boradWrite.css";




const BoradWrite = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();
    //뉴윗 추가
    let attachmentUrl = "";
    if (attachment != "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("mweet").add(nweetObj);
    setNweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  const onFilechange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
  return (
    <div class="container-contact100">
    <div class="wrap-contact100">
        <form class="contact100-form validate-form" onSubmit={onSubmit}>
            <h1 class="contact100-form-title" >
            게시글 입력
            </h1>
            <div class="wrap-input100 validate-input" data-validate="Please enter your name">
                <input class="input100 B_input" type="text" name="name"
                value={nweet}
            onChange={onChange}
            placeholder="한줄 소개를 작성해 주세요"/>
                <span class="focus-input100"></span>
            </div>
            
            <div class="wrap-input100 validate-input" data-validate="Please enter your message">
              <textarea class="input100 B_textarea" name="message" placeholder="사진을 선택해주세요"></textarea>
              <input type="file" accept="image/*" onChange={onFilechange} class="input100 B_input"/>
              {attachment && (
            <div class="input100 B_textarea">
              <img src={attachment} style={{ height: "20vh", padding:"0px 0px 5% 0px" }}  />
              <button onClick={onClearAttachment}>Clear</button>
            </div>
          )}
                <span class="focus-input100"></span>
            </div>
            <div class="container-contact100-form-btn">
                <button class="contact100-form-btn B_button" type="submit">
                    <span>
                        <i class="fa fa-paper-plane-o m-r-6" aria-hidden="true"></i>
                        Send
                    </span>
                </button>
            </div>
        </form>
    </div>
</div>



    /* <div style={{ padding: "10% 0px 0px 0px" }} className="outer-div">
      <div>
        <div className="outer-div">
          <h2>게시글 입력</h2>
        </div>
        <form onSubmit={onSubmit} >
          <input type="file" accept="image/*" onChange={onFilechange} className="outer-div" />
          {attachment && (
            <div>
              <img src={attachment} style={{ height: "20vh" }} className="outer-div" />
              <button onClick={onClearAttachment} className="outer-div" >Clear</button>
            </div>
          )}
          <input
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="게시글을 작성해 주세요"
            maxLength={120}
            style={{
              width: "80vw",
              height: "60vh"
            }}
            className="outer-div"
          />
          <div>
            <input className="outer-div" type="submit" value="쓰기" />
          </div>
        </form>
      </div>
    </div> */
  ); 
}


export default BoradWrite;