import jwt_decode from 'jwt-decode';
import { getStorageItem } from "../actions/StorageActions";

export default async function getLoggedInCompany() {
  const token = await getStorageItem("jwt").then((token) => {return token;});
  const body = jwt_decode(token);
  return body["0"].company;
}