const elasticsearch = require('elasticsearch');

const elasticClient = new elasticsearch.Client({
    host: 'elasticsearch:9200',
    log: 'error'
});



const addDocument = (entry, indexName) => {
    console.log(entry.body)
    return elasticClient.index({
        index: indexName,
        type: "document",
        body: {
            text: entry.body.text,
            suggest: {
                input: entry.body.text.split(" "),
            }
        }
    });
};

exports.addDocument = addDocument;


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

const putMappings = indexName => {
    console.log('-------------------mapping--------------------------')
    return elasticClient.indices.putMapping({
        index: indexName,
        type: 'document',
        body: {
            "document": {
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

const getSuggestions = (input, indexName) => {
    return elasticClient.search({
        index: indexName,
        q: input.text
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


const initDB = () => {
    console.log('------------init------------------')
    checksIndex('entities').then(exists => {
        if (exists) {
            deleteIndex('entities').then(() => initIndex('entities'))
        } else {
            initIndex('entities')
        }
    })
}
exports.initDB = initDB;