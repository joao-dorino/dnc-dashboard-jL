import { render } from '@testing-library/react'
import 'jest-styled-components'
import { BannerImage } from '@/components/BannerImage'

describe('BannerImage', () => {
  test('renders BannerImage with correct styles', () => {
    const { container } = render(<BannerImage />)

    const banner = container.firstChild

    expect(banner).toHaveStyleRule(
      'background-image',
      "url('/login-image.svg')"
    )
    expect(banner).toHaveStyleRule('background-size', 'cover')
    expect(banner).toHaveStyleRule('height', '100vh')
    expect(banner).toHaveStyleRule('width', '50vw')
  })
})

