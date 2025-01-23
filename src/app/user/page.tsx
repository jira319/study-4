"use client";

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
  Text,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { userData, FakeDataUser, initialValueUser } from "../types/userInterface";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { TableContent, ControlTableContent } from "../components/tableContent";
import { Formik, Field } from "formik";
import * as Yup from "yup";

// Data untuk header halaman
const HeaderDataContent: HeaderContentProps = {
  titleName: "User",
  breadCrumb: ["/User"],
};

// Skema validasi form menggunakan Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Nama harus diisi"),
  email: Yup.string().email("Email tidak valid").required("Email harus diisi"),
  password: Yup.string().required("Password harus diisi"),
});

// Komponen utama halaman UserPage
function UserPage() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Mengelola state untuk modal
  const toast = useToast(); // Menampilkan notifikasi toast
  const [datauser, setDataUser] = useState<userData[]>([]); // State untuk menyimpan data user
  const [totalData, setTotalData] = useState(0); // State untuk jumlah total data
  const [editUser, setEditUser] = useState<userData | null>(null); // State untuk data user yang sedang diedit

  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Mengisi data awal pada saat komponen di-mount
  useEffect(() => {
    setDataUser(FakeDataUser); // Mengambil data fake
    setTotalData(FakeDataUser.length); // Menghitung total data
  }, []);

  // Definisi kolom untuk tabel
  const columns = useMemo<ColumnDef<userData>[]>(() => [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "created_at", header: "Created At" },
    { accessorKey: "updated_at", header: "Updated At" },
  ], []);

  // Konfigurasi tabel menggunakan React Table
  const table = useReactTable({
    data: datauser,
    columns,
    getCoreRowModel: getCoreRowModel(), // Mendapatkan model baris utama
    getPaginationRowModel: getPaginationRowModel(), // Mendapatkan model pagination
  });

  // Fungsi untuk menambah user baru
  const handleAddUser = (values: typeof initialValueUser) => {
    setDataUser([
      ...datauser,
      { ...values, id: randomInt(1000, 9999), created_at: new Date().toISOString() },
    ]);
    setTotalData((prev) => prev + 1); // Update total data
    toast({
      title: "User ditambahkan", // Notifikasi sukses
      description: "User baru berhasil ditambahkan.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose(); // Menutup modal
  };

  // Fungsi untuk mengedit user
  const handleEditUser = (id: number, updatedData: Partial<userData>) => {
    setDataUser((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...updatedData } : user))
    );
    toast({
      title: "User diupdate",
      description: "Data user berhasil diperbarui.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose(); // Tutup modal
    setEditUser(null); // Reset editUser
  };

  // Fungsi untuk menghapus user
  const handleDeleteUser = (id: number) => {
    setDataUser((prev) => prev.filter((user) => user.id !== id));
    setTotalData((prev) => prev - 1); // Mengurangi jumlah total user
    toast({
      title: "User dihapus",
      description: "User berhasil dihapus.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  // Fungsi untuk membuka modal edit
  const handleEditClick = (user: userData) => {
    setEditUser(user); // Set user yang ingin diedit
    onOpen(); // Buka modal
  };

  return (
    <SidebarWithHeader>
      {/* Header halaman */}
      <HeaderContent
        titleName={HeaderDataContent.titleName}
        breadCrumb={HeaderDataContent.breadCrumb}
      />
      <Card>
        {/* Header tabel */}
        <CardHeader display="flex" justifyContent="space-between" alignItems="center">
          <Box bg="gray.100" p={2}>
            Total Users: {totalData}
          </Box>
          <Button colorScheme="blue" onClick={() => {
            setEditUser(null); // Reset editUser untuk create
            onOpen();
          }}>
            Tambah User
          </Button>
        </CardHeader>
        {/* Body tabel */}
        <CardBody>
          <TableContent
            table={table}
            onEdit={handleEditClick} // Fungsi untuk edit
            onDelete={handleDeleteUser} // Fungsi untuk delete
          />
          <ControlTableContent table={table} />
        </CardBody>
      </Card>
      <SmallWithSocial />

      {/* Modal untuk create/edit user */}
      <Modal isOpen={isOpen} onClose={() => {
        onClose();
        setEditUser(null); // Reset editUser saat modal ditutup
      }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editUser ? "Edit User" : "Tambah User Baru"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={editUser || initialValueUser} // Data untuk create atau edit
              validationSchema={validationSchema} // Skema validasi
              onSubmit={(values) => {
                if (editUser) {
                  handleEditUser(editUser.id, values); // Update data user
                } else {
                  handleAddUser(values); // Tambah user baru
                }
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="stretch">
                    {/* Input nama */}
                    <FormControl isInvalid={!!errors.name && touched.name}>
                      <FormLabel>Nama</FormLabel>
                      <Field as={Input} name="name" placeholder="Masukkan nama" />
                    </FormControl>
                    {/* Input email */}
                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <FormLabel>Email</FormLabel>
                      <Field as={Input} name="email" placeholder="Masukkan email" />
                    </FormControl>
                    {/* Input password */}
                    <FormControl isInvalid={!!errors.password && touched.password}>
                      <FormLabel>Password</FormLabel>
                      <Field
                        as={Input}
                        name="password"
                        type="password"
                        placeholder="Masukkan password"
                      />
                    </FormControl>
                    {/* Tombol submit */}
                    <Button type="submit" colorScheme="blue" w={"full"}>
                      Simpan
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SidebarWithHeader>
  );
}

export default UserPage;
