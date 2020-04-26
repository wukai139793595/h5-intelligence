import $http from "@/server";    // $http方法
export const ajaxSet = function (api) {
    var $ajax = {};
    for (var i in api) {
        switch (api[i].type) {
            case 'post':
                $ajax[i] = (function (i) {
                    return function (params, callback, errorback) {
                        let url = api[i].url;
                        if (typeof (params) == "string" &&
                          ((params.indexOf('?') > -1 && params.indexOf('=') > -1) || (params.indexOf('?') == -1 && params.indexOf('=') == -1))) {
                          url = url + params;
                          $http.post(url, {}, api[i].config).then(function (res) {
                            if (api[i].callback) {
                              callback(res);
                            } else {
                              callback(res.data);
                            }
                          }).catch(function (err) {
                            typeof (errorback) == "function" ? errorback() : "";
                          })

                        } else {
                          if (api[i].format=='json') {
                            $http.post(url, JSON.stringify(params), api[i].config).then(function (res) {
                              if (api[i].callback) {
                                callback(res);
                              } else {
                                callback(res.data);
                              }
                            }).catch(function (err) {
                              typeof (errorback) == "function" ? errorback() : "";
                            })
                          } else {

                            $http.post(url, params, api[i].config).then(function (res) {
                              if (api[i].callback) {
                                callback(res);
                              } else {
                                callback(res.data);
                              }
                            }).catch(function (err) {
                              typeof (errorback) == "function" ? errorback() : "";
                            })
                          }
                        }

                    }
                }(i));
                break;
            case 'get':
                $ajax[i] = (function (i) {
                    return function (params, callback, errorback) {
                        let url = api[i].url;
                        if (typeof (params) == "string") {
                            url = url + params;
                          $http.get(url).then(function (res) {
                            callback(res.data);
                          }).catch(function (err) {
                            typeof (errorback) == "function" ? errorback() : "";
                          })
                        } else {
                          $http.get(url, { params: params }).then(function (res) {
                            callback(res.data);
                          }).catch(function (err) {
                            typeof (errorback) == "function" ? errorback() : "";
                          })
                        }

                    }
                }(i));
                break;
            case 'put':
                $ajax[i] = (function (i) {
                    return function (params, callback, errorback) {
                        $http.put(api[i].url, params).then(function (res) {
                            callback(res.data);
                        }).catch(function (err) {
                            typeof (errorback) == "function" ? errorback(err) : "";
                        })
                    }
                }(i));
                break;
            case 'delete':
                $ajax[i] = (function (i) {
                    return function (params, callback, errorback) {
                        let url = api[i].url;
                        if (typeof (params) == "string" || typeof (params) == "number") {
                          url = url + params;
                          $http.delete(url, {}, api[i].config).then(function (res) {
                              callback(res.data);
                          }).catch(function (err) {
                              typeof (errorback) == "function" ? errorback(err) : "";
                          })
                        } else {
                          $http.delete(url, params, api[i].config).then(function (res) {
                              callback(res.data);
                          }).catch(function (err) {
                              typeof (errorback) == "function" ? errorback(err) : "";
                          })
                        }
                    }
                }(i));
                break;
            case 'patch':
                $ajax[i] = (function (i) {
                    return function (params, callback, errorback) {
                        let url = api[i].url;
                        if (typeof (params) == "string" || typeof (params) == "number") {
                          url = url + params;
                          $http.patch(url, {}, api[i].config).then(function (res) {
                              callback(res.data);
                          }).catch(function (err) {
                              typeof (errorback) == "function" ? errorback(err) : "";
                          })
                        } else {
                          if(params.urlIdParams) {
                            url = url + params.id;
                            $http.patch(url, params, api[i].config).then(function (res) {
                                callback(res.data);
                            }).catch(function (err) {
                                typeof (errorback) == "function" ? errorback(err) : "";
                            })
                          } else {
                            $http.patch(url, params, api[i].config).then(function (res) {
                                callback(res.data);
                            }).catch(function (err) {
                                typeof (errorback) == "function" ? errorback(err) : "";
                            })
                          }
                          
                        }
                    }
                }(i));
                break;

        }
    }
    return $ajax;
}

