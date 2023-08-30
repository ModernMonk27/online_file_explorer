//loop through children of tbody
const children = $('tbody').children();
console.log(children);

// create children array

let children_array =[];

for(i = 0; i < children.length;  i++ ) {

    children_array.push(children[i]);
}
console.log(children_array);

// build array of objects
let items =[];

children_array.forEach(element => {
   
    let Rowdetails ={
        name : element.getAttribute('data-name'),
        size : parseInt(element.getAttribute('data-size')),
        time : parseInt(element.getAttribute('data-time')),
        html : element.outerHTML
    };
    items.push(Rowdetails);
});

console.log(items);

const sort = (items, Options, type) => {

    items.sort((item1, item2) => {

        let value1, value2 ;

        if(type === 'name'){
            value1 = item1.name.toUpperCase();
            value2 = item2.name.toUpperCase();
        }else if(type === "size"){

            value1 = item1.size;
            value2 = item2.size;

        }else{
            value1 = item1.time;
            value2 = item2.time;
        }
        if(value1 < value2){
            return -1;
        }
        if(value1 > value2){
            return 1;
        }
        return 0;




    });
    if(Options === 'down'){
        items.reverse();
    }

};

const sortstatus = {
    name : "none",
    size : "none",
    time : "none"
};

const fill_table_body = (items) => {

    const content = items.map(element => element.html).join("");

    $('tbody').html(content);

    console.log(content);

 
};

// set event listener

document.getElementById("table_head").addEventListener('click', event =>{

    if(event.target){

        $('ion-icon').remove();

        if(['none','down'].includes(sortstatus[event.target.id])){
            sort(items,'up',event.target.id);
            sortstatus[event.target.id] = 'up';
            event.target.innerHTML += '<ion-icon name="arrow-dropup-circle"></ion-icon>';
        }else if(sortstatus[event.target.id] == 'up'){

            sort(items,'down',event.target.id);
            sortstatus[event.target.id] = 'down';
            event.target.innerHTML += '<ion-icon name="arrow-dropdown-circle"></ion-icon>';

        }
        fill_table_body(items);


    }
    console.log(event.target.id);
    console.log(event.target);
    console.log(event.target.innerHTML);
    



});

