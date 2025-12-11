import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { computePoints } from '../helpers/pointsLogic';

const Wrapper = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
`;

const Thead = styled.thead`
  background-color: #2d3748;
  color: white;
`;

const Th = styled.th`
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #e2e8f0;
  &:hover {
    background-color: #f7fafc;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: 12px 15px;
  color: #4a5568;
  font-size: 0.95rem;
`;

const PointsBadge = styled.span`
  background-color: #c6f6d5;
  color: #22543d;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 0.85rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px;
  background-color: #f7fafc;
  gap: 10px;
  border-top: 1px solid #e2e8f0;
`;

const Button = styled.button`
  padding: 6px 14px;
  border: 1px solid #cbd5e0;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  color: #4a5568;

  &:hover:not(:disabled) {
    background-color: #edf2f7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PAGE_SIZE = 5;

const HistoryTable = ({ records }) => {
  const [page, setPage] = useState(1);

  if (!records.length) return null;

  const maxPage = Math.ceil(records.length / PAGE_SIZE);
  const currentData = records.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Wrapper>
      <div style={{ padding: '15px 20px', background: '#fff', borderBottom: '1px solid #eee' }}>
        <h3 style={{ margin: 0, color: '#2d3748' }}>Transaction History</h3>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <Table>
          <Thead>
            <tr>
              <Th>Date</Th>
              <Th>Transaction ID</Th>
              <Th>Amount</Th>
              <Th>Reward</Th>
            </tr>
          </Thead>
          <tbody>
            {currentData.map(r => (
              <Tr key={r.transactionId}>
                <Td>{r.date}</Td>
                <Td>{r.transactionId}</Td>
                <Td>${r.amount.toFixed(2)}</Td>
                <Td>
                  <PointsBadge>+{computePoints(r.amount)}</PointsBadge>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </div>
      
      {maxPage > 1 && (
        <Pagination>
          <Button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            Previous
          </Button>
          <span style={{ alignSelf: 'center', fontSize: '0.9rem', color: '#718096' }}>
            Page {page} of {maxPage}
          </span>
          <Button disabled={page === maxPage} onClick={() => setPage(p => p + 1)}>
            Next
          </Button>
        </Pagination>
      )}
    </Wrapper>
  );
};

HistoryTable.propTypes = {
  records: PropTypes.array.isRequired
};

export default HistoryTable;