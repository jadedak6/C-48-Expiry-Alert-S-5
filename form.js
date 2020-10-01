class Form{
    constructor(){
    //Array to store the details
    this.productdetails =[];
    
    //Deatils for the product
    this.nameproduct = createInput("Name of the product",'text');
    this.expirydate = createInput('mm-dd-yyyy', 'date');
    
    this.button = createButton("Add product");
    }
    
    display(){
        
        //Positions of inputs and button
        this.nameproduct.position(100,200);
        this.expirydate.position(300,200);
       
        this.button.position(100,230);
    
        //Mouse pressed function for the button
        this.button.mousePressed(()=>{
        
            var productname = this.nameproduct.value();
        var date = this.expirydate.value();
         var year1=date.slice(0,4);
         var month1=date.slice(5,7);
         var date= date.slice(8,10)
        
        if(year1<=year && month1<=month){
        swal({
            title: `This Product is already expired${"\n"}Can't be added`,
            text: "Please add some other product",
            confirmButtonText: "Ok",
          });
       } else {
        //Variables for each input     
        var details = [productname, month1, year1];
        var ref= database.ref("product/data");
        ref.push(details);
        //this.productdetails.push(details);
        
    
    }
    });

}

}