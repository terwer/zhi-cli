import gitclone from "git-clone"
import fs from "fs-extra"
import path from "path"

export const downloadTemplate = async (
  templateGitUrl: string,
  downloadPath: string
) => {
  let ret
  try {
    await gitclone(templateGitUrl, downloadPath, {
      checkout: "main",
      shallow: true,
    })
    fs.removeSync(path.join(downloadPath, ".git"))
    ret = "download success"
  } catch (error) {
    ret = error
  }
  return ret
}
