<<<<<<< HEAD
const form = document.querySelector("form");
const unameError = document.querySelector(".uname.error");
const emailError = document.querySelector(".email.error");
const passwordError = document.querySelector(".password.error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // reset errors
  unameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
=======
const form = document.querySelector('form');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');
// const fname = document.querySelector('.')

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // reset errors
  emailError.textContent = '';
  passwordError.textContent = '';
>>>>>>> ef410d53e6a3a0eac858d7b243a2978d9fc5d28f

  // get values
  const fname = form.fname.value;
  const lname = form.lname.value;
  const uname = form.uname.value;
  const email = form.email.value;
  const password = form.password.value;
<<<<<<< HEAD
  const password = form.password.value;

  try {
    const res = await fetch("/home/signup", {
      method: "POST",
      body: JSON.stringify({ fname, lname, uname, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      unameError.textContent = data.errors.uname;
=======

  try {
    const res = await fetch('/home/signup', {
      method: 'POST',
      body: JSON.stringify({ fname,lname, uname, email, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    // console.log(data);
    if (data.errors) {
>>>>>>> ef410d53e6a3a0eac858d7b243a2978d9fc5d28f
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
    }
    if (data.user) {
<<<<<<< HEAD
      location.assign("/home/login");
    }
  } catch (err) {
    console.log(err);
  }
});
=======
      location.assign('/user/dashboard');
    }
  }
  catch (err) {
    console.log(err);
  }
});
>>>>>>> ef410d53e6a3a0eac858d7b243a2978d9fc5d28f
