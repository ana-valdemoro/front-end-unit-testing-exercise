interface IProps {
    handleAddUser: any
}

export default function AddButton({ handleAddUser }: IProps) {

    return (
        <button onClick={handleAddUser}>Add</ button>
    );
}