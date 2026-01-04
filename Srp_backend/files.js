const file=require('fs')
function writefunction(){
    file.writeFile("demo.txt","hollow world",(err,data)=>{
        if(err){
            console.log("error occured")
        }
    })
}
function readfile(){
    file.readFile("demo.txt",(err,data)=>{
        if(err){
            console.log("error occured") 
        }
        console.log(data.toString())
    })
}
function appenfile(){
    file.appendFile("demo.txt","this is naveen",(err,data)=>{
        if(err)console.log("error occured")
    })
}
function deletefile(){
    file.unlink("demo.txt",(err,data)=>{
        if(err) console.log("error occured")
    })
}
//writefunction()
//readfile()
//appenfile()
