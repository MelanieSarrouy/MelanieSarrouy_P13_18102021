import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { getToken } from '../actions/actionGetToken'
import Input from '../components/Input'
import colors from '../styles/bases/colors'
import { InputButton } from '../styles/components/button'
import {
  SignInMain,
  SignInSection,
  SignInSectionHeader,
  SignInIcon,
  SignInTitle,
} from '../styles/pages/signIn'

const SignIn = () => {
  const selectTheme = (state) => state.theme
  const theme = useSelector(selectTheme)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogged, setIsLogged] = useState(false)
  const dispatch = useDispatch()
  const selectMessage = (state) => state.getUser.user.status
  const message = useSelector(selectMessage)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getToken(email, password))
    setIsLogged(true)
  }
  if (isLogged && message === 200) {
    return <Redirect to="/user" />
  } else {
    console.log('invalid fields')
  }

  return (
    <>
      <SignInMain theme={theme}>
        <SignInSection theme={theme}>
          <SignInSectionHeader>
            <SignInIcon theme={theme} className="fa fa-user-circle"></SignInIcon>
            <SignInTitle theme={theme}>Sign In</SignInTitle>
          </SignInSectionHeader>
          <form onSubmit={handleSubmit}>
            <Input
              direction={'column'}
              forAndId={'email'}
              inputType={'text'}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <Input
              direction={'column'}
              forAndId={'password'}
              inputType={'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <Input
              direction={'row-reverse'}
              forAndId={'remember-me'}
              inputType={'checkbox'}
            />
            <InputButton
              theme={theme}
              type="submit"
              borderColor={colors.primary}
              bkgColor={colors.primary}
              txtColor="white"
              width="100%"
              value="Sign In"
            />
          </form>
        </SignInSection>
      </SignInMain>
    </>
  )
}

export default SignIn