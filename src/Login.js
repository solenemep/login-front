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

  const [showLog, setShowLog] = useState(false)
  const handleClickLog = () => setShowLog(!showLog)

  const [usernameLog, setUsernameLog] = useState("")
  const [passwordLog, setPasswordLog] = useState("")
  const [isLoadingLog, setIsLoadingLog] = useState(false)

  const URL = `http://localhost:3333/login`
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameLog,
      password: passwordLog,
    }),
  }

  const handleLoginClick = async () => {
    try {
      setIsLoadingLog(true)
      fetch(URL, options)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          toast({
            title: "Log in sucessfull",
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
      setUsernameLog("")
      setPasswordLog("")
      setIsLoadingLog(false)
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
      <FormControl id="usernameLog" isRequired>
        <Input
          type="text"
          placeholder="username"
          value={usernameLog}
          onChange={(e) => setUsernameLog(e.target.value)}
        />
      </FormControl>
      <FormControl id="passwordLog" isRequired>
        <InputGroup>
          <Input
            type={showLog ? "text" : "password"}
            placeholder="password"
            value={passwordLog}
            onChange={(e) => setPasswordLog(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClickLog}
              colorScheme={"pink"}
            >
              {showLog ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme={"orange"}
        isFullWidth
        onClick={handleLoginClick}
        isLoading={isLoadingLog}
      >
        Log in
      </Button>
    </VStack>
  )
}
export default Login
