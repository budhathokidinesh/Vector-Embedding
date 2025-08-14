import { Tiktoken } from "js-tiktoken/lite";
import o200k_base from "js-tiktoken/ranks/o200k_base";

const enc = new Tiktoken(o200k_base);
const userQuery = "Hey there I am Dinesh Budhathoki";
const tokens = enc.encode(userQuery);

console.log(tokens);

const inputTokens = [
  25216, 1354, 357, 939, 415, 2028, 71, 14523, 71, 725, 25310,
];
const decoded = enc.decode(inputTokens);
console.log({ decoded });

const predictNextToken = (tokens) => {
  return 6584;
};
while (true) {
  const nextToken = predictNextToken(tokens);
  if (nextToken === "END") break;
  tokens.push(nextToken);
}
