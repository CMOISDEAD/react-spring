import { Footer as Box } from "flowbite-react";

export const Footer = () => {
  return (
    <Box container={true} className="bg-[#16161600]">
      <Box.Copyright href="#" by="JavaMusic™" year={2022} />
      <Box.LinkGroup>
        <Box.Link href="#">About</Box.Link>
        <Box.Link href="#">Privacy Policy</Box.Link>
        <Box.Link href="#">Licensing</Box.Link>
        <Box.Link href="#">Contact</Box.Link>
      </Box.LinkGroup>
    </Box>
  );
};
