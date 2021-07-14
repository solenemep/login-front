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

const Signup = () => {
  const toast = useToast()

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConf, setPasswordConf] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const URL = `http://localhost:3333/signup/`
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  }

  const handleSignupClick = async () => {
    try {
      setIsLoading(true)
      if (password !== passwordConf) {
        throw new Error("Passwords must be identical")
      }
      fetch(URL, options)
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error(`Something went wrong...`)
          }
        })
        .then((data) => {
          toast({
            title: "Sign up sucessfull",
            description: `${data.message}`,
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
      <Heading>Sign up</Heading>
      <FormControl id="email" isRequired>
        <Input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
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
      <FormControl id="password" isRequired>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="password confirmation"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
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
        onClick={handleSignupClick}
        isLoading={isLoading}
      >
        Sign up
      </Button>
    </VStack>
  )
}
export default Signup
