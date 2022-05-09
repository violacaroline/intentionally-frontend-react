import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from './Login'


describe('Render Login page', () => {
  it('Renders a Username input field', () => {
    render(<Login />)
    const usernameInputField = screen.getByText("Username")
    expect(usernameInputField).toBeInTheDocument()
  })

  it('Renders a Pass Phrase input field', () => {
    render(<Login />)
    const passwordInputField = screen.getByText("Pass Phrase")
    expect(passwordInputField).toBeInTheDocument()
  })

  it('Renders a submit input field', () => {
    render(<Login />)
    const submitInputField = screen.getByText("Submit "  + String.fromCharCode("0x00002661"))
    expect(submitInputField).toBeInTheDocument()
  })
})

