import React, { Component } from 'react';

const tipOptions = [
  { label: 'Excellent (20%)', value: 'excellent' },
  { label: 'Moderate (10%)', value: 'moderate' },
  { label: 'Bad (5%)', value: 'bad' },
];

class TipCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      totalTip: 0,
      billAmount: 0,
      customerName: '',
      serviceRating: 'excellent',
    };
  }

  handleBillAmountChange = (event) => {
    this.setState({ billAmount: parseFloat(event.target.value) || 0 });
  }

  handleNameChange = (event) => {
    this.setState({ customerName: event.target.value });
  }

  handleServiceRatingChange = (event) => {
    this.setState({ serviceRating: event.target.value });
  }

  calculateTip = () => {
    const { billAmount, serviceRating } = this.state;
    let tipPercentage = 0;

    switch (serviceRating) {
      case 'excellent':
        tipPercentage = 0.2;
        break;
      case 'moderate':
        tipPercentage = 0.1;
        break;
      case 'bad':
        tipPercentage = 0.05;
        break;
      default:
        tipPercentage = 0;
    }

    const tipAmount = billAmount * tipPercentage;
    return tipAmount;
  }

  handleAddCustomer = () => {
    const { customerName, billAmount } = this.state;

    if (customerName && billAmount > 0) {
      const tipAmount = this.calculateTip();
      const newCustomer = {
        name: customerName,
        bill: billAmount,
        tip: tipAmount,
      };

      this.setState((prevState) => ({
        customers: [...prevState.customers, newCustomer],
        totalTip: prevState.totalTip + tipAmount,
        customerName: '',
        billAmount: 0,
      }));
    }
  }

  render() {
    const { customers, totalTip, customerName, billAmount, serviceRating } = this.state;

    return (
      <div className="tip-calculator-container">
        
        <h1 className="title">Tip Calculator</h1>
        <p className="para">Build in React</p><br/>
  
        <div className="bill-section">
          <label>Enter Bill Amount:</label>
          <input type="number" className="bill-input" onChange={this.handleBillAmountChange} value={billAmount} />
        </div>
        <hr
        style={{
          background: 'black',
          color: 'black',
          borderColor: 'black',
          height:'1px',
          width:'1000px',
          marginTop:'30px',
          marginRight:'250px',
        }}/>
        <hr className="separator" />
        <div className="service-section">
          <p className="nani">How was the service</p>
          <select onChange={this.handleServiceRatingChange} value={serviceRating} className="service-select">
            {tipOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input type="text"  placeholder="Customer Name" onChange={this.handleNameChange} value={customerName} className="customer-name-input" />
          <button onClick={this.handleAddCustomer} className="add-customer-button">Add Customer</button>
        </div>
        
        <div className="customer-tips">
          <h2 className="customer-tips-title">Customer List:</h2>
          <hr
        style={{
          background: 'black',
          color: 'black',
          borderColor: 'black',
          height:'1px',
          width:'1000px',
          paddingleft:'0px',
        }}/>
          <ul>
            {customers.map((customer, index) => (
              <li key={index}>
                Customer: {customer.name}, Tip Amount: {customer.tip} Rs
              </li>
            ))}
          </ul>
        
        </div>
        <div className="total-section">
          <section className="calculate-button">
          <h3 >Calculate Tip&Customers</h3>
          </section>
          <section className="dan">
                <h3 className="total-customer">Total Customers: <br/><hr/>{customers.length}</h3>
                  <h3 className="total-tip">Total Tips Paid:<br/><hr/> {totalTip} Rs</h3>
          </section>
        </div>
        <div className="footer">
          @2020 TIP-CALCULATOR
        </div>
      </div>
    );
  }
}

export default TipCalculator;