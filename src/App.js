import "./App.css";
import React from "react";
import validator from "validator";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      digitalCheck: false,
      letterCheck: false,
      lengthCheck: false,
      ruleAcceptance: false,
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      payorNumber: "",
      payorNumberError: "",
      peselNumber: "",
      peselNumberError: "",
      phoneNumber: "",
      phoneNumberError: "",
    };
  }

  handleEmailChange = (e) => {
    let email = e.target.value;
    if (validator.isEmail(email)) {
      this.setState({ emailError: "" });
      this.setState({ email: e.target.value });
    } else {
      this.setState({ emailError: "Wprowadź poprawny e-mail" });
    }
  };

  validatePassword = (e) => {
    let password = e.target.value;
    let numberCheck = /\d/;
    let lowerCaseCheck = /[a-z]/;
    let upperCaseCheck = /[A-Z]/;

    if (numberCheck.test(password)) {
      this.setState({ digitalCheck: true });
    } else {
      this.setState({ digitalCheck: false });
    }
    if (lowerCaseCheck.test(password) && upperCaseCheck.test(password)) {
      this.setState({ letterCheck: true });
    } else {
      this.setState({ letterCheck: false });
    }
    if (password.length > 7) {
      this.setState({ lengthCheck: true });
    } else {
      this.setState({ lengthCheck: false });
    }
  };

  handlePasswordChange = (e) => {
    if (
      this.state.letterCheck &&
      this.state.digitalCheck &&
      this.state.lengthCheck
    ) {
      this.setState({ passwordError: "" });
      this.setState({ password: e.target.value });
    } else {
      this.setState({ passwordError: "Wprowadź poprawne hasło" });
    }
  };

  handlePayorNumberChange = (e) => {
    if (e.target.value.length == 8) {
      this.setState({ payorNumber: e.target.value });
      this.setState({ payorNumberError: "" });
    } else {
      this.setState({ payorNumberError: "Wprowadź 8-cyfrowy numer płatnika" });
    }
  };
  handlePeselNumberChange = (e) => {
    if (e.target.value.length == 11) {
      this.setState({ peselNumber: e.target.value });
      this.setState({ peselNumberError: "" });
    } else {
      this.setState({ peselNumberError: "Wprowadź 11-cyfrowy numer PESEL" });
    }
  };
  handlePhoneNumberChange = (e) => {
    if (e.target.value.length == 9) {
      this.setState({ phoneNumber: e.target.value });
      this.setState({ phoneNumberError: "" });
    } else {
      this.setState({ phoneNumberError: "Wprowadź poprawny numer telefonu" });
    }
  };

  handleRuleAcceptance = (e) => {
    this.setState({ ruleAcceptance: !this.state.ruleAcceptance });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    var dataToSend = {
      email: this.state.email,
      password: this.state.password,
      payorNumber: this.state.payorNumber,
      peselNumber: this.state.peselNumber,
      phoneNumber: this.state.phoneNumber,
    };
    console.log(dataToSend);
  };

  render() {
    return (
      <div className="App">
        <div className="App-body">
          <form className="form-rejestration" onSubmit={this.handleSubmitForm}>
            <div className="form-header">Rejestracja</div>

            <div className="field-wrapper">
              <div className="input-field-name">
                E-mail
                <span className="input-error-info">
                  {this.state.emailError}
                </span>
              </div>
              <input
                onBlur={this.handleEmailChange}
                className="input-field"
                placeholder="Wpisz adres e-mail"
                required
              ></input>
            </div>

            <div className="field-wrapper">
              <div className="input-field-name">
                Hasło{" "}
                <span className="input-error-info">
                  {this.state.passwordError}
                </span>
              </div>
              <input
                onBlur={this.handlePasswordChange}
                onChange={this.validatePassword}
                className="input-field"
                type={"password"}
                placeholder="Wpisz hasło"
                required
              ></input>
              <div>
                <div className="form-password-checkbox-wrapper">
                  <input
                    checked={this.state.digitalCheck}
                    className="password-digit-check"
                    tabIndex={"-1"}
                    type={"checkbox"}
                  ></input>{" "}
                  1 cyfra &emsp; &emsp;
                </div>
                <div className="form-password-checkbox-wrapper">
                  <input
                    checked={this.state.letterCheck}
                    className="password-letter-check"
                    tabIndex={"-1"}
                    type={"checkbox"}
                  ></input>{" "}
                  Wielka i mała litera &emsp;&emsp;
                </div>
                <div className="form-password-checkbox-wrapper">
                  <input
                    checked={this.state.lengthCheck}
                    className="password-length-check"
                    tabIndex={"-1"}
                    type={"checkbox"}
                  ></input>{" "}
                  8 znaków
                </div>
              </div>
            </div>

            <div className="field-wrapper">
              <div className="input-field-name">
                Numer płatnika{" "}
                <span className="input-error-info">
                  {this.state.payorNumberError}
                </span>
              </div>
              <input
                onBlur={this.handlePayorNumberChange}
                onWheel={(e) => e.target.blur()}
                className="input-field"
                placeholder="Wpisz numer płatnika"
                type={"number"}
                required
              ></input>
            </div>

            <div className="field-wrapper">
              <div className="input-field-name">
                Numer PESEL{" "}
                <span className="input-error-info">
                  {this.state.peselNumberError}
                </span>
              </div>
              <input
                onBlur={this.handlePeselNumberChange}
                onWheel={(e) => e.target.blur()}
                type={"number"}
                className="input-field"
                placeholder="Wpisz PESEL"
              ></input>
            </div>

            <div className="field-wrapper">
              <div className="input-field-name">
                telefon{" "}
                <span className="input-field-additional">(opcjonalnie)</span>
                <span className="input-error-info">
                  {this.state.phoneNumberError}
                </span>
              </div>
              <input
                onBlur={this.handlePhoneNumberChange}
                onWheel={(e) => e.target.blur()}
                type={"number"}
                className="input-field"
                placeholder="Wpisz numer telefonu"
              ></input>
            </div>

            <div className="field-declaration-wrapper">
              <span className="field-declaration-checkbox">
                <input
                  required
                  onChange={this.handleRuleAcceptance}
                  checked={this.state.ruleAcceptance}
                  className="checkbox-input rules-acceptance"
                  type={"checkbox"}
                ></input>
              </span>
              <span>
                <label
                  className="field-declaration-text"
                  onClick={this.handleRuleAcceptance}
                >
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
