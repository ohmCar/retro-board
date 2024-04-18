import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import RetroCard from './RetroCard';
import {ColumnType} from '../../../types/types';

describe('RetroCard Component', () => {
    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly with given props', () => {
        const retroCard = <RetroCard
            id={1}
            text="Test Card"
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
            columnType={ColumnType.WentWell}
        />;
        render(retroCard);
        expect(screen.getByText("Test Card")).toBeInTheDocument();
    });

    it('should toggle menu visibility when the menu button is clicked', () => {
        const retroCard = <RetroCard
            id={1}
            text="Test Card"
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
            columnType={ColumnType.WentWell}
        />;
        render(retroCard);
        const menuButton = screen.getByText("⋮");
        fireEvent.click(menuButton);
        expect(screen.getByText("Edit Card")).toBeInTheDocument();
        fireEvent.click(menuButton);
        expect(screen.queryByText("Edit Card")).not.toBeInTheDocument();
    });

    it('should call onEdit with correct parameters when Edit is clicked', async () => {
        const retroCard = <RetroCard
            id={1}
            text="Test Card"
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
            columnType={ColumnType.WentWell}
        />;
        render(retroCard);
        fireEvent.click(screen.getByText("⋮"));
        fireEvent.click(screen.getByText("Edit Card"));
        expect(mockOnEdit).toHaveBeenCalledWith(1, "Test Card");
    });

    it('should call onDelete when Delete is clicked', () => {
        const retroCard = <RetroCard
            id={1}
            text="Test Card"
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
            columnType={ColumnType.WentWell}
        />;
        render(retroCard);
        fireEvent.click(screen.getByText("⋮"));
        fireEvent.click(screen.getByText("Delete Card"));
        expect(mockOnDelete).toHaveBeenCalledWith(1);
    });

    it('sets the appropriate background color based on the column type', () => {
        const retroCard = <RetroCard
            id={1}
            text="Test Card"
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
            columnType={ColumnType.WentWell}
        />;
        render(retroCard);
        expect(screen.getByTestId("retro-card")).toHaveClass("bg-dark-cyan");
    });
});
