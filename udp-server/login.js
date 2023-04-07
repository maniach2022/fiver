const getLoginData = async (body) => {
  const { username, password } = body;
  return new Promise((resolve, reject) => {
    //resolve({ data: "test" });
    const UDP = require("dgram");
    const DispatcherPacket = require("./dispatcherPacket.js");
    const Decrypt = require("./decrypt.js");
    const Parse = require("./parse.js");
    const Gip = require("./zip.js");
    const { url, isencrypt, port } = require("./env.js");
    Decrypt.init();
    const client = UDP.createSocket("udp4");
    const PORT = port;
    const ip = url;
    let passwd = password;
    let buffer = Buffer.from(passwd);
    passwd = Decrypt.dispatcherencode(buffer);
    passwd = passwd.toString("base64");
    let str = passwd + " " + username;
    //let str = "PHI25pOSQ79vUg+G1D8fHw== asd";
    console.log(ip);
    // const ip = "13.234.239.213";

    // let str = "KnKuItF0RvO4RcVLH6qkhA== devdisp2";
    let data = Buffer.from(str);

    let connectionPacket = {
      cmd: 28,
      cmdByte: 4,
      version: 65520,
      isencrypt: isencrypt,
      seqno: 1,
      audiocodec: 0,
      data: data,
    };
    // packet=DispatcherPacket.init(packet);
    connectionPacket = DispatcherPacket.getdata(connectionPacket);
    let connectionbuffer = DispatcherPacket.toByteBuffer(connectionPacket);
    //  console.log(connectionbuffer);
    if (isencrypt) {
      connectionbuffer = Decrypt.dispatcherencode(connectionbuffer);
    }
    console.log("login");
    client.send(connectionbuffer, PORT, ip, (err) => {
      if (err) {
        console.error("Failed to send packet !!");
        reject({ error: "Failed to Send Packet" });
      } else {
        console.log("Packet send  1 !!");
      }
    });
    client.on("message", async (message, info) => {
      let obj = message;
      if (isencrypt) {
        obj = Decrypt.dispatcherdecode(obj);
        obj = Parse.EnDispatcherParse(obj);
      } else {
        obj = Parse.DispatcherParse(obj);
      }
      if (obj.buffer.length == 0) {
        reject(obj);
      } else {
        let msg = await Gip.gunzip(obj.buffer);
        msg = JSON.parse(msg);
        resolve(msg);
      }
    });
  });
};
module.exports = { getLoginData };
