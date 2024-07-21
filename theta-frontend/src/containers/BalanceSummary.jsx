import styled from "styled-components";
import { Box, Flex } from "../components/Layouts";
import { BoldText, Label, Spacer } from "../components/Typograph";

const colors = {
  primary: "#5bc5a7",
  secondary: "#83d2ba",
  orange: "#FF8027",
  darkOrange: "#f37217",
  green: "#78B75E",
  darkGreen: "#55b32f",
  red: "#ec5050",
  darkRed: "#ce4444",
  blue: "#418CC9",
  darkBlue: "#1a7bcb",
  gray: "#818589",
  darkGray: "#999595",
  white: "#FFFFFF",
  black: "#000",
  // for dark mode
  darkBG: "#202124",
  sectionBG: "#36373a",
  darkText: "#F5F5F7",
  // for light mode
  lightBG: "#F2F2F2",
  lightText: "#2E0509",
};

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
