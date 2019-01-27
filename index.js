#!/usr/bin/env node
const program = require("commander");
const logger = require("tracer").colorConsole();
const config = require("./cli.config");
const functions = require(config.functionPath);
const { isArray, isObject, isString } = require("./tool");

let { version, cmd, desc } = config;

// 解析console的start或end
function parseConsole(con) {
    if(con) {
        // 如果是数组
        if(isArray(con)) {
            con.forEach((el) => {
                logger.log(el);
            });
        }
        // 如果是对象
        else if(isObject(con)){
            for(let key in con) {
                let value = con[key];
                // 如果值为数组
                if(isArray(value)) {
                    value.forEach((el) => {
                        logger[key](el);
                    });
                }
                // 如果是字符串
                else if(isString(value)) {
                    logger[key](con[key]);
                }
            }
        }
    }
}

// 版本号和描述
program
    .version(version)
    .description(desc);

// 自定义命令
cmd.forEach((el) => {
    let ex = el.ex; // 描述
    let func = el.func; // 回调
    let con = el.console; // 控制台打印
    if(ex && func) {
        program
            .command(ex)
            .action(function(...args) {
                parseConsole(con.start); // 输出start
                functions[func].apply(this, args);
                parseConsole(con.end); // 输出end
            });
    } 
});

program.parse(process.argv);