import styled from "styled-components";

// Heading styles
export const Heading = styled.h1`
  font-size: 3rem;
  line-height: 3rem;
  margin: 0 0 1rem 0;
  color: ${({ theme }) => theme.text};
`;

export const HeadingXL = styled(Heading)`
  font-size: 4rem;
  line-height: 4rem;
  margin: 0 0 2rem 0;
`;

export const Heading2 = styled(Heading)`
  font-size: 2.5rem;
  line-height: 2.5rem;
`;

// Text styles
export const Text = styled.p`
  margin: 0;
  line-height: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`;

export const BoldText = styled(Text)`
  font-weight: 600;
`;

export const LargeText = styled(Text)`
  line-height: 1.5rem;
  font-size: 1.5rem;
`;

export const SmallText = styled(Text)`
  line-height: 0.88rem;
  font-size: 0.88rem;
`;

// Label with transient prop
export const Label = styled.label`
  line-height: 1rem;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme, $error }) => ($error ? theme.colors.red : theme.text)};
`;

// Spacer styles
export const Spacer = styled.span`
  flex: 1 1 auto;
`;
