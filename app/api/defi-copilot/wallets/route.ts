import { NextResponse } from "next/server";
import { createItem, listItems } from "@/lib/mvp-store";

function numeric(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function GET() {
  return NextResponse.json({ data: listItems() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    descriptor?: string;
    detail?: string;
    priceUsdc?: number | string;
    payload?: Record<string, unknown>;
  };

  const item = createItem({
    name: body.name?.trim() || "Untitled Portfolio",
    descriptor: body.descriptor?.trim() || "+4.8% APY option",
    detail: body.detail?.trim() || "Low risk",
    priceUsdc: numeric(body.priceUsdc, 0.1),
    payload: body.payload || {"recommendation":"move idle USDC to low-risk lending","risk":"low"},
  });

  return NextResponse.json({ data: item }, { status: 201 });
}
