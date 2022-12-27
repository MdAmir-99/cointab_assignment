import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Avatar,
    Button
  } from '@chakra-ui/react'

const Users = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const  getData = async (arr) => {
            const myUrl = "http://localhost:3001/users";
            const { data } = await axios.get(myUrl);
            setUserData(data.data);
        }
        getData()
    }, [])

    console.log(userData)

const redirectionHandle = () => {
    navigate('/')
}

  return (
       
<TableContainer p={5} position='relative'>
  <Table variant='striped' colorScheme='blue' >
    <TableCaption>{`${userData.length } Record Found`}</TableCaption>
    <Thead>
      <Tr>
        <Th>ID</Th>
        <Th>Name</Th>
        <Th>Profile Image</Th>
        <Th>Email</Th>
        <Th>Mobile Number</Th>
        <Th>Country</Th>
      </Tr>
    </Thead>
    <Tbody>
    {
            userData.length === 0 ? (
                <Tr>
                    <Td colSpan={6} textAlign='center'> Sorry No Data Found !</Td>
                </Tr>
            ) : (userData.map((elem, index) => {
                return [
      <Tr key={elem.email}>
        <Td>{index+1}</Td>
        <Td>{`${elem.firstName} ${elem.lastName}`}</Td>
        <Td>
            <Avatar size='md' name={elem.firstName+' '+elem.lastName} src={elem.profileImage} />
        </Td>
        <Td>{elem.email}</Td>
        <Td>{elem.phone}</Td>
        <Td>{elem.country}</Td>
      </Tr>
       ]
    }))
}
    </Tbody>
  </Table>
  <Button size='md' colorScheme='red' onClick={redirectionHandle} style={{position : 'fixed', left : "2rem", top:"2rem", zIndex : "300"}}>Back</Button>
</TableContainer>
               
  )
}

export default Users