import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json(
    { error: "Приём заявок временно недоступен. Канал связи обновляется." },
    { status: 503 }
  );
}
