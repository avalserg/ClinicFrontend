import { type FC, lazy } from "react";
import { type RegisterPatientFormProps } from "./RegisterPatientForm";
// separate chunk
export const RegisterPatientFormAsync = lazy<FC<RegisterPatientFormProps>>(
  async () => await import("./RegisterPatientForm"),
);
