import { Country } from "@/Entities/Country";
import { Currency } from "@/Entities/Currency";
import { PatientProfile, Profile } from "../../../Model/types/profile";

import {
  PatientInfoProfileCard,
  PatientProfileCardError,
  PatientProfileCardSkeleton,
} from "../PatientInfoProfileCard/PatientInfoProfileCard";
import { Patient } from "@/Entities/Patient";

export interface PatientProfileCardProps {
  className?: string;
  data?: PatientProfile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onChangeFirstName?: (firstName?: string) => void;
  onChangeLastName?: (lastName?: string) => void;
  onChangePatronymic?: (patronymic?: string) => void;
  
   onChangeDateBirthday?: (dateBirthDay?: string) => void;
    onChangeAvatar?: (avatar?: string) => void;
  onChangeAddress?: (address: string) => void;
  onChangePhoneNumber?: (phonenumber: string) => void;
  onChangePassportNumber?: (passportNumber: string) => void;
}

export const PatientProfileCard = (props: PatientProfileCardProps) => {
  const { isLoading, error } = props;
  if (isLoading) {
    return <PatientProfileCardSkeleton />;
  }
  if (error) {
    return <PatientProfileCardError />;
  }

  return <PatientInfoProfileCard {...props} />;
};
