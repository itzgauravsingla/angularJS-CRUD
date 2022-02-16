var myApp = angular.module("myApp", []);
myApp.controller("fetchAPI", ["$scope", "$http", ($scope, $http) => {
    // $scope.inform = [];
    const readAPI = 'https://3gu8fobdu7.execute-api.us-east-2.amazonaws.com/v1/api/msbdocs/getmessage?operation=read&operation=read';
    $http({method : 'GET',url : readAPI})
    .then(function(data, status) {
        console.log(data.data.Items);
        $scope.apiData = data.data.Items;
        // console.log(apiData.id)
        // console.log(apiData.description)
        // $scope.inform.push([apiData.id, apiData.description]);
    })
    .catch(function(data, status) {
        alert("Error");
    });

    $scope.editAPI = function()
    {
        // console.log(key);
        let id = $scope.inID;
        let des = $scope.inDES; 
        const putAPI = `https://3gu8fobdu7.execute-api.us-east-2.amazonaws.com/v1/api/msbdocs/getmessage?operation=update&id=${id}&description=${des}`;
        $http({method: 'PUT', url : putAPI})
        .then(function(data){
            alert("updated");
        }).catch( function(data,status){
            alert("Error " + status)
        });
    }

    $scope.deleteAPI = function(id)
    {
        const delAPI = `https://3gu8fobdu7.execute-api.us-east-2.amazonaws.com/v1/api/msbdocs/getmessage?&operation=delete&id=${id}`;
        $http({method: "DELETE", url: delAPI})
        .then(()=> alert("deleted"))
        .catch(()=>alert("error"));
    }

    $scope.addAPI = function()
    {
        let id = $scope.inID;
        let des = $scope.inDES;
        const postAPI = `https://3gu8fobdu7.execute-api.us-east-2.amazonaws.com/v1/api/msbdocs/getmessage`;
        addData = {
            operation: 'create',
            payload:{
                Item: {
                    "description": $scope.inDES,
                    "id": $scope.inID
                }
            }
            
        }
        $http({method: "POST", url: postAPI, data: addData })
        .then(()=> alert("Posted"))
        .catch(()=>alert("error"));
    }

}]);