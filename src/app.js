const express = require("express");
const app = express();

// app.use("/", (req, res) => {
//   res.send("Hello from Home");
// }); conflicting with other routes
// app.use("/user", (req, res) => {
//   res.send("Hello from user updated");
// });
// app.use("/api", (req, res) => {
//   res.send("Hello from API");
// });

// app.use('/user',(req,res)=>{
//   res.send('Sending')
// })
app.get("/user",(req,res)=>{
  res.send({firstName:'Madhu',lastName:'Yelubandy'})
})
app.post("/user",(req,res)=>{
  res.send('updated successfully')
})
app.delete("/user",(req,res)=>{
  res.send('deleted')
})
app.listen(3000, () => {
  console.log("Successfully running on port 3000");
});
