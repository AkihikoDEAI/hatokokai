function checkPassword() {
  const salt = ":pw:";  // セミコロンを追加
  const user_idInput = document.getElementById("userid").value;
  const passwordInput = document.getElementById("password").value;
  const xhr = new XMLHttpRequest();

  const orgText = user_idInput + salt + passwordInput;
  generateHash(orgText).then(encyp => {
    window.alert(encyp);
    const url = encyp.substr(0, 8) + encyp.substr(-8, 8);
    window.alert(url);

    xhr.open('GET', url);
    xhr.send();
    xhr.onload = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        window.location = url;
      } else {
        const error = document.getElementById('error');
        const input = document.getElementById('password');
        error.innerHTML = 'Wrong password! Try again.';
        input.value = '';
      }
    };
    xhr.onerror = function() {
      const error = document.getElementById('error');
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
