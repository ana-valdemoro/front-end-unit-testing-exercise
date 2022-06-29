import { getUsers } from "./services/userService";

export const defaultUser = { id: '22', name: 'Ana Valdemoro' }

export const handleAddUser = (
  people: object[],
  setPeople: (value: object[]) => void,
  user?: object
  ): void => {
    people.map(user => {
      if (Object.keys(user).some(key => key !== 'name' && key !== 'id')) {
        throw Error
      }
    })
    const userToAdd = user || defaultUser
    const addUser = [...people, userToAdd]
    setPeople(addUser)
};

export const fetchPeople = async (): Promise<any> => {
    try {
      const peopleFromAPI = await (await getUsers()).json();
      return peopleFromAPI;
    } catch (e) {
      console.error(e);
    }
};