import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import AddCardButton from './AddCardButton';

describe('AddCardButton Component', () => {
    it('should render the button with the correct text', () => {
        render(<AddCardButton onAdd={() => {}} />);
        expect(screen.getByText("+")).toBeInTheDocument();
    });

    it('should call onAdd when the button is clicked', () => {
        const mockOnAdd = jest.fn();
        render(<AddCardButton onAdd={mockOnAdd} />);
        fireEvent.click(screen.getByText("+"));
        expect(mockOnAdd).toHaveBeenCalledTimes(1);
    });
});
