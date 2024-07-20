import React from "react";
import styled from "styled-components";
import { Box, Flex } from "../../components/Layouts";
import { BoldText, Label, Spacer } from "../../components/Typography";
import colors from "../../theme/colors";

const BalanceBox = styled(Box)`
  padding: 1rem;
  background: ${({ theme }) => theme.background};
  border-radius: 4px;
  label {
    color: ${colors.darkGray};
  }
`;

const BalanceSummary = ({ totalBalance, youOwe, youOwed }) => {
  // Calculate totals
  const totalOwe = youOwe.reduce((sum, item) => sum + item.amount, 0);
  const totalOwed = youOwed.reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <BalanceBox>
      <Flex>
        <Box>
          <Label>Total Balance</Label>
          <BoldText style={{ color: colors.primary }}>{totalBalance}</BoldText>
        </Box>
        <Spacer />
        <Box>
          <Label>You owe</Label>
          <BoldText style={{ color: colors.red }}>{totalOwe}</BoldText>
        </Box>
        <Spacer />
        <Box>
          <Label>You are owed</Label>
          <BoldText style={{ color: colors.primary }}>{totalOwed}</BoldText>
        </Box>
      </Flex>
    </BalanceBox>
  );
};

export default BalanceSummary;
