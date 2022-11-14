var myVideo;

document.addEventListener("DOMContentLoaded", (event) => {
    myVideo = document.getElementById("local_vid");
    myVideo.onloadeddata = () => { console.log("W,H: ", myVideo.videoWidth, ", ", myVideo.videoHeight); };
    // var muteBttn = document.getElementById("bttn_mute");
    // var muteVidBttn = document.getElementById("bttn_vid_mute");
    // var callEndBttn = document.getElementById("call_end");

    // muteBttn.addEventListener("click", (event)=>{
    //     audioMuted = !audioMuted;
    //     setAudioMuteState(audioMuted);        
    // });    
    // muteVidBttn.addEventListener("click", (event)=>{
    //     videoMuted = !videoMuted;
    //     setVideoMuteState(videoMuted);        
    // });    
    // callEndBttn.addEventListener("click", (event)=>{
    //     window.location.replace("/");
    // });

    // document.getElementById("room_link").innerHTML=`or the link: <span class="heading-mark">${window.location.href}</span>`;

});

function makeVideoElementCustom(element_id, display_name) {
    let vid = document.createElement("video");
    vid.id = "vid_" + element_id;
    vid.autoplay = true;
    return vid;
}

function addVideoElement(element_id, display_name) {
    document.getElementById("video_grid").appendChild(makeVideoElementCustom(element_id, display_name));
    checkVideoLayout();
}
function removeVideoElement(element_id) {
    let v = getVideoObj(element_id);
    if (v.srcObject) {
        v.srcObject.getTracks().forEach(track => track.stop());
    }
    v.removeAttribute("srcObject");
    v.removeAttribute("src");

    document.getElementById("vid_" + element_id).remove();
}

function getVideoObj(element_id) {
    return document.getElementById("vid_" + element_id);
}

const mode_s = document.getElementById('mute_icon'); 
mode_s.addEventListener('click', function setAudioMuteState(flag) {
    if (mode_s.innerText == 'mic off') {
        let local_stream = myVideo.srcObject;
        console.log("setAudioMuteState: ", local_stream);
        local_stream.getAudioTracks().forEach((track) => { track.enabled = !flag; });
        mode_s.innerText = 'mic on';
      } else {
        let local_stream = myVideo.srcObject;
        console.log("setAudioMuteState: ", local_stream);
        local_stream.getAudioTracks().forEach((track) => { track.enabled = flag; });
        mode_s.innerText = 'mic off';
      }
}); 

/*
const mode = document.getElementById('vid_mute_icon'); 
mode.addEventListener('click', function(){
    let local_stream = myVideo.srcObject;
    local_stream.getVideoTracks().forEach((track) => { track.enabled = !flag; });

    // switch button icon
    if (mode.innerText == 'videocam off') {
        mode.innerText = 'videocam on';
      } else {
        mode.innerText = 'videocam off';
      }
}); 
*/ 
const mode_v = document.getElementById('vid_mute_icon'); 
mode_v.addEventListener('click', function setVideoMuteState(flag) {
    if (mode_v.innerText == 'videocam off') {
        let local_stream = myVideo.srcObject;
        local_stream.getVideoTracks().forEach((track) => { track.enabled = !flag; });
        mode_v.innerText = 'videocam on';
      } else {
        let local_stream = myVideo.srcObject;
        local_stream.getVideoTracks().forEach((track) => { track.enabled = flag; });
        mode_v.innerText = 'videocam off';
      }
}); 
