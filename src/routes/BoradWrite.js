import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";



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
    <div style={{ padding: "10% 0px 0px 0px" }} className="outer-div">
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
    </div>
  );
}


export default BoradWrite;