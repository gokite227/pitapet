import AppRouter from "components/Router";
import { dbService, storageService  } from "fbase";
import React, { useEffect, useState } from "react";
import {v4 as uuidv4 } from "uuid";
import Profile from "./Profile";


const PetWrite = ({userObj}) => {
  const [Pet, setPet] = useState({
    p_name: '',
    p_age: '',
    p_gen:'',
    blood:'',
    p_num:'',
    birth:'',
    neutering:'',
    anniversary:'',
    state:'',
    p_disease:'',
    profile:'',
  });
  const [Pets, setPets] = useState([])
  const {p_name, p_age, p_gen, blood, p_num, birth, neutering, anniversary, state, p_disease, profile}  = Pet;
  const [attachment, setAttachment] = useState();

  const onSubmit= async (event) => {
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

    await dbService.collection("Pet").add({
      p_name:p_name,
      p_age:p_age,
      p_gen:p_gen,
      blood:blood,
      p_num:p_num,
      birth:birth,
      neutering:neutering,
      anniversary:anniversary,
      state:state,
      p_disease:p_disease,
      profile:profile,
      attachmentUrl,
      creatorId: userObj.uid,
    });
    setPet({
      p_name: '',
      p_age: '',
      p_gen:'',
      blood:'',
      p_num:'',
      birth:'',
      neutering:'',
      anniversary:'',
      state:'',
      p_disease:'',
      profile:'',
    });
    setAttachment("");
  };
  const onChangePet = (event) => {
    const {name, value} =event.target;
    setPet({
      ...Pet,
      [name]:value
    });
  };
  useEffect(()=> {
    //뉴윗 실시간 변동
    dbService.collection("Pet").onSnapshot((snapshot) => {
        const petArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPets(petArray);
      });
  },[]);
  const onFilechange =(event) => {
      const {
          target : {files},
      } =event;
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent)=> {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
    return (
      <div style={{width: "99vw",
      height: "100vh", backgroundColor:"#EDE9DE", padding:"100px 0px 0px 0px"}}>
        <text fill="#ede9de">반려동물 등록</text>
            <form onSubmit={onSubmit}>
                <input 
                    name='p_name'
                    value={p_name} 
                    onChange={onChangePet} 
                    type="text" 
                    placeholder="p_name" 
                    maxLength={120}
                />
                <input 
                    name='p_age'
                    value={p_age} 
                    onChange={onChangePet} 
                    type="text" 
                    placeholder="p_age" 
                    maxLength={120}
                />
                <input 
                    name='p_gen'
                    value={p_gen} 
                    onChange={onChangePet} 
                    type="text" 
                    placeholder="p_gen" 
                    maxLength={120}
                />
                <input 
                    name='blood'
                    value={blood} 
                    onChange={onChangePet} 
                    type="text" 
                    placeholder="blood" 
                    maxLength={120}
                />
                <input 
                    name='p_num'
                    value={p_num} 
                    onChange={onChangePet} 
                    type="text" 
                    placeholder="p_num" 
                    maxLength={120}
                />
                <input 
                    name='birth'
                    value={birth} 
                    onChange={onChangePet} 
                    type="text" 
                    placeholder="birth" 
                    maxLength={120}
                />
                <input 
                    name='neutering'
                    value={neutering} 
                    onChange={onChangePet} 
                    type="text" 
                    placeholder="neutering" 
                    maxLength={120}
                />
                <input 
                    name='anniversary'
                    value={anniversary} 
                    onChange={onChangePet} 
                    type="text" 
                    placeholder="anniversary" 
                    maxLength={120}
                />
                <input 
                    name='state'
                    value={state} 
                    onChange={onChangePet} 
                    type="text" 
                    placeholder="state" 
                    maxLength={120}
                />
                <input 
                    name='p_disease'
                    value={p_disease} 
                    onChange={onChangePet} 
                    type="text" 
                    placeholder="p_disease" 
                    maxLength={120}
                />
                <input 
                    name='profile'
                    value={profile} 
                    onChange={onChangePet} 
                    type="text" 
                    placeholder="profile" 
                    maxLength={120}
                />
                
                
                <input type="file" accept="image/*" onChange={onFilechange} />
                <input type="submit" value="쓰기"/>
                {attachment && (
                  <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                  </div>
                )}
            </form>
      </div>
    );
  };
  
  
  export default PetWrite;