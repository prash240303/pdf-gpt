//   const { userId } = await auth (); we need to return the userId object back to the client 

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
    const { userId } = await auth();
    return NextResponse.json({ userId });  
}

