import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  VStack,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import * as FirestoreService from "../db/firestore";
import { query } from "firebase/firestore";
import { GlobalContext } from "../contexts/contexts";

const primaryColor = "rgb(9 17 34 / 97%)";

const AllUsers = () => {
  const toast = useToast();
  const { user }: any = useContext(GlobalContext);
  const [allUsers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await FirestoreService.streamAllUsers();
        if (data) {
          setAllUsers(data);
          console.log(data);
        }
      } catch (e) {
        toast({
          title: "Error",
          description: e,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  
      fetchUsers();
    
  }, [user]);

  return (
    <>
      <VStack width="100%">
        <TableContainer color="white">
          <Table variant="simple" bgColor={primaryColor} borderRadius={12}>
            <Thead color="blue.200">
              <Tr>
                <Td>SN</Td>
                <Td>Email</Td>
                <Td isNumeric>Balance</Td>
                <Td>Action</Td>
                <Td> </Td>
                <Td> </Td>
              </Tr>
            </Thead>

            {allUsers.length > 0 &&
              allUsers.map((x, index) => (
                <Tbody key={x.id}>
                  <Tr>
                    {/* <Td>{x.created.toDate()}</Td> */}
                    <Td>{index + 1}</Td>
                    <Td>{x.email}</Td>
                    <Td isNumeric>{FirestoreService.sumArray(x.deposits)}</Td>
                    <Td>
                      <Link
                        href={{
                          pathname: "admin/manage",
                          query: { user: x.id },
                        }}
                      >
                        <Button
                          boxShadow="lg"
                          h="32px"
                          bgColor="red.500"
                          color="white"
                          width="88px"
                          py={0}
                          fontWeight="bold"
                        >
                          Manage
                        </Button>
                      </Link>
                    </Td>
                  </Tr>
                </Tbody>
              ))}
          </Table>
        </TableContainer>
      </VStack>
    </>
  );
};

export default AllUsers;
