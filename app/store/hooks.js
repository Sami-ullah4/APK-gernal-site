import { useDispatch, useSelector } from "react-redux";
import { store } from "./store";

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const getStore = () => store;


