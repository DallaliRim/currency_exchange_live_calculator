/**
 * This function uses the API in order to get the conversion data
 * The data is obtained thanks to the absoluteURL that is built 
 * from the user's inputs, the data is then fetched and assigned
 * then generates a new row to the table with the fetched data.
 * @param {String} absoluteURL 
 * @return {Promise}
 */
 function getData(absoluteURL) {
  let result;
  fetch(absoluteURL)
  .then(response => { 
    if(response.ok) {
      return response.json()
    } else {
      throw new Error('status error : ', response.status);
    }
  })
  .then(data => { 
    result = data;
    displayResults(result);
  })
  .catch(error => {console.log('An error occured, please check the url : ', error)})
}

/**
 * OPTIONAL FUNCTION
 * @param {String} absoluteURL 
 * @return {Promise}
 */
function getData_xhr(absoluteURL)  {
  var requestURL = absoluteURL;
  var request = new XMLHttpRequest();
  request.open('GET', requestURL); 
  
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var response = request.response;
    displayResults(response);
  }
}