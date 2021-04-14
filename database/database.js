const xml2js = require('xml2js');
const fs = require('fs');
var convert = require('xml-js');


fs.readFile(__dirname + '/database8.xml', function(err, data){
    if(err) throw new Error(err);

    const parser = new xml2js.Parser();
    parser.parseStringPromise(data).then(function(res){
        //console.log(res);
        console.log(res.rss.channel[0].item[0].category.length);
        let items="";
        
        for(let i = 0; i< res.rss.channel[0].item.length; i++){
            var categories = "";
            if(res.rss.channel[0].item[i].category != undefined){
                for(let j = 0; j< res.rss.channel[0].item[i].category.length; j++){
                   categories = categories + res.rss.channel[0].item[i].category[j].$.nicename+",  ";
                }
            }
            let item = "";
            item += "\n {";
            item += "\n    id: "+ res.rss.channel[0].item[i].post_id+","; 
            item += "\n    name: "+ res.rss.channel[0].item[i].title+",";
            item += "\n    regular_price: "+res.rss.channel[0].item[i].regularPrice+",";
            item += "\n    sale_price: "+ res.rss.channel[0].item[i].regularPrice+","; 
            item += "\n    price: "+res.rss.channel[0].item[i].price+",";
            item += "\n    categories: "+categories+",";
            item += "\n    description: ( "+res.rss.channel[0].item[i].description+" ),"
            item += "\n    description2: (  "+res.rss.channel[0].item[i].description2+" ),";
            item += "\n    description3: (  "+res.rss.channel[0].item[i].description3+" ),";
            item += "\n    } \n ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////";     

            items += item;
            
        }
  
       
        fs.writeFileSync('database.json', items);
    
    }).catch(function (err){
        console.error(err);
    })
});



/*
fs.readFile(__dirname + '/database8.xml','utf8', function(err, data){
    if(err) throw new Error(err);

    var dataModefied = data;

    var ok = true;
    var compteur = 0;
    var compteurPerMill = 0;

    while(ok){
        compteur++;
        if(compteur == 1000){
            compteur = 0;
            compteurPerMill++;
            console.log(compteurPerMill);
        }

        var word = '<wp:is_sticky>';
        var word2 = '</wp:is_sticky>';
        var posWord = dataModefied.indexOf(word);
        
        if(posWord == -1){
            ok = false;
        }else{
            var posWord2 = dataModefied.indexOf(word2, posWord);
            
        
            var wordLeft = dataModefied.slice(0, posWord);
            var wordRight = dataModefied.slice(posWord2+word2.length, dataModefied.length);
            
            dataModefied = wordLeft + wordRight;
            
        }
        
    }
    
    
    fs.writeFileSync('database8.xml', dataModefied);
    
});    



/*
fs.readFile(__dirname + '/database8.xml','utf8', function(err, data){
    if(err) throw new Error(err);

    var dataModefied = data;

    var ok = true;
    var compteur = 0;
    var compteurPerMill = 0;

    while(ok){
        compteur++;
        if(compteur == 1000){
            compteur = 0;
            compteurPerMill++;
            console.log(compteurPerMill);
        }

        var word = '<wp:meta_key>';
        var posWord = dataModefied.indexOf(word);
        var sizeWord =  word.length;
        
        if(posWord == -1){
            ok = false;
        }else{
            var posFirst1 = posWord - 30;
            var posWord2 = dataModefied.indexOf('</wp:meta_value>', posWord);
            
            var wordRight2 = dataModefied.slice(posWord2, posWord2+35);
            var wordLeft2 = dataModefied.slice(posFirst1, posFirst1+77);
            var wordCenter = dataModefied.slice(posFirst1+63+sizeWord, posWord2);
            
        
            //var wordLeft = dataModefied.slice(0, posFirst1);
            var wordLeft = dataModefied.slice(0, posWord - 17);
            var wordRight = dataModefied.slice(posWord2+36, dataModefied.length);
            
            //dataModefied = wordLeft + "<price>"+wordCenter+"</price> \n"+wordRight;
            dataModefied = wordLeft + wordRight;
            
        }
        
    }
    
    
    fs.writeFileSync('database8.xml', dataModefied);
    
});    


fs.readFile(__dirname + '/database7.xml', function(err, data){
    if(err) throw new Error(err);

    const parser = new xml2js.Parser();
    parser.parseStringPromise(data).then(function(res){
        //console.log(res);
        //console.log(res.rss.channel[0].item[500].wp);
        let items=[];
        
        for(let i = 0; i< res.rss.channel[0].item.length; i++){
        
            let item = {
                id: res.rss.channel[0].item[i].post_id, 
                name: res.rss.channel[0].item[i].title,
                ugs: 23, 
                price: 'Male',
                description: 'English',
                contentEncoded: 'Honda',
                excerptEncoded: '',
                categories: '', 
            };     

            items.push(item);
            
        }
  
       
        let dataJson = JSON.stringify(items);
        fs.writeFileSync('database.json', dataJson);
    
    }).catch(function (err){
        console.error(err);
    })
});

*/
