import { lazy } from "react";

// separate chunk
export const DoctorPageAsync = lazy(async () => await import("./DoctorPage"));
