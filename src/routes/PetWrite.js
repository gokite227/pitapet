import AppRouter from "components/Router";
import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Profile from "./Profile";
import "resources/css/petWrite.css";

const PetWrite = ({ userObj }) => {
  const [Pet, setPet] = useState({
    p_name: '',
    p_age: '',
    p_gen: '',
    blood: '',
    p_num: '',
    birth: '',
    neutering: '',
    anniversary: '',
    state: '',
    p_disease: '',
    profile: '',
  });
  const [Pets, setPets] = useState([])
  const { p_name, p_age, p_gen, blood, p_num, birth, neutering, anniversary, state, p_disease, profile } = Pet;
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

    await dbService.collection("Pet").add({
      p_name: p_name,
      p_age: p_age,
      p_gen: p_gen,
      blood: blood,
      p_num: p_num,
      birth: birth,
      neutering: neutering,
      anniversary: anniversary,
      state: state,
      p_disease: p_disease,
      profile: profile,
      attachmentUrl,
      creatorId: userObj.uid,
    });
    setPet({
      p_name: '',
      p_age: '',
      p_gen: '',
      blood: '',
      p_num: '',
      birth: '',
      neutering: '',
      anniversary: '',
      state: '',
      p_disease: '',
      profile: '',
    });
    setAttachment("");
  };
  const onChangePet = (event) => {
    const { name, value } = event.target;
    setPet({
      ...Pet,
      [name]: value
    });
  };
  useEffect(() => {
    //뉴윗 실시간 변동
    dbService.collection("Pet").onSnapshot((snapshot) => {
      const petArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPets(petArray);
    });
  }, []);
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
    <div>
      <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <div class="wrapper wrapper--w680">
          <div class="card card-4">
            <div class="card-body">
              <h2 class="title">Pet Information</h2>
              <form onSubmit={onSubmit}>
                <div class="row row-space">
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet name</label>
                      <input
                        class="p_input input--style-4"
                        name='p_name'
                        value={p_name}
                        onChange={onChangePet}
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet age</label>
                      <input
                        class="p_input input--style-4"
                        name='p_age'
                        value={p_age}
                        onChange={onChangePet}
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="row row-space">
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">pet Gender</label>
                      <input
                        class="p_input input--style-4"
                        name='p_gen'
                        value={p_gen}
                        onChange={onChangePet}
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet Blood</label>
                      <input
                        class="p_input input--style-4"
                        name='blood'
                        value={blood}
                        onChange={onChangePet}
                        type="text"

                      />
                    </div>
                  </div>
                </div>
                <div class="row row-space">
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">pet Number</label>
                      <input
                        class="p_input input--style-4"
                        name='p_num'
                        value={p_num}
                        onChange={onChangePet}
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet BirthDay</label>
                      <input
                        class="p_input input--style-4"
                        name='birth'
                        value={birth}
                        onChange={onChangePet}
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="row row-space">
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">pet 중성화</label>
                      <input
                        class="p_input input--style-4"
                        name='neutering'
                        value={neutering}
                        onChange={onChangePet}
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet anniversary</label>
                      <input
                        class="p_input input--style-4"
                        name='anniversary'
                        value={anniversary}
                        onChange={onChangePet}
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="row row-space">
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">pet state</label>
                      <input
                        class="p_input input--style-4"
                        name='state'
                        value={state}
                        onChange={onChangePet}
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet disease</label>
                      <input
                        class="p_input input--style-4"
                        name='p_disease'
                        value={p_disease}
                        onChange={onChangePet}
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="row row-space">
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">pet profile</label>
                      <input
                        class="p_input input--style-4"
                        name='profile'
                        value={profile}
                        onChange={onChangePet}
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet Photo</label>
                      <input type="file" accept="image/*" onChange={onFilechange} />
                    </div>
                  </div>
                </div>
                {attachment && (
                        <div>
                          <img src={attachment} width="100vw" height="100vh" />
                          <button onClick={onClearAttachment}>Clear</button>
                        </div>
                      )}
                <div class="p-t-15">
                  <input class="btn btn--radius-2 btn--blue" type="submit" value="Submit" />
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <h1 fill="#ede9de">반려동물 등록</h1>
      <form onSubmit={onSubmit}>
        <p>반려동물 프로필 사진</p>
        <input type="file" accept="image/*" onChange={onFilechange} />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
        <p>반려동물 이름</p>
        <input
          name='p_name'
          value={p_name}
          onChange={onChangePet}
          type="text"
          placeholder="p_name"
          maxLength={120}
        />
        <p>반려동물 나이</p>
        <input
          name='p_age'
          value={p_age}
          onChange={onChangePet}
          type="text"
          placeholder="p_age"
          maxLength={120}
        />
        <p>반려동물 성별</p>
        <input
          name='p_gen'
          value={p_gen}
          onChange={onChangePet}
          type="text"
          placeholder="p_gen"
          maxLength={120}
        />
        <p>반려동물 혈액형</p>
        <input
          name='blood'
          value={blood}
          onChange={onChangePet}
          type="text"
          placeholder="blood"
          maxLength={120}
        />
        <p>반려동물 등록번호</p>
        <input
          name='p_num'
          value={p_num}
          onChange={onChangePet}
          type="text"
          placeholder="p_num"
          maxLength={120}
        />
        <p>반려동물 생일</p>
        <input
          name='birth'
          value={birth}
          onChange={onChangePet}
          type="text"
          placeholder="birth"
          maxLength={120}
        />
        <p>반려동물 중성화</p>
        <input
          name='neutering'
          value={neutering}
          onChange={onChangePet}
          type="text"
          placeholder="neutering"
          maxLength={120}
        />
        <p>반려동물 기념일</p>
        <input
          name='anniversary'
          value={anniversary}
          onChange={onChangePet}
          type="text"
          placeholder="anniversary"
          maxLength={120}
        />
        <p>반려동물 생존여부</p>
        <input
          name='state'
          value={state}
          onChange={onChangePet}
          type="text"
          placeholder="state"
          maxLength={120}
        />
        <p>반려동물 기저질환</p>
        <input
          name='p_disease'
          value={p_disease}
          onChange={onChangePet}
          type="text"
          placeholder="p_disease"
          maxLength={120}
        />
        <p>반려동물 소개글</p>
        <input
          name='profile'
          value={profile}
          onChange={onChangePet}
          type="text"
          placeholder="profile"
          maxLength={120}
        />
        <p> </p>
        <input type="submit" value="반려동물 등록" />
        <a href="">프로필로 돌아가기</a>

      </form> */}
    </div>
  );
};


export default PetWrite;