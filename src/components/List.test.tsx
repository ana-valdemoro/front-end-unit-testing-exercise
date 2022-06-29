import { render, screen, act, fireEvent } from "@testing-library/react";
import List from "./List";
import { getUsers } from "../services/userService";
import { AddButton } from "./AddButton";

const users = [
    { id: 1, name: "Pepa juana" },
    { id: 2, name: "juana" },
    { id: 3, name: "Pepa" },
];

jest.mock("../services/userService", () => ({
    getUsers: jest.fn(),
}));

jest.mock("./AddButton", () => ({
    AddButton: jest.fn(() => <div>::AddButton::</div>),
}));

afterEach(() => {
    (getUsers as jest.Mock).mockReset();
    jest.clearAllMocks()
});

it("should not render list component", () => {
    render(<List />);

    const linkElement = screen.queryByRole("list");

    expect(linkElement).not.toBeInTheDocument();
});

it("should render list component after call our getUser service", async () => {
    (getUsers as jest.Mock).mockImplementation(() => {
        return Promise.resolve({
            json: () => Promise.resolve(users),
        });
    });

    await act(async () => render(<List />) as any);

    expect(getUsers).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(AddButton).toBeCalledTimes(1)
});


it("should check could click on AddButton", async () => {
    (getUsers as jest.Mock).mockImplementation(() => {
        return Promise.resolve({
            json: () => Promise.resolve(users),
        });
    });
    await act(async () => render(<List />) as any);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    const button = screen.getByText("::AddButton::");
    fireEvent.click(button);
    expect(AddButton).toHaveBeenCalledTimes(1);

});