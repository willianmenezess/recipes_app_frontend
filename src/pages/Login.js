// import React, { useContext } from 'react';

function Login() {
  // const [inputEmail, setInputEmail] = useState('');
  // const [inputPassword, setInputPassword] = useState('');
  // const [isDisabled, setIsDisabled] = useState(true);
  return (
    <section>
      <form>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            data-testid="email-input"
            // value={ inputEmail }
            // onChange={ ({ target }) => setInputEmail(target.value) }
          />
        </label>
        <br />
        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            data-testid="password-input"
            // value={ inputPassword }
            // onChange={ ({ target }) => setInputPassword(target.value) }
          />
        </label>
        <br />
        <button
          type="submit"
          data-testid="login-submit-btn"
          // disabled={ isDisabled }
          // onClick={}
        >
          Enter

        </button>
      </form>
    </section>
  );
}

export default Login;
