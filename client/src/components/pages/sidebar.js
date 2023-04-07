import React from "react";
import "../CSS/index.css";
import axios from "axios";
import { useAuth } from "../Hooks/useHook";
import { useRef, useState, useEffect, useCallback } from "react";
import IP from "../../env.js";
import { random } from "lodash";
//import { connect } from "../../../../routes/messages";

const DefaultSidebar = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          height: "5vh",
        }}
      >
        <h3>-</h3>
        <button>Mute</button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          height: "60vh",
          rowGap: "40px",
        }}
      >
        <button>MULTICALL PTT</button>
        <div>
          <span>
            <label htmlFor="lictype">&nbsp;</label>
          </span>
          <select
            id="id1"
            //    onChange={(e) => {
            //       onSelectType(e.target.value);
            //     }}
            //     value={updateType}
            required
          >
            <option value={"0"}></option>
            <option value={"ptt"}>PTT User Account</option>
            <option value={"dispatcher"}>Dispatcher Account</option>
            <option value={"control"}>Control Station</option>
          </select>
        </div>
      </div>
    </>
  );
};

const MultiCallSideBar = () => {
  const { user, multiCallRowIds, setMultiCallRowIds } = useAuth();
  const handleButtonOnClick = () => {
    console.log("Clear All");
    setMultiCallRowIds([]);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          rowGap: "40px",
          paddingTop: "40px",
        }}
      >
        <button>MULTICAST PTT</button>
        <div>
          <span>
            <label htmlFor="lictype">&nbsp;</label>
          </span>
          <select>
            {multiCallRowIds.map((rowId) => (
              <option value={rowId.AliaseName}>{rowId.AliaseName}</option>
            ))}
          </select>
          <button onClick={() => handleButtonOnClick()}>Clear All</button>
        </div>
      </div>
    </>
  );
};

const APPMultiCall = () => {
  const { user, multiCallRowIds, setMultiCallRowIds } = useAuth();
  const handleButtonOnClick = () => {
    console.log("Clear All");
    setMultiCallRowIds([]);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          rowGap: "40px",
          paddingTop: "40px",
        }}
      >
        <button>MULTICALL</button>
        <div>
          <span>
            <label htmlFor="lictype">&nbsp;</label>
          </span>
          <select>
            {multiCallRowIds.map((rowId) => (
              <option value={rowId.AliasName}>{rowId.AliasName}</option>
            ))}
          </select>
          <button onClick={() => handleButtonOnClick()}>Clear All</button>
        </div>
      </div>
    </>
  );
};

const MessageSidebar = () => {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState("0");
  const [messageBtn, setMessageBtn] = useState(true);
  const handleButtonOnClick = () => {
    // console.log("Clear All");
    // setMultiCallRowIds([]);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setSelectedSub(0);
    // console.log(multiCallRowIds);
    if (event.target.value === "private") {
      // Execute the desired action, such as displaying a message or redirecting to a page
      // alert("Private option selected!");
    } else if (event.target.value === "group") {
    } else if (event.target.value === "all") {
    }
  };

  const subscribers = [
    { id: 1, name: "Subscriber 1" },
    { id: 2, name: "Subscriber 2" },
  ];
  const talkgroups = [
    { id: 5, name: "TalkGroup 1" },
    { id: 6, name: "TalkGroup 2" },
  ];
  const [selectedSub, setSelectedSub] = useState(0);
  const [messageText, setMessageText] = useState("");
  const handleSubChange = (event) => {
    //alert(event.target.value);
    // setSelectedOption("group");
    console.log(selectedSub);
    setSelectedSub(event.target.value);
    setMessageBtn(false);
  };
  const div_visibiltity = messageBtn ? "hidden" : "visible";
  const messageBoxStyle = {
    width: "263px",
    height: "144px",
    visibility: div_visibiltity,
    // border: "1px solid #ccc",
    // padding: "10px",
  };

  const inputStyle = {
    width: "100%",
    height: "100%",
    resize: "none",
  };
  const MAX_CHARACTERS = 140;
  const charactersLeft = MAX_CHARACTERS - messageText.length;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          rowGap: "40px",
          paddingTop: "40px",
        }}
      >
        <button disabled={messageBtn}>SEND MESSAGE</button>
        <div>
          <span>
            <label htmlFor="lictype">&nbsp;</label>
          </span>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="private">Private</option>
            <option value="group">Group</option>
            <option value="all">All</option>
          </select>
          {selectedOption === "private" && (
            <select onChange={handleSubChange}>
              <option value={selectedSub}>Select a Subscriber</option>
              {subscribers.map((subscriber) => (
                <option key={subscriber.id} value={subscriber.id}>
                  {subscriber.name}
                </option>
              ))}
            </select>
          )}
          {selectedOption === "group" && (
            <select onChange={handleSubChange}>
              <option value={selectedSub}>Select a TalkGroup</option>
              {talkgroups.map((subscriber) => (
                <option key={subscriber.id} value={subscriber.id}>
                  {subscriber.name}
                </option>
              ))}
            </select>
          )}
          <button onClick={() => handleButtonOnClick()}>Clear All</button>
        </div>
        <div style={messageBoxStyle}>
          <textarea
            className="message-box-input"
            style={inputStyle}
            value={messageText}
            maxLength={MAX_CHARACTERS}
            onChange={(e) => setMessageText(e.target.value)}
          />
        </div>
        <div
          style={{
            color: charactersLeft < 0 ? "white" : "black",
            visibility: div_visibiltity,
          }}
        >
          {charactersLeft} characters left
        </div>
      </div>
    </>
  );
};

const CSCall = () => {
  const { user, multiCallRowIds, setMultiCallRowIds } = useAuth();
  const handleButtonOnClick = () => {
    // console.log("Clear All");
    // setMultiCallRowIds([]);
  };

  const [selectedOption, setSelectedOption] = useState("all");

  const subscribers = [
    { id: 1, name: "Subscriber 1" },
    { id: 2, name: "Subscriber 2" },
  ];
  const [selectedSub, setSelectedSub] = useState(0);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setSelectedSub(0);
    console.log(multiCallRowIds);
    if (event.target.value === "private") {
      // Execute the desired action, such as displaying a message or redirecting to a page
      // alert("Private option selected!");
    } else if (event.target.value === "group") {
    } else if (event.target.value === "all") {
    }
  };

  const handleSubChange = (event) => {
    //alert(event.target.value);
    // setSelectedOption("group");
    console.log(selectedSub);
    setSelectedSub(event.target.value);
  };

  const talkgroups = [
    { id: 5, name: "TalkGroup 1" },
    { id: 6, name: "TalkGroup 2" },
  ];

  const handleButtonTalk = () => {
    if (selectedSub == 0) {
      alert("Select the value");
      return;
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          rowGap: "40px",
          paddingTop: "40px",
        }}
      >
        <button onClick={() => handleButtonTalk()}>PUSH TO TALK</button>
        <div>
          <span>
            <label htmlFor="lictype">&nbsp;</label>
          </span>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="private">Private</option>
            <option value="group">Group</option>
            <option value="all">All</option>
          </select>
          {selectedOption === "private" && (
            <select onChange={handleSubChange}>
              <option value={selectedSub}>Select a Subscriber</option>
              {subscribers.map((subscriber) => (
                <option key={subscriber.id} value={subscriber.id}>
                  {subscriber.name}
                </option>
              ))}
            </select>
          )}
          {selectedOption === "group" && (
            <select onChange={handleSubChange}>
              <option value={selectedSub}>Select a TalkGroup</option>
              {talkgroups.map((subscriber) => (
                <option key={subscriber.id} value={subscriber.id}>
                  {" "}
                  {subscriber.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </>
  );
};

const APPCall = () => {
  const { user, multiCallRowIds, setMultiCallRowIds, websocket } = useAuth();
  const [callButton, setCallButton] = useState(false);
  const chunkRef = useRef((data) => {});
  const dataChannelRef = useRef(null);
  const [audioContext, setAudioContext] = useState(
    new AudioContext({ sampleRate: 8000 })
  );
  const sequenceNoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const metaDataRef = useRef(null);
  let pc;

  const handleButtonOnClick = () => {
    // console.log("Clear All");
    // setMultiCallRowIds([]);
  };
  useEffect(() => {
    //console.log(navigator);
    // const ws = new WebSocket("wss://172.105.39.25:8080");
    // ws.onopen = () => {
    //   console.log("WS OPEN");
    //   ws.send(JSON.stringify("HEllO"));
    //   createPeerConnection(ws);
    // };
    websocket.addEventListener("message", handleData);

    if (websocket) createPeerConnection();
    //websocket.send("HEllO from new websocket");
    //websocketref.current = ws;
    // setWebSocket({ ws: ws });

    // Check if MediaStream object is not present in the ref

    let key = localStorage.getItem("key");
    console.log(key);
    return () => {
      websocket.removeEventListener("message", handleData);
    };
  }, [websocket]);

  useEffect(() => {
    const setupMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        //    let no = Math.random() * 100;
        //   console.log(no.toString());
        mediaStreamRef.current = stream;
        const source = audioContext.createMediaStreamSource(stream);
        const scriptNode = audioContext.createScriptProcessor(512, 1, 1);
        sequenceNoRef.current = 0;
        const audioprocessfunction = (event) => {
          //   console.log("OnAudio Process");
          //   console.log(no.toString());
          const inputBuffer = event.inputBuffer;
          const inputData = inputBuffer.getChannelData(0);
          const pcmData = new Uint8Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            pcmData[i] = Math.round(inputData[i] * 127 + 128);
          }
          // if (callButton) sendChunkstoServer(pcmData);
          chunkRef.current(pcmData);
          sequenceNoRef.current = sequenceNoRef.current + 1;
        };
        scriptNode.onaudioprocess = audioprocessfunction;
        source.connect(scriptNode);
        scriptNode.connect(audioContext.destination);

        return () => {
          console.log("CLEAN UP--------");
          source.disconnect();
          scriptNode.removeEventListener("audioprocess", audioprocessfunction);
          scriptNode.onaudioprocess = null;
          scriptNode.disconnect();
        };
      } catch (error) {
        console.log(error);
      }
    };
    setupMediaStream();
    const cleanupFunction = async () => {
      const cleanup = await setupMediaStream();
      cleanup();
    };
    return () => {
      cleanupFunction();
    };
  }, []);

  useEffect(() => {
    chunkRef.current = (data) => {
      if (callButton) {
        // websocketref.current.send(JSON.stringify(data));
        console.log(metaDataRef.current);
        let message = {
          metadata: metaDataRef.current,
          audio: data,
          seqno: sequenceNoRef.current,
        };

        dataChannelRef.current.send(JSON.stringify(message));
      }
    };
  }, [callButton]);

  const handleData = (event) => {
    const data = JSON.parse(event.data);
    console.log("Message");
    //  console.log(data);
    if (data.type == "offer") {
    } else if (data.type == "candidate") {
      if (data.candidate) pc.addIceCandidate(data.candidate);
    } else if (data.type == "answer") {
      pc.setRemoteDescription(data);
      console.log("answer done");
    }
  };

  const sendChunkstoServer = (data) => {
    if (callButton) console.log(data);
    // console.log(data);
  };

  const handleMessage = async (data, ws) => {};
  const createPeerConnection = async () => {
    console.log("Create Peer Connection");
    let configuration = {
      iceServers: [{ url: "stun:stun.1.google.com:19302" }],
    };
    // set up peer connection

    pc = new RTCPeerConnection(configuration);
    pc.onicecandidate = (event) => {
      console.log("ICE Candidate");
      console.log(event.candidate);
      websocket.send(
        JSON.stringify({ type: "candidate", candidate: event.candidate })
      );
    };
    pc.onicegatheringstatechange = () => {
      console.log("ICE gathering state:", pc.iceGatheringState);
    };
    pc.oniceconnectionstatechange = (event) => {
      console.log("On Connection state change");
      if (
        pc.iceConnectionState === "closed" ||
        pc.iceConnectionState === "failed" ||
        pc.iceConnectionState === "disconnected"
      ) {
        // Handle the connection close event here
        console.log("Peer Connection closed");
        console.log(pc.iceConnectionState);
      }
    };

    let dataChannel = pc.createDataChannel("mychannel");
    dataChannel.onerror = (error) => {
      console.log("Data Channel Error:", error);
    };

    dataChannel.onmessage = (event) => {
      console.log("Got Data Channel Message:", event.data);
    };

    dataChannel.onopen = () => {
      // dataChannel.send("Hello World!");
    };

    dataChannel.onclose = () => {
      console.log("The Data Channel is Closed");
    };
    //setDataChannel(dataChannel);
    dataChannelRef.current = dataChannel;
    pc.ondatachannel = (event) => {
      console.log("data channel");
    };
    pc.onsignalingstatechange = (event) => {
      console.log("state change");
    };
    let offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    console.log(offer);
    websocket.send(JSON.stringify(offer));
    // pc.ondatachannel = (event) => {
    //   console.log("Data Channel Event");
    // };
    // setPeerConnection(pc);
    //  conn.send(JSON.stringify({ open: true }));
    console.log("done");
  };

  const receiveChannelCallback = (event) => {
    console.log("Receive Channel Callback");
  };

  const [selectedOption, setSelectedOption] = useState("0");

  const subscribers = [
    { id: 1, name: "Subscriber 1" },
    { id: 2, name: "Subscriber 2" },
  ];
  const [selectedSub, setSelectedSub] = useState(0);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setSelectedSub(0);
    console.log(multiCallRowIds);
    if (event.target.value === "private") {
      // Execute the desired action, such as displaying a message or redirecting to a page
      // alert("Private option selected!");
    } else if (event.target.value === "group") {
    } else if (event.target.value === "all") {
      metaDataRef.current = {
        option: "all",
        suboption: null,
      };
    }
  };

  const handleSubChange = (event) => {
    //alert(event.target.value);
    // setSelectedOption("group");
    console.log(selectedSub);

    setSelectedSub(event.target.value);
    metaDataRef.current = {
      option: selectedOption,
      suboption: event.target.value,
    };
  };

  const talkgroups = [
    { id: 5, name: "TalkGroup 1" },
    { id: 6, name: "TalkGroup 2" },
  ];

  const handleButtonTalk = () => {
    if (selectedOption == "0") {
      alert("Select an Option");
      return;
    } else if (selectedOption == "all") {
      setCallButton(true);
      // return;
    } else if (selectedSub == "0") {
      alert("Select  SubOption");
      return;
    } else {
      setCallButton(true);
    }
  };

  const stopCall = () => {
    setCallButton(false);
  };
  const handleMouseDown = () => {
    // setIsPressed(true);
    // setRecording(true);
    handleButtonTalk();
  };

  const handleMouseUp = () => {
    // setIsPressed(false);
    // setRecording(false);
    stopCall();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          rowGap: "40px",
          paddingTop: "40px",
        }}
      >
        <button
          onPointerDown={handleMouseDown}
          onPointerUp={handleMouseUp}
          // style={{ background: isPressed ? "gray" : "white" }}
        >
          PUSH TO TALK
        </button>
        <div>
          <span>
            <label htmlFor="lictype">&nbsp;</label>
          </span>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value={"0"}>Select an Option</option>
            <option value="private">Private</option>
            <option value="group">Group</option>
            <option value="all">All</option>
          </select>
          {selectedOption === "private" && (
            <select onChange={handleSubChange}>
              <option value={selectedSub}>Select a Subscriber</option>
              {subscribers.map((subscriber) => (
                <option key={subscriber.id} value={subscriber.id}>
                  {subscriber.name}
                </option>
              ))}
            </select>
          )}
          {selectedOption === "group" && (
            <select onChange={handleSubChange}>
              <option value={selectedSub}>Select a TalkGroup</option>
              {talkgroups.map((subscriber) => (
                <option key={subscriber.id} value={subscriber.id}>
                  {" "}
                  {subscriber.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </>
  );
};

const BlankSidebar = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          height: "5vh",
        }}
      >
        {/* <h3>-</h3> */}
        {/* <button>Mute</button> */}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          height: "60vh",
          rowGap: "40px",
        }}
      >
        {/* <button>BROADCAST PTT</button>
        <div>
          <span>
            <label htmlFor="lictype">&nbsp;</label>
          </span>
          <select
            id="id1"
            //    onChange={(e) => {
            //       onSelectType(e.target.value);
            //     }}
            //     value={updateType}
            required
          >
            <option value={"0"}></option>
            <option value={"ptt"}>PTT User Account</option>
            <option value={"dispatcher"}>Dispatcher Account</option>
            <option value={"control"}>Control Station</option>
          </select>
        </div>
        <button>Clear All</button>
        <button>START ANNOUNCEMENT</button>
        <button>IDLE</button> */}
      </div>
    </>
  );
};

const AddToCallSidebar = () => {
  const { user } = useAuth();
  const [audioContext, setAudioContext] = useState(
    new AudioContext({ sampleRate: 8000 })
  );
  const [recording, setRecording] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [wsOpen, setwsOpen] = useState(false);
  const [seqNo, setSeqNo] = useState(0);
  const [socket, setSocket] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const mediaStreamRef = useRef(null); // Create a ref for storing the MediaStream object
  const remoteVideoRef = useRef();
  const [key, setKey] = useState("");
  const [peerConnection, setPeerConnection] = useState(null);
  const [websocket, setWebSocket] = useState(null);
  const [dChannel, setDataChannel] = useState(null);
  const [callButton, setCallButton] = useState(false);
  const chunkRef = useRef((data) => {});
  const dataChannelRef = useRef(null);
  let pc;
  useEffect(() => {
    console.log(navigator);
    const ws = new WebSocket("wss://172.105.39.25:8080");
    ws.onopen = () => {
      console.log("WS OPEN");
      createPeerConnection(ws);
    };
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
    ws.onmessage = (message) => {
      console.log(message);
      handleMessage(JSON.parse(message.data), ws);
      // console.log(websocket);
    };
    //websocketref.current = ws;
    // setWebSocket({ ws: ws });

    // Check if MediaStream object is not present in the ref

    let key = localStorage.getItem("key");
    console.log(key);
  }, []);
  // const sendChunkstoServer = useCallback(
  //   (data) => {
  //     console.log(callButton);
  //     if (callButton) {
  //       console.log(data);
  //       // send data to server
  //     }
  //   },
  //   [callButton]
  // );

  useEffect(() => {
    const setupMediaStream = async (callButton) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        //    let no = Math.random() * 100;
        //   console.log(no.toString());
        mediaStreamRef.current = stream;
        const source = audioContext.createMediaStreamSource(stream);
        const scriptNode = audioContext.createScriptProcessor(512, 1, 1);
        const audioprocessfunction = (event) => {
          //   console.log("OnAudio Process");
          //   console.log(no.toString());
          const inputBuffer = event.inputBuffer;
          const inputData = inputBuffer.getChannelData(0);
          const pcmData = new Uint8Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            pcmData[i] = Math.round(inputData[i] * 127 + 128);
          }
          // if (callButton) sendChunkstoServer(pcmData);
          chunkRef.current(pcmData);
        };
        scriptNode.onaudioprocess = audioprocessfunction;
        source.connect(scriptNode);
        scriptNode.connect(audioContext.destination);

        return () => {
          console.log("CLEAN UP--------");
          source.disconnect();
          scriptNode.removeEventListener("audioprocess", audioprocessfunction);
          scriptNode.onaudioprocess = null;
          scriptNode.disconnect();
        };
      } catch (error) {
        console.log(error);
      }
    };
    setupMediaStream(callButton);
    const cleanupFunction = async () => {
      const cleanup = await setupMediaStream();
      cleanup();
    };
    return () => {
      cleanupFunction();
    };
  }, []);

  useEffect(() => {
    chunkRef.current = (data) => {
      if (callButton) {
        // websocketref.current.send(JSON.stringify(data));
        dataChannelRef.current.send(data);
      }
    };
  }, [callButton]);

  const sendChunkstoServer = (data) => {
    if (callButton) console.log(data);
    // console.log(data);
  };

  const handleMessage = async (data, ws) => {
    console.log("Message");
    //  console.log(data);
    if (data.type == "offer") {
      // await pc.setRemoteDescription(data);
      // let answer = await pc.createAnswer();
      // await pc.setLocalDescription(answer);
      // ws.send(JSON.stringify({ type: "answer", sdp: answer.sdp }));
      // console.log("answer done");
    } else if (data.type == "candidate") {
      if (data.candidate) pc.addIceCandidate(data.candidate);
    } else if (data.type == "answer") {
      await pc.setRemoteDescription(data);
      console.log("answer done");
    }
  };
  const createPeerConnection = async (conn) => {
    console.log("Create Peer Connection");
    let configuration = {
      iceServers: [{ url: "stun:stun.1.google.com:19302" }],
    };
    // set up peer connection

    pc = new RTCPeerConnection(configuration);
    pc.onicecandidate = (event) => {
      console.log("ICE Candidate");
      console.log(event.candidate);
      conn.send(
        JSON.stringify({ type: "candidate", candidate: event.candidate })
      );
    };
    pc.onicegatheringstatechange = () => {
      console.log("ICE gathering state:", pc.iceGatheringState);
    };
    pc.oniceconnectionstatechange = (event) => {
      console.log("On Connection state change");
      if (
        pc.iceConnectionState === "closed" ||
        pc.iceConnectionState === "failed" ||
        pc.iceConnectionState === "disconnected"
      ) {
        // Handle the connection close event here
        console.log("Peer Connection closed");
        console.log(pc.iceConnectionState);
      }
    };

    let dataChannel = pc.createDataChannel("mychannel");
    dataChannel.onerror = (error) => {
      console.log("Data Channel Error:", error);
    };

    dataChannel.onmessage = (event) => {
      console.log("Got Data Channel Message:", event.data);
    };

    dataChannel.onopen = () => {
      // dataChannel.send("Hello World!");
    };

    dataChannel.onclose = () => {
      console.log("The Data Channel is Closed");
    };
    //setDataChannel(dataChannel);
    dataChannelRef.current = dataChannel;
    pc.ondatachannel = (event) => {
      console.log("data channel");
    };
    pc.onsignalingstatechange = (event) => {
      console.log("state change");
    };
    let offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    console.log(offer);
    conn.send(JSON.stringify(offer));
    // pc.ondatachannel = (event) => {
    //   console.log("Data Channel Event");
    // };
    // setPeerConnection(pc);
    //  conn.send(JSON.stringify({ open: true }));
    console.log("done");
  };

  const receiveChannelCallback = (event) => {
    console.log("Receive Channel Callback");
  };

  const startCall = async (event) => {
    // console.log(dChannel);
    // dChannel.send("HELLO");
    console.log("hello");

    setCallButton((value) => {
      return true;
    });
    // console.log(callButton);
  };

  const stopCall = (event) => {
    console.log("stop-------");

    setCallButton((value) => {
      return false;
    });

    //  setCallButton(false);
    // close peer connection and clear streams
    // pc.close();
    //setLocalStream(null);
    //setRemoteStream(null);
    //  setPeerConnection(null);
  };

  const handleMouseDown = () => {
    // setIsPressed(true);
    // setRecording(true);
    startCall();
  };

  const handleMouseUp = () => {
    // setIsPressed(false);
    // setRecording(false);
    stopCall();
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",

          rowGap: "40px",
        }}
      >
        <button
          onPointerDown={handleMouseDown}
          onPointerUp={handleMouseUp}
          style={{ background: isPressed ? "gray" : "white" }}
        >
          PUSH TO TALK
        </button>
        <div>
          <span>
            <label htmlFor="lictype">&nbsp;</label>
          </span>
          <select
            id="id1"
            //    onChange={(e) => {
            //       onSelectType(e.target.value);
            //     }}
            //     value={updateType}
            required
          >
            <option value={"0"}>{user.userName}</option>
          </select>
        </div>
        {/* <button>Clear All</button>
        <button>START ANNOUNCEMENT</button> */}
      </div>
    </>
  );
};

// const AddToCallSidebar = () => {
//   const { user } = useAuth();
//   const [audioContext, setAudioContext] = useState(new AudioContext());
//   const [recording, setRecording] = useState(false);
//   const [isPressed, setIsPressed] = useState(false);
//   const [wsOpen, setwsOpen] = useState(false);

//   const socket = new WebSocket("ws://localhost:8080");
//   socket.addEventListener("open", () => {
//     setwsOpen(true);
//   });
//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//       const source = audioContext.createMediaStreamSource(stream);
//       const scriptNode = audioContext.createScriptProcessor(512, 1, 1);
//       scriptNode.onaudioprocess = (event) => {
//         const inputBuffer = event.inputBuffer;
//         const inputData = inputBuffer.getChannelData(0);

//         const pcmData = new Uint8Array(inputData.length);
//         for (let i = 0; i < inputData.length; i++) {
//           pcmData[i] = Math.round(inputData[i] * 127 + 128);
//         }
//         //  console.log(pcmData);
//         // setChunks((prevChunks) => [...prevChunks, pcmData]);
//         sendChunkstoServer(pcmData);
//       };
//       source.connect(scriptNode);
//       scriptNode.connect(audioContext.destination);

//       return () => {
//         source.disconnect();
//         scriptNode.disconnect();
//       };
//     });

//     const sendChunkstoServer = (data) => {
//       // let buf = Buffer.alloc(514);
//       // let id = 21;
//       // buf.writeUInt16LE(id, 0);
//       // data.copy(buf, 2);
//       // let Packet = {
//       //   isencrypt: true,
//       //   cmd: 0x27,
//       //   cmdByte: 2,
//       //   data: buf,
//       // };
//       // Packet = init(Packet);
//       // let buffer = toByteBuffer(Packet);
//       console.log(recording);
//       if (wsOpen && recording) {
//         socket.send(data);
//       }
//       // socket.send(buffer,)
//     };

//     const handleMouseDown = () => {
//       console.log("MouseDown");
//       setIsPressed(true);
//       setRecording(true);
//       console.log(user);
//     };

//     const handleMouseUp = () => {
//       console.log("Mouse Up");
//       setIsPressed(false);
//       setRecording(false);
//     };

//     return (
//       <>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-around",
//             height: "5vh",
//           }}
//         ></div>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             flexWrap: "wrap",
//             justifyContent: "center",
//             height: "60vh",
//             rowGap: "40px",
//           }}
//         >
//           <button
//             onMouseDown={handleMouseDown}
//             onMouseUp={handleMouseUp}
//             style={{ background: isPressed ? "gray" : "white" }}
//           >
//             PUSH TO TALK
//           </button>
//           <div>
//             <span>
//               <label htmlFor="lictype">&nbsp;</label>
//             </span>
//             <select
//               id="id1"
//               //    onChange={(e) => {
//               //       onSelectType(e.target.value);
//               //     }}
//               //     value={updateType}
//               required
//             >
//               <option value={"0"}>{user.userName}</option>
//             </select>
//           </div>
//           <button>Clear All</button>
//           <button>START ANNOUNCEMENT</button>
//         </div>
//       </>
//     );
//   }, [audioContext, recording]);
// };

function Sidebar() {
  const { sidebarVal, sideBarType } = useAuth();
  return (
    <div className="sidebar">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          height: "5vh",
          paddingTop: "1vh",
        }}
      >
        <button>Mute All</button>
        <button>Unmute All</button>
      </div>
      <div style={{ "text-align": "center" }}></div>
      {sideBarType === "" ? <BlankSidebar /> : null}
      {sideBarType === "CSMultiCall" ? <MultiCallSideBar /> : null}
      {sideBarType === "CSCall" ? <AddToCallSidebar /> : null}
      {sideBarType === "Message" ? <MessageSidebar /> : null}
      {sideBarType === "APPMultiCall" ? <APPMultiCall /> : null}
      {sideBarType === "APPCall" ? <APPCall /> : null}
    </div>
  );
}

export default Sidebar;
