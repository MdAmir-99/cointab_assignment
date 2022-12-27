import React, { useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Button,AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    useDisclosure ,
    AlertDialogOverlay,
    useToast  } from '@chakra-ui/react'

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const toast = useToast()
    

    const [userData, setUserData] = useState([])

    const navigate = useNavigate();

  const insertDataHandle = async () => {
    try {
        const { data } = await axios.get('https://randomuser.me/api/?results=50');

    const users = data.results;
    setUserData([users]);

    const insertData = async () => {
        const url = "http://localhost:3001/users";
        const config = {
            method : 'POST',
            data : userData,
            header : {
                'content-type': 'application/json'
            }
        }
    
        let {data} = await axios(url, config);
        toast({
            title: `${data.message}`,
            position : 'top',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
      }

      insertData();
    } catch (error) {
        console.log(error?.response?.data?.message)
    }
  }

 

  const deleteDataHandle = async (onClose) => {
    onClose(true)
    
    const url = 'http://localhost:3001/users';
    let { data } = await axios.delete(url);

    toast({
        title: `${data.message}`,
        status: 'error',
        position : 'top',
        duration: 3000,
        isClosable: true,
      })
    
    
  }

  const showDataHandle = () => {
    navigate('/user')
  }

  return (
    <div className="wrapper">
      <div className="main">
      <Button colorScheme="green" size='md' onClick={insertDataHandle}>Insert Data</Button>
      <Button  colorScheme="red" size='md' onClick={onOpen}>Delete Data</Button>
      <Button  colorScheme="yellow" size='md' onClick={showDataHandle}>Show Data</Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? Do you wanna delete the records !.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => deleteDataHandle(onClose)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </div>
    </div>
    
  )
}

export default Home