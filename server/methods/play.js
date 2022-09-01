// bufferToBase64 = function (buffer) {
//   var bytes = new Uint8Array(buffer);
//   var len = buffer.byteLength;
//   var binary = "";
//   for (var i = 0; i < len; i++) {
//     binary += String.fromCharCode(bytes[i]);
//   }
//   console.log("!!!window.btoa(binary)!!!");
//   console.log(window.btoa(binary));
//   return window.btoa(binary);
// };
// base64ToBuffer = function (buffer) {
//   var binary = window.atob(buffer);
//   var buffer = new ArrayBuffer(binary.length);
//   var bytes = new Uint8Array(buffer);
//   for (var i = 0; i < buffer.byteLength; i++) {
//     bytes[i] = binary.charCodeAt(i) & 0xff;
//   }
//   return buffer;
// };

// initSound = (arrayBuffer) => {
//   console.log("+++++arrayBuffer+++++");
//   console.log(arrayBuffer);
//   var base64String = bufferToBase64(arrayBuffer);
//   var audioFromString = base64ToBuffer(base64String); // Buraya db'deki bilgiyi vermeliyim
//   // console.log(base64String); //base64 stringi
//   console.log("audioFromString");
//   console.log(audioFromString);
//   // ArrayBuffer(4714716)
//   //    byteLength: 0
//   //    [[Prototype]]: ArrayBuffer
//   //    [[IsDetached]]: true

//   document.getElementById("encodedResult").value = base64String;
//   console.log(base64String.length);
//   context.decodeAudioData(
//     audioFromString,
//     function (buffer) {
//       // audioBuffer is global to reuse the decoded audio later.
//       audioBuffer = buffer;
//       console.log("-------buffer-------"); //object
//       console.log(buffer); //object
//       AppUtil.temp.set("audioBuffer", audioBuffer);
//       // var buttons = document.querySelectorAll("button");
//       // buttons[0].disabled = false;
//       // buttons[1].disabled = false;
//     },
//     function (e) {
//       console.log("Error decoding file", e);
//     }
//   );
// };
// // User selects file, read it as an ArrayBuffer and pass to the API.
// fileInput = self.find("#uploadButton");
// // fileInput = document.querySelector('input[type="file"]');

// console.log(self.find("#uploadButton"));

// console.log("fileInput2");
// console.log(fileInput);

// fileInput.addEventListener(
//   "change",
//   function (e) {
//     var reader = new FileReader();
//     console.log("reader");
//     console.log(reader); // FileReader{...., result: ArrayBuffer(4714716)}

//     reader.onload = function (e) {
//       initSound(this.result);

//       console.log("this");
//       console.log(this);

//       console.log("eventListener this.result -> ");
//       console.log(this.result); // tipi: object -> ArrayBuffer(4751545)
//       AppUtil.temp.set("ArrayBuffer", this.result);
//     };
//     reader.readAsArrayBuffer(this.files[0]);
//     console.log("this.files[0] -> ");
//     console.log(this.files[0]);
//   },
//   false
// );
