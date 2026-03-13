import { getClinics, getRecommendedClinics } from "@/lib/clinics";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const urgency = request.nextUrl.searchParams.get("urgency") as "low" | "medium" | "high" | null;

  if (!urgency) {
    return NextResponse.json({ clinics: getClinics() });
  }

  if (!["low", "medium", "high"].includes(urgency)) {
    return NextResponse.json({ error: "Invalid urgency" }, { status: 400 });
  }

  return NextResponse.json({ clinics: getRecommendedClinics(urgency) });
}
