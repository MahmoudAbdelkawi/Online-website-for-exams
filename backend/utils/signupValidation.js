const  Ajv = require('ajv') 

const schema = {
	"type": "object",
	"properties":{
		// your properties for example (name , id)
		"email" :{
			"type":"string",
		},

		"grade":{
			"enum":["year1","year2","year3","year4","year5","year6"]
		}
		,

		"password":{
			"type":"string",
			"minLength":8,
		}
	
	},
	"required":["email", "password"], 
	"maxProperties":3, 
	"minProperties":2,
}

const ajv = new Ajv()

let validator = ajv.compile(schema)

module.exports = validator
