let x = Math.floor(Math.random() * 16);
if (x === 0){
 console.log("weell x is 0")   ;
}else if( x % 3 === 0) {
    x % 5 === 0 ?
        alert(x + " is divisible by 3 and 5") :
        alert(x + "is divisible by 3");
} else if ( x % 5 === 0) {
    alert(x + " is divisible by 5");
} else{
    alert("sorry x was " + x);
}