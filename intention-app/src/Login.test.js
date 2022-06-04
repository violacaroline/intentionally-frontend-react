import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from './Login'
import { BrowserRouter as Router } from 'react-router-dom'


describe('Render Login page', () => {
  test('Renders a Username input field', () => {
    render(<Router><Login /></Router>)
    const usernameInputField = screen.getByText("Username")
    expect(usernameInputField).toBeInTheDocument()
  })

  test('Renders a Pass Phrase input field', () => {
    render(<Router><Login /></Router>)
    const passwordInputField = screen.getByText("Pass Phrase")
    expect(passwordInputField).toBeInTheDocument()
  })

  test('Renders a submit input field', () => {
    render(<Router><Login /></Router>)
    const submitInputField = screen.getByText("Submit "  + String.fromCharCode("0x00002661"))
    expect(submitInputField).toBeInTheDocument()
  })
})

