// import { lazy } from "react";

// export const AboutPageAsync = lazy(async () => await import("./AboutPage"));
import { lazy } from "react";

// separate chunk
export const RegisterPatientPageAsync = lazy(async () => await import("./RegisterPatientPage"));
