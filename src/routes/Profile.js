import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import AppRouter from "components/Router";
import "resources/css/loginform.css";
import "resources/css/borad.css";
import "resources/css/button.css";
import "resources/css/profile.css";
import "resources/css/profiletest.css";






const Profile = ({ isOwner, userObj }) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
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
    return (
        <div style={{ padding: "100px 0px 0px 0px" }}>
            <div>{Pets.map((pet) => {
                if (pet.creatorId === userObj.uid) {
                    return (
                        <div>
                            <div class="container bootstrap snippets bootdey">
                                <div class="row">
                                    <div class="profile-nav col-md-3">
                                        <div class="panel">
                                            <div class="user-heading round">
                                                <a href="#">
                                                    <img className="profile" src={pet.attachmentUrl} alt="" />
                                                </a>
                                                <h1>{pet.p_name}</h1>
                                                <p>deydey@theEmail.com</p>
                                            </div>

                                            <ul class=" nav-pills nav-stacked">
                                                <li class="active"><a href="#"> <i class="fa fa-user"></i> Profile </a></li>
                                                <li><Link to="/Petwrite"><a href="#">  <i class="fa fa-edit"> </i> 프로필 편집하기 </a></Link></li>
                                                <li><a onClick={onLogOutClick}><i class="fa fa-edit" onClick={onLogOutClick}> </i> log out </a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="profile-info col-md-9">
                                        <div class="panel">

                                            <footer class="panel-footer">
                                                <button class="btn btn-warning pull-right">Post</button>
                                                <ul class="nav nav-pills">
                                                    <li>
                                                        <a href="#"><i class="fa fa-map-marker"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i class="fa fa-camera"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i class=" fa fa-film"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i class="fa fa-microphone"></i></a>
                                                    </li>
                                                </ul>
                                            </footer>
                                        </div>
                                        <div class="panel">
                                            <div class="bio-graph-heading">
                                                {pet.profile} &#128044;
                                            </div>
                                            <div class="panel-body bio-graph-info">
                                                <div className="h1_st"><h1>&#128212;{pet.p_name}를 소개 합니다</h1></div>
                                                <div className="box_wrapper">
                                                    <div class="row">
                                                        <div class="bio-row">
                                                            <p className="underline"><span>반려동물 나이 </span>: {pet.p_age}</p>
                                                        </div>
                                                        <div class="bio-row">
                                                            <p className="underline"><span>반려동물 성별 </span>: {pet.p_gen}</p>
                                                        </div>
                                                        <div class="bio-row">
                                                            <p className="underline"><span>혈액형 </span>: {pet.blood}</p>
                                                        </div>
                                                        <div class="bio-row">
                                                            <p className="underline"><span>반려동물 종</span>: {pet.p_num}</p>
                                                        </div>
                                                        <div class="bio-row">
                                                            <p className="underline"><span>반려동물 생일 </span>: {pet.birth}</p>
                                                        </div>
                                                        <div class="bio-row">
                                                            <p className="underline"><span>중성화 여부 </span>: {pet.neutering}</p>
                                                        </div>
                                                        <div class="bio-row">
                                                            <p className="underline"><span>기념일 </span>: {pet.anniversary}</p>
                                                        </div>
                                                        <div class="bio-row">
                                                            <p className="underline"><span>생존 상태 </span>: {pet.state}</p>
                                                        </div>
                                                        <div class="bio-row">
                                                            <p className="underline"><span>질환 </span>: {pet.p_disease}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    );
                }

            })}</div>

        </div>
    );
};

export default Profile;