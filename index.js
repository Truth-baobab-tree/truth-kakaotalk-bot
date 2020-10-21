const chatScreen = document.querySelector('.chatBox');
const roomName = chatScreen.querySelector('h1');
const submitForm = document.querySelector('.inputBox');
const textBox = submitForm.querySelector('input');
const button = submitForm.querySelector('button');

class Replier {
  reply(name) {
    const chat = document.createElement('p');
    chat.textContent = `Bot: ${name}`;
    chatScreen.appendChild(chat);
  }
}

function onSubmit(e) {
  e.preventDefault();
  const msg = textBox.value.trim();
  textBox.value = '';
  const room = roomName.textContent;
  if (msg && msg !== '') {
    const chat = document.createElement('p');
    chat.textContent = `Person: ${msg}`;
    chatScreen.appendChild(chat);
    const replier = new Replier();
    response(room, msg, 'Person', undefined, replier, undefined, undefined);
  } else {
    alert('채팅을 보낼 내용을 입력해주세요.');
  }
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  if (
    msg.indexOf('https://') !== -1 ||
    msg.indexOf('http://') !== -1 ||
    msg.indexOf('www.') !== -1
  ) {
    const url = msg;
    const response = new Promise((resolve, reject) => {
      const result = fetch('http://localhost:5050/page/get/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ url }),
    });
    setTimeout(async () => {
      const data = (await result).json();
      resolve(data);
    }, [1000]);
    });

    response.then(result => {
      replier.reply(`
        공유된 웹사이트의 정보를
        진실이라고 평가한 사용자는 ${result.truth}명,
        거짓이라고 평가한 사용자는 ${result.lie}명입니다.
      `);
    });
  }
}

function init() {
  submitForm.addEventListener('submit', onSubmit);
}

init();
