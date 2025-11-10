export const getCsrfToken = () => sessionStorage.getItem('csrfToken')
export const setCsrfToken = (token: string) => sessionStorage.setItem('csrfToken', token)
export const clearCsrfToken = () => sessionStorage.removeItem('csrfToken')