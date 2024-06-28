import { useDispatch } from "react-redux";
import { AppDispatch } from "@/App/Providers/StoreProvider";

export const useAppDispatch: () => AppDispatch = useDispatch;
