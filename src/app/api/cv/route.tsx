import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { CVDocument } from "../../cv/components/CVDocument";

export async function GET() {
  try {
    const buffer = await renderToBuffer(<CVDocument />);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=AsycAdept-CV.pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
