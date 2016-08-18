define(["app", "entities/config/storage/localstorage"], function(RootApp){
    RootApp.module("Entities", function(Entities, RootApp, Backbone, Marionette, $, _){
        Entities.test = Backbone.Model.extend({
            urlRoot: "test",

            defaults: {
                userName: "",
                phoneNumber: "",
                provinceId: "",
                cityId:"",
                areaId:"",
                area_combo:"",
                detail:"",
                state:0
            },

            validate: function(attrs, options) {
                var errors = {};
                if (! attrs.userName) {
                    errors.userName = "can't be blank";
                }
                if (! attrs.phoneNumber) {
                    errors.phoneNumber = "can't be blank";
                }
                else{
                    if (attrs.userName.length < 2) {
                        errors.userName = "is too short";
                    }
                }
                if( ! _.isEmpty(errors)){
                    return errors;
                }
            }
        });

        Entities.configureStorage("RootApp.Entities.test", Entities.test);

        Entities.TestCollection = Backbone.Collection.extend({
            url: "tests",
            model: Entities.test,
            comparator: "userName"
        });

        Entities.configureStorage("RootApp.Entities.TestCollection", Entities.TestCollection);

        var initializeTests = function(){
            var tests = new Entities.TestCollection([
                { id: 1, userName: "秋婷",area_combo:"北京海淀区环到四环之间",detail:"中关村SOHO 607", provinceId: "1",cityId:"2",areaId:"3", phoneNumber: "555-0184" },
                { id: 2, userName: "胡雄伟",area_combo:"湖北黄冈市黄梅县濯港镇",detail:"胡坝村三组胡李松家", provinceId: "1",cityId:"2",areaId:"3", phoneNumber: "555-0184" },
                { id: 3, userName: "胡雄伟",area_combo:"北京回龙观南店新村",detail:"金榜园小区604", provinceId: "1",cityId:"2",areaId:"3", phoneNumber: "555-0184" }
            ]);
            tests.forEach(function(test){
                test.save();
            });
            return tests.models;
        };

        var API = {
            getTestEntities: function(){
                var tests = new Entities.TestCollection();
                var defer = $.Deferred();
                tests.fetch({
                    success: function(data){
                        defer.resolve(data);
                    }
                });
                var promise = defer.promise();
                $.when(promise).done(function(fetchedTests){
                    if(fetchedTests.length === 0){
                        // if we don't have any tests yet, create some for convenience
                        var models = initializeTests();
                        tests.reset(models);
                    }
                });
                return promise;
            },

            getTestEntity: function(TestId){
                var test = new Entities.test({id: TestId});
                var defer = $.Deferred();
                setTimeout(function(){
                    test.fetch({
                        success: function(data){
                            defer.resolve(data);
                        },
                        error: function(data){
                            defer.resolve(undefined);
                        }
                    });
                }, 2000);
                return defer.promise();
            }
        };

        RootApp.reqres.setHandler("rs:test:getTests", function(){
            return API.getTestEntities();
        });

        RootApp.reqres.setHandler("rs:test:getTest", function(id){
            return API.getTestEntity(id);
        });

        RootApp.reqres.setHandler("rs:test:newTest", function(){
            return new Entities.test();
        });
    });

    return RootApp.Entities;
});