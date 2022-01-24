const form = document.querySelector('form');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');
// const fname = document.querySelector('.')

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // reset errors
  emailError.textContent = '';
  passwordError.textContent = '';

  // get values
  const fname = form.fname.value;
  const lname = form.lname.value;
  const uname = form.uname.value;
  const email = form.email.value;
  const password = form.password.value;

  try {
    const res = await fetch('/home/signup', {
      method: 'POST',
      body: JSON.stringify({ fname,lname, uname, email, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    // console.log(data);
    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
    }
    if (data.user) {
      location.assign('/user/dashboard');
    }
  }
  catch (err) {
    console.log(err);
  }
});
