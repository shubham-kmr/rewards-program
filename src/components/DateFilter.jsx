import PropTypes from 'prop-types';
import styled from 'styled-components';
import { APP_CONSTANTS } from '../constants';

const Container = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f7fafc;
  border: 1px solid #edf2f7;
  border-radius: 6px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Group = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #718096;
  margin-bottom: 6px;
  text-transform: uppercase;
`;

const StyledSelect = styled.select`
  padding: 10px;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  background-color: white;
  color: #2d3748;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3182ce;
  }
`;

const DateFilter = ({ currMonth, currYear, setMonth, setYear }) => {
  return (
    <Container>
      <Group>
        <Label>Year</Label>
        <StyledSelect value={currYear} onChange={(e) => setYear(Number(e.target.value))}>
          {APP_CONSTANTS.AVAILABLE_YEARS.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </StyledSelect>
      </Group>

      <Group>
        <Label>Month</Label>
        <StyledSelect value={currMonth} onChange={(e) => setMonth(e.target.value)}>
          <option value="ALL">Last 3 Months (Default)</option>
          {APP_CONSTANTS.MONTH_LABELS.map((m, idx) => (
            <option key={m} value={idx}>{m}</option>
          ))}
        </StyledSelect>
      </Group>
    </Container>
  );
};

DateFilter.propTypes = {
  currMonth: PropTypes.any,
  currYear: PropTypes.number.isRequired,
  setMonth: PropTypes.func.isRequired,
  setYear: PropTypes.func.isRequired,
};

export default DateFilter;