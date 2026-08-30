import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail, buildReplyHtml } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messageId, replyMessage } = body;

    if (!messageId || !replyMessage?.trim()) {
      return NextResponse.json(
        { error: "messageId and replyMessage are required" },
        { status: 400 }
      );
    }

    // Fetch the original message
    const original = await prisma.contactMessage.findUnique({
      where: { id: messageId },
    });

    if (!original) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      );
    }

    // Send the reply email to the client
    const emailResult = await sendEmail({
      to: original.email,
      subject: `Re: ${original.subject || "Your inquiry to TIXSYNC SOLUTIONS"}`,
      html: buildReplyHtml(
        original.name,
        original.subject,
        original.message,
        replyMessage.trim()
      ),
    });

    // Mark the original message as replied
    await prisma.contactMessage.update({
      where: { id: messageId },
      data: { replied: true, read: true },
    });

    return NextResponse.json({
      success: true,
      emailSent: emailResult.success,
      messageId: original.id,
    });
  } catch (error) {
    console.error("Reply error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
