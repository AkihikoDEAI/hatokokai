//===============================================================
// checkPassword関数
//===============================================================
function checkPassword() {
  const salt = "68186968"
  const pw = "380fac74c0ef488137008f4a0d3558f8132392744a428a7d46d3c02096c0e5cc";
  const url = "44147512667512335023125979";
  const user_idInput = document.getElementById("userid").value;
  const passwordInput = user_idInput + decodeStr(salt) + document.getElementById("password").value;

  generateHash(passwordInput).then(encyp => {
    if (encyp === pw) {
      document.getElementById("error").style.display = "none";
      window.location.href = decodeStr(url);
    } else {
      document.getElementById("error").style.display = "block";
    }
  });

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

async function generateHash(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}
