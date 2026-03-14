import { pxToRem } from '@/utils'

describe('pxToRem', () => {
  it('deve converter corretamente pixels para rem para valores positivos', () => {
    expect(pxToRem(16)).toBe('1rem')
    expect(pxToRem(32)).toBe('2rem')
    expect(pxToRem(8)).toBe('0.5rem')
  })
  it('deve converter para 0 quando o valor for 0', () => {
    expect(pxToRem(0)).toBe('0rem')
  })
  it('deve converter corretamente pixels para rem para valores negativos', () => {
    expect(pxToRem(-16)).toBe('-1rem')
    expect(pxToRem(-32)).toBe('-2rem')
    expect(pxToRem(-8)).toBe('-0.5rem')
  })
})
