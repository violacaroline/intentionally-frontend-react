import React from 'react'
import { render } from '@testing-library/react'
import Login from './Login'

describe('login', () => {
  test('Username input field to be in the document', () => {
    const view = render(<Login />)
    const inputUsernameElement = view.getByText('Username')
    expect(inputUsernameElement).toBeInTheDocument()
  })

  test('Pass Phrase input field to be in the document', () => {
    const view = render(<Login />)
    const inputPassPhraseElement = view.getByText('Pass Phrase')
    expect(inputPassPhraseElement).toBeInTheDocument()
  })
})
