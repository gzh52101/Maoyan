import React,{useState, useCallback,useRef,useEffect} from 'react';
import { PullToRefresh, Button } from 'antd-mobile';
import ReactDOM from 'react-dom';
import '../scss/Video.scss'
function Video(){
    const [refreshing,seTrefreshing] = useState(false);
    const [down,seTdown] = useState(true);
    const [height,setHeight] = useState(document.documentElement.clientHeight)
    const [data,setData] =useState([])
    const [videoPlay,setVideoPlay] =useState(false);
    const pull = useRef(null)
    const video = useRef(null)
    const  getData  =()=> {
        const dataArr = [];
        for (let i = 0; i < 20; i++) {
          dataArr.push(i);
        }
        return dataArr;
      }

      useEffect(()=>{
        componentDidMount();
      },[])

   const  componentDidMount =()=>{
        const hei = height - ReactDOM.findDOMNode(pull.current).offsetTop;
        // console.log(pull);
        
    // console.log(ReactDOM.findDOMNode(pull.current));
    
        setTimeout(() => {
            setHeight(hei),
            setData(getData())
        }, 0);
      }
    
    return(
        <div className="video_box">
      <PullToRefresh
        damping={60}
        ref={pull}
        style={{
          height:height,
          overflow: 'auto',
          touchAction: 'none'
        }}
        indicator={down}
        direction={down ? 'down' : 'up'}
        refreshing={refreshing}
        onRefresh={() => {
          seTrefreshing(true)
          setTimeout(() => {
            seTrefreshing(false)
          }, 1000);
        }}
      >
        {/* {data.map(i => (
          <div key={i} style={{ textAlign: 'center', padding: 20 }}>
            {down ? 'pull down' : 'pull up'} {i}
          </div>
        ))} */}
           <div className="content">
                <div className="top_bar"></div>
                <video src="https://vod.pipi.cn/d5457264vodtranscq1251246104/434f04463701925919031339538/v.f42905.mp4"  width="400" height="100%" loop="loop" ref={video} x5-video-orientation="portraint" controlslist="nodownload" onClick={()=>{
                    if(videoPlay){
                        video.current.play();
                        setVideoPlay(false)
                    }else{
                        video.current.pause();
                        setVideoPlay(true)
                    }
                }}></video>
            </div>
      </PullToRefresh>
        </div>
    )
}

export default Video;