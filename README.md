# Tampa Dev Day Workshops

## Prerequisites
* Deploy an Atlas Cluster  
  * https://cloud.mongodb.com
  * Create Cluster
    * **Cluser Tier** : M0
    * **Cloud Provider**: Azure
    * **Version**: 7.0
   
* Create Database User
  * In the Atlas Console, navigate to Database Access
     * Select Add New Database User & create the following username / password
     * username: pwc
     * password: test

* Add IP Address
  * In the Atlas Console, navigate to, Network Access
     * Select Add IP Address
     * Input the following IP Address 0.0.0.0/0
     * This will allow access from anywhere.

# Movie Search 
Use **movie-search** folder
### index.json
Search Index that uses dynamic mapping where every document and attribute and value will be indexed. \
```
{
    "mappings": {
      "dynamic": true
    }
}
```

### search-aggregation.js
```
[
    {
        '$search': {
            'index': ?, 
            'text': {
                'query': ? , 
                'path': ?,
                'fuzzy': {
                    'maxEdits': ?
                }
            }, 
            'highlight': {
                'path': ?
            }
        }
    }, {
        '$project': {
            }
        }
    }, {
        '$limit': ?
    }
]
```
### movie-search-function.js
```
exports = function(payload) {
    const collection = context.services.get("mongodb-atlas").db("sample_mflix").collection("movies");
    let arg = payload.query.arg;
    return collection.aggregate([
        { $search: {
                       text: {
                          query: arg,
                          path:'fullplot',
                          fuzzy: {
                            maxEdits: 2
                          }
                        },
                        highlight: { path: 'fullplot' }
                }},
                { $project: {
                       title: 1,
                       _id:0,
                       year:1,
                       fullplot:1,
                       score: { $meta: 'searchScore'},
                       highlight: {$meta: 'searchHighlights'}
                }},
                { $limit: 10}
        ]).toArray();
  };
```
### index.html

Modify **line 83** with your HTTPs endpoint created in Atlas App Services. 

# Resume RAG using Jupyter Notebooks
Use **vector-search** folder
* **Samples** folder incldes sample resumes in pdf to be used as the dataset
* Jupyer Notebook  
  * Pip installation: pip install notebook
  * Homebrew installation: brew install jupyterlab
  * Install **Jupyter** extension in VSCode
