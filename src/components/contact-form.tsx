"use client";

import { useId, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  contactSchema,
  type ContactFieldErrors,
  type ContactResponse,
} from "@/lib/contact-schema";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", required: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", required: true },
  {
    name: "company",
    label: "Company",
    type: "text",
    autoComplete: "organization",
    required: false,
  },
] as const;

export function ContactForm() {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  /** Only show a field's error once it has been touched or submitted. */
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const fieldId = (name: string) => `${formId}-${name}`;
  const errorId = (name: string) => `${formId}-${name}-error`;

  /** Validate one field against its own slice of the shared schema. */
  function validateField(name: keyof ContactFieldErrors, value: string) {
    const result = contactSchema.shape[name].safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [name]: result.success ? undefined : result.error.issues[0]?.message,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const formData = new FormData(event.currentTarget);
    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    // Validate locally first so obvious mistakes never cost a round trip.
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: ContactFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !(field in nextErrors)) {
          nextErrors[field as keyof ContactFieldErrors] = issue.message;
        }
      }
      setErrors(nextErrors);
      setTouched({ name: true, email: true, company: true, message: true });
      setStatus("error");
      setStatusMessage("Check the highlighted fields and try again.");

      const firstInvalid = Object.keys(nextErrors)[0];
      if (firstInvalid) document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    setStatus("submitting");
    setStatusMessage("");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const result: ContactResponse = await response.json();

      if (result.success) {
        setStatus("success");
        setStatusMessage(result.message);
        formRef.current?.reset();
        setTouched({});
      } else {
        setStatus("error");
        setStatusMessage(result.message);
        setErrors(result.errors ?? {});
        setTouched({ name: true, email: true, company: true, message: true });
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        `Network error — could not reach the server. Try again, or email ${site.email}.`,
      );
    }

    statusRef.current?.focus();
  }

  const showError = (name: string) =>
    touched[name] && errors[name as keyof ContactFieldErrors];

  const inputClass = (name: string) =>
    `w-full border-2 bg-paper-50 px-4 py-3 text-ink placeholder:text-ink-faint transition-colors focus:outline-none focus-visible:border-clay-600 ${
      showError(name) ? "border-clay-600" : "border-paper-400 hover:border-forest-800"
    }`;

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="plate focus:outline-none"
      >
        <p className="plate-head label">Message sent</p>
        <div className="px-6 py-10 text-center">
          <p
            aria-hidden="true"
            className="mx-auto grid h-12 w-12 place-items-center bg-forest-800 font-slab text-xl text-paper-200"
          >
            ✓
          </p>
          <h3 className="mt-5 font-slab text-2xl font-bold text-forest-800">
            Thanks — it&apos;s on its way
          </h3>
          <p className="mx-auto mt-3 max-w-sm text-ink-soft">{statusMessage}</p>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setStatusMessage("");
            }}
            className="label mt-8 border-2 border-forest-800 px-5 py-3 text-forest-800 transition-colors hover:bg-forest-800 hover:text-paper-200"
          >
            Send another →
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
      aria-describedby={statusMessage ? `${formId}-status` : undefined}
    >
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={fieldId(field.name)}
            className="label mb-2.5 flex items-baseline gap-2 text-forest-800"
          >
            {field.label}
            {field.required ? (
              <span aria-hidden="true" className="text-clay-600">
                *
              </span>
            ) : (
              <span className="font-normal tracking-normal text-ink-faint">
                (optional)
              </span>
            )}
          </label>
          <input
            id={fieldId(field.name)}
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            required={field.required}
            aria-required={field.required}
            aria-invalid={showError(field.name) ? true : undefined}
            aria-describedby={showError(field.name) ? errorId(field.name) : undefined}
            onBlur={(e) => {
              setTouched((prev) => ({ ...prev, [field.name]: true }));
              validateField(field.name as keyof ContactFieldErrors, e.target.value);
            }}
            onChange={(e) => {
              if (touched[field.name]) {
                validateField(field.name as keyof ContactFieldErrors, e.target.value);
              }
            }}
            className={inputClass(field.name)}
          />
          {showError(field.name) ? (
            <p id={errorId(field.name)} className="label mt-2.5 text-clay-600">
              {errors[field.name as keyof ContactFieldErrors]}
            </p>
          ) : null}
        </div>
      ))}

      <div>
        <label
          htmlFor={fieldId("message")}
          className="label mb-2.5 flex items-baseline gap-2 text-forest-800"
        >
          Message
          <span aria-hidden="true" className="text-clay-600">
            *
          </span>
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={7}
          required
          aria-required
          aria-invalid={showError("message") ? true : undefined}
          aria-describedby={showError("message") ? errorId("message") : undefined}
          placeholder="Tell us about your business and what you're looking for..."
          onBlur={(e) => {
            setTouched((prev) => ({ ...prev, message: true }));
            validateField("message", e.target.value);
          }}
          onChange={(e) => {
            if (touched.message) validateField("message", e.target.value);
          }}
          className={`${inputClass("message")} resize-y`}
        />
        {showError("message") ? (
          <p id={errorId("message")} className="label mt-2.5 text-clay-600">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot — hidden from sight and from assistive technology, but a bot
          reading the DOM will fill it and be silently discarded server-side. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={fieldId("website")}>Website</label>
        <input
          id={fieldId("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div
        ref={statusRef}
        id={`${formId}-status`}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="focus:outline-none"
      >
        {statusMessage && status === "error" ? (
          <p className="label border-2 border-clay-600 bg-clay-100 px-4 py-3.5 leading-relaxed text-clay-700">
            {statusMessage}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full"
      >
        {status === "submitting" ? "Sending…" : "Send message →"}
      </Button>

      <p className="text-sm leading-relaxed text-ink-faint">
        We&apos;ll only use your details to reply. No lists, no sharing — see the{" "}
        <a
          href="/privacy"
          className="text-ink-soft underline decoration-paper-400 underline-offset-2 hover:text-clay-600"
        >
          privacy note
        </a>
        .
      </p>
    </form>
  );
}
