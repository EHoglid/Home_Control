//this function is called on view loaded
//you can put all your initialization code here
//parameter in function is id of the element
 function Compprefix_id__init(svg,component,properties,values){
     debugger;
    var elementRect=component.getElementsByTagName('rect');
    var elre=elementRect[0];
    var bbox=elre.getBBox();
       // elre.parentNode.removeChild(elre);
       while (component.hasChildNodes()) {
		component.removeChild(component.firstChild);
	}
       
var foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject' );
foreignObject.setAttribute("transform","translate(0 0)");
var body2 = document.createElement('div'); // you cannot create bodies with .apend("<body />") for some reason
var body = document.createElement('form');

$(body).css("overflow", 'hidden');
$(body).attr("contenteditable",true);
$(foreignObject).attr('x', bbox.x).attr('y', bbox.y).attr("width", bbox.width).attr("height", bbox.height).append(body2);
var inputitem=$("<input type=\"text\" name=\"test\" value=\""+properties.list[6].value+"\" />");
$(body).append(inputitem);
$(body2).append(body);
$(foreignObject).appendTo(component);


$(inputitem).css('font-size',properties.list[8].value+'pt');
$(inputitem).css('font-family',properties.list[7].value+'');
$(inputitem).css('width','100%');
$(inputitem).css('line-height',bbox.height+'px');
$(inputitem).css('color',properties.list[9].value+'');
$(inputitem).css('background-color',properties.list[10].value+'');
$(inputitem).css('border-radius',properties.list[12].value+'px');
if (properties.list[12].value>0)
{
    $(inputitem).css('outline','none');
}
if (properties.list[11].value==0)
{
    $(inputitem).css('outline','none');
    $(inputitem).css('border-width','0px');
    $(inputitem).css('border','none');
}
else
{
    $(inputitem).css('border-width','1px');
}
component.objekt=inputitem;
var decpcs=Math.round(properties.list[2].value);
var maxlen=Math.round(properties.list[1].value);
var lowerlimit=Math.round(properties.list[3].value);
var upperlimit=Math.round(properties.list[4].value);
var last_value="";
    if (properties.list[0].value.startsWith('1')) //je to number
    {
         $(inputitem).keypress(function(eve) {
             if (eve.which == 13)
             {
                 try
                 {
                 inputitem.callback($(this).val());
                 } catch(err) {}
                 eve.preventDefault();
             }
             
            if ((eve.which != 46 || $(this).val().indexOf('.') != -1) && (eve.which < 48 || eve.which > 57)  ) { // || (eve.which == 46 && $(this).caret().start == 0)
                    {
                        if (eve.which != 45)
                        {
                        eve.preventDefault();
                        }
                    }
                }
                });
                
             $(inputitem).keyup(function(eve) {
              if($(this).val().indexOf('.') == 0) {    $(this).val($(this).val().substring(1));
              }
              else
              {
                    var obsah=$(this).val();
                    if (obsah.trim() == "-")
                    {
                        
                    }
                    else
                    {
                        //if (obsah.length>maxlen) {eve.preventDefault();}
                        if (Compprefix_id__decimalPlaces(obsah)>decpcs) {
                                $(this).val(last_value);
                             }
                         else 
                         {
                             var val=Number($(this).val());
                             if (isNaN(val) || val>upperlimit || val<lowerlimit)
                             {
                                  $(this).val(last_value);
                             }
                         }
                     }
                 last_value=$(this).val();
             }
             });

     }
     
    if (properties.list[0].value.startsWith('2')) //je to custom
    {
        $(inputitem).keypress(function(eve) {
             if (eve.which == 13)
             {
                 try
                 {
                 inputitem.callback($(this).val());
                 } catch(err) {}
                 eve.preventDefault();
             }
         });
        $(inputitem).keyup(function (e) {
            
            var str=$(this).val();
            var rgx=properties.list[5].value;
            var regExpr = new RegExp(rgx);
                if (!regExpr.test(str)) {
                  $(this).val(last_value);
                }
            last_value=$(this).val();
         });
     }
     
     if (properties.list[0].value.startsWith('0')) //je to string
    {
        $(inputitem).keypress(function(eve) {
             if (eve.which == 13)
             {
                 try
                 {
                 inputitem.callback($(this).val());
                 } catch(err) {}
                 eve.preventDefault();
             }
         });
         
        $(inputitem).keyup(function(eve) {
            var obsah=$(this).val();
            if (obsah.length>maxlen)
            {
                $(this).val(last_value);
            }
            last_value=$(this).val();
        });
    }
     
     
 }
 //This funcion is called each time
 //new data are avaiable
 function Compprefix_id__animate(data){


 }

function Compprefix_id__decimalPlaces(num) {
  var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) { return 0; }
  return Math.max(
       0,
       // Number of digits right of decimal point.
       (match[1] ? match[1].length : 0)
       // Adjust for scientific notation.
       - (match[2] ? +match[2] : 0));
}