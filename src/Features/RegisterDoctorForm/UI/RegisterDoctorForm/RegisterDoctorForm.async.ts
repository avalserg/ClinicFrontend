import { type FC, lazy } from "react";
import { type RegisterDoctorFormProps } from "./RegisterDoctorForm";
// separate chunk
export const RegisterDoctorFormAsync = lazy<FC<RegisterDoctorFormProps>>(
  async () => await import("./RegisterDoctorForm"),
);
