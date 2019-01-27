const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const { prefix, repos } = require("./cli.config");
const { isArray, isString } = require("./tool");

// 创建项目
const createProject = (project, urls) => {
    let p = path.resolve(__dirname, project);
    fs.exists(p, (isExisted) => {
        if(isExisted) {
            throw "该目录存在同名文件夹！";
        }else {
            let code = shell.exec(`${prefix} clone ${project} ${urls}`).code;
            if(code !== 0) {
                shell.exit(1);
            }
        }
    });
}

// 克隆脚手架模板
const cloneTmp = (project, urls) => {
    let hasRepos = false;
    let code;
    let urlCount = 0;
    function cmd(url) {
        urlCount++;
        if(urlCount === 2) {
            shell.cd(project);
        }
        if(urlCount > 1) {
            code = shell.exec(`git remote add other ${url}`)
                        .exec("git fetch other")
                        .exec("git checkout -b b2 other/master")
                        .exec("git checkout master")
                        .exec("git merge b2 --allow-unrelated-histories")
                        .exec("git branch -d b2")
                        .exec("git remote remove other");
        }else {
            code = shell.exec(`git clone ${url} ${project}`);
        }
        return ;
    }
    if(urls) {
        hasRepos = true;
        urls.forEach((url) => {
            cmd(url);
        });
    }
    if(repos) {
        if(isArray && repos.length !== 0) {
            hasRepos = true;
            repos.forEach((url) => {
                cmd(url);
            });
        }
        else if(isString(repos)) {
            hasRepos = true;
            cmd(repos);
        }
    }
    if(!hasRepos) {
        throw "没有可用的git仓库！";
    }else {
        if(code !== 0) {
            shell.exit(1);
        }else {
            shell.exit(0);
        }
    }
}
    
module.exports = {
    createProject,
    cloneTmp
};
