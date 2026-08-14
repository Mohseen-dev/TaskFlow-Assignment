import {app} from './app.js';

const PORT = 9000;
app.listen(PORT , ()=>{
    console.log("Backend server running at port : ",PORT);
})
app.get("/",(req,res)=>{
    res.send("fkeofsd 9000");
});