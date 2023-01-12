import axios from "axios";
export class Api {
  public static async getToken() {
    let response = await axios.get("/api/token");
    return response.data.cookies[
      `${
        process.env.NEXT_PUBLIC_MODE == "dev"
          ? "next-auth.session-token"
          : "__Secure-next-auth.session-token"
      }`
    ];
  }
  public static async get(url: string) {
    try {
      let token = await this.getToken();
      console.log("token is ", token);
      let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}${url}`, {
        method: "get",
        mode: "cors",
        headers: {
          "auth-token": token,
        },
      });

      let finalData = await response.json();

      return finalData;
    } catch (e) {
      console.log("error in getting");
      return {};
    }
  }

  public static async post(url: string, data: object) {
    try {
      let token = await this.getToken();
      console.log("token is ", token);
      let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}${url}`, {
        mode: "cors",
        method: "post",
        headers: {
          "auth-token": token,
        },
      });

      let finalData = await response.json();

      return finalData;
    } catch (e) {
      console.log("error in getting");
      return {};
    }
  }
}
