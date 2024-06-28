import { Flex, FlexProps } from "../Flex/Flex";

// exclude from props direction
type VStackProps = Omit<FlexProps, "direction">;

export const VStack = (props: VStackProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const { align = "start" } = props;
  return <Flex direction={"column"} align={align} {...props} />;
};
