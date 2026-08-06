const BACK_OUTPUT = "/generated/comp-card/elara-keats-back.png";

/**
 * Page two of the real two-sided PDF emitted by pholio-app's composed
 * comp-card engine. Regenerate with `npm run artifact:comp-card`.
 */
export default function CompCardBack() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BACK_OUTPUT}
      alt="Elara Keats comp card, back"
      className="block h-full w-full object-cover"
      draggable={false}
    />
  );
}
