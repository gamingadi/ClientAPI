const valid=require('./validation')

const data={
    email:"",
    pass:"asdas"
}

const l=valid.valid("adi","ad")
console.log(l);
var x=0;
var txt=""
for(x in l){
    let a=txt+" "+ l[x]
    txt=a
}
const a=valid.isEmpty(data)

console.log(a);