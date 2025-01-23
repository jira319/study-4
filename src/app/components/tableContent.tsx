import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, Heading, Text, Box, Flex, Spacer, Button } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";

export function TableContent({
  table,
  onEdit,
  onDelete,
}: {
  table: any;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <TableContainer w="full">
      <Table variant="simple">
        <Thead>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <Tr key={headerGroup.id} bg={"gray.100"} color={"gray.600"}>
              {headerGroup.headers.map((header: any) => (
                <Th key={header.id} colSpan={header.colSpan} fontSize={"sm"}>
                  <Heading as="h5" size="sm">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Heading>
                </Th>
              ))}
              <Th>Action</Th>
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.length === 0 ? (
            <Tr>
              <Td colSpan={table.getAllColumns().length + 1} textAlign="center">
                <Text>Kosong Kocak</Text>
              </Td>
            </Tr>
          ) : (
            table.getRowModel().rows.map((row: any) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell: any) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
                <Td>
                  <Button
                    colorScheme="yellow"
                    size="sm"
                    m={2}
                    onClick={() => onEdit(row.original.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    m={2}
                    onClick={() => onDelete(row.original.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}


export function ControlTableContent({ table }: { table: any }) {
  return (
    <Flex m={5} borderRadius={10}>
        <Button
            _hover={{
                bg: 'cyan.400',
                color: 'white',
            }}
            onClick={() => table.setPageIndex(0)} // Mengatur tabel ke halaman pertama
            isDisabled={!table.getCanPreviousPage()} // Menonaktifkan tombol jika tidak bisa kembali
            >
            <Box p={5}>
                Awal
        </Box>
        </Button>
        <Button
            _hover={{
                bg: 'cyan.400',
                color: 'white',
            }}
            onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <Box p="4">
          Sebelumnya
            </Box>
        </Button>
      <Spacer />
      <Box p="4">
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </Box>
      <Spacer />
        <Button _hover={{
            bg: 'cyan.400',
            color: 'white',
        }}
        onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <Box p={5}>
              Selanjutnya
            </Box>
        </Button>
        <Button
            _hover={{
                bg: 'cyan.400',
                color: 'white',
            }}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
            <Box p={5}>
              Akhir
            </Box>
        </Button>
    </Flex>
  );
}
