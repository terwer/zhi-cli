#!/usr/bin/env node

/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

import {Command} from "commander"
import inquirer from "inquirer"
import {downloadTemplate} from "./download"

const templateGitUrl = "https://github.com/terwer/zhi-log"
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
    }
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
        } catch (error) {
            console.error(error)
        }
    })

program.parse()