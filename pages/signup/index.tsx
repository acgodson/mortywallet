import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Link,
  Text,
  Button,
  // useColorModeValue,
  Container,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Select,
  useToast,
} from "@chakra-ui/react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { createUser } from "../../db/firestore";
import { GlobalContext } from "../../contexts/contexts";
import { LogoHeader } from "components/loginComponents";
import { SignupLayout } from "components/signupLayout";

const country_list = [
  "United States",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const SignUpPage = () => {
  const { mapUserData, setUserCookie, loginWeb3 }: any =
    useContext(GlobalContext);
  const auth = getAuth();
  let router = useRouter();
  const toast = useToast();
  function navigate(path: string) {
    router.push(path);
  }
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordX, setPasswordX] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [ref, setRef] = useState<string>("");

  async function signUp(email: string, password: string) {
    console.log(email);

    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;

          //Save Browser Cookie
          const userData = await mapUserData(user);
          setUserCookie(userData);

          if (userData) {
            //Create users offchain database (firestore) here
            await createUser(user.email, country, user.uid);

            // Sign in web3auth
            await loginWeb3(userCredential);
          }

          //Navigate to home if everything is successful
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          //          const errorMessage = error.message;
          toast({
            title: "Error",
            description: errorCode,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    } catch (e: any) {
      console.log(e);
    }
  }

  function handleSignIn() {
    signUp(email, password);
  }

  return (
    <SignupLayout>
      <Box
        as="img"
        src="/bg-pattern.svg"
        alt="bgg"
        height="auto"
        width="100%"
      />

      
      <LogoHeader />
      <Container
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mx={0}
        pb={12}
        bgColor="rgb(18, 29, 51)"
      >
        <Box
          as="img"
          src="/bg-pattern.svg"
          alt="bgg"
          height="auto"
          width="100%"
        />

        <LogoHeader />

        <Box
          bgColor="white"
          borderRadius={8}
          width="100%"
          maxW="600px"
          alignSelf="center"
        >
          <Box display="flex">
            <Box
              w="100%"
              py={3}
              pr={12}
              display="flex"
              justifyContent="flex-start"
              flexDirection="column"
              borderTopLeftRadius={8}
            >
              <Text
                // color="rgb(83, 34, 229)"
                fontWeight="semibold"
                fontSize="24px"
                letterSpacing={0.3}
                ml={4}
              >
                Create new Account
              </Text>

              <Text
                // color="rgb(83, 34, 229)"
                fontWeight="semibold"
                fontSize="16px"
                letterSpacing={0.3}
                ml={4}
                mr={4}
              >
                Get Started For Free by Signing Up Now
              </Text>
            </Box>
          </Box>
          {/* <form> */}
          <FormControl mt={2} px={3}>
            <FormLabel color="black.200" ml={1.5} key={"name"}>
              Email Address
            </FormLabel>

            <Input
              id="email"
              color="grey"
              fontSize="sm"
              type={"email"}
              value={email}
              placeholder="Enter Email Address"
              required={true}
              readOnly={false}
              size="lg"
              border="solid 1.5px black"
              borderRadius={4}
              bg="white"
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </FormControl>

          <FormControl mt={2} px={3}>
            <FormLabel color="black.200" ml={1.5} key={"name"}>
              Password
            </FormLabel>

            <Input
              id="password"
              color="grey"
              fontSize="sm"
              type={"password"}
              value={password}
              placeholder="Enter Password"
              required={true}
              readOnly={false}
              size="lg"
              border="solid 1.5px black"
              borderRadius={4}
              bg="white"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </FormControl>

          <FormControl mt={2} px={3}>
            {" "}
            <FormLabel color="black.200" ml={1.5} key={"name"}>
              Country of Residence
            </FormLabel>
            <Select
              id="country"
              color="grey"
              fontSize="sm"
              placeholder="Select country"
              required={true}
              size="lg"
              border="solid 1.5px black"
              borderRadius={4}
              bg="white"
              onChange={(event) => setCountry(event.currentTarget.value)}
            >
              {country_list.map((x) => (
                <option key={x + Math.random()} value={x}>
                  {" "}
                  {x}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mt={2} px={3}>
            <FormLabel color="black.200" ml={1.5} key={"name"}>
              Have a referral code?
            </FormLabel>

            <Input
              id="ref"
              color="grey"
              fontSize="sm"
              type={"text"}
              value={ref}
              placeholder="Enter Referral code"
              required={false}
              readOnly={false}
              size="lg"
              border="solid 1.5px black"
              borderRadius={4}
              bg={"white"}
              onChange={(event) => setRef(event.currentTarget.value)}
            />
          </FormControl>

          <Text mx={4} mt={4} mb={3} fontSize="xs">
            By creating an account, you agree to morty&#39;s
            <Link color="blue.500"> Terms of Service</Link> &{" "}
            <Link color="blue.500">Privacy Policy</Link>
          </Text>

          <Box px={2.5}>
            <Button
              variant="solid"
              type="submit"
              width="full"
              height="48px"
              bg="rgb(12, 108, 242)"
              opacity={
                email.length < 6 ||
                password.length < 3 ||
                password.length < 3 ||
                country.length < 3
                  ? 0.4
                  : 1
              }
              mt={4}
              loadingText="Submitting"
              colorScheme={"blue"}
              onClick={
                email.length < 6 ||
                password.length < 3 ||
                password.length < 3 ||
                country.length < 3
                  ? () => {}
                  : handleSignIn
              }
            >
              Continue
            </Button>
          </Box>
          {/* </form> */}
          <Divider mt={8} mb={0} />

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            fontWeight="bold"
          >
            <Text fontWeight="=600" color="grey" fontSize="0.9rem">
              Already have a morty account?
            </Text>

            <Box fontSize="lg" mt={4} mb={3} color="rgb(12, 108, 242)">
              Login
            </Box>
          </Box>
        </Box>
      </Container>
    </SignupLayout>
  );
};

export default SignUpPage;
