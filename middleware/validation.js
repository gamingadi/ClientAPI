const emailRegex=/^[a-z]/

function valid(email,pass){
    if(email!=="" && pass!==""){
        return{
            Email:email,
            Pass:pass
        }
    }else{
        return false
    }
}
function isEmpty(value){
    let x,isEmpty;
    let Empty=[]
    for(x in value){
        if(value[x]===""){
            Empty.push(x);
            isEmpty=true;
        }
    }
    return{
        isEmpty:isEmpty,
        EmptyKey:Empty
    }
}
module.exports={valid,isEmpty};