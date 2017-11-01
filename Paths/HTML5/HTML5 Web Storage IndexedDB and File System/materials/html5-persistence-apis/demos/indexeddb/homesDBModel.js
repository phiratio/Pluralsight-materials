var homesDBModel = (function () {

    var model = {
        name: 'HomesDB',
        version: 1,
        stores: {
            homes: {
                name: 'homes',
                key: { keyPath: 'clientId' },
                indexes: {
                    city: {
                        name: 'city',
                        definition: { unique: false }
                    }
                }
            }
        },

        upgrade: function (e) {

            var
                newVersion = e.target.result,
                storeModel = homesDBModel.stores.homes,
                indexModel = storeModel.indexes.city,
                homesStore;

            if (!newVersion.objectStoreNames.contains(storeModel.name)) {

                homesStore = newVersion.createObjectStore(storeModel.name,
                                                          storeModel.key);

                homesStore.createIndex(indexModel.name,
                                       indexModel.name,
                                       indexModel.definition);
            }
        }
    };

    return model;

})();