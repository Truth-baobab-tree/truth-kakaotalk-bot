function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
  if (
    msg.indexOf('https://') !== -1 ||
    msg.indexOf('http://') !== -1 ||
    msg.indexOf('www.') !== -1
  ) {

    const result = org.jsoup.Jsoup
      .connect("https://truthserver.khjcode.repl.co/page/get/score")
      .ignoreContentType(true)
      .data({
        url: msg
      })
      .post();
    const str = String(result);
    const data = JSON.parse(str.substring(str.indexOf("{"), str.indexOf("}") + 1));

    replier.reply('공유된 웹사이트의 정보를 진실이라고 평가한 사용자는 ' + data.truth + '명, 거짓이라고 평가한 사용자는 ' + data.lie + '명입니다.');
  }
}
