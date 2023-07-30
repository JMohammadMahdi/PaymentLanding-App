import React, { Component } from 'react';
import '../styles/payment.css'
import '../styles/response.css'
// images
import frontCard from '../assets/images/bg-card-front.png';
import backCard from '../assets/images/bg-card-back.png';

class Payment extends Component {
    constructor() {
        super();
        this.state = {
            holderName: 'Mohammad Mahdi Jalali',
            cardNumber: '6104337499144549',
            extM: '03',
            extY: '03',
            cvc: '339',
        }
    }
    holderNameHandler = (event) => { this.setState({ holderName: event.target.value }) };
    cardNumberHandler = (event) => {
        this.setState({ cardNumber: event.target.value });
        // this.CardNumberFormatted();
    };
    extMHandler = (event) => { this.setState({ extM: event.target.value }) };
    extYHandler = (event) => { this.setState({ extY: event.target.value }) };
    cvcHandler = (event) => { this.setState({ cvc: event.target.value }) };
    ExpirationHandler = () => {
        const { extM, extY } = this.state;
        if (extM && extY) { return `${extM}/${extY}` }
        else if (extM) { return `${extM}/00` }
        else if (extY) { return `00/${extY}` }
        else { return `00/00` }
    }
    CardNumberFormatted = () => {
        const { cardNumber } = this.state;
        const formattedData = cardNumber
            .replace(/[^0-9]/gi, '')
            .replace(/(.{4})/g, '$1-')
            .replace(/[-]$/g, '')
            .trim();
        return formattedData;
    }
    
    submitHandler = (event) => {
        event.preventDefault();

    }
    // validations
    holderName_validator = () => {
        const { holderName } = this.state;
        if (holderName.length >= 3) { return true }
        else { return false }
    }
    cardNumber_validator = () => {
        const { cardNumber } = this.state;
        if ((/\d{16}/).exec(cardNumber)) { return true }
        else { return false }
    }
    ExpirationM_validator = () => {
        const { extM } = this.state;
        if (extM.length === 2) { return true }
        else { return false }
    }
    ExpirationY_validator = () => {
        const { extY } = this.state;
        if (extY.length === 2) { return true }
        else { return false }
    }
    CVC_validator = () => {
        const { cvc } = this.state;
        if (cvc.length === 3) { return true }
        else { return false }
    }
    render() {
        const { holderName, cardNumber, extM, extY, cvc } = this.state;
        return (
            <main>
                <div className='sidebar'>
                    <div className='templateCard'>
                        <div className='frontContainer'>
                            <img className='frontCard' src={frontCard} alt='' />
                            <div className='shapesOnCard'>
                                <span></span>
                                <span></span>
                            </div>
                            <div className='displayHolder'>
                                <span>{this.CardNumberFormatted()}</span>
                            </div>
                            <div className='displayInformation'>
                                <span id='displayName'>{holderName}</span>
                                <span id='displayName'>{this.ExpirationHandler()}</span>
                            </div>
                        </div>
                        <div className='backContainer'>
                            <img className='backCard' src={backCard} alt='' />
                            <div>
                                <span>{cvc}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <form>
                        <div>
                            <label htmlFor='holderName'>Cardholder Name</label>
                            <input onChange={this.holderNameHandler} value={this.state.holderName} className={this.holderName_validator() ? `valid inputs` : `inValid inputs`} type='text' id='holderName' placeholder='e.g. Jane Appleseed' maxLength={30} />
                        </div>
                        <div>
                            <label htmlFor='cardNumber'>Card Number</label>
                            <input onChange={this.cardNumberHandler} value={cardNumber} className={this.cardNumber_validator() ? `valid inputs` : `inValid inputs`} type='text' id='cardNumber' placeholder='e.g. 1234 5678 9123 0000' maxLength={16} />
                        </div>
                        <div className='importantNumbers'>
                            <div className='cardExpiration'>
                                <label htmlFor='month'>Exp. Date (MM/YY)</label>
                                <input onChange={this.extMHandler} value={extM} className={this.ExpirationM_validator() ? `valid miniInputs` : `inValid miniInputs`} type='text' id='month' placeholder='MM' maxLength={2} />
                                <input onChange={this.extYHandler} value={extY} className={this.ExpirationY_validator() ? `valid miniInputs` : `inValid miniInputs`} type='text' id='year' placeholder='YY' maxLength={2} />
                            </div>
                            <div className='cardCVC'>
                                <label htmlFor='cvc'>CVC</label>
                                <input onChange={this.cvcHandler} value={cvc} className={this.CVC_validator() ? `valid miniInputs` : `inValid miniInputs`} type='text' id='cvc' placeholder='e.g. 123' maxLength={3} />
                            </div>
                        </div>
                        <button onClick={this.submitHandler} className='submit'>Confirm</button>
                    </form>
                </div>
            </main>
        );
    }
};

export default Payment;