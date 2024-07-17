import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth";
import { nextAuthConfig } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, nextAuthConfig);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const webRes = await fetch(
    process.env.NEXT_PUBLIC_FRONTEND_URL +
      `/api/revalidate?secret=${process.env.FRONTEND_KEY}&paths=${req.query.routes}`,
  );
  if (webRes.status !== 200) {
    return res.status(webRes.status).send(webRes.statusText);
  } else {
    return res.status(200).json(await webRes.json());
  }
}
