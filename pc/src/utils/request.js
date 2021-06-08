export const baseUrl = process.env.NODE_ENV==='development' ? "http://192.168.1.104:5555" :""   //待加地址
export const apiUrl = baseUrl + '/api'

function request(url,data={},config={}){
    url = url.startsWith('http') ? url :apiUrl + url
    let {method = 'get'} = config
    method = method.toLowerCase()
    config.method = method

    if(!config.headers){
        config.headers={}
    }
    if(['get'].includes(method)){
        const params = []
        for(let key in data){
            params.push(`${key} = ${data[key]}`)
        }
        if(params.length>0){
            url = url + (url.includes('?') ? '&' : '?') + params.join('&')
        }
    }else if(['post','put','patch','delete'].includes(method)){
        config.body = JSON.stringify(data)
        config.headers['Content-Type'] = 'application/json'
    }
    config.headers.authorization = '' //token

    return fetch(url,{
        ...config
    }).then(response=>{
      return response.json()
    })
}

request.get = function(url,data,config={}){
    config.method = 'get'
    return request(url,data,config)
}
request.post = function(url,data,config={}){
    config.method = 'post'      
    return request(url,data,config)
}
request.put = function(url,data,config={}){
    config.method = 'put'      
    return request(url,data,config)
}
request.patch = function(url,data,config={}){
    config.method = 'patch'      
    return request(url,data,config)
}
request.delete = function(url,data,config={}){
    config.method = 'delete'      
    return request(url,data,config)
}

export default request