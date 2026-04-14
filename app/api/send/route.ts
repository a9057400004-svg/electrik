import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, phone, message } = await req.json();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, error: "Заполните все поля." },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        { success: false, error: "Не настроены TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID." },
        { status: 500 }
      );
    }

    const text = [
      "<b>Новая заявка с сайта</b>",
      "",
      `<b>Имя:</b> ${escapeHtml(name)}`,
      `<b>Телефон:</b> ${escapeHtml(phone)}`,
      `<b>Проблема:</b> ${escapeHtml(message)}`,
    ].join("\n");

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const telegramError = await response.text();
      return NextResponse.json(
        { success: false, error: `Ошибка Telegram: ${telegramError}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Не удалось отправить заявку." },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
