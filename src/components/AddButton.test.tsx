import { render, screen, fireEvent } from "@testing-library/react";
import AddButton from "./AddButton";


describe('UI test for AddButton', () => {

    it('Should render AddButton', () => {
        render(<AddButton handleAddUser={() => true} />);
        const button = screen.getByText("Add");


        expect(button).toBeInTheDocument(); expect(button).not.toBeNull();
    });

    it("Should add a new User when AddButton is clicked", async () => {
        const handleClick = jest.fn(() => true);
        render(<AddButton handleAddUser={handleClick} />);
        const button = screen.getByText("Add");

        fireEvent.click(button);

        expect(handleClick).toBeCalledTimes(1);
    });
})