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
  Grid,
  GridItem,
  Text,
  Spinner,
  Center,
  Link,
  Button,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useGetUserById } from "@/app/services/userServices";

const HeaderDataContent: HeaderContentProps = {
  titleName: "Detail User",
  breadCrumb: ["/Data", "Detail"],
};

function DetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetUserById(Number(id));

  return (
    <SidebarWithHeader>
      <HeaderContent
        titleName={HeaderDataContent.titleName}
        breadCrumb={HeaderDataContent.breadCrumb}
      />
      <Card>
        <CardHeader>
          <Text fontSize="lg" fontWeight="bold">
            Detail User
          </Text>
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
          ) : data?.data ? (
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem colSpan={1}>
                <Box
                  bg="gray.100"
                  p={4}
                  textAlign="center"
                  borderRadius="md"
                  boxShadow="md"
                  _hover={{ boxShadow: "lg" }}
                >
                  <img
                    src={data.data.avatar}
                    alt={`${data.data.first_name} ${data.data.last_name}`}
                    style={{
                      borderRadius: "50%",
                      width: "100px",
                      height: "100px",
                      margin: "0 auto",
                    }}
                  />
                </Box>
              </GridItem>
              <GridItem colSpan={4}>
                <Box bg="gray.50" p={6} borderRadius="md" boxShadow="md">
                  <Text fontSize="lg" fontWeight="bold" mb={2}>
                    {data.data.first_name} {data.data.last_name}
                  </Text>
                  <Text fontSize="md" color="gray.600" mb={4}>
                    Email: {data.data.email}
                  </Text>
                  <Link href="/data">
                    <Button
                      marginTop={"10px"}
                      _hover={{
                        mt: "2px",
                        bg: "cyan.400",
                        color: "white",
                      }}
                    >
                      <Box p={5}>Back</Box>
                    </Button>
                  </Link>
                </Box>
              </GridItem>
            </Grid>
          ) : (
            <Center>
              <Text color="gray.500">Data not found</Text>
            </Center>
          )}
        </CardBody>
        <SmallWithSocial />
      </Card>
    </SidebarWithHeader>
  );
}

export default DetailPage;
