import React, { useEffect, useState } from "react";
import { fetchPeople } from "../utils";
import {AddButton} from "./AddButton";

function List() {
  const [people, setPeople] = useState<undefined | object[]>(undefined);

  useEffect(() => {
    const asyncFunction = async () => setPeople(await fetchPeople());
    asyncFunction()
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
