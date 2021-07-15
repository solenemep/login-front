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

  const [showSign, setShowSign] = useState(false)
  const handleClickSign = () => setShowSign(!showSign)
  const [showConfSign, setShowConfSign] = useState(false)
  const handleClickConfSign = () => setShowConfSign(!showConfSign)

  const [emailSign, setEmailSign] = useState("")
  const [usernameSign, setUsernameSign] = useState("")
  const [passwordSign, setPasswordSign] = useState("")
  const [passwordConfSign, setPasswordConfSign] = useState("")
  const [isLoadingSign, setIsLoadingSign] = useState(false)

  const URL = `http://localhost:3333/signup`
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailSign,
      username: usernameSign,
      password: passwordSign,
    }),
  }

  const handleSignupClick = async () => {
    try {
      setIsLoadingSign(true)
      if (passwordSign !== passwordConfSign) {
        throw new Error("Passwords must be identical")
      }
      fetch(URL, options)
        .then((response) => {
          return response.json()
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
      setEmailSign("")
      setUsernameSign("")
      setPasswordSign("")
      setPasswordConfSign("")
      setIsLoadingSign(false)
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
      <FormControl id="emailSign" isRequired>
        <Input
          type="email"
          placeholder="email"
          value={emailSign}
          onChange={(e) => setEmailSign(e.target.value)}
        />
      </FormControl>
      <FormControl id="usernameSign" isRequired>
        <Input
          type="text"
          placeholder="username"
          value={usernameSign}
          onChange={(e) => setUsernameSign(e.target.value)}
        />
      </FormControl>
      <FormControl id="passwordSign" isRequired>
        <InputGroup>
          <Input
            type={showSign ? "text" : "password"}
            placeholder="password"
            value={passwordSign}
            onChange={(e) => setPasswordSign(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClickSign}
              colorScheme={"pink"}
            >
              {showSign ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="passwordConfSign" isRequired>
        <InputGroup>
          <Input
            type={showConfSign ? "text" : "password"}
            placeholder="password confirmation"
            value={passwordConfSign}
            onChange={(e) => setPasswordConfSign(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClickConfSign}
              colorScheme={"pink"}
            >
              {showConfSign ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme={"orange"}
        isFullWidth
        onClick={handleSignupClick}
        isLoading={isLoadingSign}
      >
        Sign up
      </Button>
    </VStack>
  )
}
export default Signup
