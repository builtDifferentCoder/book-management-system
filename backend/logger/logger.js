import winston from "winston";

const logger=winston.createLogger({
    level:process.env.NODE_ENV==="production"?"info":"debug",
    format:winston.format.combine(
        winston.format.json(),
        winston.format.errors({stack:true}),
        winston.format.timestamp(),
        winston.format.prettyPrint({depth:3,colorize:true}),
        winston.format.splat()
    ),
    defaultMeta:{service:"backend"},
    transports:[
        new winston.transports.Console(
            {
                format: winston.format.combine(winston.format.simple(),
                    winston.format.colorize())
            }
        ),
        new winston.transports.File({filename:"error.log","level":"error"}),
        new winston.transports.File({filename:"reports.log"})
    ]
})

export default logger;