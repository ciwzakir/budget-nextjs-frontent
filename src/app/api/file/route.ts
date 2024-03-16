// import { NextApiRequest, NextApiResponse } from "next";
// import { NextResponse } from "next/server";

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   return NextResponse.json({ name: "File Uploaded" });
// }

import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ name: "File Uploaded" });
}
