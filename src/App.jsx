import "./App.css";
import logo from "./images/logo.svg";
import dollarSign from "./images/icon-dollar.svg";
import person from "./images/icon-person.svg";

function App() {
  return (
    <>
      <img src={logo} className="logo" alt="logo" />
      <main className="calculator">
        <div className="calculator__inputs">
          <div className="calculator__inputbox">
            <label htmlFor="bill" className="input__label">
              Bill
            </label>
            <div className="input__container">
              <img src={dollarSign} alt="icon of a dollar sign" />
              <input
                placeholder="0"
                className="calculator__input"
                type="number"
                name="bill"
                id="bill"
              />
            </div>
          </div>
          <div className="calculator__percentages">
            <p className="input__label">Select Tip %</p>
            <div className="percentages__box">
              <button aria-selected="false">5%</button>
              <button aria-selected="false">10%</button>
              <button aria-selected="true">15%</button>
              <button aria-selected="false">25%</button>
              <button aria-selected="false">50%</button>
              <input
                placeholder="Custom"
                type="number"
                className="calculator__input"
                name="custom"
                id="custom"
              />
            </div>
          </div>
          <div className="calculator__inputbox">
            <div className="label__container">
              <label className="input__label" htmlFor="people">
                Number of people
              </label>
              <p className="error__msg" hidden>
                Can't be zero
              </p>
            </div>

            <div className="input__container">
              <img src={person} alt="icon of a person" />
              <input
                placeholder="0"
                type="number"
                className="calculator__input"
                name="people"
                id="people"
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
              <p className="output__value">$0.00</p>
            </div>
            <div className="output__display">
              <div>
                <p className="output__title">Total</p>
                <p className="output__ratio">/ person</p>
              </div>
              <p className="output__value">$0.00</p>
            </div>
          </div>
          <button className="output__reset" disabled>
            Reset
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
