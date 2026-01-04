function first_function(){
    console.log("first function")
    
}
function second_function(callback){
    console.log("second function")
    callback()
}
second_function(first_function)