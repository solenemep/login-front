import {
  Button,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"

const Login = () => {
  const toast = useToast()

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const URL = `http://localhost:3333/login/${username}`
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }

  const handleLoginClick = async () => {
    try {
      setIsLoading(true)
      fetch(URL, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Something went wrong: ${response.textStatus}`)
          }
          return response.json()
        })
        .then((data) => {
          toast({
            title: "Log in sucessfull",
            description: `You are logged in with username ${username}`,
            variant: "subtle",
            status: "success",
            duration: 9000,
            isClosable: true,
          })
        })
    } catch (e) {
      if (e.code === 401) {
        toast({
          title: "Failed with status 401",
          description: e.message,
          variant: "subtle",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      } else {
        toast({
          title: "Error",
          description: e.message,
          variant: "subtle",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    } finally {
      setUsername("")
      setPassword("")
      setIsLoading(false)
    }
  }

  return (
    <VStack
      bg={"white"}
      alignItems={"start"}
      spacing={6}
      rounded={6}
      p={12}
      shadow={"xs"}
    >
      <Heading>Log in</Heading>
      <FormControl id="username" isRequired>
        <Input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              colorScheme={"pink"}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme={"orange"}
        isFullWidth
        onClick={handleLoginClick}
        isLoading={isLoading}
      >
        Log in
      </Button>
    </VStack>
  )
}
export default Login
