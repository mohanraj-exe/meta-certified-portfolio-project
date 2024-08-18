import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack, Spinner
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { isLoading, response, submit, clearResponse } = useSubmit();
  const { onOpen } = useAlertContext();

  const { errors, touched, getFieldProps, handleSubmit, resetForm } = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      type: '',
      comment: ''
    },
    onSubmit: (values) => {
      submit(values)
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("Name is required"),
      email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
      type: Yup.string()
        .required('Selection is required')
        .oneOf(['hireMe', 'openSource', 'other'], 'Invalid selection'),
      comment: Yup.string()
        .min(10, 'Must be 10 characters and above')
        .required("Comment is required"),
    }),
  });

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);

      // coursera-solution

      // if (response.type === 'success') { 
      //   formik.resetForm(); 
      // } 
      clearResponse();
    }
    return () => {
      resetForm({
        values: {
          firstName: '',
          email: '',
          type: '',
          comment: ''
        }
      });
    }
  }, [response]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.firstName && touched.firstName ? true : false}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...getFieldProps('firstName')}
                />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.email && touched.email ? true : false}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...getFieldProps('email')}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.type && touched.type ? true : false}>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" {...getFieldProps('type')} placeholder='Select option'>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
                <FormErrorMessage>{errors.type}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.comment && touched.comment ? true : false}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...getFieldProps('comment')}
                />
                <FormErrorMessage>{errors.comment}</FormErrorMessage>
              </FormControl>
              {isLoading ? <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='green.500'
                size='xl'
              /> : <Button type="submit" colorScheme="purple" width="full">
                Submit
              </Button>}
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
