import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth";
import { nextAuthConfig } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, nextAuthConfig);

  const webRes = await fetch(process.env.REPORTS_WEBHOOK + "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: "<@635411595253776385>",
      embeds: [
        {
          title: req.body.title,
          description: req.body.description,
          color: 15401215,
          author: {
            name: session ? session.user.username : "Anonymous",
          },
          footer: {
            text: "BuildTheEarth Dashboard",
          },
          timestamp: "2024-07-11T22:00:00.000Z",
        },
      ],
    }),
  });
  if (webRes.status !== 204) {
    return res.status(webRes.status).json({ res: webRes.statusText });
  } else {
    return res.status(200).json({ ok: true });
  }
}
