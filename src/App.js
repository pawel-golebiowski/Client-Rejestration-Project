import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  constructor() {
    this.state = {};
  }
  render() {
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
              <input
                className="input-field"
                type={"password"}
                placeholder="Wpisz hasło"
              ></input>
              <div>
                <div className="form-password-checkbox-wrapper">
                  <input tabIndex={"-1"} type={"checkbox"}></input> 1 cyfra
                  &emsp; &emsp;
                </div>
                <div className="form-password-checkbox-wrapper">
                  <input tabIndex={"-1"} type={"checkbox"}></input> Wielka i
                  mała litera &emsp;&emsp;
                </div>
                <div className="form-password-checkbox-wrapper">
                  <input tabIndex={"-1"} type={"checkbox"}></input> 8 znaków
                </div>
              </div>
            </div>

            <div className="field-wrapper">
              <div className="input-field-name">Numer płatnika</div>
              <input
                className="input-field"
                placeholder="Wpisz numer płatnika"
                type={"number"}
              ></input>
            </div>

            <div className="field-wrapper">
              <div className="input-field-name">Numer PESEL</div>
              <input
                type={"number"}
                className="input-field"
                placeholder="Wpisz PESEL"
              ></input>
            </div>

            <div className="field-wrapper">
              <div className="input-field-name">
                telefon{" "}
                <span className="input-field-additional">(opcjonalnie)</span>
              </div>
              <input
                type={"number"}
                className="input-field"
                placeholder="Wpisz numer telefonu"
              ></input>
            </div>

            <div className="field-declaration-wrapper">
              <span className="field-declaration-checkbox">
                <input className="checkbox-input" type={"checkbox"}></input>
              </span>
              <span>
                <label className="field-declaration-text">
                  Oświadczam, że zapoznałem się z treścią niniejszego{" "}
                  <span className="declaration-rulebook">Regulaminu</span>{" "}
                  <span className="declaration-additional-info">
                    (ZGODA OBOWIĄZKOWA)
                  </span>{" "}
                  akceptuję jego treść i zobowiązuję się do przestrzegania go.
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
              <button className="login-button">Logowanie</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
