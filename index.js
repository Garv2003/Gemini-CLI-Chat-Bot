import { GoogleGenerativeAI } from "@google/generative-ai";
import prompts from "prompts";
import ora from "ora";
import figlet from "figlet";
import chalk from "chalk";
import { config } from "dotenv";

config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const spinner = ora("Loading...").start();

const generateResponse = async (prompt) => {
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
};

const getInput = async () => {
  const response = await prompts({
    type: "text",
    name: "prompt",
    message: "Enter your prompt",
  });
  return response.prompt;
};

const main = async () => {
  const prompt = await getInput();
  spinner.start();
  const response = await generateResponse(prompt);
  spinner.stop();
  console.log(chalk.green(response));
  main();
};

spinner.stop();
console.log(
  chalk.blue(figlet.textSync("Generative AI", { horizontalLayout: "full" }))
);
main();
