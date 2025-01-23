import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
  } from "@chakra-ui/react";
  import * as Yup from "yup";
import { useFormik } from "formik";


  export function FormContent() {
    return (
        <Box p={4} borderWidth={1} borderRadius="lg" bg="white" shadow="sm">
      <form onSubmit={FormikUser.handleSubmit}>
        <VStack spacing={4} align="stretch">
          {/* Name Field */}
          <FormControl isInvalid={!!FormikUser.errors.name}>
            <FormLabel>Nama</FormLabel>
            <Input
              name="name"
              placeholder="Masukkan nama"
              value={FormikUser.values.name}
              onChange={FormikUser.handleChange}
            />
            <FormErrorMessage>{FormikUser.errors.name}</FormErrorMessage>
          </FormControl>

          {/* Email Field */}
          <FormControl isInvalid={!!FormikUser.errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Masukkan email"
              value={FormikUser.values.email}
              onChange={FormikUser.handleChange}
            />
            <FormErrorMessage>{FormikUser.errors.email}</FormErrorMessage>
          </FormControl>

          {/* Password Field */}
          <FormControl isInvalid={!!FormikUser.errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Masukkan password"
              value={FormikUser.values.password}
              onChange={FormikUser.handleChange}
            />
            <FormErrorMessage>{FormikUser.errors.password}</FormErrorMessage>
          </FormControl>

          {/* Submit Button */}
          <Button type="submit" colorScheme="blue" isFullWidth>
            Simpan
          </Button>
        </VStack>
      </form>
    </Box>
    );
}