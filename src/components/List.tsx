import React, { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

function List() {
  // const [isLoading, setLoading] = useState(true);
  const [people, setPeople] = useState<undefined | any>(undefined);

  useEffect(() => {
    const fectPeople = async () => {
      let people;
      try {
        people = await (await getUsers()).json();
      } catch (e) {
        console.error(e);
      }

      setPeople(people);
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
    <ul>
      {people.map((person: any) => (
        <li key={person.id}>{person.name} </li>
      ))}
    </ul>
  );
}

export default List;
