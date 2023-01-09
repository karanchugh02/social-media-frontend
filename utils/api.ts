import axios from "axios";

export class Api {
  public static async get(url: string) {
    try {
      let response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}${url}`,
        {
          withCredentials: true,
        }
      );

      console.log("response data is ", response.data);

      return response.data;
    } catch (e) {
      console.log("error in getting");
      return {};
    }
  }

  public static async post(url: string, data: object) {
    try {
      let response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}${url}`,
        data,
        {
          withCredentials: true,
        }
      );

      console.log("response data is ", response.data);

      return response.data;
    } catch (e) {
      console.log("error in getting");
      return {};
    }
  }
}
