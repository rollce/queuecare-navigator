import { getRecommendedClinics } from "@/lib/clinics";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const pain = Number(body?.painLevel ?? 0);
  const fever = Boolean(body?.fever);
  const breathing = Boolean(body?.breathingIssue);
  const age = Number(body?.age ?? 0);

  if (!age || age < 1 || age > 120) {
    return NextResponse.json({ error: "Invalid age" }, { status: 400 });
  }

  let score = pain;
  if (fever) score += 2;
  if (breathing) score += 4;
  if (age >= 65) score += 1;

  const urgency: "low" | "medium" | "high" = score >= 8 ? "high" : score >= 5 ? "medium" : "low";

  const message =
    urgency === "high"
      ? "High priority. Seek immediate in-person care."
      : urgency === "medium"
        ? "Medium priority. Visit a clinic today if possible."
        : "Low priority. Consider same-day virtual consultation first.";

  return NextResponse.json({
    urgency,
    score,
    message,
    recommendations: getRecommendedClinics(urgency),
  });
}
