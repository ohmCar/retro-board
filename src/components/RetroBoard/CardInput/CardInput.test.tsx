import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import CardInput from './CardInput';
import {ColumnType} from "../../../types/types";
import userEvent from "@testing-library/user-event";

describe('CardInput Component', () => {
    const mockOnInputChange = jest.fn();
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render textarea with the correct placeholder and initial value', () => {
        const cardInput = <CardInput
            inputValue="Test"
            columnType={ColumnType.WentWell}
            onInputChange={mockOnInputChange}
            onSubmit={mockOnSubmit}
            onCancel={mockOnCancel}
        />;
        render(cardInput);
        const textarea = screen.getByPlaceholderText("Type something...");
        expect(textarea).toBeInTheDocument();
        expect(textarea).toHaveValue("Test");
    });

    it('should call onInputChange when the textarea value is changed', () => {
        const cardInput = <CardInput
            inputValue=""
            columnType={ColumnType.WentWell}
            onInputChange={mockOnInputChange}
            onSubmit={mockOnSubmit}
            onCancel={mockOnCancel}
        />;
        render(cardInput);
        const textarea = screen.getByPlaceholderText("Type something...");
        userEvent.type(textarea, 'Hello');
        expect(mockOnInputChange).toHaveBeenCalledTimes(5);
    });

    it('should trigger onSubmit when the submit button is clicked', () => {
        const cardInput = <CardInput
            inputValue="Submit test"
            columnType={ColumnType.WentWell}
            onInputChange={mockOnInputChange}
            onSubmit={mockOnSubmit}
            onCancel={mockOnCancel}
        />;
        render(cardInput);
        const submitButton = screen.getByText("✓");
        fireEvent.click(submitButton);
        expect(mockOnSubmit).toHaveBeenCalled();
    });

    it('should trigger onCancel when the cancel button is clicked', () => {
        const cardInput = <CardInput
            inputValue="Cancel test"
            columnType={ColumnType.WentWell}
            onInputChange={mockOnInputChange}
            onSubmit={mockOnSubmit}
            onCancel={mockOnCancel}
        />;
        render(cardInput);
        const cancelButton = screen.getByText("✕");
        fireEvent.click(cancelButton);
        expect(mockOnCancel).toHaveBeenCalled();
    });

    it('should apply correct border color based on columnType', () => {
        const cardInput = <CardInput
            inputValue="Border color test"
            columnType={ColumnType.ToImprove}
            onInputChange={mockOnInputChange}
            onSubmit={mockOnSubmit}
            onCancel={mockOnCancel}
        />;
        render(cardInput);
        expect(screen.getByTestId("card-input-text-area")).toHaveClass('border-strawberry-mix');
    });
});
