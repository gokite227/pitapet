import Test from "components/ClaValue";
import ClaInput from "components/ClaInput";
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "resources/css/calendar2.css";
import moment, { isDate } from 'moment';
import { dbService } from "fbase";
import ClaValues from "components/ClaValue";
import "resources/css/style.css";
import { Link } from "react-router-dom";

const CalendarApp = ({ userObj, petObj }) => {
  const [Pets, setPets] = useState([])
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
  const url = new URL(window.location.href);
  const urlParams = url.searchParams;
  const Pulse = urlParams.get('data');
  const [Cla, setCla] = useState({
    weight: '',
    dry: '',
    wet: '',
    snack: '',
    water: '',
    poo: '',
    symptom: '',
    vomit: '',
    heart: '',
    diary: '',
  });
  const [Clas, setClas] = useState([])
  const { weight, dry, wet, snack, water, poo, symptom, vomit, heart, diary } = Cla;
  const [date, setDate] = useState(new Date());

  const onSubmit = async (event) => {
    event.preventDefault();
    //뉴윗 추가
    await dbService.collection("Claendar").add({
      weight: weight,
      dry: dry,
      wet: wet,
      snack: snack,
      water: water,
      poo: poo,
      symptom: symptom,
      vomit: vomit,
      diary: diary,
      heart: Pulse,
      createDate: moment(date).format("YYYY년 MM월 DD일"),
      creatorId: userObj.uid,
    });
    setCla({
      weight: '',
      dry: '',
      wet: '',
      snack: '',
      water: '',
      poo: '',
      symptom: '',
      vomit: '',
      heart: '',
      diary: '',
    });
  };
  const onChangeCla = (event) => {
    const { name, value } = event.target;
    setCla({
      ...Cla,
      [name]: value
    });
  };
  const onFilechange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {

    };
    reader.readAsDataURL(theFile);
  };
  useEffect(() => {
    //뉴윗 실시간 변동
    dbService.collection("Claendar").onSnapshot((snapshot) => {
      const claArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClas(claArray);
    });
  }, []);
  const show = () => {
    Clas.map((cla) => {

      if (cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {

        return <Test key={cla.id} ClaObj={cla} />
      }

    })
  }
  return (
    <div style={{ width: "100vw" }}>
      <div class="page-wrapper bg-gra-03 p-t-130 p-b-100 font-poppins">
        <div class="wrapper wrapper--w680">
          <div class="card card-4">
            <div class="card-body">
              <h2 class="title">Pet Health Record</h2>

              <div className="outer outer1">
                {Pets.map((pet) => {
                  if (pet.creatorId === userObj.uid) {
                    return (
                      <div>
                        <div className="box">
                          <img className="profile" src={pet.attachmentUrl} alt="" />
                        </div>
                        <div><h2>{pet.p_name}</h2></div>
                      </div>
                    )
                  }
                })}
              </div>
              <div className="outer" style={{padding: "0px 0px 50px 0px"}}>
                <Calendar onChange={setDate} value={date} formatDay={(locale, date) => moment(date).format("DD")} />
              </div>
              <form onSubmit={onSubmit}>

                <div class="row row-space">
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet weight</label>
                      <p className="val">
                      {Clas.map((cla) => {
                        if (cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                          return <div>{cla.weight}kg</div>
                        }
                      })}
                      </p>
                      <input
                        class="p_input input--style-4"
                        name='weight'
                        value={weight}
                        onChange={onChangeCla}
                        type="text"
                         />
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet Dry</label>
                      <p className="val">
                      {Clas.map((cla) => {
                        if (cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                          return <div>{cla.dry}g</div>
                        }
                      })}
                      </p>
                      <input
                        class="p_input input--style-4"
                        name='dry'
                        value={dry}
                        onChange={onChangeCla}
                        type="text"
                        
                      />
                    </div>
                  </div>
                </div>

                <div class="row row-space">
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet Wet</label>
                      <p className="val">
                      {Clas.map((cla) => {
                        if (cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                          return <div>{cla.wet}g</div>
                        }
                      })}
                      </p>
                      <input
                        class="p_input input--style-4"
                        name='wet'
                        value={wet}
                        onChange={onChangeCla}
                        type="text"
                         />
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet snack</label>
                      <p className="val">
                      {Clas.map((cla) => {
                        if (cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                          return <div>{cla.snack}g</div>
                        }
                      })}
                      </p>
                      <input
                        class="p_input input--style-4"
                        name='snack'
                        value={snack}
                        onChange={onChangeCla}
                        type="text"
                       
                      />
                    </div>
                  </div>
                </div>

                <div class="row row-space">
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet water</label>
                      <p className="val">
                      {Clas.map((cla) => {
                        if (cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                          return <div>{cla.water}mL</div>
                        }
                      })}
                      </p>
                      <input
                        class="p_input input--style-4"
                        name='water'
                        value={water}
                        onChange={onChangeCla}
                        type="text"
                         />
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet poo</label>
                      <p className="val">
                      {Clas.map((cla) => {
                        if (cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                          return <div>{cla.poo}</div>
                        }
                      })}
                      </p>
                      <input
                        class="p_input input--style-4"
                        name='poo'
                        value={poo}
                        onChange={onChangeCla}
                        type="text"
                        
                      />
                    </div>
                  </div>
                </div>
                <div class="row row-space">
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet symptom</label>
                      <p className="val">
                      {Clas.map((cla) => {
                        if (cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                          return <div>{cla.symptom}</div>
                        }
                      })}
                      </p>
                      <input
                        class="p_input input--style-4"
                        name='symptom'
                        value={symptom}
                        onChange={onChangeCla}
                        type="text"
                         />
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet vomit</label>
                      <p className="val">
                      {Clas.map((cla) => {
                        if (cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                          return <div>{cla.vomit}</div>
                        }
                      })}
                      </p>
                      <input
                        class="p_input input--style-4"
                        name='vomit'
                        value={vomit}
                        onChange={onChangeCla}
                        type="text"
                        
                      />
                    </div>
                  </div>
                </div>

                <div class="row row-space">
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet heart</label>
                      <p className="val">
                      {Clas.map((cla) => {
                        if (cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                          return <div>{cla.heart}</div>
                        }
                      })}
                      </p>
                      <input
                        class="p_input input--style-4"
                        name='Pulse'
                        value={Pulse}
                        onChange={onChangeCla}
                        type="text"
                         />
                        <Link  to="/Loding"><img src={require("resources/imgs/icon10.png")} style={{height:"50px"}}/></Link>
                        
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="input-group">
                      <label class="label">Pet diary</label>
                      <p className="val">
                      {Clas.map((cla) => {
                        if (cla.creatorId === userObj.uid && cla.createDate === moment(date).format("YYYY년 MM월 DD일")) {
                          return <div>{cla.diary}</div>
                        }
                      })}
                      </p>
                      <input
                        class="p_input input--style-4"
                        name='diary'
                        value={diary}
                        onChange={onChangeCla}

                        type="text"
                       
                      />
                    </div>
                  </div>
                </div>
                <div class="p-t-15 outer">
                  <input class="btn btn--radius-2 btn--blue" type="submit" value="Submit" />

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


      
    </div>
  );
}


export default CalendarApp;