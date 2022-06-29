import { render, screen, fireEvent } from "@testing-library/react";
import AddButton from "./AddButton";


describe('UI test for AddButton', () => {
    let people: object[] = [];

    it('Should render AddButton', () => {
        render(<AddButton people={people} setPeople={() => true} />);
        const button = screen.getByText("Add");


        expect(button).toBeInTheDocument(); expect(button).not.toBeNull();
    });

    it("Should add a new User when AddButton is clicked", async () => {
        const handleClick = jest.fn(() => true);
        render(<AddButton people={people} setPeople={handleClick} />);
        const button = screen.getByText("Add");

        fireEvent.click(button);

        expect(handleClick).toBeCalledTimes(1);
    });
})