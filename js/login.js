//===============================================================
// checkPassword関数
//===============================================================
function checkPassword() {
  const id = "3414574114194912145714";
  const pw = "016659166651654933330905300577";
  const url = "44147512667512335023125979";
  const user_idInput = document.getElementById("userid").value;
  const passwordInput = document.getElementById("password").value;

  if ((user_idInput === decodeStr(id)) && (passwordInput === decodeStr(pw))) {
    document.getElementById("error").style.display = "none";
    window.location.href = decodeStr(url);
  } else {
    document.getElementById("error").style.display = "block";
  }
}

function decodeStr(chgStr) {
  const encodeTbl = "AM{812I=7@]Rtio`bOpH}xVhNKzQ_W09usTU</S3vyZ^c6f>La.rCq|GBk[mYE.g?Pe5:wXDJFjn;4dl";
  var str = "";
  for (i = 0; i < chgStr.length; i += 2) {
    var idx = Number(chgStr.substring(i, i + 2));
    str += encodeTbl.substring(idx, idx + 1);
  }
  return str;
}