// Marks placeholder fields ("Nombre Apellido", "[Apellido]", "0000000") so a sample
// never reads as a real person or a real license number.
const SAMPLE_RE = /(Nombre Apellido|\[[^\]]+\]|0000000)/g;

export default function Sample({ children }) {
  if (typeof children !== "string") return children;
  const parts = children.split(SAMPLE_RE);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="sample" title="Muestra / sample">{part}</span>
    ) : (
      part
    )
  );
}
