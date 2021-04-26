const mongoose=require('mongoose')
const Joi=require('joi')
const mongoosePaginate = require('mongoose-paginate');
var random = require('mongoose-simple-random');

const schemaFormation=mongoose.Schema({
    
    nom:{type:String, default: ""},
    nomLower:{type:String, default: ""},

    formateur:{type:String, default: ""},
    
    prixVente:{type:Number, default: 0},
    
    nbrParticipant:{type:Number, default: 0},
    
    prixPromo:{type:Number,default: 0},
 
    imagePrincipale:{type:String, default: ""},

    createdFormation:{type:String, default: ""},
 
    categories:[{
        categorie:{type:String, default: ""},
    }],

    descriptionsDessus:[{
        ligne:{type:String, default: ""},
    }],

    descriptionsDessous:[{
        title:{type:String, default: ""},
        value:{type:String, default: ""},
    }],
    
    chapitres:[{
        titre:{type:String,default: ""},
        description:{type:String,default: ""},
        video:{type:String,default: ""},
        coursPdf:{type:String,default: ""},
        reponses:[
            {
                idEtudiant:{type:String,default: ""},
                reponsePdf:{type:String,default: ""},
                etat:{type:String,default: ""}
            }
        ]
    }],
    
},
{ timestamps: true })

schemaFormation.plugin(mongoosePaginate);
schemaFormation.plugin(random);

schemaFormation.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Formation=mongoose.model('Formation',schemaFormation)


function validateFormation(produit){


    let itemDescriptionDessous = Joi.object().keys({
        title:Joi.string().required(),
        value:Joi.string().required(),
    })

    let itemDescriptionDessus = Joi.object().keys({
        ligne:Joi.string().required(),
    })

    
    let itemCategorie = Joi.object().keys({
        categorie:Joi.string().required(),
    })


    let itemChapitre = Joi.object().keys({
        titre:Joi.string().allow('', null),
        description:Joi.string().allow('', null),
        videoYoutube:Joi.string().allow('', null),
        video:Joi.string().allow('', null),
        coursPdf:Joi.string().allow('', null),
    })

    const schema2=Joi.object({
        
        nom:Joi.string().required(),
        prixVente:Joi.number().required(),
        prixPromo:Joi.number().allow('', null),
        
        imagePrincipale:Joi.string().allow('', null),
        categories:Joi.array().items(itemCategorie),
        descriptionsDessous:Joi.array().items(itemDescriptionDessous),
        descriptionsDessus:Joi.array().items(itemDescriptionDessus),
        chapitres:Joi.array().items(itemChapitre)

    })

    return schema2.validate(produit)

}


function validateFormationsCategories(cats){
    
    let itemCategorie = Joi.object().keys({
        categories:Joi.string().required(),
    })

    
    const schema3=Joi.object({
        page:Joi.number().required(),
        limitItems:Joi.number().required(),
        listCategories:Joi.array().items(itemCategorie),
    })

    return schema3.validate(cats)

}


function validateFormationsPagination(request){
    
    const schema4=Joi.object({
        page:Joi.number().required(),
        limit:Joi.number().required(),
    })

    return schema4.validate(request)

}

module.exports.Formation=Formation
module.exports.validateFormation=validateFormation
module.exports.validateFormationsCategories=validateFormationsCategories
module.exports.validateFormationsPagination=validateFormationsPagination
