'use client'

import { Card, CardBody, CardHeader, Grid, GridItem, Heading } from "@chakra-ui/react";
import SidebarWithHeader from "../components/sidebar";

export default function Settings() {
    return (
    <SidebarWithHeader>
      <Card>
        {/* <CardHeader>
          <Heading>Settings</Heading>
        </CardHeader>
        <CardBody>
          Settings Page
        </CardBody> */}
        <Grid
          templateAreas={`"header header"
                          "nav main"
                          "nav footer"`}
          gridTemplateRows={'50px 1fr 30px'}
          gridTemplateColumns={'150px 1fr'}
          h='200px'
          gap='1'
          color='blackAlpha.700'
          fontWeight='bold'
        >
          <GridItem pl='2' bg='orange.300' area={'header'}>
            Header
          </GridItem>
          <GridItem pl='2' bg='green.300' area={'main'}>
            Main
          </GridItem>
          <GridItem pl='2' bg='blue.300' area={'footer'}>
            Footer
          </GridItem>
        </Grid>
      </Card>
    </SidebarWithHeader>
  );
}