/**
* Convert text from highlight api
* @param text - text to be convert.
* @return The converted text
*/


export function highlightsDataTextConverter(text: string): string {
switch (text) {
    case 'alert' :
        return '* Meta longe de ser batida'
    case 'secces' :
        return'* A meta do mês foi batida! Parabéns '
        case 'warning' :
        return'* Falta pouco, vamos lá! '
        default:
            return '* Sem dados no momento'
}
}