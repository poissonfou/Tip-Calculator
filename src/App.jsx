import "./App.css";
import logo from "./images/logo.svg";
import dollarSign from "./images/icon-dollar.svg";
import person from "./images/icon-person.svg";

import { useState, useRef, useEffect } from "react";

function App() {
  const [tip, setTip] = useState("0.00");
  const [total, setTotal] = useState("0.00");
  const [btnDeactivated, setBtnDeactivated] = useState(true);
  const [errors, setErrors] = useState({ bill: false, people: false });

  const bill = useRef("0");
  const people = useRef("1");
  const custom = useRef("");

  function calcValues() {
    const selectedPercentage = document.querySelector('[aria-selected="true"]');
    if (!selectedPercentage && custom.current.value.trim() == "") return;

    const nBill = new Number(bill.current.value);
    const nPeople =
      people.current.value <= 0 ? 1 : new Number(people.current.value);

    if (nBill <= 0) return;

    setBtnDeactivated(() => false);

    let tipDivided;
    if (selectedPercentage) {
      const number =
        new Number(selectedPercentage.innerText.replace("%", "")) / 100;
      const tipFull = nBill * number;
      tipDivided = tipFull / nPeople;
      setTip(() => tipDivided.toFixed(2));
    } else {
      const number = new Number(custom.current.value.replace("%", "")) / 100;
      const tipFull = nBill * number;
      tipDivided = tipFull / nPeople;
      setTip(() => tipDivided.toFixed(2));
    }

    const total = nBill / nPeople + tipDivided;
    setTotal(() => total.toFixed(2));
  }

  function focusInput(e) {
    e.target.parentElement.classList.add("input__container--active");
  }

  function unfocusInput(e) {
    const parent = e.target.parentElement;
    parent.classList.remove("input__container--active");
  }

  function setBillInput(e) {
    const n = new Number(bill.current.value);
    if (n <= 0) {
      bill.current.value = "";
      setErrors((prev) => {
        const newErrors = JSON.parse(JSON.stringify(prev));
        newErrors.bill = true;
        return newErrors;
      });
    }
    unfocusInput(e);
    calcValues();
    if (errors.bill) {
      e.target.parentElement.classList.remove("input__container--error");
      setErrors((prev) => {
        const newErrors = JSON.parse(JSON.stringify(prev));
        newErrors.bill = false;
        return newErrors;
      });
    }
  }

  function setPeopleInput(e) {
    const n = new Number(people.current.value);
    if (n <= 0) {
      people.current.value = "";
      setErrors((prev) => {
        const newErrors = JSON.parse(JSON.stringify(prev));
        newErrors.people = true;
        return newErrors;
      });
      return;
    }
    unfocusInput(e);
    calcValues();
    if (errors.people) {
      e.target.parentElement.classList.remove("input__container--error");
      setErrors((prev) => {
        const newErrors = JSON.parse(JSON.stringify(prev));
        newErrors.people = false;
        return newErrors;
      });
    }
  }

  function selectPercentage(e) {
    document
      .querySelector('[aria-selected="true"]')
      ?.setAttribute("aria-selected", false);
    e.target.setAttribute("aria-selected", true);

    calcValues();
  }

  function setCustom() {
    const n = new Number(custom.current.value);
    if (n < 0) {
      custom.current.value = "";
      return;
    }
    document
      .querySelector('[aria-selected="true"]')
      ?.setAttribute("aria-selected", false);

    calcValues();
  }

  function reset() {
    setTip(() => "0.00");
    setTotal(() => "0.00");
    document
      .querySelector('[aria-selected="true"]')
      ?.setAttribute("aria-selected", false);
    bill.current.value = "";
    people.current.value = "";

    setBtnDeactivated(() => true);
  }

  return (
    <>
      <img src={logo} className="logo" alt="logo" />
      <main className="calculator">
        <div className="calculator__inputs">
          <div className="calculator__inputbox">
            <div className="label__container">
              <label htmlFor="bill" className="input__label">
                Bill
              </label>
              {errors.bill && <p className="error__msg">Can't be zero</p>}
            </div>
            <div
              className={`input__container ${
                errors.bill && "input__container--error"
              }`}
            >
              <img src={dollarSign} alt="icon of a dollar sign" />
              <input
                onFocus={(e) => focusInput(e)}
                onBlur={(e) => setBillInput(e)}
                placeholder="0"
                className="calculator__input"
                type="number"
                name="bill"
                id="bill"
                ref={bill}
              />
            </div>
          </div>
          <div className="calculator__percentages">
            <p className="input__label" id="tip-percentage">
              Select Tip %
            </p>
            <div className="percentages__box" aria-describedby="tip-percentage">
              <button
                onClick={(e) => selectPercentage(e)}
                aria-selected="false"
              >
                5%
              </button>
              <button
                onClick={(e) => selectPercentage(e)}
                aria-selected="false"
              >
                10%
              </button>
              <button
                onClick={(e) => selectPercentage(e)}
                aria-selected="false"
              >
                15%
              </button>
              <button
                onClick={(e) => selectPercentage(e)}
                aria-selected="false"
              >
                25%
              </button>
              <button
                onClick={(e) => selectPercentage(e)}
                aria-selected="false"
              >
                50%
              </button>
              <input
                onBlur={() => setCustom()}
                placeholder="Custom"
                type="number"
                className="calculator__input"
                name="custom"
                id="custom"
                ref={custom}
              />
            </div>
          </div>
          <div className="calculator__inputbox">
            <div className="label__container">
              <label className="input__label" htmlFor="people">
                Number of people
              </label>
              {errors.people && <p className="error__msg">Can't be zero</p>}
            </div>

            <div
              className={`input__container ${
                errors.people && "input__container--error"
              }`}
            >
              <img src={person} alt="icon of a person" />
              <input
                onFocus={(e) => focusInput(e)}
                onBlur={(e) => setPeopleInput(e)}
                placeholder="1"
                type="number"
                className="calculator__input"
                name="people"
                id="people"
                ref={people}
              />
            </div>
          </div>
        </div>
        <div className="calculator__outputs">
          <div>
            <div className="output__display">
              <div>
                <p className="output__title">Tip Amount</p>
                <p className="output__ratio">/ person</p>
              </div>
              <p className="output__value">${tip}</p>
            </div>
            <div className="output__display">
              <div>
                <p className="output__title">Total</p>
                <p className="output__ratio">/ person</p>
              </div>
              <p className="output__value">${total}</p>
            </div>
          </div>
          <button
            onClick={() => reset()}
            className={`output__reset ${
              btnDeactivated && "output__reset--deactivated"
            }`}
            id="output-reset"
          >
            Reset
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
