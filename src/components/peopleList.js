function PeopleList({ people }) {
    return (
      <ul>
        {people.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    );
  }
  
  export default PeopleList;
  