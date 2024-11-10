function checkPassword() {
  const salt = ":pw:";  // セミコロンを追加
  const user_idInput = document.getElementById("userid").value;
  const inputPW = document.getElementById('password');
  const passwordInput = inputPW.value;
  const xhr = new XMLHttpRequest();

  const orgText = user_idInput + salt + passwordInput;
  generateHash(orgText).then(encyp => {
    const url = encyp.substr(0, 8) + encyp.substr(-8, 8);
    const error = document.getElementById('error');

    xhr.open('GET', url);
    xhr.send();
    xhr.onload = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        error.style.display = "none";
        window.location = url;
      } else {
        error.style.display = "block";
        error.innerHTML = 'ユーザーID、パスワードが間違っています。';
        inputPW.value = '';
      }
    };
    xhr.onerror = function() {
      error.style.display = "block";
      error.innerHTML = 'Sorry, ERROR !';
    };
  });
}

async function generateHash(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}
