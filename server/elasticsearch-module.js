const elasticsearch = require('elasticsearch');

const elasticClient = new elasticsearch.Client({
    host: 'elasticsearch:9200',
    log: 'error'
});



const addValue = (entry, indexName="entities") => {
    console.log(entry.body)
    return elasticClient.index({
        index: entry.body.type,
        type: "document",
        body: {
            text: entry.body.text,
            suggest: {
                input: entry.body.text.split(" "),
            }
        }
    });
};

exports.addValue = addValue;

const getMappings = (indexName = "entities") => {
    console.log("getting mappings")
    return(elasticClient.indices.getMapping({index: indexName}))
}

exports.getMappings = getMappings;

const initIndex = (indexName) => {
    return elasticClient.indices.create({
        index: indexName,
        body: {
            "analysis": {
                "filter": {
                    "autocomplete_filter": {
                        "type": "edge_ngram",
                        "min_gram": 1,
                        "max_gram": 20
                    }
                },
                "analyzer": {
                    "autocomplete": {
                        "type": "custom",
                        "tokenizer": "standard",
                        "filter": [
                            "lowercase",
                            "autocomplete_filter"
                        ]
                    }
                }
            }
        }
    }).then(() => putMappings(indexName))
};

exports.initIndex = initIndex;

const putMappings = (indexName = "entities", typeName = "document") => {
    console.log('-------------------mapping--------------------------')
    console.log(indexName)
    console.log(typeName)
    return elasticClient.indices.putMapping({
        index: indexName,
        type: typeName,
        body: {
            [typeName]: {
                "properties": {
                    "text": {
                        "type": "text",
                        "analyzer": "autocomplete",
                    }
                }
            }
        }
    })
}
exports.putMappings = putMappings;

const getSuggestions = (input, indexName) => {
    return elasticClient.search({
        index: indexName,
        q: input
    })

};

exports.getSuggestions = getSuggestions;

const checksIndex = (indexName) => {
    console.log(elasticClient.indices.exists({
        index: indexName
    }))
    return elasticClient.indices.exists({
        index: indexName
    })
};

exports.checksIndex = checksIndex;

const deleteIndex = (indexName) => {
    return elasticClient.indices.delete({
        index: indexName
    })
};

exports.deleteIndex = deleteIndex;

const getIndices = () =>{
    return elasticClient.indices.getAlias({
        index:"_all",
    })
}
exports.getIndices = getIndices;

const initDB = () => {
    console.log('------------init------------------')
    checksIndex('entities').then(exists => {
        if (exists) {
            deleteIndex('entities').then(() => initIndex('entities'))
        } else {
            initIndex('entities')
        }
    },(error)=>{
        setTimeout(()=>{
            console.log("waiting for elasticSearch", error)
            initDB()
        },10000)
    })
}
exports.initDB = initDB;