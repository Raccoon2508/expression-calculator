function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  
try{

  let result;
  let exprArray=[];
  let stuck=[];
  let externalLine=[];
  let internalLine=[];
  
  if(expr.indexOf("/ 0")>-1){throw new Error("Zero");}
  let prevexprArray=expr.split("");
  
  let number='';


 for(let i=0; i<expr.length;i++){
  if(expr.charCodeAt(i)>=48&&expr.charCodeAt(i)<=57){
  number=number+expr[i];
  
  }
 if(i==expr.length-1&&number!==''){
    exprArray.push(number);
   
    number='';}
  else if(['(','*',"/",'+','-',')'].includes(expr[i])){
    if(number.length!=0){
    exprArray.push(number);
    number='';}
    exprArray.push(expr[i]);
  }}
  
  
  
 
  
  let openCount=0;
  let closedCount=0;
  for(let item of exprArray){
    if(item=="("){openCount++;}
    if(item==")"){closedCount++;}
  }
  
  if(openCount!==closedCount){throw new Error("Brackets");}
  
  
  
  
  
   exprArray.push("end");
   
  function toExternalLine(symbol){
        if(stuck[stuck.length-1]){externalLine.push(stuck[stuck.length-1]);}
        stuck.pop();}
  
  function closeBraketLine(){
    if(stuck.lastIndexOf('(')<0){
    }
    
  externalLine=externalLine.concat(stuck.slice(stuck.lastIndexOf('(')+1).reverse());
  stuck=stuck.slice(0,(stuck.lastIndexOf('(')) );}
    
    
  for(let item of exprArray){
  
  
    if(parseInt(item)||item=="0"){
    externalLine.push(item);
    } 
    
  else if((['(','*',"/",'+','-'].includes(item))&&stuck.length==0){
    stuck.push(item);}  
  
  else if(['*','/'].includes(item)){
    if(['*','/'].includes(stuck[stuck.length-1])){
      while(['*','/'].includes(stuck[stuck.length-1])){toExternalLine(item);}
        stuck.push(item);
    }else if(['+','-','('].includes(stuck[stuck.length-1])){
          stuck.push(item);
    }
    continue;      
  }else if(['+','-'].includes(item)){
     while(['*','/','+','-'].includes(stuck[stuck.length-1])){toExternalLine(item);}
      stuck.push(item);
      }else if(item=='('||stuck.length==0){
      stuck.push(item);
      continue; 
  }else if(item==')'){
     closeBraketLine(); 
     continue; 
  }else if(item=="end"){
    externalLine=externalLine.concat(stuck.reverse());
    }
  }
  
 
  
  stuck=[];
  
  for(let item of externalLine){
    if(parseInt(item)||item==0){
    stuck.push(item);
    
    }
    
   else if(['*',"/",'+','-'].includes(item)){
    
    calc(item)
    
    }  
  }
  
  
  
  function calc(item){
    let temp=0;
    if(item=='+'){
      temp=1*stuck[stuck.length-1]+1*stuck[stuck.length-2];
      
      }  
    else if(item=='-'){
      temp=+stuck[stuck.length-2]-stuck[stuck.length-1];
      }
    else if(item=='*'){
      temp=+stuck[stuck.length-2]*stuck[stuck.length-1];
      }  
     else if(item=='/'){
      temp=+stuck[stuck.length-2]/stuck[stuck.length-1];
      }
    stuck.pop();
    stuck.pop();
    stuck.push(temp);
      
      
    }
  
  
  return stuck[0];
  
    
  }catch(e){
        if(e.message=="Zero"){
          throw "TypeError: Division by zero.";
        } 
        else if(e.message=="Brackets"){
          throw "ExpressionError: Brackets must be paired";
  
        }   
  }
  
   
  // write your solution here
}

module.exports = {
    expressionCalculator
}
