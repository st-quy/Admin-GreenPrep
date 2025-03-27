export function formatStringWithNewlines(input) {
  return input.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
}
