#!/usr/bin/env node --experimental-specifier-resolution=node
import { Command } from "commander"
import inquirer from "inquirer"
import { downloadTemplate } from "./download"
import { modifyPackageJson } from "./modify"

const templateGitUrl = "https://github.com/terwer/zhi-ts-template"
let downloadPath = null

const InitPrompts = [
  {
    name: "description",
    message: "please input description",
    default: "",
  },
  {
    name: "author",
    message: "please input author",
    default: "",
  },
]

const program = new Command()

program
  .name("zhi-cli")
  .description("TypeScript application generator for zhi")
  .version("0.0.1")

program
  .command("init <name>")
  .description("init a zhi project")
  .action(async (name: string) => {
    console.log("start init zhi project:", name)
    const initOptions = await inquirer.prompt(InitPrompts)
    console.log("initOptions", initOptions)

    try {
      downloadPath = `./${name}`
      await downloadTemplate(templateGitUrl, downloadPath)
      console.log(downloadPath)
      modifyPackageJson(downloadPath, { name, ...initOptions })
    } catch (error) {
      console.error(error)
    }
  })

program.parse()
