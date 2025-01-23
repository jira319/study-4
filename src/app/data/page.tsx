"use client";

import React, { useState } from "react";
import {
  HeaderContent,
  HeaderContentProps,
} from "@/app/components/headerContent";
import SidebarWithHeader from "@/app/components/sidebar";
import SmallWithSocial from "@/app/components/footer";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Text,
  Spinner,
  Center,
  IconButton,
  Tooltip,
  useToast,
  Link,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, AddIcon, InfoIcon, DeleteIcon } from "@chakra-ui/icons";
import { User } from "@/app/types/dataInterface";
import {
  useGetUsers,
  useDeleteUser,
  usePostUser,
  usePutUser,
} from "@/app/services/userServices";

const HeaderDataContent: HeaderContentProps = {
  titleName: "Data",
  breadCrumb: ["/Data"],
};

const ModalForm = ({
  isOpen,
  onClose,
  onSubmit,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<User>) => void;
  user?: User;
}) => {
  const [formData, setFormData] = useState<Partial<User>>(
    user || { first_name: "", last_name: "", email: "", avatar: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user ? "Edit User" : "Add User"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>First Name</FormLabel>
            <Input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Avatar URL</FormLabel>
            <Input
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

function DataPage() {
  const { data, isLoading, error } = useGetUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: createUser } = usePostUser();
  const { mutate: updateUser } = usePutUser();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);

  const handleDelete = (id: number) => {
    deleteUser(id, {
      onSuccess: () => {
        toast({
          title: "User deleted.",
          description: `User with ID ${id} has been deleted.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: "Error.",
          description: `Failed to delete user with ID ${id}.`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });
  };

  const handleSave = (userData: Partial<User>) => {
    if (editingUser) {
      updateUser(
        { id: editingUser.id, ...userData },
        {
          onSuccess: () => {
            toast({
              title: "User updated.",
              description: "The user has been updated successfully.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          },
          onError: () => {
            toast({
              title: "Error.",
              description: "Failed to update user.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          },
        }
      );
    } else {
      createUser(userData, {
        onSuccess: () => {
          toast({
            title: "User added.",
            description: "A new user has been added successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        },
        onError: () => {
          toast({
            title: "Error.",
            description: "Failed to add user.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
      });
    }
  };

  return (
    <SidebarWithHeader>
      <HeaderContent
        titleName={HeaderDataContent.titleName}
        breadCrumb={HeaderDataContent.breadCrumb}
      />
      <Card>
        <CardHeader>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" fontWeight="bold">
              Fetch Data from API
            </Text>
            <Button
              colorScheme="green"
              leftIcon={<AddIcon />}
              onClick={() => {
                setEditingUser(undefined);
                onOpen();
              }}
            >
              Add User
            </Button>
          </Box>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <Center>
              <Spinner size="xl" />
            </Center>
          ) : error ? (
            <Center>
              <Text color="red.500">{error.message}</Text>
            </Center>
          ) : (
            <>
              <SimpleGrid minChildWidth="150px" spacing="40px">
                {data.data.map((user: User) => (
                  <Box
                    key={user.id}
                    bg="gray.100"
                    p={4}
                    borderRadius="md"
                    boxShadow="sm"
                    textAlign="center"
                  >
                    <img
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      style={{
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        margin: "0 auto",
                      }}
                    />
                    <Text fontWeight="bold" mt={2}>
                      {user.first_name} {user.last_name}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {user.email}
                    </Text>
                    <Tooltip label="Edit" aria-label="Edit">
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon />}
                        colorScheme="yellow"
                        onClick={() => {
                          setEditingUser(user);
                          onOpen();
                        }}
                      />
                    </Tooltip>
                  </Box>
                ))}
              </SimpleGrid>
            </>
          )}
        </CardBody>
      </Card>
      <SmallWithSocial />
      <ModalForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSave}
        user={editingUser}
      />
    </SidebarWithHeader>
  );
}

export default DataPage;
