import dotenv from "dotenv";
dotenv.config();
import { OpenAI } from "openai";
import axios from "axios";
import { exec } from "child_process";
import fs from "fs";

//This for execute the linux
async function executeCommand(cmd = "") {
  return new Promise((res, rej) => {
    exec(cmd, (error, data) => {
      if (error) {
        return res(`Error running command ${error}`);
      } else {
        res(data);
      }
    });
  });
}

//This is tool to write readme file
const writeReadmeFile = (content = "") => {
  try {
    fs.writeFileSync("README.md", content, "utf-8");
    return "README.md has been successfully created";
  } catch (error) {
    return `Error writing README.md: ${error.message}`;
  }
};

const TOOL_MAP = {
  executeCommand: executeCommand,
  writeReadmeFile: writeReadmeFile,
};

const client = new OpenAI();

async function main() {
  // These api calls are stateless (Chain Of Thought)
  const SYSTEM_PROMPT = `
You are a specialized AI agent whose ONLY job is to generate a README.md file.

You MUST follow this workflow strictly:

1. START → Understand the project
2. THINK → Decide what files to inspect
3. TOOL → Use executeCommand to explore the project
4. THINK → Build README content
5. TOOL → Call writeReadmeFile with FULL README content
6. OUTPUT → Confirm README.md creation

STRICT RULES:
- You ONLY have 2 tools:
  1. executeCommand(command: string)
  2. writeReadmeFile(content: string)

- You MUST call writeReadmeFile BEFORE OUTPUT
- OUTPUT must ONLY confirm success
- NEVER include README content in OUTPUT
- NEVER skip TOOL step
- ALWAYS explore project using executeCommand first
- ALWAYS read package.json if available

Output format (STRICT JSON):
{
  "step": "START | THINK | TOOL | OBSERVE | OUTPUT",
  "content": "string",
  "tool_name": "string",
  "input": "string"
}
`;
  //This is the message what to give to user
  const messages = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    {
      role: "user",
      content: `Generate a professional README.md for my project at /Users/dineshbudhathoki/Lab/GenAI/Tokenization.

You MUST follow these steps in order:
STEP 1: executeCommand("ls -la /Users/dineshbudhathoki/Lab/GenAI/Tokenization")
STEP 2: executeCommand("cat /Users/dineshbudhathoki/Lab/GenAI/Tokenization/package.json")
STEP 3: executeCommand("cat /Users/dineshbudhathoki/Lab/GenAI/Tokenization/token.js")
STEP 4: executeCommand("ls /Users/dineshbudhathoki/Lab/GenAI/Tokenization/agentic")
STEP 5: Call writeReadmeFile tool with the FULL README.md markdown content
STEP 6: OUTPUT confirming the file was created

The README.md MUST include these sections:
1. Project title with badges (license, node version, npm)
2. Short description
3. Table of contents
4. Features list
5. Prerequisites (Node.js version, npm, OpenAI API key)
6. Getting Started:
   - Clone the repository (git clone command)
   - Install dependencies (npm install)
   - Setup .env file
   - Run the project (actual commands from package.json)
7. Environment variables (.env example with placeholder values, NOT real API keys)
8. Usage with real code examples from actual project files
9. Project folder structure
10. Dependencies explanation
11. Contributing guidelines (fork, branch, commit, PR steps)
12. License
13. Author with GitHub/social links

IMPORTANT RULES:
- Use real file names and commands from the actual project
- NEVER expose real API keys in README, use placeholders like your_openai_api_key_here
- Make it detailed, professional and well formatted with emojis
- You MUST call writeReadmeFile tool in STEP 5, do NOT skip it
- OUTPUT step should only confirm the file was created, NOT contain README content`,
    },
  ];

  while (true) {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: messages,
    });

    const rawContent = response.choices[0].message.content;
    const parsedContent = JSON.parse(rawContent);

    messages.push({
      role: "assistant",
      content: JSON.stringify(parsedContent),
    });

    if (parsedContent.step === "START") {
      console.log(`🔥`, parsedContent.content);
      continue;
    }

    if (parsedContent.step === "THINK") {
      console.log(`\t🧠`, parsedContent.content);
      continue;
    }

    if (parsedContent.step === "TOOL") {
      const toolToCall = parsedContent.tool_name;
      if (!TOOL_MAP[toolToCall]) {
        messages.push({
          role: "developer",
          content: `There is no such tool as ${toolToCall}`,
        });
        continue;
      }

      const responseFromTool = await TOOL_MAP[toolToCall](parsedContent.input);
      console.log(
        `🛠️: ${toolToCall}(${parsedContent.input}) = `,
        responseFromTool,
      );
      messages.push({
        role: "developer",
        content: JSON.stringify({ step: "OBSERVE", content: responseFromTool }),
      });
      continue;
    }

    if (parsedContent.step === "OUTPUT") {
      console.log(`🤖`, parsedContent.content);
      // Fallback: if README was never written, force write the OUTPUT content
      const wasWritten = messages.some((msg) =>
        msg.content?.includes("README.md has been successfully created"),
      );

      if (!wasWritten) {
        console.log("⚠️ AI skipped writeReadmeFile — forcing write now...");
        writeReadmeFile(parsedContent.content);
        console.log("✅ README.md force written!");
      }
      break;
    }
  }

  console.log("Have a Nice day!");
}

main();
