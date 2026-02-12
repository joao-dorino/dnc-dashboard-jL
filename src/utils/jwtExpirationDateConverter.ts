/**
* Convert JWT exp in days
* @param exp - Number to be converterd.
* @return Converted exp in days.
*/

export function jwtExpirationDateConverter(exp: number): Date {
  return new Date(exp * 1000);
}

