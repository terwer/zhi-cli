import fs from "fs-extra"
import path from "path"
import handlebars from "handlebars"

export const modifyPackageJson = function (downloadPath: string, options: any) {
  console.log("modifying package.json……")
  const packagePath = path.join(downloadPath, "package.json")
  if (fs.existsSync(packagePath)) {
    const content = fs.readFileSync(packagePath).toString()
    const template = handlebars.compile(content)

    const param = {
      name: options.name,
      description: options.description,
      author: options.author,
    }

    const result = template(param)
    fs.writeFileSync(packagePath, result)
    console.log("modify package.json complete")
  } else {
    throw new Error("no package.json")
  }
}
