"use client";
import { getUserInfo } from "@/app/auth/auth.service";
import { CREATE_PROFILE_GQL } from "@/app/graphl/mutations/muttion";
import { MYPROFILESFEATURES } from "@/app/graphl/query/query";
import StepperForm from "@/components/stepperForm/stepperForm";
import EducationQualifications from "@/components/user/create/EducationQualifications";
import PersonalInformation from "@/components/user/create/PersonalInformation";
import UserAddress from "@/components/user/create/UserAddress";
import UserName from "@/components/user/create/UserName";
import { USER_ROLE } from "@/constants/role";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CreateProfilePage = () => {
  const router = useRouter();
  const role = getUserInfo() as any;
  const [createprofile, { data, loading, error }] = useMutation(
    CREATE_PROFILE_GQL,
    {
      refetchQueries: [{ query: MYPROFILESFEATURES }],
    }
  );
  const steps = [
    {
      title: "Personal Information",
      content: <UserName />,
    },

    {
      title: "Personal Information",
      content: <EducationQualifications />,
    },
    {
      title: "Personal Information",
      content: <PersonalInformation />,
    },

    {
      title: "User Address",
      content: <UserAddress />,
    },
  ];

  const handleOnSubmit = async (formData: any) => {
    const { profileData } = formData;
    const {
      userName: { firstName, lastName, middleName },
      personalInformation: {
        age,
        bloodGroup,
        gender,
        maritalStatus,
        nationality,
        phoneNumber,
      },
      userAddress: { city, street, zipCode },
      educationQualifications: {
        qualification,
        fieldOfStudy,
        instituteName,
        graduationYear,
        obtainGrade,
      },
    } = profileData;

    console.log(profileData);
    try {
      await createprofile({
        variables: {
          profileData: {
            userName: {
              firstName,
              middleName,
              lastName,
            },
            personalInformation: {
              age,
              bloodGroup,
              gender,
              maritalStatus,
              nationality,
              phoneNumber,
            },
            educationQualifications: {
              qualification,
              fieldOfStudy,
              instituteName,
              graduationYear,
              obtainGrade,
            },
            userAddress: {
              city,
              street,
              zipCode,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const { refetch } = useQuery(MYPROFILESFEATURES);

  useEffect(() => {
    if (data && data.createprofile.message) {
      message.success(data.createprofile.message);
      refetch();
      router.push(`/${role}/myprofile`);
    }
  }, [data, refetch]);

  return (
    <StepperForm
      persistKey="profile-create-form"
      submitHandler={(data) => {
        handleOnSubmit(data);
      }}
      steps={steps}
    />
  );
};

export default CreateProfilePage;
