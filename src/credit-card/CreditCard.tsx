import { FormEvent, useState } from 'react';
import { validateCardHolder, validateCardNumber, validateCVC, validateExpirationDate } from './helpers/validation';
import { formatCVC, formatCardNumber } from './helpers/formatting';
import Card, { Focused } from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import '../styles.css'

const MONTHS = Array.from({ length: 12 }, (_, idx) => String(idx + 1).padStart(2, '0'));

type CreditCard = {
  cardNumber: string;
  cardHolder: string;
  expirationMonth: string;
  expirationYear: string;
  cvc: string;
};

type CreditCardProps = {
  onSubmit: (c: CreditCard) => void;
};

const CreditCard = ({ onSubmit }: CreditCardProps) => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');
  const [expirationMonth, setExpirationMonth] = useState<string>('');
  const [expirationYear, setExpirationYear] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');

  const [cardNumberError, setCardNumberError] = useState<string>('');
  const [cardHolderError, setCardHolderError] = useState<string>('');
  const [expirationError, setExpirationError] = useState<string>('');
  const [cvcError, setCvcError] = useState<string>('');

  const [cardSideFocus, setCardSideFocus] = useState<Focused>();

  const handleExpirationDateError = (month: string, year: string) => {
    if (month && year && !validateExpirationDate(month, year)) {
      setExpirationError('Invalid expiration date');
    } else {
      setExpirationError('');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target instanceof HTMLFormElement) {
      let formHasErrors = false;
      if (!validateCardNumber(cardNumber)) {
        formHasErrors = true;
        setCardNumberError('Invalid card number')
      }
      if (!validateCardHolder(cardHolder)) {
        formHasErrors = true;
        setCardHolderError('Invalid card name')
      }
      if (!validateExpirationDate(expirationMonth, expirationYear)) {
        formHasErrors = true;
        setExpirationError('Invalid expiration date')
      }
      if (!validateCVC(cvc)) {
        formHasErrors = true;
        setCvcError('Invalid CVC')
      }
      if (formHasErrors) {
        alert('Form was not filled out correctly, please review and try again!');
      } else {
        onSubmit({ cardNumber, cardHolder, cvc, expirationMonth, expirationYear });
      }
    }
  };

  return (
    <div>
      <Card
        number={cardNumber}
        name={cardHolder}
        cvc={cvc}
        expiry={expirationMonth + expirationYear}
        focused={cardSideFocus}
      />
      <form data-testid='creditCardForm' className='cardForm' onSubmit={handleSubmit} noValidate>
        <div style={{ height: '64px' }} />
        <TextInput
          label='Card Number'
          id='cardNumber'
          value={cardNumber}
          error={cardNumberError}
          format={(e) => formatCardNumber(e)}
          onChange={(e) => {
            setCardNumber(e.value);
            setCardNumberError('');
          }}
          onFocus={() => setCardSideFocus('number')}
          onBlur={(e) => { !validateCardNumber(e.value) && setCardNumberError('Invalid card number'); }}
        />
        <TextInput
          label='Card Name'
          id='cardHolder'
          value={cardHolder}
          error={cardHolderError}
          onChange={(e) => {
            setCardHolder(e.value);
            setCardHolderError('');
          }}
          onFocus={() => setCardSideFocus('name')}
          onBlur={(e) => { !validateCardHolder(e.value) && setCardHolderError('Invalid card name'); }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 128px' }}>
          <ExpirationDateSelect
            month={expirationMonth}
            year={expirationYear}
            error={expirationError}
            onMonthChange={(e) => {
              setExpirationMonth(e.value);
              handleExpirationDateError(e.value, expirationYear);
            }}
            onYearChange={(e) => {
              setExpirationYear(e.value);
              handleExpirationDateError(expirationMonth, e.value);
            }}
            onFocus={() => setCardSideFocus('expiry')}
          />
          <TextInput
            label='CVC'
            id='cvc'
            value={cvc}
            error={cvcError}
            format={(e) => formatCVC(e)}
            onChange={(e) => {
              setCvc(e.value);
              setCvcError('');
            }}
            onFocus={() => setCardSideFocus('cvc')}
            onBlur={(e) => { !validateCVC(e.value, cardNumber) && setCvcError('Invalid CVC'); }}
          />
        </div>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

type InputProps = {
  label: string;
  id: string;
  value: string;
  error: string;
  format?: (e: HTMLInputElement) => void;
  onChange: (e: HTMLInputElement) => void;
  onFocus: () => void;
  onBlur: (e: HTMLInputElement) => void;
};

const TextInput = ({ label, id, value, error, format, onChange, onFocus, onBlur }: InputProps) => {
  return (
    <div style={{ display: 'grid' }}>
      <label htmlFor={id}>{label}</label>
      <input
        className={error ? 'invalid': ''}
        type='text'
        id={id}
        value={value}
        onChange={(e) => {
          if (format) format(e.target);
          onChange(e.target);
        }}
        onFocus={onFocus}
        onBlur={(e) => onBlur(e.target)}
      />
      {<p className='errorMessage'>{error}</p>}
    </div>
  );
};

type ExpirationDateSelectProps = {
  month: string;
  year: string;
  error: string;
  onMonthChange: (e: HTMLSelectElement) => void;
  onYearChange: (e: HTMLSelectElement) => void;
  onFocus: () => void;
};

const ExpirationDateSelect = ({ month, year, error, onMonthChange, onYearChange, onFocus }: ExpirationDateSelectProps) => {
  const years = Array.from({ length: 10 }, (_, idx) => String(new Date().getFullYear() + idx).padStart(2, '0'));

  return (
    <div style={{ display: 'grid' }}>
      <label>Expiration Date</label>
      <div style={{ width: 'max-content', }}>
        <select
          data-testid='expirationMonthSelect'
          className={error ? 'invalid' : ''}
          id='expirationMonth'
          value={month || 'Month'}
          onChange={(e) => onMonthChange(e.target)}
          onFocus={onFocus}
        >
          <option disabled>Month</option>
          {MONTHS.map(month => (
            <option value={month} key={month}>{month}</option>
          ))}
        </select>
        <select
          data-testid='expirationYearSelect'
          className={error ? 'invalid' : ''}
          id='expirationYear'
          value={year || 'Year'}
          onChange={(e) => onYearChange(e.target)}
          onFocus={onFocus}
        >
          <option disabled>Year</option>
          {years.map(year => (
            <option value={year} key={year}>{year}</option>
          ))}
        </select>
        {<p className='errorMessage'>{error}</p>}
      </div>
    </div>
  );
};

export default CreditCard;
