export const inputPatterns = {
    //min 8 caracteres, al menos una letra mayuscula, al menos una minuscula,
    //almenos un número y un caracter especial.
    password: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
}