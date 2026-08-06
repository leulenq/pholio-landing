const FRONT_OUTPUT = "/generated/comp-card/elara-keats-front.png";

/**
 * Page one of the real two-sided PDF emitted by pholio-app's composed
 * comp-card engine. Regenerate with `npm run artifact:comp-card`.
 */
export default function CompCardFront() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={FRONT_OUTPUT}
      alt="Elara Keats comp card, front"
      className="block h-full w-full object-cover"
      draggable={false}
    />
  );
}
