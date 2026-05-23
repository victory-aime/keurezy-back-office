import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Adresse e-mail invalide')
    .required('Veuillez renseigner votre adresse e-mail'),

  password: Yup.string()
    .required('Veuillez saisir votre mot de passe')
    .min(12, 'Le mot de passe doit contenir au moins 12 caractères')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      'Le mot de passe doit contenir une majuscule, une minuscule et un chiffre',
    ),
});
