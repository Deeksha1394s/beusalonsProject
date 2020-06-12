const app=require('express')()
const bodyParser = require("body-parser");
const helmet = require('helmet');
const appRouter=require('./route/app-route')
const port=3012

app.use(helmet())
app.use(bodyParser.json({limit: '20mb'})); //to check that json size does not exceed 20mb
app.use('/',appRouter)


app.listen(port,()=>{console.log(`running on port ${port}`)})

