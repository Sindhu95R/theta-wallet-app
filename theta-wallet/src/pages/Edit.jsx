import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { Box, Container, Flex } from "../components/Layouts";
import Modal from "../components/Modal";
import {
  BoldText,
  Heading,
  Spacer,
  Text,
} from "../components/Typography";
import AddFriendForm from "../Containers/AddFriendForm";
import BalanceSummary from "../Containers/BalanceSummary";
import theme from "../theme";
import _ from 'lodash';

const StyledContainer = styled(Container)`
  background: ${({ theme: mode }) => mode.sectionBg};
  border-radius: 0 0 4px 4px;
`;

const PageHeader = styled.div`
  padding: 1rem 2rem;
  border-bottom: 2px solid ${theme.colors.primary};
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: inline-flex;
  column-gap: 20px;
`;

const Expenses = () => {
  const [openAddFriendBox, setOpenAddFriendBox] = useState(false);
  const [expenses, setExpenses] = useState([]);
  
  // Sample data, replace with real logic to fetch or calculate
  const [totalBalance, setTotalBalance] = useState(0); // Add logic to calculate the total balance
  const [youOwe, setYouOwe] = useState([]);
  const [youOwed, setYouOwed] = useState([]);

  const handleFormSubmit = (results) => {
    setExpenses(results);
    
    // Example logic to calculate the total balance
    const totalOwe = results.filter(item => item.amount < 0).reduce((sum, item) => sum + Math.abs(item.amount), 0);
    const totalOwed = results.filter(item => item.amount > 0).reduce((sum, item) => sum + item.amount, 0);

    setTotalBalance(totalOwed - totalOwe); // Adjust according to your logic
    setYouOwe(results.filter(item => item.amount < 0));
    setYouOwed(results.filter(item => item.amount > 0));
  };

  return (
    <StyledContainer>
      {/* Page Header */}
      <PageHeader>
        <Flex>
          <Heading style={{ margin: 0 }}>Group Expenses</Heading>
          <Spacer />
          <ButtonContainer>
            <Button
              variant={"warning"}
              onClick={() => setOpenAddFriendBox(true)}
            >
              {"Add Friends"}
            </Button>
          </ButtonContainer>
        </Flex>
      </PageHeader>

      {/* Balance Summary */}
      <BalanceSummary totalBalance={totalBalance} youOwe={youOwe} youOwed={youOwed} />

      <Box style={{ marginTop: "1rem" }}>
        <Flex>
          <Box style={{ flex: "1" }}>
            <BoldText style={{ marginBottom: "2rem" }}>EXPENSE DETAILS</BoldText>
            {expenses.map((expense, index) => (
              <Box key={index} style={{ marginBottom: "1rem" }}>
                <Text>
                  {expense.name}: <strong>{_.round(expense.amount, 2)}</strong>
                </Text>
              </Box>
            ))}
          </Box>
        </Flex>
      </Box>

      {/* Modal */}
      {openAddFriendBox && (
        <Modal title="Add Friends" onClose={() => setOpenAddFriendBox(false)}>
          <AddFriendForm onClose={() => setOpenAddFriendBox(false)} onSubmit={handleFormSubmit} />
        </Modal>
      )}
    </StyledContainer>
  );
};

export default Expenses;
