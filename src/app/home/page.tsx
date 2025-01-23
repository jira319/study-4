"use client";

import {
  HeaderContent,
  HeaderContentProps,
} from "@/app/components/headerContent";
import SidebarWithHeader from "@/app/components/sidebar";
import SmallWithSocial from "@/app/components/footer";
import { Box, Card, CardBody, CardHeader, SimpleGrid } from "@chakra-ui/react";

const HeaderDataContent: HeaderContentProps = {
  titleName: "Home",
  breadCrumb: ["/Home"],
};

function HomePage() {
  return (
    <SidebarWithHeader>
      <HeaderContent titleName={HeaderDataContent.titleName} breadCrumb={HeaderDataContent.breadCrumb}/>
      <Card>
        <CardHeader>Yow</CardHeader>
        <CardBody>
          <Box>
            <SimpleGrid minChildWidth='120px' spacing='40px'>
              <Box bg='tomato' height='80px'></Box>
              <Box bg='tomato' height='80px'></Box>
              <Box bg='tomato' height='80px'></Box>
              <Box bg='tomato' height='80px'></Box>
              <Box bg='tomato' height='80px'></Box>
              <Box bg='tomato' height='80px'></Box>
            </SimpleGrid>  
          </Box>
        </CardBody>
        <SmallWithSocial/>
      </Card>
    </SidebarWithHeader>
  );
}

export default HomePage;