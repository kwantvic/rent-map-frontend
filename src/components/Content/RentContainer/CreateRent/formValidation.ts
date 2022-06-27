import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Заповніть поле'),
  price: yup.number().required('Заповніть поле'),
  description: yup.string(),
});

export default schema;
