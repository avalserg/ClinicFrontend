import { lazy } from "react";

// separate chunk
export const RegisterDoctorPageAsync = lazy(async () => await import("./RegisterDoctorPage"));
