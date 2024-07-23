[
    {
        '$search': {
            'index': 'default', 
            'text': {
                'query': 'werevolves and vampires', 
                'path': 'fullplot',
                'fuzzy': {
                    'maxEdits': 2
                }
            }, 
            'highlight': {
                'path': 'fullplot'
            }
        }
    }, {
        '$project': {
            '_id': 0, 
            'title': 1, 
            'year': 1, 
            'fullplot': 1, 
            'score': {
                '$meta': 'searchScore'
            }, 
            'highlight': {
                '$meta': 'searchHighlights'
            }
        }
    }, {
        '$limit': 10
    }
]