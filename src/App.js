import { ChakraProvider, Container, HStack } from "@chakra-ui/react"
import Login from "./Login"
import Signup from "./Signup"

const App = () => {
  return (
    <ChakraProvider>
      <Container maxW="container.md" py={24}>
        <HStack justifyContent={"space-around"} alignItems={"start"}>
          <Signup />
          <Login />
        </HStack>
      </Container>
    </ChakraProvider>
  )
}
export default App
