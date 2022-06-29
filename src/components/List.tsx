import React, { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import AddButton from "./AddButton";

function List() {
  const [people, setPeople] = useState<undefined | object[]>(undefined);

  useEffect(() => {
    const fectPeople = async () => {
      let people: object[];
      try {
        people = await (await getUsers()).json();
        setPeople(people);
      } catch (e) {
        console.error(e);
      }
    };
    fectPeople();

    // Especifica cómo sanear este efecto:
    return () => {
      setPeople(undefined); // This worked for me
    };
  }, []);

  if (!people) {
    return null;
  }

  return (
    <>
      <ul>
        {people.map((person: any) => (
          <li key={person.id}>{person.name} </li>
        ))}
      </ul>
      <AddButton people={people} setPeople={setPeople} />
    </>
  );
}

export default List;
