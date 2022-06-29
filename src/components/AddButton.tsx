import { handleAddUser } from "../utils";

interface IProps {
    people: object[],
    setPeople: any
}


export default function AddButton({ people, setPeople }: IProps) {

    return (
        <button onClick={() => handleAddUser(people, setPeople)}>Add</ button>
    );
}