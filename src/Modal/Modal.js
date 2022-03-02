import React from "react";
import "./Modal.css";
import { FaRegWindowClose } from "react-icons/fa";
import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";

export class Modal extends React.Component {
  constructor() {
    super();

    this.modalRef = React.createRef();
    registerLocale("pl", pl);

    document.addEventListener("keydown", this.onEscCloseModal);

    this.state = {
      callDate: "",
      callTime: "",
      callTimeError: "",
      phoneNumber: "",
      phoneNumberError: "",
      ruleAgreement: false,
    };
  }

  onEscCloseModal = (e) => {
    if (e.key === "Escape" && this.props.showModal) {
      this.props.toggleModal();
    }
  };

  handleDateChange = (date) => {
    this.setState({ callDate: date });
  };

  handleTimeSelect = (e) => {
    if (e.target.value === "Wybierz godzinę") {
      this.setState({ callTimeError: "Wybierz odpowiednią godzinę" });
    } else {
      this.setState({ callTime: e.target.value });
      this.setState({ callTimeError: "" });
    }
  };

  handlePhoneNumberChange = (e) => {
    if (e.target.value.length === 9) {
      this.setState({ phoneNumber: e.target.value });
      this.setState({ phoneNumberError: "" });
    } else {
      this.setState({ phoneNumber: "" });
      this.setState({ phoneNumberError: "Wprowadź poprawny numer" });
    }
  };

  handleRuleAcceptance = () => {
    this.setState({ ruleAgreement: !this.state.ruleAgreement });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    if (
      this.state.callTimeError === "" &&
      this.state.phoneNumberError === "" &&
      this.state.callDate !== "" &&
      this.state.ruleAgreement === true
    ) {
      let dataToSend = {
        callDate: this.state.callDate,
        callTime: this.state.callTime,
        phoneNumber: this.state.phoneNumber,
      };
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      }).then(() => {
        console.log(dataToSend);
        alert("Formularz wysłany!");
        window.location.reload(false);
      });
    } else {
      alert("formularz NIE wysłany!");
    }
  };

  closeModal = (e) => {
    if (this.modalRef.current === e.target) {
      this.props.toggleModal();
    }
  };

  render() {
    return (
      <>
        {this.props.showModal ? (
          <div
            className="modal-background"
            ref={this.modalRef}
            onClick={this.closeModal}
          >
            <div className="modal-container">
              <div className="modal-header">
                <div className="modal-header-text">Numer PESEL</div>
                <div className="modal-exit-icon">
                  <FaRegWindowClose
                    tabIndex={0}
                    onClick={this.props.toggleModal}
                  />
                </div>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleSubmitForm}>
                  <div className="modal-info modal-row">
                    Numer PESEL jest wymagany do rejestracji. Jeśli nie
                    posiadasz numeru PESEL, wybierz odpowiednią datę oraz
                    godzinę w której skontaktuje się z Tobą Biuro Obsługi
                    Klienta.
                  </div>
                  <div className="modal-row">
                    <div className="input-field-name">
                      Data{" "}
                      <span className="input-error-info">
                        {this.state.callDateError}
                      </span>
                    </div>
                    <div>
                      <DatePicker
                        required
                        locale="pl"
                        className="modal-date-input"
                        selected={this.state.callDate}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        maxDate={
                          new Date(
                            new Date().getFullYear() + 1,
                            new Date().getMonth(),
                            new Date().getDay()
                          )
                        }
                        onChange={this.handleDateChange}
                        filterDate={(date) =>
                          date.getDay() !== 0 && date.getDay() !== 6
                        }
                        placeholderText="Wybierz Date"
                      />
                    </div>
                  </div>
                  <div className="modal-row">
                    <div className="input-field-name">
                      Godzina{" "}
                      <span className="input-error-info">
                        {this.state.callTimeError}
                      </span>
                    </div>
                    <div>
                      <select
                        className="modal-time-select"
                        onChange={this.handleTimeSelect}
                        required
                      >
                        <option selected disabled hidden value="">
                          Wybierz godzinę
                        </option>
                        <option value={"9:00"}>9:00</option>
                        <option value={"9:30"}>9:30</option>
                        <option value={"10:00"}>10:00</option>
                        <option value={"10:30"}>10:30</option>
                        <option value={"11:00"}>11:00</option>
                        <option value={"11:30"}>11:30</option>
                        <option value={"12:00"}>12:00</option>
                        <option value={"12:30"}>12:30</option>
                        <option value={"13:00"}>13:00</option>
                        <option value={"13:30"}>13:30</option>
                        <option value={"14:00"}>14:00</option>
                        <option value={"14:30"}>14:30</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-phone-input modal-row">
                    <div className="input-field-name ">
                      Telefon
                      <span className="input-error-info">
                        {this.state.phoneNumberError}
                      </span>
                    </div>
                    <input
                      required
                      onWheel={(e) => e.target.blur()}
                      onBlur={this.handlePhoneNumberChange}
                      placeholder="Wprowadź numer telefonu"
                      type={"number"}
                      className={
                        this.state.phoneNumberError === ""
                          ? "input-field"
                          : "input-field-wrong"
                      }
                    ></input>
                  </div>
                  <div className="field-declaration-wrapper">
                    <span className="field-declaration-checkbox">
                      <input
                        required
                        checked={this.state.ruleAgreement}
                        className="checkbox-input rules-acceptance"
                        onChange={this.handleRuleAcceptance}
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
                        akceptuję jego treść i zobowiązuję się do przestrzegania
                        go.
                      </label>
                    </span>
                  </div>
                  <div className="modal-submit-button modal-row">
                    <input type={"submit"} value="Wyślij"></input>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
