const numberInput = document.getElementById("number"),
  textInput = document.getElementById("msg"),
  button = document.getElementById("button"),
  responce = document.querySelector(".responce");

button.addEventListener("click", send, false);
const socket = io();
socket.on("smsData", (data) => {
  responce.innerHTML =
    "<h5> Text messsage send to " + numberInput.value + "</h5>";
  console.log("dataaaa" + data);
});
function send() {
  const number = numberInput.value.replace(/\D/g, "");
  const text = textInput.value;
  fetch("/", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ number, text }),
  })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
}
