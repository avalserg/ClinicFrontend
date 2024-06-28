import { Flex, FlexProps } from "../Flex/Flex";

// exclude from props direction
type HStackProps = Omit<FlexProps, "direction">;

export const HStack = (props: HStackProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Flex direction={"row"} {...props} />;
};
