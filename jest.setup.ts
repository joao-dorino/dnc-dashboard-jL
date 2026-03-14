import '@testing-library/jest-dom'
import 'jest-styled-components'
import { TextEncoder, TextDecoder } from 'node:util'

if (!globalThis.TextEncoder) {
  globalThis.TextEncoder = TextEncoder
}

if (!globalThis.TextDecoder) {
  globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder
}