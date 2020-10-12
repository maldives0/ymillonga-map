import React, {useState, useRef } from 'react';

const App = () => {

    return(
        <>
       
   

   
        <div className="page">
            <div className="today-list">
                <h2>오늘의 밀롱가</h2>
                <div className="data-wrap">
                    <ul className="items"></ul>
                </div>
            </div>

        </div>
       
        <div className="nearbox">
            <div className="nearby">
            <h3>내주변 밀롱가</h3>
            <p>
                <span id="nearby_count">10</span><span>곳의 밀롱가 (내주변 </span><span id="nearby_dis">500m</span>)
            </p>
        </div>
            <div className="mapbox">
                <div className="distance f_a">
                    <a href="#">100m</a>
                    <a href="#">300m</a>
                    <a href="#">500m</a>
                    <a href="#">1km</a>
                    <a href="#">5km</a>
                    <a href="#">10km</a>
                </div>

                <div className="map"></div>
            </div>
            <div className="listbox">
                <ul>
                    <li className="f_b" >
                        <div className="leftsec"></div>
                        <div className="rightsec">
                            <h4 className="f_b">
                                1. 탱고카페
                                <span className="list_lo">충무로역</span>
                            </h4>
                            <p className="info f_b">
                                밀롱가, 탱고레슨
                                <span className="list_dis">362m</span>
                            </p>
                            <div className="appraisal">
                                <span className="like">371</span>
                                <span className="write">39</span>

                            </div>
                        </div>
                        <a href="#"></a>
                    </li>
                    <li className="f_b" >
                        <div className="leftsec"></div>
                        <div className="rightsec">
                            <h4 className="f_b">
                                1. 탱고카페
                                <span className="list_lo">충무로역</span>
                            </h4>
                            <p className="info f_b">
                                밀롱가, 탱고레슨
                                <span className="list_dis">362m</span>
                            </p>
                            <div className="appraisal">
                                <span className="like">371</span>
                                <span className="write">39</span>

                            </div>
                        </div>
                        <a href="#"></a>
                    </li>
                    <li className="f_b" >
                        <div className="leftsec"></div>
                        <div className="rightsec">
                            <h4 className="f_b">
                                1. 탱고카페
                                <span className="list_lo">충무로역</span>
                            </h4>
                            <p className="info f_b">
                                밀롱가, 탱고레슨
                                <span className="list_dis">362m</span>
                            </p>
                            <div className="appraisal">
                                <span className="like">371</span>
                                <span className="write">39</span>

                            </div>
                        </div>
                        <a href="#"></a>
                    </li>
                </ul>
            </div>
            <div className="morebox f_b">
                <a className="morelist" href="calender.html">
                    달력으로 더보기
                </a>
                <a className="moremap" href="map.html">지도로 더보기</a>
            </div>
            
        </div>
        
    </div>
   
        </>
    );
};

export default App;