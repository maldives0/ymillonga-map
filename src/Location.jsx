
const Header = () => {

return (
<>
<div className="location f_b">
<span>현위치 : 서초구 서초동</span>
<button className="f_a">
    <img src="img/ic_location.png" alt=""> 업데이트
</button>
</div>
<div className="background">
<div className="searchbox">
    <div className="inputarea f_b">
        <input type="text" value placeholder="밀롱가 검색하기">
        <div>
            <a href="#"><img src="img/ic_search.png" alt=""></a>
        </div>
    </div>
</div>
</>
);
};
export default Header;
