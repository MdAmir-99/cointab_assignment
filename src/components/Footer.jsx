import React from 'react'
import { Center } from '@chakra-ui/react'

const Footer = () => {
    const year = new Date().getFullYear()
  return (
    <Center h='10vh' bg='blue.200' color='black.500' fontSize='md' fontWeight='bold' letterSpacing='1px'>
        Made With ❤ By Md Amir &copy; {year}
    </Center>
  )
}

export default Footer