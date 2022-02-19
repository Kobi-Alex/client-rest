const handleResponse = (response) => {


    if (response) {

        if (response.status === 0) {
            return ["Request error"];
        }

        if (response.status == 200) {
            return response.data;
        }

        if (response.status == 400) {
            
            if (response.data.error || response.data.errors) {
               if(response.data.error) {
                
                return [response.data.error];
               }

               if(response.data.errors) {
                var obj =  response.data.errors;
                var values = Object.keys(obj).map(function (key) {
                    if (obj[key].length) {
                        return obj[key].join(', ');
                    } else {
                        return obj[key];
                    }
                });


                return values;
               }

            } else {
                console.clear();
                console.log("BADDDDDDD: ********** : ", response.data);
            }
        }
        if (response.status == 500) {
            return ["505 Server Error"];
        }
        if (response.status == 401) {
            console.log("401 Unauthorized");
            return ["401 Unauthorized"]
        }
        if (response.status == 403) {
            console.log("403 Forbidden");
            return ['403 Forbidden'];
        }

        if (response.status == 404) {
            console.log("404 Not found");

            if (response.data.error || response.data.errors || response.data.title) {

                if (response.data.error) {
                    return [response.data.error];
                }

                if (response.data.errors) {
                    var obj = response.data.error || response.data.errors || response.data.title;
                    var values = Object.keys(obj).map(function (key) {
                        if (obj[key].length) {
                            return obj[key].join(', ');
                        } else {
                            return obj[key];
                        }
                    });

                    console.log(values);

                    return [];
                }

                if (response.data.title) {
                    return [response.data.title];
                }

            } else {
                return ["Not found"];
            }





        }
    }

    return response;
}

export default handleResponse;