// Auto-fill dan submit form Add User (SAFE for local admin use only)
(function() {
  'use strict';

  // Pastikan berjalan hanya di halaman yang benar
  if (window.location.pathname.indexOf('/wp-admin/user-new.php') === -1) {
    console.warn('Script only for /wp-admin/user-new.php');
    return;
  }

  const form = document.getElementById('createuser');
  if (!form) {
    console.warn('Form #createuser not found on page');
    return;
  }

  // Randomize to avoid collision
  const randomID = Math.floor(Math.random() * 10000);
  const username = 'testuser' + randomID;
  const email = username + '@local.test';
  const password = 'P@ssw0rd123!';

  // Isi field yang ada (cek existence karena ada varian multisite / non-multisite)
  const setIf = (sel, val) => {
    const el = form.querySelector(sel);
    if (el) el.value = val;
  };

  setIf('#user_login', username);
  setIf('#email', email);
  setIf('#first_name', 'Local');
  setIf('#last_name', 'User');
  setIf('#url', 'http://localhost');

  // password fields
  const pass1 = form.querySelector('#pass1');
  const pass2 = form.querySelector('#pass2');
  if (pass1) {
    // some WP builds keep pass inputs as type=password; set value regardless
    pass1.value = password;
    // reveal attribute if needed (not required)
  }
  if (pass2) pass2.value = password;

  // Confirm weak password if checkbox present
  const pwWeak = form.querySelector('.pw-checkbox');
  if (pwWeak) pwWeak.checked = true;

  // Turn off notification if present
  const sendUserNotification = form.querySelector('#send_user_notification');
  if (sendUserNotification) sendUserNotification.checked = false;

  // Set role (value must match option value, lowercase)
  const roleSelect = form.querySelector('#role');
  if (roleSelect) {
    try {
      roleSelect.value = 'administrator'; // ganti jika mau role lain: editor, author, subscriber
    } catch (e) { /* ignore */ }
  }

  console.log(`Prepared to submit: ${username} <${email}> (pass: ${password})`);
  // Submit setelah delay singkat (bisa diubah)
  setTimeout(() => {
    console.log('Submitting createuser form now...');
    form.submit();
  }, 1500);

})();
