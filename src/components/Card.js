import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <VStack key={title}
      backgroundColor='white'
      color='black'
      alignItems="flex-start"
      maxW='md'
      borderRadius='lg'
    >
      <Box>
        <Image src={imageSrc} borderRadius='lg' />
        <Box p='4'>
          <Heading as='h5' size='sm'>
            {title}
          </Heading>
          <Text fontSize='sm' color='#707070' mt='0.5rem' mb='0.5rem'>
            {description}
          </Text>
          <HStack>
            <Text fontSize='sm'>See more</Text>
            <FontAwesomeIcon icon={faArrowRight} size="1x"/>
          </HStack>
        </Box>
      </Box>
    </VStack>
  )
  // return null;
};

export default Card;
