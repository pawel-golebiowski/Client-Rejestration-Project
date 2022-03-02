import "./App.css";
import React from "react";
import validator from "validator";
import { FaRegEyeSlash, FaRegEye, FaRegQuestionCircle } from "react-icons/fa";
import { Modal } from "./Modal/Modal";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      digitalCheck: false,
      letterCheck: false,
      lengthCheck: false,
      ruleAcceptance: false,
      isPasswordVisible: false,
      showModal: false,
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
    if (e.target.value.length === 8) {
      this.setState({ payorNumber: e.target.value });
      this.setState({ payorNumberError: "" });
    } else {
      this.setState({ payorNumberError: "Wprowadź 8-cyfrowy numer płatnika" });
    }
  };
  handlePeselNumberChange = (e) => {
    if (e.target.value.length === 11) {
      this.setState({ peselNumber: e.target.value });
      this.setState({ peselNumberError: "" });
    } else {
      this.setState({ peselNumberError: "Wprowadź 11-cyfrowy numer PESEL" });
    }
  };

  handlePhoneNumberChange = (e) => {
    if (e.target.value.length === 9) {
      this.setState({ phoneNumber: e.target.value });
      this.setState({ phoneNumberError: "" });
    } else if (e.target.value.length === 0) {
      this.setState({ phoneNumber: "" });
      this.setState({ phoneNumberError: "" });
    } else {
      this.setState({ phoneNumber: "" });
      this.setState({ phoneNumberError: "Wprowadź poprawny numer telefonu" });
    }
  };

  handleRuleAcceptance = () => {
    this.setState({ ruleAcceptance: !this.state.ruleAcceptance });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    if (
      this.state.emailError === "" &&
      this.state.passwordError === "" &&
      this.state.payorNumberError === "" &&
      this.state.peselNumberError === "" &&
      this.state.phoneNumberError === ""
    ) {
      let dataToSend = {
        email: this.state.email,
        password: this.state.password,
        payorNumber: this.state.payorNumber,
        peselNumber: this.state.peselNumber,
      };
      if (this.state.phoneNumber !== "") {
        dataToSend.phoneNumber = this.state.phoneNumber;
      }
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      }).then(() => {
        alert("Formularz wysłany!");
        window.location.reload(false);
      });
    } else {
      alert("formularz NIE wysłany!");
    }
  };

  onClickTogglePasswordVisibility = (e) => {
    console.log(e);
    this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
  };

  onKeyTogglePasswordVisibility = (e) => {
    if (e.key === " ") {
      this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
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

  toggleModal = (e) => {
    this.setState({ showModal: !this.state.showModal });
  };

  onKeyToggleModal = (e) => {
    if (e.key === " ") {
      this.setState({ showModal: !this.state.showModal });
      e.target.blur();
    }
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
                maxLength={"255"}
                tabIndex={this.state.showModal ? -1 : 0}
                onBlur={this.handleEmailChange}
                className={
                  this.state.emailError === ""
                    ? "input-field"
                    : "input-field-wrong"
                }
                name="email-input"
                placeholder="Wpisz adres e-mail"
                type={"email"}
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
              <div
                className={
                  this.state.passwordError === ""
                    ? "field-password-wrapper"
                    : "field-password-wrapper-wrong"
                }
              >
                <input
                  tabIndex={this.state.showModal ? -1 : 0}
                  maxLength="100"
                  onBlur={this.handlePasswordChange}
                  onChange={this.validatePassword}
                  className="input-field-password"
                  type={this.state.isPasswordVisible ? "text" : "password"}
                  placeholder="Wpisz hasło"
                  required
                ></input>
                <div
                  tabIndex={this.state.showModal ? -1 : 0}
                  onClick={this.onClickTogglePasswordVisibility}
                  onKeyDown={this.onKeyTogglePasswordVisibility}
                  className="password-toggle-icon"
                >
                  {this.state.isPasswordVisible ? (
                    <FaRegEye />
                  ) : (
                    <FaRegEyeSlash />
                  )}
                </div>
              </div>
              <div>
                <div className="form-password-checkbox-wrapper">
                  <input
                    readOnly
                    checked={this.state.digitalCheck}
                    className="password-digit-check"
                    tabIndex={"-1"}
                    type={"checkbox"}
                  ></input>
                  1 cyfra &emsp; &emsp;
                </div>
                <div className="form-password-checkbox-wrapper">
                  <input
                    readOnly
                    checked={this.state.letterCheck}
                    className="password-letter-check"
                    tabIndex={"-1"}
                    type={"checkbox"}
                  ></input>
                  Wielka i mała litera &emsp;&emsp;
                </div>
                <div className="form-password-checkbox-wrapper">
                  <input
                    readOnly
                    checked={this.state.lengthCheck}
                    className="password-length-check"
                    tabIndex={"-1"}
                    type={"checkbox"}
                  ></input>
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
                tabIndex={this.state.showModal ? -1 : 0}
                onBlur={this.handlePayorNumberChange}
                onWheel={(e) => e.target.blur()}
                className={
                  this.state.payorNumberError === ""
                    ? "input-field"
                    : "input-field-wrong"
                }
                placeholder="Wpisz numer płatnika"
                type={"number"}
                required
              ></input>
            </div>

            <div className="field-wrapper">
              <div className="input-field-name">
                Numer PESEL{" "}
                <div
                  tabIndex={this.state.showModal ? -1 : 0}
                  onClick={this.toggleModal}
                  onKeyDown={this.onKeyToggleModal}
                  className="questionmark-icon"
                >
                  <FaRegQuestionCircle />
                </div>
                <span className="input-error-info">
                  {this.state.peselNumberError}
                </span>
              </div>
              <input
                tabIndex={this.state.showModal ? -1 : 0}
                onBlur={this.handlePeselNumberChange}
                onWheel={(e) => e.target.blur()}
                type={"number"}
                className={
                  this.state.peselNumberError === ""
                    ? "input-field"
                    : "input-field-wrong"
                }
                placeholder="Wpisz PESEL"
                required
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
                tabIndex={this.state.showModal ? -1 : 0}
                onBlur={this.handlePhoneNumberChange}
                onWheel={(e) => e.target.blur()}
                type={"number"}
                className={
                  this.state.phoneNumberError === ""
                    ? "input-field"
                    : "input-field-wrong"
                }
                placeholder="Wpisz numer telefonu"
              ></input>
            </div>

            <div className="field-declaration-wrapper">
              <span className="field-declaration-checkbox">
                <input
                  tabIndex={this.state.showModal ? -1 : 0}
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
                tabIndex={this.state.showModal ? -1 : 0}
                className="form-button-submit"
                type={"submit"}
                value="Dalej"
              ></input>
            </div>
            <div className="login-button-wrapper">
              <button
                tabIndex={this.state.showModal ? -1 : 0}
                className="login-button"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Przycisk chwilowo niedostępny!");
                }}
              >
                Logowanie
              </button>
            </div>
          </form>
          <Modal
            showModal={this.state.showModal}
            toggleModal={this.toggleModal}
          />
        </div>
      </div>
    );
  }
}

export default App;
