import * as yup from "yup";

export const userSchema = yup.object().shape({
  profileData: yup.object().shape({
    userName: yup.object().shape({
      firstName: yup.string().required("First name is required"),
      middleName: yup.string().required("Middle name is required"),
      lastName: yup.string().required("Last name is required"),
    }),

    personalInformation: yup.object().shape({
      age: yup.string().required("age is required"),
      bloodGroup: yup.string().required("bloodGroup is required"),
      gender: yup.string().required("gender is required"),
      maritalStatus: yup.string().required("maritalStatus is required"),
      nationality: yup.string().required("nationality is required"),
      phoneNumber: yup.string().required("phoneNumber name is required"),
    }),
  }),
});
