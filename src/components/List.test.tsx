import { render, screen, act, fireEvent } from "@testing-library/react";
import List from "./List";
import { getUsers } from "../services/userService";
import AddButton from "./AddButton";

const users = [
    { id: 1, name: "Pepa juana" },
    { id: 2, name: "juana" },
    { id: 3, name: "Pepa" },
];

// jest.mock("../services/userService", () => ({
//     getUsers: jest.fn().mockImplementation(() => {
//         return Promise.resolve({
//             json: jest.fn(() => Promise.resolve(users)),
//         })
//     }),
// }));

jest.mock("../services/userService", () => ({
    getUsers: jest.fn(),
}));

// jest.mock("./AddButton", () => ({
//     AddButton: jest.fn(({ people, setPeople }) => (
//         <button onClick={() => true}>Add</button>
//     )),
// }));


afterEach(() => {
    (getUsers as jest.Mock).mockReset();
});

it("should not render list component", () => {
    render(<List />);

    const linkElement = screen.queryByRole("list");

    expect(linkElement).not.toBeInTheDocument();
});

it("should render list component after mount", async () => {
    (getUsers as jest.Mock).mockImplementation(() => {
        return Promise.resolve({
            json: () => Promise.resolve(users),
        });
    });

    await act(async () => render(<List />) as any);

    expect(getUsers).toHaveBeenCalledTimes(1);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
});


it.only("should check when AddButton is clicked that people has one more item", async () => {
    (getUsers as jest.Mock).mockImplementation(() => {
        return Promise.resolve({
            json: () => Promise.resolve(users),
        });
    });
    await act(async () => render(<List />) as any);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    // await act(async () => render(<AddButton />) as any);

    const button = screen.getByText("Add");
    fireEvent.click(button);

    // expect(AddButton).toHaveBeenCalledTimes(1);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);

});

// it('should render 10 li on screen', async () => {

//     render(<List />);

//     await waitFor(() => {

//         expect(screen.getAllByRole('listitem')).toHaveLength(10);

//     });

// });
