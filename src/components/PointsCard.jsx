import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { computePoints } from '../helpers/pointsLogic';
import { APP_CONSTANTS } from '../constants';

const Card = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 40px;
  overflow: hidden;
`;

const Header = styled.div`
  background-color: #2b6cb0;
  color: white;
  padding: 15px 20px;
  font-size: 1.25rem;
  font-weight: bold;
`;

const Content = styled.div`
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #edf2f7;
  color: #4a5568;
  font-size: 1rem;

  &:last-child {
    border-bottom: none;
    margin-top: 10px;
    padding-top: 20px;
    border-top: 2px solid #2d3748;
    color: #1a202c;
    font-weight: 700;
    font-size: 1.2rem;
  }
`;

const PointsCard = ({ data }) => {
  const stats = useMemo(() => {
    const map = {};
    let grandTotal = 0;

    data.forEach(txn => {
      const d = new Date(txn.date);
      const mName = APP_CONSTANTS.MONTH_LABELS[d.getMonth()];
      const pts = computePoints(txn.amount);
      
      if (!map[mName]) map[mName] = 0;
      map[mName] += pts;
      grandTotal += pts;
    });

    return { monthly: map, total: grandTotal };
  }, [data]);

  const monthKeys = Object.keys(stats.monthly);

  return (
    <Card>
      <Header>Rewards Summary</Header>
      <Content>
        {monthKeys.map(m => (
          <Row key={m}>
            <span>{m}</span>
            <span>{stats.monthly[m]} pts</span>
          </Row>
        ))}
        <Row>
          <span>TOTAL REWARDS</span>
          <span>{stats.total} pts</span>
        </Row>
      </Content>
    </Card>
  );
};

PointsCard.propTypes = {
  data: PropTypes.array.isRequired
};

export default PointsCard;