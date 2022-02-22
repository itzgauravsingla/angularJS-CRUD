var myApp = angular.module("myApp", []);
myApp.controller("fetchAPI", [
  "$scope",
  "$http",
  "ApiBase",
  ($scope, $http, ApiBase) => {
    const readAPI =
      (ApiBase + "?operation=read&operation=read");
    $http({ method: "GET", url: readAPI })
      .then(function (data, status) {
        console.log(data.data.Items);
        $scope.apiData = data.data.Items;
      })
      .catch(function (data, status) {
        alert("Error");
      });

    $scope.editAPI = function () {
      // console.log(key);
      let id = $scope.inID;
      let des = $scope.inDES;
      const putAPI = (ApiBase + `?operation=update&id=${id}&description=${des}`);
      $http({ method: "PUT", url: putAPI })
        .then(function (data) {
          alert("updated");
        })
        .catch(function (data, status) {
          alert("Error " + status);
        });
    };

    $scope.deleteAPI = function (id) {
      const delAPI = (ApiBase + `?&operation=delete&id=${id}`);
      $http({ method: "DELETE", url: delAPI })
        .then(() => alert("deleted"))
        .catch(() => alert("error"));
    };

    $scope.addAPI = function () {
      let id = $scope.inID;
      let des = $scope.inDES;
      const postAPI = ApiBase;
      addData = {
        operation: "create",
        payload: {
          Item: {
            description: $scope.inDES,
            id: $scope.inID,
          },
        },
      };
      $http({ method: "POST", url: postAPI, data: addData })
        .then(() => alert("Posted"))
        .catch(() => alert("error"));
    };
  },
]).constant("ApiBase", "https://3gu8fobdu7.execute-api.us-east-2.amazonaws.com/v1/api/msbdocs/getmessage");
