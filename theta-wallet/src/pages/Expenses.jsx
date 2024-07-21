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
  const [groups, setGroups] = useState([]);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(null);

  const handleFormSubmit = (results) => {
    const newGroups = [...groups];
    newGroups[currentGroupIndex] = {
      ...newGroups[currentGroupIndex],
      expenses: results,
      totalBalance: calculateTotalBalance(results),
      youOwe: calculateYouOwe(results),
      youOwed: calculateYouOwed(results),
    };
    setGroups(newGroups);
    setOpenAddFriendBox(false);
  };

  const calculateTotalBalance = (expenses) => {
    const totalOwe = expenses.filter(item => item.amount < 0).reduce((sum, item) => sum + Math.abs(item.amount), 0);
    const totalOwed = expenses.filter(item => item.amount > 0).reduce((sum, item) => sum + item.amount, 0);
    return totalOwed - totalOwe;
  };

  const calculateYouOwe = (expenses) => {
    return expenses.filter(item => item.amount < 0);
  };

  const calculateYouOwed = (expenses) => {
    return expenses.filter(item => item.amount > 0);
  };

  const addNewGroup = () => {
    setGroups([...groups, { expenses: [], totalBalance: 0, youOwe: [], youOwed: [] }]);
    setCurrentGroupIndex(groups.length);
    setOpenAddFriendBox(true);
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
              onClick={addNewGroup}
            >
              {"Add Group"}
            </Button>
          </ButtonContainer>
        </Flex>
      </PageHeader>

      {groups.map((group, index) => (
        <Box key={index} style={{ marginTop: "1rem" }}>
          <Heading>Group {index + 1}</Heading>
          <BalanceSummary
            totalBalance={group.totalBalance}
            youOwe={group.youOwe}
            youOwed={group.youOwed}
          />
          <Flex>
            <Box style={{ flex: "1" }}>
              <BoldText style={{ marginBottom: "2rem" }}>EXPENSE DETAILS</BoldText>
              {group.expenses.map((expense, expIndex) => (
                <Box key={expIndex} style={{ marginBottom: "1rem" }}>
                  <Text>
                    {expense.name}: <strong>{_.round(expense.amount, 2)}</strong>
                  </Text>
                </Box>
              ))}
            </Box>
          </Flex>
        </Box>
      ))}

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
