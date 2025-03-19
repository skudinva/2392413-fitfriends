export function getRandomEnumValue<E extends { [key: string]: unknown }>(
  enumObject: E
): E[keyof E] {
  const values = Object.values(enumObject) as E[keyof E][];
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

export function generateRandomDate(start: Date, end: Date) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime =
    Math.floor(Math.random() * (endTime - startTime + 1)) + startTime;

  return new Date(randomTime);
}

export function getRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

export function getRandomItem<T>(items: T[]): T {
  return items[getRandomValue(0, items.length - 1)];
}
