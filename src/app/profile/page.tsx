'use client'

import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import SidebarWithHeader from "../components/sidebar";

export default function Profile() {
    return (
    <SidebarWithHeader>
      <Card>
        <CardHeader>
          <Heading>Profile</Heading>
        </CardHeader>
        <CardBody>
          Profile Page
        </CardBody>
      </Card>
    </SidebarWithHeader>
  );
}