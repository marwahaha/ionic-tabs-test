// DB Wrapper from https://gist.github.com/jgoux/10738978#file-services-js
myApp.factory('DB', function($q, DB_CONFIG) {
    var self = this;
    self.db = null;

    self.init = function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];

            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });

            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
            console.log('Table ' + table.name + ' initialized');
        });
    };

    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

    self.fetchAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        
        return output;
    };

    self.fetch = function(result) {
        return result.rows.item(0);
    };

    return self;
});

// Resource service example
myApp.factory('Account', function($q, DB) {
    var self = this;
    
    self.all = function() {
        return DB.query('SELECT * FROM accounts')
        .then(function(result) {
            return DB.fetchAll(result);
        });
    };
    
    self.getById = function(id) {
        return DB.query('SELECT * FROM accounts WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };

    self.init = function(datas) {
        if (!datas)
            datas = [[1, 'Account 1'],[2, 'Account 2'],[3, 'Account 3'],[4, 'Account 4'],[5, 'Account 5']];
        var deferred = $q.defer();
        var template = 'INSERT INTO accounts (id, name) VALUES (?, ?)';
        var sqlCalls = [];
        angular.forEach(datas, function(data) {
            sqlCalls.push(DB.query(template, data));
        });
        $q.all(sqlCalls)
            .then(function(results) {
                deferred.resolve(results);
            }, function(errors) {
                deferred.reject(errors);
            });

        return deferred.promise;
    };

    return self;
});