#!/usr/bin/env node --experimental-specifier-resolution=node
import { Command } from "commander"
import inquirer from "inquirer"
import { downloadTemplate } from "./download"
import { modifyPackageJson } from "./modify"
import fs from "fs-extra"
import pkg from "../package.json" assert { type: "json" }
import path from "path"

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
  .version(pkg.version)

program
  .command("init <name> <branch>")
  .description("init a zhi project")
  .action(async (name: string, branch: string) => {
    console.log("start init zhi project:", name)
    const b = branch ?? "main"
    console.log("current branch:", b)
    const initOptions = await inquirer.prompt(InitPrompts)
    console.log("initOptions", initOptions)

    try {
      downloadPath = `./${name}`

      // 如果存在需要先删除，否则无法检出
      if (fs.existsSync(downloadPath)) {
        fs.removeSync(downloadPath)
      }

      // 系在仓库并替换参数
      await downloadTemplate(templateGitUrl, downloadPath, b)
      modifyPackageJson(downloadPath, { name, ...initOptions })

      // 删除git信息
      fs.removeSync(path.join(downloadPath, ".git"))
      // 删除模板
      fs.removeSync(path.join(downloadPath, "package-template.json"))
      console.log(".git cleaned.")

      console.log("project created.")
      console.log(
        "Now you can do `cd " + downloadPath + "`" + " and `pnpm install`"
      )
    } catch (error) {
      console.error(error)
    }
  })

program.parse()
