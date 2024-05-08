import React from 'react';

const TeamMember = ({ name, role }) => {
  return (
    <div className="team-member">
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
};

export default TeamMember;