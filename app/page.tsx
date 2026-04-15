"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  phone: string;
  message: string;
  consent: boolean;
};

const services = [
  { title: "Установка розетки", price: "от 500 ₽" },
  { title: "Замена выключателя", price: "от 400 ₽" },
  { title: "Замена автоматов", price: "от 700 ₽" },
  { title: "Электромонтажные работы", price: "от 1500 ₽" },
];

const benefits = [
  "21 год опыта",
  "Решение за 1 выезд",
  "Без скрытых доплат",
  "Чисто после работы",
];

const steps = [
  "Пишите в Telegram или Max",
  "Уточняю проблему и договариваемся по времени",
  "Приезжаю и провожу диагностику",
  "Согласовываю цену до начала работ",
  "Выполняю работу аккуратно и безопасно",
  "Даю гарантию 1 год",
];

const faq = [
  {
    q: "Сколько стоит работа?",
    a: "Стоимость зависит от задачи. Точную цену скажу после диагностики.",
  },
  {
    q: "Есть ли гарантия?",
    a: "Да, гарантия на все работы — 1 год.",
  },
  {
    q: "Как быстро вы приезжаете?",
    a: "Обычно в течение дня. В срочных случаях стараюсь приехать быстрее.",
  },
  {
    q: "Будут ли скрытые доплаты?",
    a: "Нет. Цена согласовывается до начала работ.",
  },
];

const initialForm: FormState = {
  name: "",
  phone: "",
  message: "",
  consent: true,
};

export default function HomePage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.consent) {
      setStatus("error");
      setErrorText("Нужно согласие на обработку персональных данных.");
      return;
    }

    setStatus("loading");
    setErrorText("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          message: form.message,
        }),
      });

      const data = (await response.json()) as { success: boolean; error?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Не удалось отправить заявку.");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : "Не удалось отправить заявку.");
    }
  }

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <div>
            <div className="brand-title">АЛЕКСАНДР · ЭЛЕКТРИК</div>
            <div className="brand-subtitle">Премиальный выездной сервис</div>
          </div>
          <nav className="nav">
            <a href="#about">Обо мне</a>
            <a href="#steps">Как работаю</a>
            <a href="#prices">Цены</a>
            <a href="#contact" className="nav-cta">
              Связаться
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="pill">Гарантия 1 год · 21 год опыта</div>
              <h1>
                Решу любую проблему
                <span>с электрикой — гарантия 1 год</span>
              </h1>
              <p className="hero-lead">
                Александр, электрик с опытом 21 год. Диагностика и решение проблемы за один
                выезд. Работаю безопасно — ваш дом будет в порядке.
              </p>

              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary">
                  Вызвать электрика
                </a>
                <div className="hero-links">
                  <a href="https://t.me/help_electrik" target="_blank" rel="noreferrer">
                    Telegram
                  </a>
                  <span> • </span>
                  <a href="tel:+79671101411">Max</a>
                </div>
              </div>

              <div className="stats">
                <div className="stat-card">
                  <div className="stat-value">21 год</div>
                  <div className="stat-label">опыта работы</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">1 выезд</div>
                  <div className="stat-label">на большинство задач</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">1 год</div>
                  <div className="stat-label">гарантия на работы</div>
                </div>
              </div>
            </div>

            <div className="hero-photo-wrap">
              <div className="hero-photo-glow" />
              <div className="hero-photo-card">
                <Image
                  src="/alexander-site-photo.jpg"
                  alt="Александр, электрик"
                  width={900}
                  height={1200}
                  className="hero-photo"
                  priority
                />
                <div className="photo-caption">
                  <small>Премиальный сервис</small>
                  <strong>Аккуратная работа, понятная цена и гарантия 1 год</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container grid-2">
            <div className="photo-card">
              <Image
                src="/photo2.jpg"
                alt="Фото Александра"
                width={900}
                height={1200}
                className="side-photo"
              />
            </div>

            <div>
              <div className="white-card">
                <div className="eyebrow">Обо мне</div>
                <h2 className="section-title">Александр, электрик с опытом 21 год</h2>
                <div className="text-block">
                  <p>
                    За это время выполнил сотни работ: от замены розеток и выключателей до
                    полной замены электрики в квартире и доме.
                  </p>
                  <p>
                    Работаю по правилам безопасности — это значит, что после моей работы вы
                    можете быть спокойны за свой дом.
                  </p>
                  <p>
                    Гарантия на все работы — 1 год. Если что-то пойдёт не так, приеду и
                    исправлю бесплатно.
                  </p>
                </div>
              </div>

              <div className="small-grid">
                <div className="badge-card blue">
                  <div className="big">21 год</div>
                  <p>Опыт работы с квартирами, домами и частными заказами</p>
                </div>
                <div className="badge-card amber">
                  <div className="big">1 год</div>
                  <p>Гарантия на выполненные работы без лишних споров</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="white-card why-card">
              <h2 className="section-title" style={{ marginTop: 0 }}>
                Почему выбирают меня
              </h2>
              <div className="card-grid-4">
                {benefits.map((item) => (
                  <div key={item} className="mini-card">
                    <div className="mini-icon" />
                    <h3>{item}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="steps" className="steps section">
          <div className="container steps-grid">
            <div>
              <div className="eyebrow" style={{ color: "#94a3b8" }}>
                Как я работаю
              </div>
              <h2 className="section-title">Понятный процесс без сюрпризов</h2>
              <div className="step-list">
                {steps.map((step, index) => (
                  <div key={step} className="step-item">
                    <div className="step-number">{index + 1}</div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="contact" className="form-card">
              <div className="eyebrow">Заявка</div>
              <h2 className="section-title" style={{ marginTop: 12 }}>
                Оставьте заявку — я свяжусь с вами
              </h2>
              <p className="lead">
                Можно написать в Telegram, в Max или оставить заявку в форме. Отвечу максимально
                быстро.
              </p>

              <div className="button-row">
                <a href="https://t.me/help_electrik" target="_blank" rel="noreferrer" className="btn btn-secondary">
                  Telegram
                </a>
                <a href="tel:+79671101411" className="btn btn-dark">
                  Max · +7 967 110-14-11
                </a>
              </div>

              <form className="form-grid" onSubmit={handleSubmit}>
                <input
                  className="input"
                  type="text"
                  placeholder="Имя"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  required
                />
                <input
                  className="input"
                  type="tel"
                  placeholder="Телефон"
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  required
                />
                <textarea
                  className="textarea"
                  placeholder="Что случилось?"
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  required
                />
                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))}
                  />
                  <span>
                    Я согласен с обработкой персональных данных и принимаю условия политики
                    конфиденциальности.
                  </span>
                </label>
                <button className="btn btn-dark" type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "Отправка..." : "Отправить заявку"}
                </button>

                {status === "success" && (
                  <div className="success-box">Заявка отправлена. Сообщение уже ушло в Telegram.</div>
                )}
                {status === "error" && <div className="error-box">{errorText}</div>}

                <p className="form-note">Перезвоню и отвечу так быстро, как смогу</p>
              </form>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container bottom-grid">
            <div className="white-card">
              <div id="faq" className="eyebrow">
                FAQ
              </div>
              <h2 className="section-title">Частые вопросы</h2>
              <div className="stack">
                {faq.map((item) => (
                  <div key={item.q} className="qa-card">
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="prices" className="white-card" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8faff 100%)" }}>
              <div className="eyebrow">Цены</div>
              <h2 className="section-title">Прайс на популярные работы</h2>
              <div className="text-block" style={{ marginTop: 14 }}>
                <p>
                  Точную цену согласовываю до начала работ. Ниже — ориентир по самым частым
                  задачам.
                </p>
              </div>
              <div className="price-box">
                {services.map((service) => (
                  <div key={service.title} className="price-row">
                    <strong>{service.title}</strong>
                    <strong>{service.price}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h2 className="section-title" style={{ marginTop: 0 }}>
                Нужен электрик?
              </h2>
              <p>
                Напишите в Telegram или Max — помогу решить проблему с электрикой аккуратно,
                безопасно и с гарантией.
              </p>
            </div>
            <div className="button-row">
              <a href="https://t.me/help_electrik" target="_blank" rel="noreferrer" className="btn btn-secondary">
                Telegram
              </a>
              <a href="tel:+79671101411" className="btn btn-dark">
                Max · +7 967 110-14-11
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <div>Александр · Электрик · Гарантия 1 год</div>
            <div style={{ marginTop: 8 }}>
              Политика конфиденциальности: ваши данные используются только для связи с вами.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
