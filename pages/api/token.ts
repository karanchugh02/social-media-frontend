import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let cookies = req.cookies;
  res.status(200).json({ cookies: cookies });
}
