import { fireEvent, render } from '@testing-library/react';
import { describe, it } from 'vitest';
import CreditCard from './CreditCard';

describe('Card number input', () => {
    it('should accept MasterCard number', () => {
        const utils = render(<CreditCard onSubmit={() => { }} />)
        const input = utils.getByLabelText('Card Number');
        fireEvent.change(input, { target: { value: '5555555555554444' } });
        fireEvent.focusOut(input);
        expect(input.className).toBe('');
    })

    it('should accept Visa number', () => {
        const utils = render(<CreditCard onSubmit={() => { }} />)
        const input = utils.getByLabelText('Card Number');
        fireEvent.change(input, { target: { value: '4012888888881881' } });
        fireEvent.focusOut(input);
        expect(input.className).toBe('');
    })

    it('should not accept incomplete number', () => {
        const utils = render(<CreditCard onSubmit={() => { }} />)
        const input = utils.getByLabelText('Card Number');
        fireEvent.change(input, { target: { value: '123' } });
        fireEvent.focusOut(input);
        expect(input.className).toBe('invalid');
    })
});

describe('Card name input', () => {
    it('should accept my name', () => {
        const utils = render(<CreditCard onSubmit={() => { }} />)
        const input = utils.getByLabelText('Card Name');
        fireEvent.change(input, { target: { value: 'Luis Fernandez' } });
        fireEvent.focusOut(input);
        expect(input.className).toBe('');
    })

    it('should not accept an empty string', () => {
        const utils = render(<CreditCard onSubmit={() => { }} />)
        const input = utils.getByLabelText('Card Name');
        fireEvent.change(input, { target: { value: '' } });
        fireEvent.focusOut(input);
        expect(input.className).toBe('invalid');
    })
});

describe('Expiration date select', () => {
    it('should accept date 5 years from now', () => {
        const utils = render(<CreditCard onSubmit={() => { }} />)

        const monthSelect = utils.getByTestId('expirationMonthSelect')
        fireEvent.change(monthSelect, { target: { value: '01' } });

        const yearSelect = utils.getByTestId('expirationYearSelect')
        fireEvent.change(yearSelect, { target: { value: new Date().getFullYear() + 5 } });

        expect(monthSelect.className).toBe('');
        expect(yearSelect.className).toBe('');
    })

    it('should not accept date january this year', () => {
        const utils = render(<CreditCard onSubmit={() => { }} />)

        const monthSelect = utils.getByTestId('expirationMonthSelect')
        fireEvent.change(monthSelect, { target: { value: '01' } });

        const yearSelect = utils.getByTestId('expirationYearSelect')
        fireEvent.change(yearSelect, { target: { value: new Date().getFullYear() } });

        expect(monthSelect.className).toBe('invalid');
        expect(yearSelect.className).toBe('invalid');
    })
});

describe('CVC input', () => {
    it('should accept 3 digits', () => {
        const utils = render(<CreditCard onSubmit={() => { }} />)
        const input = utils.getByLabelText('CVC');
        fireEvent.change(input, { target: { value: '123' } });
        fireEvent.focusOut(input);
        expect(input.className).toBe('');
    })

    it('should not accept 2 digits', () => {
        const utils = render(<CreditCard onSubmit={() => { }} />)
        const input = utils.getByLabelText('CVC');
        fireEvent.change(input, { target: { value: '12' } });
        fireEvent.focusOut(input);
        expect(input.className).toBe('invalid');
    })
});

describe('Submission', () => {
    it('should succeed for valid data', () => {
        let submitted = false;

        const utils = render(<CreditCard onSubmit={() => { submitted = true }} />)

        const cardNumberInput = utils.getByLabelText('Card Number');
        fireEvent.change(cardNumberInput, { target: { value: '5555555555554444' } });

        const cardHolderInput = utils.getByLabelText('Card Name');
        fireEvent.change(cardHolderInput, { target: { value: 'Luis Fernandez' } });

        const monthSelect = utils.getByTestId('expirationMonthSelect')
        fireEvent.change(monthSelect, { target: { value: '01' } });

        const yearSelect = utils.getByTestId('expirationYearSelect')
        fireEvent.change(yearSelect, { target: { value: new Date().getFullYear() + 5 } });

        const cvcInput = utils.getByLabelText('CVC');
        fireEvent.change(cvcInput, { target: { value: '123' } });

        const form = utils.getByTestId('creditCardForm');
        fireEvent.submit(form);

        expect(submitted).toBeTruthy();
    });

    it('should not call onSubmit for faulty data', () => {
        let submitted = false;

        const utils = render(<CreditCard onSubmit={() => { submitted = true }} />)

        const cardNumberInput = utils.getByLabelText('Card Number');
        fireEvent.change(cardNumberInput, { target: { value: '5555555555554444' } });

        const cardHolderInput = utils.getByLabelText('Card Name');
        fireEvent.change(cardHolderInput, { target: { value: 'Luis Fernandez' } });

        const monthSelect = utils.getByTestId('expirationMonthSelect')
        fireEvent.change(monthSelect, { target: { value: '01' } });

        const yearSelect = utils.getByTestId('expirationYearSelect')
        fireEvent.change(yearSelect, { target: { value: new Date().getFullYear() + 5 } });

        // Omit one digit in CVC
        const cvcInput = utils.getByLabelText('CVC');
        fireEvent.change(cvcInput, { target: { value: '12' } });

        const form = utils.getByTestId('creditCardForm');
        fireEvent.submit(form);

        expect(submitted).toBeFalsy();
    });
});