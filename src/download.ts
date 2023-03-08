import gitclone from "git-clone/promise"
import ora from "ora"

export const downloadTemplate = (
  templateGitUrl: string,
  downloadPath: string,
  branch: string
) => {
  const loading = ora("download template")
  return new Promise((resolve, reject) => {
    console.log("prepare to checkout templateGitUrl=>", templateGitUrl)
    console.log("prepare to checkout downloadPath=>", downloadPath)
    console.log("prepare to checkout branch=>", branch)
    loading.start("start download template")

    gitclone(templateGitUrl, downloadPath, {
      checkout: branch,
      shallow: false,
    })
      .then((r) => {
        loading.succeed("download success")
        loading.stop()

        resolve("download success")
      })
      .catch((error) => {
        loading.stop()
        loading.fail("download fail")

        reject(error)
      })
  })
}
