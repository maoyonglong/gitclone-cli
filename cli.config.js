module.exports = {
    // version
    version: "1.0.0",
    // prefix
    prefix: "cli",
    // 脚手架描述
    desc: "scss的webpack脚手架",
    // function
    functionPath: "./function",
    // command
    cmd: [
        {
            ex: "create <project> [urls...]",
            func: "createProject",
            console: {
                start: {
                    info: "正在创建项目文件夹..."
                },
                end: {
                    info: "项目文件夹创建完毕！"
                }
            }
        },
        {
            ex: "clone <project> [urls...]",
            func: "cloneTmp",
            console: {
                start: {
                    info: "正在克隆模板..."
                },
                end: {
                    info: "项目初始化完毕！"
                }
            }
        }
    ],
    // repository
    repos: ["git@github.com:maoyonglong/jianshu.git", "git@github.com:maoyonglong/ps-note.git"]
};