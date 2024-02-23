import React, { useState, useEffect } from "react";

const TeamDirectory = () => {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://mocki.io/v1/ddb7e0a8-e218-4e36-b1be-b902cdb1c098")
      .then((response) => response.json())
      .then((data) => setTeams(data));
  }, []);

  const filteredTeams = teams.filter((team) => {
    if (team.members) {
      return team.members.some((member) =>
        member.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return false;
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredTeams.map((team) => (
          <li key={team.id}>
            <h2>{team.name}</h2>
            <ul>
              {team.members.map((member) => (
                <li key={member.id}>
                  {member.name} - {member.email}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamDirectory;