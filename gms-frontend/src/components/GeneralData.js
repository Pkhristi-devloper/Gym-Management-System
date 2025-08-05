import axios from "axios";
import { serverURL } from "../main";

export const getMonthalyjoined = async () => {
  try {
    let response = await axios.get(serverURL + "/api/members/monthly-members", {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly joined members:", error);
  }
};

export const getExpireIn3DaysData = async () => {
  try {
    let response = await axios.get(serverURL + "/api/members/expiring-3-days", {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly joined members:", error);
  }
};

export const getExpireIn4To7DaysData = async () => {
  try {
    let response = await axios.get(
      serverURL + "/api/members/expiring-4-to-7-days",
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly joined members:", error);
  }
};

export const getExpiredData = async () => {
  try {
    let response = await axios.get(serverURL + "/api/members/expired", {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly joined members:", error);
  }
};

export const getInactiveData = async () => {
  try {
    let response = await axios.get(serverURL + "/api/members/inactive", {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly joined members:", error);
  }
};
