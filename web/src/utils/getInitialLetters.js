export default function getInitialLettes(name) {
  const [first, last] = name.split(' ');
  const lastInitial = last && last[0];
  return [first[0], lastInitial];
}
