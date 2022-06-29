import { handleAddUser } from "../utils";

interface IProps {
    people: object[],
    setPeople: any
}


export const AddButton = ({ people, setPeople }: IProps) =>  {

    return (
        <button onClick={() => handleAddUser(people, setPeople)}>Add</ button>
    );
}