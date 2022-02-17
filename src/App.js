import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <form className="form-rejestration">
          <div className="form-header">Rejestracja</div>

          <div className="field-wrapper">
            <div className="input-field-name">E-mail</div>
            <input
              className="input-field"
              placeholder="Wpisz adres e-mail"
            ></input>
          </div>
          <div className="field-wrapper">
            <div className="input-field-name">Hasło</div>
            <input className="input-field" placeholder="Wpisz hasło"></input>

            <div>
              <input type={"checkbox"}></input> 1 cyfra
              <input type={"checkbox"}></input> Wielka i mała litera
              <input type={"checkbox"}></input> 8 znaków
            </div>
          </div>
          <div className="field-wrapper">
            <div className="input-field-name">Numer płatnika</div>
            <input
              className="input-field"
              placeholder="Wpisz numer płatnika"
            ></input>
          </div>
          <div className="field-wrapper">
            <div className="input-field-name">Numer PESEL</div>
            <input className="input-field" placeholder="Wpisz PESEL"></input>
          </div>
          <div className="field-declaration-wrapper">
            <span>
              <input type={"checkbox"}></input>
            </span>
            <span>
              <label>
                Oświadczam, że zapoznałem się z treścią niniejszego{" "}
                <b>Regulaminu</b> (ZGODA OBOWIĄZKOWA) akceptuję jego treść i
                zobowiązuję się do przestrzegania go.
              </label>
            </span>
          </div>
          <div className="form-button-wrapper">
            <input
              className="form-button-submit"
              type={"submit"}
              value="Dalej"
            ></input>
          </div>
          <div className="login-button-wrapper">
            <div className="login-button">Logowanie</div>
          </div>
        </form>

        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </div>
    </div>
  );
}

export default App;
