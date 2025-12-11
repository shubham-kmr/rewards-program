import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #4a5568;
  font-size: 1rem;
`;

const SelectBox = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #fff;
  color: #2d3748;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

const UserDropdown = ({ users, activeId, changeHandler }) => {
  const distinctUsers = Array.from(new Set(users.map(u => u.customerId)))
    .map(id => users.find(u => u.customerId === id));

  return (
    <Wrapper>
      <Label htmlFor="userSelect">Select Customer:</Label>
      <SelectBox 
        id="userSelect"
        value={activeId || ''} 
        onChange={(e) => changeHandler(Number(e.target.value))}
      >
        <option value="" disabled>-- Choose a customer --</option>
        {distinctUsers.map(u => (
          <option key={u.customerId} value={u.customerId}>
            {u.name} (ID: {u.customerId})
          </option>
        ))}
      </SelectBox>
    </Wrapper>
  );
};

UserDropdown.propTypes = {
  users: PropTypes.array.isRequired,
  activeId: PropTypes.number,
  changeHandler: PropTypes.func.isRequired
};

export default UserDropdown;