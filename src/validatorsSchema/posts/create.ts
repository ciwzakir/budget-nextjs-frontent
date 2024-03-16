import * as yup from "yup";

export const  initialValuesOfCreatePost = {
  title: 'title',
  content: 'content',
  categoryId: '',
 
};


export const postCreateSchema = yup.object().shape({
      title: yup.string().min(6).max(20).required(),
      content: yup.string().min(6).max(100).required(),
      categoryId: yup.string().required('Category is required'),
});
