import Test from "components/ClaValue";
import ClaInput from "components/ClaInput";
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "resources/css/calendar2.css";
import moment, { isDate } from 'moment';
import { dbService } from "fbase";
import ClaValues from "components/ClaValue";


const CalendarApp = ({userObj, petObj}) => {
  const [Pets, setPets] = useState([])
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
  const url = new URL(window.location.href);
  const urlParams = url.searchParams;
  const Pulse = urlParams.get('data');
  const [Cla, setCla] = useState({
    weight: '',
    dry: '',
    wet:'',
    snack:'',
    water:'',
    poo:'',
    symptom:'',
    vomit:'',
    heart:'',
    diary:'',
  });
  const [Clas, setClas] = useState([])
  const {weight, dry, wet, snack ,water, poo, symptom, vomit, heart ,diary}  = Cla;
  const [date, setDate] = useState(new Date());
  
  const onSubmit= async (event) => {
    event.preventDefault();
    //뉴윗 추가
    await dbService.collection("Claendar").add({
        weight:weight,
        dry:dry,
        wet:wet,
        snack:snack,
        water:water,
        poo:poo,
        symptom:symptom,
        vomit:vomit,
        diary:diary,
        heart: Pulse,
        createDate: moment(date).format("YYYY년 MM월 DD일"),
        creatorId: userObj.uid,
    });
    setCla({
      weight: '',
      dry: '',
      wet:'',
      snack:'',
      water:'',
      poo:'',
      symptom:'',
      vomit:'',
      heart:'',
      diary:'',
    });
  };
  const onChangeCla = (event) => {
    const {name, value} =event.target;
    setCla({
      ...Cla,
      [name]:value
    });
  };
  const onFilechange =(event) => {
      const {
          target : {files},
      } =event;
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent)=> {
          
      };
      reader.readAsDataURL(theFile);
  };
  useEffect(()=> {
    //뉴윗 실시간 변동
    dbService.collection("Claendar").onSnapshot((snapshot) => {
        const claArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setClas(claArray);
      });
  },[]);
  const show = () => {Clas.map((cla) => {
              
    if(cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
      
      return <Test key={cla.id} ClaObj={cla} />
    }
    
  })}
  return (
    <div style={{padding:"100px 0px 0px 0px"}}>
      <div >
        <div>
        <Calendar onChange={setDate} value={date} formatDay={(locale, date) => moment(date).format("DD")} />
        </div>
        
      </div>
      {/* 달력 */}

      <text>상태</text>
          
            <form onSubmit={onSubmit}>
              <div>{Pets.map((pet) => {
                      if(pet.creatorId === userObj.uid) {
                        return (
                          <div>
                            <div className="box">
                              <img className="profile" src={pet.attachmentUrl} alt=""/>
                            </div>
                            <div><h4>{pet.p_name}</h4></div>
                          </div>
                        )
                      }
                    })}
              </div>
              
              <ClaInput 
                name='weight'
                value={weight} 
                onChange={onChangeCla} 
                type="text" 
                placeholder="weight" 
                maxLength={120}
                img="icon01"
                Clas = {Clas}
              />
              {Clas.map((cla) => {
              if(cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                return <div>{cla.weight}</div>
              }
              
              })}
              

              <ClaInput 
                name='dry'
                value={dry} 
                onChange={onChangeCla} 
                type="text" 
                placeholder="dry" 
                maxLength={120}
                img="icon02"
              />
              {Clas.map((cla) => {
              if(cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                return <div>{cla.dry}</div>
              }
              })}

              <ClaInput 
                name='wet'
                value={wet} 
                onChange={onChangeCla} 
                type="text" 
                placeholder="wet" 
                maxLength={120}
                img="icon03"
              />  
              {Clas.map((cla) => {
              if(cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                return <div>{cla.wet}</div>
              }
              
              })}
              <ClaInput 
                name='snack'
                value={snack} 
                onChange={onChangeCla} 
                type="text" 
                placeholder="snack" 
                maxLength={120}
                img="icon04"
              />                  
                {Clas.map((cla) => {
              if(cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                return <div>{cla.snack}</div>
              }
              })}

                <ClaInput 
                name='water'
                value={water} 
                onChange={onChangeCla} 
                type="text" 
                placeholder="water" 
                maxLength={120}
                img="icon05"
              />                
              {Clas.map((cla) => {
              if(cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                return <div>{cla.water}</div>
              }
              })}

              <ClaInput 
                name='poo'
                value={poo} 
                onChange={onChangeCla} 
                type="text" 
                placeholder="poo" 
                maxLength={120}
                img="poo"
              />  
              {Clas.map((cla) => {
              if(cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                return <div>{cla.poo}</div>
              }
              })}
              
              <ClaInput 
                name='symptom'
                value={symptom} 
                onChange={onChangeCla} 
                type="text" 
                placeholder="symptom" 
                maxLength={120}
                img="icon07"
              />  
              {Clas.map((cla) => {
              if(cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                return <div>{cla.symptom}</div>
              }
              })}              
                
              <ClaInput 
                name='vomit'
                value={vomit} 
                onChange={onChangeCla} 
                type="text" 
                placeholder="vomit" 
                maxLength={120}
                img="icon08"
              />    
              {Clas.map((cla) => {
              if(cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                return <div>{cla.vomit}</div>
              }
              })}

              <ClaInput 
                name='Pulse'
                value={Pulse} 
                onChange={onChangeCla} 
                type="text" 
                placeholder="Pulse" 
                maxLength={120}
                img="icon10"
              />    
              {Clas.map((cla) => {
              if(cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                return <div>{cla.heart}</div>
              }
              })}                            
              
              <ClaInput 
                name='diary'
                value={diary} 
                onChange={onChangeCla} 
                
                type="text" 
                placeholder="diary" 
                maxLength={120}
                img="icon09"
              />
              {Clas.map((cla) => {
              if(cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                return <div>{cla.diary}</div>
              }
              })}

              <div>                            
              <input type="submit" value="쓰기"/>
              </div>
            </form>
    </div>
  );
}


export default CalendarApp;
