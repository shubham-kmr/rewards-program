import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { getTransactionData } from './services/dataService';
import appLogger from './logger';
import { APP_CONSTANTS } from './constants';
import UserDropdown from './components/UserDropdown';
import DateFilter from './components/DateFilter';
import PointsCard from './components/PointsCard';
import HistoryTable from './components/HistoryTable';

const PageWrapper = styled.div`
  background-color: #f4f6f8;
  min-height: 100vh;
  padding: 20px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
`;

const Dashboard = styled.div`
  width: 100%;           
  max-width: 1400px;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const Heading = styled.h1`
  text-align: center;
  color: #1a202c;
  margin-bottom: 30px;
  font-weight: 700;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 20px;
`;

const StatusMsg = styled.div`
  text-align: center;
  font-size: 1.1rem;
  padding: 20px;
  background-color: ${p => p.isError ? '#fff5f5' : '#ebf8ff'};
  color: ${p => p.isError ? '#c53030' : '#2b6cb0'};
  border: 1px solid ${p => p.isError ? '#feb2b2' : '#bee3f8'};
  border-radius: 4px;
  margin-bottom: 20px;
`;

const NoDataBox = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f7fafc;
  border: 2px dashed #cbd5e0;
  border-radius: 6px;
  color: #718096;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 20px;
`;

function App() {
  const [data, setData] = useState([]);
  const [apiState, setApiState] = useState(APP_CONSTANTS.API_STATES.INIT);
  
  const [activeUser, setActiveUser] = useState(null);
  const [yearFilter, setYearFilter] = useState(2025);
  const [monthFilter, setMonthFilter] = useState("ALL");

  useEffect(() => {
    const initLoad = async () => {
      setApiState(APP_CONSTANTS.API_STATES.PENDING);
      try {
        const result = await getTransactionData();
        setData(result);
        setApiState(APP_CONSTANTS.API_STATES.DONE);
      } catch (e) {
        setApiState(APP_CONSTANTS.API_STATES.FAIL);
      }
    };
    initLoad();
  }, []);

  const viewData = useMemo(() => {
    if (!activeUser) return [];

    let filtered = data.filter(d => d.customerId === activeUser);
    filtered = filtered.filter(d => new Date(d.date).getFullYear() === yearFilter);

    if (monthFilter !== "ALL") {
      filtered = filtered.filter(d => new Date(d.date).getMonth() === Number(monthFilter));
    } else {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filtered;
  }, [data, activeUser, yearFilter, monthFilter]);

  useEffect(() => {
    if (activeUser) appLogger.info(`View updated for UserID: ${activeUser}`);
  }, [activeUser, yearFilter, monthFilter]);

  return (
    <PageWrapper>
      <Dashboard>
        <Heading>Customer Loyalty Portal</Heading>

        {apiState === APP_CONSTANTS.API_STATES.PENDING && <StatusMsg>Loading Records...</StatusMsg>}
        {apiState === APP_CONSTANTS.API_STATES.FAIL && <StatusMsg isError>Error loading data.</StatusMsg>}

        {apiState === APP_CONSTANTS.API_STATES.DONE && (
          <>
            <UserDropdown 
              users={data} 
              activeId={activeUser} 
              changeHandler={setActiveUser} 
            />

            {activeUser && (
              <>
                <DateFilter 
                  currMonth={monthFilter} 
                  currYear={yearFilter}
                  setMonth={setMonthFilter}
                  setYear={setYearFilter}
                />
                
                {viewData.length === 0 ? (
                  <NoDataBox>No transactions</NoDataBox>
                ) : (
                  <>
                    <PointsCard data={viewData} />
                    <HistoryTable records={viewData} />
                  </>
                )}
              </>
            )}
          </>
        )}
      </Dashboard>
    </PageWrapper>
  );
}

export default App;