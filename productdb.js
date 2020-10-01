class Productdata{
    constructor(){
    
    }

   updatedata(array){
    database.ref('product/').set({
      data : array  
    })
    }

    getdata(){
    database.ref("product/data").on("value",data => {
       productdetails = data.val();
    })
    }
}