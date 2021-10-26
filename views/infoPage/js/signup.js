const form = document.querySelector('form');
    const unameError = document.querySelector('.uname.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // reset errors
      unameError.textContent = '';
      emailError.textContent = '';
      passwordError.textContent = '';

      // get values
      const fname = form.fname.value;
      const lname = form.lname.value;
      const uname = form.uname.value;
      const email = form.email.value;
      const password = form.password.value;
      const password = form.password.value;

      try {
        const res = await fetch('/home/signup', { 
          method: 'POST', 
          body: JSON.stringify({ fname, lname, uname, email, password }),
          headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        if (data.errors) {
          unameError.textContent = data.errors.uname;
          emailError.textContent = data.errors.email;
          passwordError.textContent = data.errors.password;
        }
        if (data.user) {
          location.assign('/home/login');
        }
      }
      catch (err) {
        console.log(err);
      }
    });