import { highlightsDataTextConverter } from '@/utils'

describe('highlightsDataTextConverter', () => {
  it('should return the correct text for "alert"', () => {
    expect(highlightsDataTextConverter('alert')).toBe(
      '* Meta longe de ser batida '
    )
  })

  it('should return the correct text for "success"', () => {
    expect(highlightsDataTextConverter('success')).toBe(
      '* A meta do mês foi batida! Parabéns '
    )
  })

  it('should return the correct text for "warning"', () => {
    expect(highlightsDataTextConverter('warning')).toBe(
      '* Falta pouco, vamos lá! '
    )
  })

  it('should return the default for unknown input', () => {
    expect(highlightsDataTextConverter('un')).toBe('* Sem dados no momento ')
  })

})
