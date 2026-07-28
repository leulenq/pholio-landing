"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { PHOLIO_APP_ORIGIN } from "@/lib/pholio-app-origin";
import { AGENCY_ACCESS_REQUEST_PATH } from "@/lib/pholio-auth/constants";

/**
 * Agency access request form.
 *
 * This closes a funnel that was broken in both directions: pholio-app's
 * `/partners` route redirected to `${MARKETING}/agency/request-access` (404 —
 * the page did not exist), the /agency page's CTAs pointed at
 * `${APP_URL}/agency/register` (404 — no such app route), and
 * `POST /api/public/agency-access-requests` — which exists, is rate-limited,
 * validates eleven required fields and writes to the database, tagging its
 * events `source: "pholio-landing"` — had no caller anywhere in this repo.
 *
 * The field contract mirrors validateAgencyAccessPayload() in
 * pholio-app/src/routes/api/public.js. Required: agencyName, websiteUrl,
 * primaryMarketCity, agencyType, primaryBoards, rosterSizeRange, teamSizeRange,
 * firstUseCases, contactName, contactEmail, contactRole.
 */

const AGENCY_TYPES = [
  "Mother agency",
  "Placement agency",
  "Model management",
  "Talent management",
  "Casting organization",
  "Event producer",
  "Brand or client",
];

const BOARDS = [
  "Women",
  "Men",
  "Development",
  "Curve",
  "Kids",
  "Classic",
  "Commercial",
  "Talent",
];

const ROSTER_SIZES = ["1–25", "26–75", "76–150", "151–400", "400+"];
const TEAM_SIZES = ["1–3", "4–10", "11–25", "26+"];

const USE_CASES = [
  "Reviewing inbound submissions",
  "Scouting and discovery",
  "Managing an existing roster",
  "Running castings or open calls",
  "Building comp cards and packages",
  "Migrating from another system",
];

const inputClass =
  "w-full rounded-md border border-[#E2DED5] bg-white px-4 py-3 text-[15px] text-[#050505] outline-none transition-colors duration-150 focus:border-[#C9A55A] focus-visible:ring-2 focus-visible:ring-[#C9A55A]/25";

const labelClass =
  "mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-[#64748B]";

type Errors = Record<string, string>;

export default function AgencyRequestAccessForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [boards, setBoards] = useState<string[]>([]);
  const [useCases, setUseCases] = useState<string[]>([]);

  const toggle = (
    value: string,
    list: string[],
    setList: (next: string[]) => void,
  ) => {
    setList(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value],
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrors({});
    setFormError(null);

    const data = new FormData(event.currentTarget);
    const payload = {
      agencyName: data.get("agencyName"),
      websiteUrl: data.get("websiteUrl"),
      primaryMarketCity: data.get("primaryMarketCity"),
      primaryMarketCountry: data.get("primaryMarketCountry"),
      agencyType: data.get("agencyType"),
      primaryBoards: boards,
      rosterSizeRange: data.get("rosterSizeRange"),
      teamSizeRange: data.get("teamSizeRange"),
      currentSystem: data.get("currentSystem"),
      firstUseCases: useCases,
      contactName: data.get("contactName"),
      contactEmail: data.get("contactEmail"),
      contactRole: data.get("contactRole"),
      contactPhone: data.get("contactPhone"),
      heardFrom: data.get("heardFrom"),
      notes: data.get("notes"),
      timezone:
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : undefined,
    };

    try {
      // Cross-origin to the app API. Not proxied — Netlify's Next runtime
      // returns 500 for this site's external rewrites (see
      // lib/pholio-auth/constants.ts).
      const response = await fetch(`${PHOLIO_APP_ORIGIN}${AGENCY_ACCESS_REQUEST_PATH}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const body = await response.json().catch(() => ({}));

      if (response.ok) {
        setSubmitted(
          body?.data?.message ||
            "Your request has been received. Pholio reviews agency access manually and will email next steps if there is a fit.",
        );
        return;
      }

      if (response.status === 400 && body?.errors) {
        setErrors(body.errors as Errors);
        setFormError("Please complete the highlighted fields.");
        return;
      }

      setFormError(
        "We couldn't submit your request just now. Please try again shortly.",
      );
    } catch {
      setFormError(
        "We couldn't reach Pholio just now. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-md border border-[#E2DED5] bg-white p-8">
        <h2
          className="mb-3 text-2xl"
          style={{ fontFamily: "var(--font-serif)", color: "#050505" }}
        >
          Request received
        </h2>
        <p
          className="max-w-xl text-[15px] leading-relaxed"
          style={{ fontFamily: "var(--font-sans)", color: "#4B5563" }}
        >
          {submitted}
        </p>
        <Link
          href="/agency"
          className="mt-6 inline-block text-[10px] font-bold uppercase tracking-[0.15em] text-[#050505] underline decoration-[#C9A55A]/40 underline-offset-4"
        >
          Back to agencies
        </Link>
      </div>
    );
  }

  const fieldError = (name: string) =>
    errors[name] ? (
      <p className="mt-2 text-[13px]" style={{ color: "#A8894E" }}>
        {errors[name] === "Required" ? "This field is required." : errors[name]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <fieldset className="flex flex-col gap-5">
        <legend className={labelClass}>The agency</legend>

        <div>
          <label className={labelClass} htmlFor="agencyName">
            Agency name
          </label>
          <input id="agencyName" name="agencyName" className={inputClass} required />
          {fieldError("agencyName")}
        </div>

        <div>
          <label className={labelClass} htmlFor="websiteUrl">
            Website
          </label>
          <input
            id="websiteUrl"
            name="websiteUrl"
            className={inputClass}
            placeholder="agency.com"
            required
          />
          {fieldError("websiteUrl")}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="primaryMarketCity">
              Primary market — city
            </label>
            <input
              id="primaryMarketCity"
              name="primaryMarketCity"
              className={inputClass}
              required
            />
            {fieldError("primaryMarketCity")}
          </div>
          <div>
            <label className={labelClass} htmlFor="primaryMarketCountry">
              Country
            </label>
            <input
              id="primaryMarketCountry"
              name="primaryMarketCountry"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="agencyType">
            Agency type
          </label>
          <select id="agencyType" name="agencyType" className={inputClass} required defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {AGENCY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {fieldError("agencyType")}
        </div>

        <div>
          <span className={labelClass}>Boards you run</span>
          <div className="flex flex-wrap gap-2">
            {BOARDS.map((board) => (
              <button
                key={board}
                type="button"
                onClick={() => toggle(board, boards, setBoards)}
                aria-pressed={boards.includes(board)}
                className="rounded-md border px-4 py-2 text-[13px] transition-colors duration-150"
                style={{
                  fontFamily: "var(--font-sans)",
                  borderColor: boards.includes(board) ? "#050505" : "#E2DED5",
                  backgroundColor: boards.includes(board) ? "#050505" : "#FFFFFF",
                  color: boards.includes(board) ? "#FFFFFF" : "#4B5563",
                }}
              >
                {board}
              </button>
            ))}
          </div>
          {fieldError("primaryBoards")}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="rosterSizeRange">
              Roster size
            </label>
            <select
              id="rosterSizeRange"
              name="rosterSizeRange"
              className={inputClass}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select one
              </option>
              {ROSTER_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {fieldError("rosterSizeRange")}
          </div>
          <div>
            <label className={labelClass} htmlFor="teamSizeRange">
              Team size
            </label>
            <select
              id="teamSizeRange"
              name="teamSizeRange"
              className={inputClass}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select one
              </option>
              {TEAM_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {fieldError("teamSizeRange")}
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className={labelClass}>What you need first</legend>

        <div>
          <span className={labelClass}>First use cases</span>
          <div className="flex flex-col gap-2">
            {USE_CASES.map((useCase) => (
              <label
                key={useCase}
                className="flex cursor-pointer items-center gap-3 text-[15px]"
                style={{ fontFamily: "var(--font-sans)", color: "#4B5563" }}
              >
                <input
                  type="checkbox"
                  checked={useCases.includes(useCase)}
                  onChange={() => toggle(useCase, useCases, setUseCases)}
                  className="h-4 w-4 accent-[#050505]"
                />
                {useCase}
              </label>
            ))}
          </div>
          {fieldError("firstUseCases")}
        </div>

        <div>
          <label className={labelClass} htmlFor="currentSystem">
            Current system (optional)
          </label>
          <input id="currentSystem" name="currentSystem" className={inputClass} />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className={labelClass}>Who we should talk to</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="contactName">
              Full name
            </label>
            <input id="contactName" name="contactName" className={inputClass} required />
            {fieldError("contactName")}
          </div>
          <div>
            <label className={labelClass} htmlFor="contactRole">
              Role
            </label>
            <input id="contactRole" name="contactRole" className={inputClass} required />
            {fieldError("contactRole")}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="contactEmail">
              Work email
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              className={inputClass}
              required
            />
            {fieldError("contactEmail")}
          </div>
          <div>
            <label className={labelClass} htmlFor="contactPhone">
              Phone (optional)
            </label>
            <input id="contactPhone" name="contactPhone" className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="heardFrom">
            How did you hear about Pholio? (optional)
          </label>
          <input id="heardFrom" name="heardFrom" className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="notes">
            Anything else (optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            maxLength={500}
            className={inputClass}
            style={{ resize: "none" }}
          />
        </div>
      </fieldset>

      {formError ? (
        <p className="text-[14px]" style={{ color: "#A8894E" }}>
          {formError}
        </p>
      ) : null}

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-fit items-center justify-center rounded-full px-8 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-colors duration-200 disabled:opacity-60"
          style={{ fontFamily: "var(--font-sans)", backgroundColor: "#050505" }}
        >
          {submitting ? "Sending…" : "Request access"}
        </button>
        <p
          className="max-w-xl text-[13px] leading-relaxed"
          style={{ fontFamily: "var(--font-sans)", color: "#64748B" }}
        >
          Pholio reviews agency access manually. We only collect agency and
          contact details here — never roster files, talent data, or contracts.
          See our{" "}
          <Link
            href="/privacy"
            className="underline decoration-[#C9A55A]/40 underline-offset-2"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
