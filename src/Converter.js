import React, { Component } from "react";

export default class Converter extends Component {
  state = {
    currencies: ["EUR", "INR", "PHP", "SAR", "USD"],
    base: "USD",
    amount: "",
    convertTo: "SAR",
    result: "",
    date: "",
    rates: {}
  };

  componentDidMount() {
    const APP_ID = "b722609c47ef47929a35ad0f0b8dc58c";

    fetch(`https://openexchangerates.org/api/latest.json?app_id=${APP_ID}&base=USD`)
      .then(res => res.json())
      .then(data => {
        console.log("data", data);
        const date = new Date(data.timestamp * 1000).toLocaleDateString();
        //const date = new Intl.DateTimeFormat("en-us").format(dateObj);
        const rates = data.rates;
        this.setState({ rates, date });
      });
  }
  handleSelect = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      this.calculate
    );
  };

  handleInput = e => {
    this.setState(
      {
        amount: e.target.value
      },
      this.calculate
    );
  };

  handleSwap = e => {
    const { base: convertTo, convertTo: base } = this.state;
    this.setState({ convertTo, base }, this.calculate);
  };

  calculate = () => {
    const amount = this.state.amount;
    if (isNaN(amount)) return;
    else {
      const { amount, base, convertTo, rates } = this.state;
      /*
      SAR 1 = USD 0.266
      USD 1 = INR 70
      SAR 100 = 100 * 0.266 * 70
      */
      const result = ((1.0 / rates[base]) * amount * rates[convertTo]).toFixed(2);
      this.setState({ result });
    }
  };
  render() {
    const { currencies, base, amount, convertTo, result, date } = this.state;
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card card-body" Style="background: silver">
              <h5>
                {amount} {base} is equal to
              </h5>
              <h2>
                {result} {convertTo}
              </h2>
              <p>As of {date}</p>

              <div className="row">
                <div className="col-lg-10 col-md-10 col-sm-10">
                  <form className="form-inline mb-4">
                    <input
                      type="number"
                      className="form-control form-control-lg mx-3"
                      value={amount}
                      onChange={this.handleInput}></input>
                    <select
                      name="base"
                      value={base}
                      onChange={this.handleSelect}
                      className="form-control from-control-lg">
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </form>

                  <form className="form-inline mb-4">
                    <input disabled={true} value={result} className="form-control form-control-lg mx-3"></input>
                    <select
                      name="convertTo"
                      value={convertTo}
                      onChange={this.handleSelect}
                      className="form-control from-control-lg">
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 align-self-center">
                  <h1 className="swap" onClick={this.handleSwap}>
                    &#8595;&#8593;
                  </h1>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
