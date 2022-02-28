var myApp = angular.module("myApp", []);
myApp
  .controller("fetchAPI", [
    "$scope",
    "$http",
    "ApiBase",
    ($scope, $http, ApiBase) => {
      // $scope.inform = [];
      
      $scope.getAPI = function() {
        const readAPI = ApiBase + "?operation=read&operation=read";
      $http({ method: "GET", url: readAPI })
        .then(function (data, status) {
          console.log(data.data.Items);
          $scope.apiData = data.data.Items;
          // console.log(apiData.id)
          // console.log(apiData.description)
          // $scope.inform.push([apiData.id, apiData.description]);
        })
        .catch(function (data, status) {
          alert("Error");
        });
      };

      $scope.getAPI();

      $scope.editAPI = function () {
        // console.log(key);
        let id = $scope.inID;
        let des = $scope.inDES;
        const putAPI =
          ApiBase + `?operation=update&id=${id}&description=${des}`;
        $http({ method: "PUT", url: putAPI })
          .then(function (data) {
            alert("updated");
            $scope.getAPI();
          })
          .catch(function (data, status) {
            alert("Error " + status);
          });
      };

      $scope.deleteAPI = function (id) {
        const delAPI = ApiBase + `?&operation=delete&id=${id}`;
        $http({ method: "DELETE", url: delAPI })
          .then(() => alert("deleted"))
          .then(() => { $scope.getAPI(); })
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
          .then(() => { $scope.getAPI(); })
          .catch(() => alert("error"));
      };
    },
  ])
  .constant(
    "ApiBase",
    "https://3gu8fobdu7.execute-api.us-east-2.amazonaws.com/v1/api/msbdocs/getmessage"
  );
